require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')
const routes = require('./routes/auth')

// middleware
app.use(express.json());
app.use('/api/v1', routes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("CSN frontend")
})
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`connected to port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
};

start();