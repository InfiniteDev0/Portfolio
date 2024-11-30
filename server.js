const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/requestsDB", {
    family: 4,
});

const requestSchema = new mongoose.Schema({
    name: String,
    message: String,
    selected: String,
});

const Request = mongoose.model("Request", requestSchema);

app.post("/requests", async (req, res) => {
    try {
        const newRequest = new Request(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
