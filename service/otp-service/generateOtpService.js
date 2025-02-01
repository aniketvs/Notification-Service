const twilio = require("twilio");
const { getClient, initRedis } = require('../../config/redisConfig');
require("dotenv").config();
exports.genrateOtpService = async (data) => {
    const phone = data;
    // const twilioClient = twilio(process.env.TWILLIO_ACCOUNT_SID, process.env.TWILLIO_AUTH_TOKEN);
    if (!phone) {
        console.log("Invalid phone number");
        return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    try {
        let client = getClient();
        if (!client || !client.isOpen) {
            await initRedis();
            client = getClient();
        }

        // Ensure the arguments passed to setEx are correct
        await client.setEx(`otp:${phone}`, 300, otp.toString());
        // Send OTP via SMS

        // await twilioClient.messages.create({
        //     body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        //     from: process.env.TWILLIO_PHONE_NUMBER,
        //     to: phone,
        // });
        console.log(otp);

        console.log({ message: "OTP sent successfully" });
    } catch (err) {
        console.error('Error setting OTP in Redis or sending SMS', err);
        return;
    } finally {
        const client = getClient();
        if (client && client.isOpen) {
            client.quit();
        }
    }
};