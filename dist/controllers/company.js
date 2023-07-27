"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleCompany = exports.getSingleCompany = exports.getAllCompanies = exports.createCompany = void 0;
const uuid_1 = require("uuid");
const company_1 = __importDefault(require("../models/company"));
const createCompany = async (req, res, next) => {
    try {
        const idNew = (0, uuid_1.v4)();
        const { company_name, address } = req.body;
        const checkCompany = await company_1.default.findOne({ where: { company_name: company_name } });
        if (checkCompany) {
            return res.status(400).json({
                message: `Company already Exists`
            });
        }
        const setRegNo = await company_1.default.findAll({});
        let newReg = "";
        let rgChecker = 0;
        let regArr = [];
        let finalArr = [];
        let maxReg = 0;
        if (setRegNo.length === 0) {
            newReg = "AC-11111110";
        }
        else {
            for (let i = 0; i < setRegNo.length; i++) {
                regArr.push(setRegNo[i].reg_no);
            }
            for (let j = 0; j < regArr.length; j++) {
                regArr[j] = regArr[j].slice(3);
                finalArr.push(Number(regArr[j]));
            }
            maxReg = Math.max(...finalArr);
            maxReg = maxReg + 1;
            newReg = `AC-${maxReg}`;
        }
        const newUser = await company_1.default.create({
            id: idNew,
            reg_no: newReg,
            company_name,
            date_registered: new Date(),
            address
        });
        if (newUser) {
            return res.status(200).json({
                message: `New Business Created`,
                newUser
            });
        }
        else {
            return res.status(400).json({ message: `Unable to create` });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ Error: `Internal Server Error` });
    }
};
exports.createCompany = createCompany;
const getAllCompanies = async (req, res, next) => {
    try {
        const companies = await company_1.default.findAll({});
        if (companies) {
            return res.status(200).json({
                message: `Companies fetched`,
                companies
            });
        }
        else {
            return res.status(404).json({
                message: `Unable to fetch companies`
            });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ Error: `Internal Server Error` });
    }
};
exports.getAllCompanies = getAllCompanies;
const getSingleCompany = async (req, res, next) => {
    try {
        const reg_no = req.query.reg_number;
        const findCompany = await company_1.default.findOne({ where: { reg_no: reg_no } });
        console.log(findCompany);
        if (!findCompany) {
            return res.status(404).json({
                message: `Company not found`
            });
        }
        return res.status(200).json({
            message: `User found successfully`,
            findCompany
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ Error: `Internal Server Error` });
    }
};
exports.getSingleCompany = getSingleCompany;
const deleteSingleCompany = async (req, res, next) => {
    try {
        const reg = req.query.reg_no;
        const confirm = await company_1.default.findOne({ where: { reg_no: reg } });
        console.log(confirm);
        if (!confirm)
            return res.status(404).json({ message: `Company not found in database` });
        const del = await company_1.default.destroy({ where: { reg_no: reg } });
        if (!del)
            return res.status(400).json({ message: `Unable to delete, contact admin` });
        const allCompanies = await company_1.default.findAll({});
        return res.status(200).json({ message: `deleted successfully`, allCompanies });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ Error: `Internal Server Error` });
    }
};
exports.deleteSingleCompany = deleteSingleCompany;
// CREATE TABLE Companies (
//     id VARCHAR(255) NOT NULL,
//     reg_no VARCHAR(255) NOT NULL,
//     company_name VARCHAR(255) NOT NULL,
//     date_registered DATE NOT NULL,
//     address VARCHAR(255) NOT NULL,
//     createdAt DATE,
//     updatedAt DATE,
//     PRIMARY KEY (reg_no),
//     UNIQUE (company_name)
//   );
