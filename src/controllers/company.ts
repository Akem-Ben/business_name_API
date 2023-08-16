import express, {Request, Response, NextFunction} from 'express';
import {v4} from 'uuid';
import Companies from '../models/company';

export const createCompany = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const idNew = v4();
        const {
            company_name, address
        } = req.body;
        const checkCompany = await Companies.findOne({where: {company_name:company_name}})
        if(checkCompany){
            return res.status(400).json({
                message: `Company already Exists`
            })
        }
        const setRegNo:any = await Companies.findAll({});
        let newReg:string = "";
        let rgChecker = 0;
        let regArr = [];
        let finalArr = []
        let maxReg = 0;
        if(setRegNo.length === 0){
            newReg = "AC-11111110"
        }else{
            for(let i = 0; i<setRegNo.length; i++){
                regArr.push(setRegNo[i].reg_no)
            }
            for(let j = 0; j<regArr.length; j++){
                regArr[j] = regArr[j].slice(3)
                finalArr.push(Number(regArr[j]))
            }
            maxReg = Math.max(...finalArr)
            maxReg = maxReg + 1
            newReg = `AC-${maxReg}`
        }
        const newUser = await Companies.create({
            id: idNew,
            reg_no: newReg,
            company_name,
            date_registered: new Date(),
            address
        })

        if(newUser){
            return res.status(200).json({
                message: `New Business Created`,
                newUser
            })
        } else {
            return res.status(400).json({message: `Unable to create`})
        }
    }catch(err:any){
        console.log(err)
        res.status(500).json({Error: `Internal Server Error`})
    }
}

export const getAllCompanies = async (req:Request, res: Response, next: NextFunction) => {
    try{
        const companies:any = await Companies.findAll({})
        if(companies){
            return res.status(200).json({
                message: `Companies fetched`,
                companies
            })
        }else{
            return res.status(404).json({
                message: `Unable to fetch companies`
            })
        }
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({Error: `Internal Server Error`})
    }
}

export const getSingleCompany = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const reg_no:any = req.body.reg_number;
        const findCompany = await Companies.findOne({ where: { reg_no:reg_no }})
        if(!findCompany){
            return res.status(404).json({
                message: `Company not found`
            })
        }
        return res.status(200).json({
            message: `User found successfully`,
            findCompany
        })
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({Error: `Internal Server Error`})
    }
}

export const deleteSingleCompany = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const reg:any = req.query.reg_no;
        const confirm = await Companies.findOne({where: {reg_no:reg}})
        console.log(confirm)
        if(!confirm) return res.status(404).json({message: `Company not found in database`})
        const del = await Companies.destroy({where: {reg_no:reg}})
        if(!del) return res.status(400).json({message: `Unable to delete, contact admin`})
        const allCompanies = await Companies.findAll({})
        return res.status(200).json({message:`deleted successfully`, allCompanies})
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({Error: `Internal Server Error`})
    }
}

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