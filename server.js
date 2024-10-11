// Budget API

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const budgetSchema = require('./models/budget_schema');
let url = "mongodb://localhost:27017/budget_db";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static("public"));

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to the Database");
            budgetSchema.find({})
                .then((data) => {
                    const budget = {
                        "myBudget" : data
                    }
                    res.json(budget);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
});

app.post("/addBudget", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to the Database");
            let newData = new budgetSchema(req.body);
            budgetSchema.insertMany(newData)
                .then(() => {
                    res.json({ message: "New data inserted." });
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
})

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});