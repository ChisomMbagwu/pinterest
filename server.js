require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 1234
const DB = process.env.DB_URI
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());

app.use('/api/v1', userRouter);

app.use((error, req, res, next) =>{
if (error) {
    return res.status(500).json({
        message: error.message 
    })
};
next();
});

mongoose.connect(DB).then(() =>{
    console.log("Database connected successfully");
    
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})
}).catch((error)=>{
    console.log('Error connecting to Database', error.message);
});