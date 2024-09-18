// src/routes/downloadRoutes.ts
import express, { Request, Response } from 'express';
import { generateReport } from '../service/TransactionService';


const router = express.Router();

// Route to download Excel
router.get('/export', generateReport);

export default router;
