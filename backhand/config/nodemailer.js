import nodemailer from 'nodemailer'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const transporter=nodemailer.createTransport({
service:"gmail",

auth:{
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS
    
}
});

transporter.verify((error, success) => {
  if (error) console.error("❌ Email connection failed:", error);
  else console.log("✅ Email server ready to send messages!");
});

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Exists" : "Missing");


export default transporter;