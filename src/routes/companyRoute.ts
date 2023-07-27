import express from 'express';
import {createCompany,
    getAllCompanies,
    getSingleCompany,
    deleteSingleCompany} from '../controllers/company'

const router = express.Router();



// router.post('/create', createCompany);
router.get('/getall', getAllCompanies);
router.get('/getsingle', getSingleCompany)
// router.delete('/delete', deleteSingleCompany)



export default router;