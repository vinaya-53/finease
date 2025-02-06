require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const expenditureSchema = new mongoose.Schema({
    username: String,
    salary: Number,
    monthly_expenditures: Array
});

const Expenditure = mongoose.model('Expenditure', expenditureSchema, 'finease');

app.get('/api/expenditures', async (req, res) => {
    try {
        const expenditures = await Expenditure.find({});
        res.json(expenditures);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


