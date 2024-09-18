// src/models/Transaction.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the Transaction schema
const TransactionSchema: Schema = new Schema({
    createdAt: { type: String, required: true },
    transactionId: { type: String, required: true },
    clientRefId: { type: String, required: true },
    categoryId: { type: String, required: true },
    productName: { type: String, required: true },
    transactionType: { type: String, required: true },
    mode: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    operator: {
        key1: { type: String, required: true },
        key2: { type: String },
        key3: { type: String }
    },
    bankName: { type: String, required: true },
    bankAccountNumber: { type: String, required: true },
    ifsc: { type: String, required: true },
    vendorUtrNumber: { type: String, required: true },
    transaction_amount: { type: Number, required: true },
    ccf: { type: Number, required: true },
    credit: { type: Number, required: true },
    status: { type: String, required: true },
    opening_balance: { type: Number, required: true },
    closing_balance: { type: Number, required: true },
    commission: { type: Number, required: true },
    tds: { type: Number, required: true },
    charges: { type: Number, required: true },
    gst: { type: Number, required: true }
});

// Create the Transaction model
const Transaction = mongoose.model<Document>('Transaction', TransactionSchema);

export default Transaction;
