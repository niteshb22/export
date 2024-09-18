// controllers/exportController.ts
import { Request, Response } from 'express';
import ExcelJS from 'exceljs';
import Transaction from '../models/transactionModel';
import mongoose from 'mongoose';

export const generateReport = async (req: Request, res: Response) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data Export');

        worksheet.columns = [
            { header: 'Date and Time', key: 'createdAt', width: 20 },
            { header: 'Transaction ID', key: 'transactionId', width: 30 },
            { header: 'Client ID', key: 'clientRefId', width: 30 },
            { header: 'Category', key: 'categoryId', width: 20 },
            { header: 'Product', key: 'productName', width: 20 },
            { header: 'Transaction Type', key: 'transactionType', width: 40 },
            { header: 'Mode', key: 'mode', width: 15 },
            { header: 'Sender Number', key: 'mobileNumber', width: 20 },
            { header: 'Bank Name', key: 'bankName', width: 20 },
            { header: 'Bank Account Number', key: 'bankAccountNumber', width: 25 },
            { header: 'IFSC', key: 'ifsc', width: 15 },
            { header: 'UTR', key: 'vendorUtrNumber', width: 20 },
            { header: 'Transaction Amount Rs.', key: 'transaction_amount', width: 20 },
            { header: 'CCF', key: 'ccf', width: 15 },
            { header: 'Credit', key: 'credit', width: 15 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Opening Balance Rs.', key: 'openingBalance', width: 20 },
            { header: 'Closing Balance Rs.', key: 'closingBalance', width: 20 },
            { header: 'Commission Rs.', key: 'commission', width: 20 },
            { header: 'TDS Rs.', key: 'TDS', width: 20 },
            { header: 'Charges Rs.', key: 'charges', width: 20 },
            { header: 'GST Rs.', key: 'GST', width: 20 }
        ];

        // Sample data with nested agentDetails and operator fields

        const getAll=async()=>{
            const objectId = new mongoose.Types.ObjectId('655447449e7213abbeca773e');
    const result = await Transaction.find({ 'agentDetails.id': objectId });
    console.log(result);
     
}
getAll()
        
        const data = [
            {
                createdAt: new Date().toLocaleString(),
                transactionId: 'TXN123456789',
                clientRefId: 'CLIENT001',
                categoryId: 'CAT001',
                productName: 'Product A',
                transactionType: 'Payment',
                mode: 'Online',
                mobileNumber: '9876543210',
                operator: { key1: 'XYZ Bank', key2: 'IFSC001', key3: '1234567890' },
                vendorUtrNumber: 'UTR001234567',
                transaction_amount: 1000,
                ccf: 10,
                credit: 990,
                status: 'Success',
                agentDetails: {
                    oldMainWalletBalance: 5000,
                    newMainWalletBalance: 5990,
                    commissionAmount: 20,
                },
                TDS: 2,
                charges: 5,
                GST: 18
            },
            {
                createdAt: new Date().toLocaleString(),
                transactionId: 'TXN987654321',
                clientRefId: 'CLIENT002',
                categoryId: 'CAT002',
                productName: 'Product B',
                transactionType: 'Refund',
                mode: 'Offline',
                mobileNumber: '9123456789',
                operator: { key1: 'ABC Bank', key2: 'IFSC002', key3: '0987654321' },
                vendorUtrNumber: 'UTR009876543',
                transaction_amount: 1500,
                ccf: 15,
                credit: 1485,
                status: 'Pending',
                agentDetails: {
                    oldMainWalletBalance: 6000,
                    newMainWalletBalance: 7485,
                    commissionAmount: 30,
                },
                TDS: 3,
                charges: 10,
                GST: 27
            }
        ];

        // Flatten nested data (agentDetails and operator)
        const flattenedData = data.map((row) => ({
            ...row,
            bankName: row.operator.key1,
            bankAccountNumber: row.operator.key3,
            ifsc: row.operator.key2,
            openingBalance: row.agentDetails.oldMainWalletBalance,
            closingBalance: row.agentDetails.newMainWalletBalance,
            commission: row.agentDetails.commissionAmount,
        }));

        // Add flattened data to worksheet
        flattenedData.forEach((row) => {
            worksheet.addRow(row);
        });

        // Set the response headers for Excel download
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader('Content-Disposition', 'attachment; filename=data-export.xlsx');

        // Write to response
        await workbook.xlsx.write(res);

        // End the response
        res.end();
    } catch (error) {
        console.error('Error generating Excel file', error);
        res.status(500).send('Failed to export Excel file');
    }
};
