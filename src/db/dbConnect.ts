import mongoose from "mongoose";
import Transaction from "../models/transactionModel"; 

const mongoUri = 'mongodb+srv://15July24Admin:vYBPsu7Zm9XKdwOC@k1paydev.tde229c.mongodb.net/K1payDev?retryWrites=true';

export const start = async () => {
    try {
        // Connect to MongoDB with options
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");

        // const getAll=async()=>{
        //             const objectId = new mongoose.Types.ObjectId('655447449e7213abbeca773e');
        //     const result = await Transaction.find({ 'agentDetails.id': objectId });
        //     console.log(result);
             
        // }
        // getAll()
            
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    };
    



    //         const trans = await transactions.find({ 'agentDetails.id': objectId });