import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL);

/**
 * Tiện ích hỗ trợ truy vấn với tiền tố bảng tự động
 * @param {string} tableName - Tên bảng không có tiền tố
 * @returns {string} - Tên bảng đã có tiền tố
 */
export const getTableName = (tableName) => {
    const prefix = process.env.TABLE_PREFIX || 'pet404_';
    return `${prefix}${tableName}`;
};

export default sql;
