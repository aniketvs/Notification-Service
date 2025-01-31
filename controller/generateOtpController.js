const twilio = require("twilio");
const { getClient, initRedis } = require('../config/redisConfig');

exports.generateOtp = async (req, res) => {
    const twilioClient = twilio("AC7c78252cc2ba618ffb44d576cc9d501f", "76d0601b7236b7b56faa1579a81c1532");
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ error: "Phone number is required" });

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
        //     from: "+12314686748",
        //     to: phone,
        // });
        console.log(otp);

        res.json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error('Error setting OTP in Redis or sending SMS', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        const client = getClient();
        if (client && client.isOpen) {
            client.quit();
        }
    }
};