import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import { compareOutputs } from '../../../utils/python-grading'
import { verifyAuth } from '../../../utils/auth'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
    // CSRF Protection
    const origin = request.headers.get('origin')
    const allowedOrigins = [
        'https://www.error404-labs.info.vn',
        'https://error404-labs.info.vn',
        'http://localhost:4321',
        'http://127.0.0.1:4321',
    ]
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden: Invalid Origin' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    // Xác thực
    const user = await verifyAuth(request)
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    try {
        const dbUrl = import.meta.env.DATABASE_URL
        if (!dbUrl) {
            return new Response(JSON.stringify({ error: 'Server configuration error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const sql = neon(dbUrl)
        const { lessonId, sourceCode, outputs } = await request.json()

        // Validate input
        if (!lessonId || !sourceCode || !Array.isArray(outputs)) {
            return new Response(JSON.stringify({ error: 'Thiếu thông tin bài nộp (lessonId, sourceCode, outputs)' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        // Giới hạn độ dài source code để tránh DoS
        if (sourceCode.length > 50000) {
            return new Response(JSON.stringify({ error: 'Source code quá dài' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        // Fetch lesson
        const lesson = (
            await sql`
                SELECT id, title, xp_reward, comparison_mode, float_epsilon, lesson_type
                FROM error404labs.py_lessons
                WHERE id = ${lessonId} AND published = true
            `
        )[0]

        if (!lesson) {
            return new Response(JSON.stringify({ error: 'Bài học không tồn tại' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        // Theory lessons không có test case
        if (lesson.lesson_type === 'theory') {
            // Lưu submission và đánh dấu completed ngay
            const sub = (
                await sql`
                    INSERT INTO error404labs.py_submissions (user_id, lesson_id, source_code, status, passed_tests, total_tests)
                    VALUES (${user.id}, ${lessonId}, ${sourceCode}, 'passed', 0, 0)
                    RETURNING id
                `
            )[0]

            // Update progress
            await sql`
                INSERT INTO error404labs.py_lesson_progress (user_id, lesson_id, status, first_started_at, completed_at, best_submission_id)
                VALUES (${user.id}, ${lessonId}, 'completed', NOW(), NOW(), ${sub.id})
                ON CONFLICT (user_id, lesson_id)
                DO UPDATE SET status = 'completed', completed_at = COALESCE(py_lesson_progress.completed_at, NOW()), best_submission_id = ${sub.id}, updated_at = NOW()
            `

            // Kiểm tra đã hoàn thành trước đó (tránh XP duplication)
            const existingProgress = await sql`
                SELECT status FROM error404labs.py_lesson_progress
                WHERE user_id = ${user.id} AND lesson_id = ${lessonId}
            `
            const alreadyCompleted = existingProgress[0]?.status === 'completed'

            // Award XP (chỉ nếu chưa completed trước đó)
            let xpAwarded = 0
            if (!alreadyCompleted) {
                xpAwarded = lesson.xp_reward

                const today = new Date().toISOString().split('T')[0]
                const profile = (
                    await sql`
                        SELECT id, current_streak, longest_streak, last_learning_date
                        FROM error404labs.py_profiles
                        WHERE id = ${user.id}
                    `
                )[0]

                let newStreak = 1
                let longestStreak = 1

                if (profile) {
                    newStreak = profile.current_streak
                    const lastDate = profile.last_learning_date
                        ? new Date(profile.last_learning_date).toISOString().split('T')[0]
                        : null

                    if (lastDate && lastDate !== today) {
                        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
                        newStreak = lastDate === yesterday ? newStreak + 1 : 1
                    } else if (!lastDate) {
                        newStreak = 1
                    }

                    longestStreak = Math.max(newStreak, profile.longest_streak)
                }

                await sql`
                    INSERT INTO error404labs.py_profiles (id, total_xp, current_streak, longest_streak, last_learning_date)
                    VALUES (${user.id}, ${xpAwarded}, ${newStreak}, ${longestStreak}, ${today})
                    ON CONFLICT (id) DO UPDATE SET
                        total_xp = error404labs.py_profiles.total_xp + ${xpAwarded},
                        current_streak = ${newStreak},
                        longest_streak = GREATEST(error404labs.py_profiles.longest_streak, ${longestStreak}),
                        last_learning_date = ${today},
                        updated_at = NOW()
                `
            }

            return new Response(
                JSON.stringify({
                    submissionId: sub.id,
                    passed: true,
                    passedTests: 0,
                    totalTests: 0,
                    xpAwarded,
                    results: [],
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        }

        // Fetch test cases cho practice lesson
        const testCases = await sql`
            SELECT id, stdin, expected_output, is_hidden, order_index
            FROM error404labs.py_test_cases
            WHERE lesson_id = ${lessonId}
            ORDER BY order_index ASC
        `

        if (testCases.length === 0) {
            return new Response(JSON.stringify({ error: 'Bài học chưa có test case' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        if (testCases.length !== outputs.length) {
            return new Response(JSON.stringify({ error: 'Số lượng kết quả không khớp với test case' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        // Grading: so sánh từng output với expected
        const results: any[] = []
        let passedCount = 0
        const comparisonMode = lesson.comparison_mode as 'exact' | 'float' | 'contains'
        const epsilon = lesson.float_epsilon || 0.001

        for (let i = 0; i < testCases.length; i++) {
            const tc = testCases[i]
            const actual = outputs[i] || ''
            const expected = tc.expected_output

            const passed = compareOutputs(actual, expected, comparisonMode, epsilon)

            if (passed) passedCount++

            const result: any = {
                testNumber: tc.order_index,
                passed,
                input: tc.stdin,
            }

            // Hidden tests: không trả expected/actual
            if (!tc.is_hidden) {
                result.expected = expected
                result.actual = actual
            }

            results.push(result)
        }

        const allPassed = passedCount === testCases.length
        const status = allPassed ? 'passed' : 'failed'
        let xpAwarded = allPassed ? lesson.xp_reward : 0

        // Lưu submission
        const submission = (
            await sql`
                INSERT INTO error404labs.py_submissions (
                    user_id, lesson_id, source_code, status,
                    passed_tests, total_tests, results
                ) VALUES (
                    ${user.id}, ${lessonId}, ${sourceCode}, ${status},
                    ${passedCount}, ${testCases.length}, ${JSON.stringify(results)}
                )
                RETURNING id
            `
        )[0]

        // Nếu passed: update progress + award XP + streak
        if (allPassed) {
            await sql`
                INSERT INTO error404labs.py_lesson_progress (user_id, lesson_id, status, first_started_at, completed_at, best_submission_id)
                VALUES (${user.id}, ${lessonId}, 'completed', NOW(), NOW(), ${submission.id})
                ON CONFLICT (user_id, lesson_id)
                DO UPDATE SET status = 'completed', completed_at = COALESCE(py_lesson_progress.completed_at, NOW()), best_submission_id = ${submission.id}, updated_at = NOW()
            `

            // Kiểm tra đã hoàn thành trước đó (tránh XP duplication)
            const existingProgress = await sql`
                SELECT status FROM error404labs.py_lesson_progress
                WHERE user_id = ${user.id} AND lesson_id = ${lessonId}
            `
            const alreadyCompleted = existingProgress[0]?.status === 'completed'

            if (!alreadyCompleted) {
                const today = new Date().toISOString().split('T')[0]
                const profile = (
                    await sql`
                        SELECT id, current_streak, longest_streak, last_learning_date
                        FROM error404labs.py_profiles
                        WHERE id = ${user.id}
                    `
                )[0]

                let newStreak = 1
                let longestStreak = 1

                if (profile) {
                    newStreak = profile.current_streak
                    const lastDate = profile.last_learning_date
                        ? new Date(profile.last_learning_date).toISOString().split('T')[0]
                        : null

                    if (lastDate && lastDate !== today) {
                        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
                        newStreak = lastDate === yesterday ? newStreak + 1 : 1
                    } else if (!lastDate) {
                        newStreak = 1
                    }

                    longestStreak = Math.max(newStreak, profile.longest_streak)
                }

                await sql`
                    INSERT INTO error404labs.py_profiles (id, total_xp, current_streak, longest_streak, last_learning_date)
                    VALUES (${user.id}, ${xpAwarded}, ${newStreak}, ${longestStreak}, ${today})
                    ON CONFLICT (id) DO UPDATE SET
                        total_xp = error404labs.py_profiles.total_xp + ${xpAwarded},
                        current_streak = ${newStreak},
                        longest_streak = GREATEST(error404labs.py_profiles.longest_streak, ${longestStreak}),
                        last_learning_date = ${today},
                        updated_at = NOW()
                `
            } else {
                xpAwarded = 0
            }
        } else {
            // Nếu failed: vẫn update progress nhưng không award XP
            await sql`
                INSERT INTO error404labs.py_lesson_progress (user_id, lesson_id, status, first_started_at, completed_at, best_submission_id)
                VALUES (${user.id}, ${lessonId}, 'in_progress', NOW(), NULL, NULL)
                ON CONFLICT (user_id, lesson_id)
                DO UPDATE SET status = 'in_progress', updated_at = NOW()
            `
        }

        return new Response(
            JSON.stringify({
                submissionId: submission.id,
                passed: allPassed,
                passedTests: passedCount,
                totalTests: testCases.length,
                xpAwarded,
                results,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            },
        )
    } catch (error: any) {
        console.error('[Python Submit Error]:', error)
        return new Response(
            JSON.stringify({
                error: 'Lỗi hệ thống',
                details: import.meta.env.DEV ? error.message : undefined,
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            },
        )
    }
}
