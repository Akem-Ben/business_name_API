"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Companies extends sequelize_1.Model {
}
Companies.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: false,
    },
    reg_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    company_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    date_registered: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: database_1.default,
    modelName: "Company",
    timestamps: true
});
exports.default = Companies;
