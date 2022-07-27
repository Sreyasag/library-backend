const dotenv = require('dotenv');
dotenv.config({ path:'./config.env' })
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRouter = require('./routes/bookRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

app.use(cors())
app.use(express.json())  //to parse data from req.body

app.use('/books', bookRouter);
app.use('/users', userRouter);


mongoose
  .connect("mongodb://localhost:27017/Library")
  .then(() => console.log("Db connected"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
