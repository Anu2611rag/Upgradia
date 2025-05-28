const express=require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const auth=require('./Routes/Authroute')
const nodemailer = require('nodemailer');
const cors=require('cors')
dotenv.config();
const app=express();
 const JWT_SECRET=process.env.JWT_SECRET
app.use(express.json())
app.use(cors())
app.use('/api/auth', auth);
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS  // your app password
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((error) => console.log("MongoDB connection error:", error));
//app.use("/api/auth", auth);

const port = process.env.PORT || 5000;  


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});