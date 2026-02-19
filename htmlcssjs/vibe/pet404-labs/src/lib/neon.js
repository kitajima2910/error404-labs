import { neon } from '@neondatabase/serverless';

const getEnv = (key) => {
    if (typeof import.meta.env !== 'undefined' && import.meta.env[key]) return import.meta.env[key];
    if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
    return undefined;
};

const url = getEnv('NEON_DATABASE_URL');
if (!url) {
    console.error('CRITICAL: NEON_DATABASE_URL is not defined!');
}

const sql = url ? neon(url) : null;

/**
 * Tiện ích hỗ trợ truy vấn với tiền tố bảng tự động
 * @param {string} tableName - Tên bảng không có tiền tố
 * @returns {string} - Tên bảng đã có tiền tố
 */
export const getTableName = (tableName) => {
    const prefix = getEnv('TABLE_PREFIX') || 'pet404_';
    return `${prefix}${tableName}`;
};

export default sql;
