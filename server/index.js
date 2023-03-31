const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

// Load the dotenv configuration
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = require('twilio')(accountSid, authToken);

const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const app = express();
const PORT = process.env.PORT || 8080;

// Use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
//Twilio SMS notification
app.post('./', (req,res) => {
  const {message, user: sender, type, members} = req.body;
  if(type == 'message.new') {
    //filters allow us to not send notifications/ messages to ourselves
    members
    .filter((member)=> member.user_id !== sender.id)
    .forEach( ({member}) => {
      if(!user.online) {
        twilioClient.messages.create({
          body: `You have a new message from ${message.user.fullName} - ${message.text}`,
          messagingServiceSid: messagingServiceSid,
          to: user.phoneNumber
        })
          .then(() => console.log('Message sent!'))
          .catch((error) => console.log(error));
      }
    });
    return res.status(200).send('Message sent!');
  }
  return res.status(200).send('Not a new message request. It could be a message that is already read or user is online. ');
})
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
