require('dotenv').config();
const { connectMongoDb } = require("./config/db-config");

const express = require("express");
const cors = require("cors");

const app = express();


connectMongoDb();
app.use(express.json());
app.use('/api/users',require('./routes/users-routes'));
app.use('/api/events',require('./routes/events-routes'));

// Listen on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
    res.send("Home page");
});
