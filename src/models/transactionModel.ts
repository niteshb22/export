// src/models/Transaction.ts
import mongoose, { Schema, Document } from "mongoose";
import { ITransaction } from "../interface/iTransaction";

const mongoo: any = require("mongoose");

let transaction = new mongoose.Schema({
  clientRefId: { type: String, default: "" },
  vendorId: { type: String, default: "" },
  vendorName: { type: String, default: "" },
  transactionId: { type: String, default: "" },
  bankRRN: { type: String, default: "" },
  transactionType: { type: String, default: "" },
  productId: { type: String, default: "" },
  productName: { type: String, default: "" },
  categoryId: { type: String, default: "" },
  categoryName: { type: String, default: "" },
  agentDetails: {
    id: { type: mongoo.Types.ObjectId, ref: "users" },
    oldMainWalletBalance: { type: Number, default: 0 },
    newMainWalletBalance: { type: Number, default: 0 },
    oldAEPSWalletBalance: { type: Number, default: 0 },
    newAEPSWalletBalance: { type: Number, default: 0 },
    commissionAmount: { type: Number, default: 0 },
    creditedAmount: { type: Number, default: 0 },
    TDSAmount: { type: Number, default: 0 },
  },
  adminDetails: {
    id: { type: mongoo.Types.ObjectId, ref: "admin" },
    oldMainWalletBalance: { type: Number, default: 0 },
    newMainWalletBalance: { type: Number, default: 0 },
    oldAEPSWalletBalance: { type: Number, default: 0 },
    newAEPSWalletBalance: { type: Number, default: 0 },
    commissionAmount: { type: Number, default: 0 },
    creditedAmount: { type: Number, default: 0 },
    TDSAmount: { type: Number, default: 0 },
  },
  distributorDetails: {
    id: { type: mongoo.Types.ObjectId, ref: "users" },
    oldMainWalletBalance: { type: Number, default: 0 },
    newMainWalletBalance: { type: Number, default: 0 },
    oldAEPSWalletBalance: { type: Number, default: 0 },
    newAEPSWalletBalance: { type: Number, default: 0 },
    commissionAmount: { type: Number, default: 0 },
    creditedAmount: { type: Number, default: 0 },
    TDSAmount: { type: Number, default: 0 },
  },
  masterDistributorDetails: {
    id: { type: mongoo.Types.ObjectId, ref: "users" },
    oldMainWalletBalance: { type: Number, default: 0 },
    newMainWalletBalance: { type: Number, default: 0 },
    oldAEPSWalletBalance: { type: Number, default: 0 },
    newAEPSWalletBalance: { type: Number, default: 0 },
    commissionAmount: { type: Number, default: 0 },
    creditedAmount: { type: Number, default: 0 },
    TDSAmount: { type: Number, default: 0 },
  },
  partnerDetails: {
    id: { type: mongoo.Types.ObjectId, ref: "users" },
    oldMainWalletBalance: { type: Number, default: 0 },
    newMainWalletBalance: { type: Number, default: 0 },
    oldAEPSWalletBalance: { type: Number, default: 0 },
    newAEPSWalletBalance: { type: Number, default: 0 },
    commissionAmount: { type: Number, default: 0 },
    creditedAmount: { type: Number, default: 0 },
    TDSAmount: { type: Number, default: 0 },
  },
  amount: { type: Number, default: 0 },
  credit: { type: Number, default: 0 },
  debit: { type: Number, default: 0 },
  TDS: { type: Number, default: 0 },
  GST: { type: Number, default: 0 },
  taxableAmount: { type: Number, default: 0 },
  checkStatus: [
    {
      vendorApiRequest: { type: String },
      vendorApiResponse: { type: String },
      date: { type: Date },
      checkStatusDoneBy: {
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        role: { type: String, default: "" },
        email: { type: String, default: "" },
        selfie: [],
        userCode: { type: String, default: "" },
      },
      ipAddress: { type: String, default: "" },
      macAddress: { type: String, default: "" },
      imeiNumber: { type: String, default: "" },
      deviceType: { type: String, default: "" },
      lat: { type: String, default: "" },
      long: { type: String, default: "" },
    },
  ],
  three_way_recoon: { type: String, default: "" },
  status: { type: String, default: "" },
  vendorUtrNumber: { type: String, default: "" },
  providerBank: { type: String, default: "" },
  moneyTransferSenderId: { type: mongoo.Types.ObjectId, ref: "DMTRemitter" },
  moneyTransferBeneficiaryId: { type: mongoo.Types.ObjectId },
  moneyTransferBeneficiaryDetails: {
    bankName: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    mobileNumber: { type: String, default: "" },
    beneName: { type: String, default: "" },
    ifsc: { type: String, default: "" },
    beneEmail: { type: String, default: "" },
    relationship: { type: String, default: "" },
  },
  partner_ref_id: { type: String },
  API_REF_ID: { type: String, default: "" },
  operator: {
    key1: { type: String, default: "" },
    key2: { type: String, default: "" },
    key3: { type: String, default: "" },
  },
  mobileNumber: { type: String, default: "" },
  metaData: {
    ipAddress: { type: String, default: "" },
    macAddress: { type: String, default: "" },
    imeiNumber: { type: String, default: "" },
    deviceType: { type: String, default: "" },
    lat: { type: String, default: "" },
    long: { type: String, default: "" },
  },
  bbpsBillFetchData: {
    dueAmount: { type: String, default: "" },
    dueDate: { type: String, default: "" },
    customerName: { type: String, default: "" },
    billNumber: { type: String, default: "" },
    isBillFetched: { type: Boolean, default: false },
  },
  bbpsParametersDetails: [
    {
      key: { type: String, default: "" },
      value: { type: String, default: "" },
    },
  ],
  remarks: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  modeOfPayment: { type: String, default: "" },
});

//   var transactionData = mongoo.model('transaction', transaction);
const transactionData = mongoose.model<ITransaction & Document>(
  "Transaction",
  transaction
);

export default transactionData;

// Create the Transaction model
