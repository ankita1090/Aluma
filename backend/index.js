import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
import ChatbotRoutes from './routes/ChatbotRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/", userRoutes)
app.use('/api/', ChatbotRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() =>{ 
        console.log('MongoDB connected ✅')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));