"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = require("./config");
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(config_1.DATABASE_NAME, config_1.DATABASE_USERNAME, config_1.DATABASE_PASSWORD, {
    dialect: "mysql",
    host: config_1.DATABASE_HOST,
    port: 3306,
    dialectModule: mysql2_1.default,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
        },
    },
});
// const sequelize = new Sequelize(DB_SCHEMA_NAME, DB_NAME, DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'mysql',
// });
exports.default = sequelize;
