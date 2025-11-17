import dotenv from 'dotenv'
import express from 'express'

import cors from "cors";
import connectDB from './config/connection.mjs';
import router from './Routes/Routes.mjs';

const app = express()


app.use(express.json())
dotenv.config();
connectDB();

app.use(cors());


app.use('/api' , router)



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
