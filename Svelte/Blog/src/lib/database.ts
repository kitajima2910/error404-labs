/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import { DATABASE_URL } from '$env/static/private'; // hoặc PUBLIC nếu bạn để public

const sql = neon(DATABASE_URL);

export async function query(text: string, params?: any[]): Promise<Record<string, any>[]> {
	try {
		if (params && params.length > 0) {
			const result = await sql.query(text, params);
			return result;
		} else {
			const result = await sql.query(text);
			return result;
		}
	} catch (err) {
		console.error('❌ Query error:', err);
		throw err;
	}
}

export async function initDatabase() {
	try {
		const check =
			await sql`SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'data'`;

		if (check.length === 0) {
			console.log('🚀 Schema chưa có — bắt đầu tạo database...');

			const sqlPath = path.resolve('schema/all.sql');
			const sqlContent = fs.readFileSync(sqlPath, 'utf8');
			const statements = sqlContent
				.split(/;\s*$/m)
				.map((s) => s.trim())
				.filter(Boolean);

			for (const stmt of statements) {
				try {
					await sql.query(stmt);
				} catch (innerErr) {
					console.error('⚠️ Lỗi khi thực thi:', stmt, (innerErr as Error).message);
				}
			}

			console.log('✅ Database schema đã được tạo thành công!');
		} else {
			console.log('✅ Schema "data" đã tồn tại.');
		}
	} catch (err) {
		console.error('❌ Lỗi khi tạo database:', err);
	}
}
