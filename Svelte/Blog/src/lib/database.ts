/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from '@neondatabase/serverless';
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
