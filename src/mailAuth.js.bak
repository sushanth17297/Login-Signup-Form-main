const express = require("express")
var nodemailer = require('nodemailer');
const senderMail = "sushanth888fine@gmail.com";
const pass = "khqh djlq urii pvzm";
var otpStore = {};
function generate() {// generate a 6 digit random number
    var add = 1, max = 12 - add;

    max = Math.pow(10, 6+add);
    var min    = max/10;
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
    return ("" + number).substring(add); 
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: senderMail,
      pass: pass
    }
});
function sendmail(mailId) {
  otpStore[mailId] =  generate();
  var mailObject = {
      from: senderMail,
        to: mailId,
        subject: 'Sign Up OTP',
        text: 'OTP for the SignUp is ' + otpStore[mailId]
    };

    transporter.sendMail(mailObject, function(error, info){
        if (error) {
          console.log(error);
          return "recheck the mail id and provide correct one."
        } else {
          console.log('Email sent: ' + info.response + otpStore[mailId]);
          return "Account successfully created."
        }
    });
    return otpStore;
}


module.exports = sendmail;