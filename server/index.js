import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import router from './routers/contact.js';

mongoose.connect(process.env.MONGO_URL);
const MONGODB__CONNECTION = mongoose.connection;
MONGODB__CONNECTION.on('open', ()=> {
    console.log('Connect to Mongoose server running');
})
MONGODB__CONNECTION.on('error', (error) => {
    console.log('Error connecting to Mongoose' + error.message);
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(process.env.PORT, () => {
    console.log('Server has been started on port 5000...');
})