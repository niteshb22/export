import express,{ Request,Response} from 'express';
import { start } from './db/dbConnect';
import transactionRoute from './route/transactionRoute'

const app = express()

const PORT  = 3000

app.use(express.json())
start()

app.use('/api',transactionRoute)

app.get('/',(req:Request, res:Response,)=>{
res.send("API is runniing")
})



app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    
})