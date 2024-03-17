import express from 'express';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import {notFound,errorHandler}from './middleware/errorMiddleware.js'

const port=5000;
const app=express();
connectDB();

app.use('/api/products',productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{console.log(`server running on port ${port}`)})