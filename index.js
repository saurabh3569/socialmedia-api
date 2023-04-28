require('dotenv').config()
const express = require('express')

// import files
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const connectDB = require('./config/db');

// middleware
const app = express();
app.use(express.json());

// routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

const port = 5000

app.listen(port, async () => {
    await connectDB()
    console.log('server started');
})