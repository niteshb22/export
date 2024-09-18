// src/interfaces/ITransaction.ts
export interface ITransaction {
    createdAt: String;
    transactionId: string;
    clientRefId: string;
    categoryId: string;
    productName: string;
    transactionType: string;
    mode: string;
    mobileNumber: string;
    operator: {
        key1: string;
        key2?: string; 
        key3?: string;
    };
    bankName: string;
    bankAccountNumber: string;
    ifsc: string;
    vendorUtrNumber: string;
    transaction_amount: number;
    ccf: number;
    credit: number;
    status: string;
    agentDetails:{
        oldMainWalletBalance: number;
        newMainWalletBalance: number;
        commissionAmount: number;
        TDSAmount: number;
    }
    charges: number;
    gst: number;
}
