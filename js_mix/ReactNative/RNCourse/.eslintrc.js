// .eslintrc.js
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
    plugins: ["react", "react-hooks"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        // React Hooks
        "react-hooks/rules-of-hooks": "error", // bắt buộc dùng hook đúng cách
        "react-hooks/exhaustive-deps": "warn", // cảnh báo thiếu dependencies
        // Tùy chọn thêm
        "no-unused-vars": "warn",
        "react/prop-types": "off", // nếu không dùng PropTypes
    },
    settings: {
        react: {
            version: "detect", // Tự phát hiện version React (cần cho react plugin)
        },
    },
};
