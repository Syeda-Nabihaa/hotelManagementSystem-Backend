import dotenv from 'dotenv'
import express from 'express'

import cors from "cors";
import connectDB from './config/connection.mjs';
import router from './Routes/Routes.mjs';
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const ___dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/uploads', express.static(path.join(___dirname, 'uploads')))

app.use(express.json())
dotenv.config();
connectDB();

app.use(cors());


app.use('/api' , router)



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
