const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(
    cors({
      origin: 'http://localhost:3000', // Allow only this origin
      methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
      allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
    })
  );

  
mongoose.connect("mongodb+srv://vinuu53:SUnmTeILqUpMdBw2@cluster0.6wbif.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  emailId: String,
  coin: { type: Number, default: 0 },
});

const User = mongoose.model("User", UserSchema);

app.post("/addUser", async (req, res) => {
  try {
    const { username, emailId } = req.body;
    const user = new User({ username, emailId });
    await user.save();
    res.status(200).json({ message: "User added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));








