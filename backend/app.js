require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;


// app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use(errorHandler);
connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
