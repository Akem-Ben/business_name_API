"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = require("../controllers/company");
const router = express_1.default.Router();
// router.post('/create', createCompany);
router.get('/getall', company_1.getAllCompanies);
router.get('/getsingle', company_1.getSingleCompany);
// router.delete('/delete', deleteSingleCompany)
exports.default = router;
