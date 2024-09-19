import { Request, Response } from "express";
import ExcelJS from "exceljs";
import Transaction from "../models/transactionModel";
import mongoose from "mongoose";

export const generateReport = async (req: Request, res: Response) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Export");

    worksheet.columns = [
      { header: "Date and Time", key: "createdAt", width: 20 },
      { header: "Transaction ID", key: "transactionId", width: 30 },
      { header: "Client ID", key: "clientRefId", width: 30 },
      { header: "Category", key: "categoryId", width: 20 },
      { header: "Product", key: "productName", width: 20 },
      { header: "Transaction Type", key: "transactionType", width: 40 },
      { header: "Mode", key: "mode", width: 15 },
      { header: "Sender Number", key: "mobileNumber", width: 20 },
      { header: "Bank Name", key: "bankName", width: 20 },
      { header: "Bank Account Number", key: "bankAccountNumber", width: 25 },
      { header: "IFSC", key: "ifsc", width: 15 },
      { header: "UTR", key: "vendorUtrNumber", width: 20 },
      {
        header: "Transaction Amount Rs.",
        key: "transaction_amount",
        width: 20,
      },
      { header: "CCF", key: "ccf", width: 15 },
      { header: "Credit", key: "credit", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "Opening Balance Rs.", key: "openingBalance", width: 20 },
      { header: "Closing Balance Rs.", key: "closingBalance", width: 20 },
      { header: "Commission Rs.", key: "commission", width: 20 },
      { header: "TDS Rs.", key: "TDS", width: 20 },
      { header: "Charges Rs.", key: "charges", width: 20 },
      { header: "GST Rs.", key: "GST", width: 20 },
    ];

    // Fetch data from MongoDB

    const userId = req.params.userId;
    const objectId = new mongoose.Types.ObjectId(userId);
    // const objectId = new mongoose.Types.ObjectId("655447449e7213abbeca773e");
    const transactions = await Transaction.find({
      "agentDetails.id": objectId,
    });
    // console.log(transactions);

    // Process and flatten the data
    const flattenedData = transactions.map((transaction) => ({
      createdAt: transaction.createdAt.toLocaleString(),
      transactionId: transaction.transactionId,
      clientRefId: transaction.clientRefId,
      categoryId: transaction.categoryId,
      productName: transaction.productName,
      transactionType: transaction.transactionType,
      mode: transaction.mode,
      mobileNumber: transaction.mobileNumber,
      bankName: transaction.operator?.key1 || "",
      bankAccountNumber: transaction.operator?.key3 || "",
      ifsc: transaction.operator?.key2 || "",
      vendorUtrNumber: transaction.vendorUtrNumber,
      transaction_amount: transaction.transaction_amount,
      ccf: transaction.ccf,
      credit: transaction.credit,
      status: transaction.status,
      openingBalance: transaction.agentDetails?.oldMainWalletBalance || 0,
      closingBalance: transaction.agentDetails?.newMainWalletBalance || 0,
      commission: transaction.agentDetails?.commissionAmount || 0,
      TDS: transaction.agentDetails.TDSAmount,
      charges: transaction.charges,
      // GST: transaction.GST
    }));

    // Add flattened data to worksheet
    flattenedData.forEach((row) => {
      worksheet.addRow(row);
    });

    // Set the response headers for Excel download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=data-export.xlsx"
    );

    // Write to response
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  } catch (error) {
    console.error("Error generating Excel file", error);
    res.status(500).send("Failed to export Excel file");
  }
};
