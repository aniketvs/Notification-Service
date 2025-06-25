const kafka = require('../../config/kafka');
const { genrateOtpService } = require('./generateOtpService');
// const { getClient, initRedis } = require('../config/redisConfig');

const runGenerateOtpConsumer = async () => {
  console.log("Starting OTP Consumer...");

  const consumer = kafka.consumer({ groupId: 'notification-group' });

  try {
    await consumer.connect();

    // Subscribe to the topic
    await consumer.subscribe({ topic: 'generate_otp', fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const userData = JSON.parse(message.value.toString());
          console.log("📩 Received OTP request for:", userData.number);

          // Call the OTP generation service
          await genrateOtpService(userData.number);
          await consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (parseInt(message.offset) + 1).toString(),
            },
          ]);


          console.log(`✅ OTP successfully processed for ${userData.number}`);
        } catch (err) {
          console.error("❌ Error processing OTP message:", err);
        }
      },
    });
  } catch (err) {
    console.error("❌ Failed to start consumer:", err);
    // Optionally add a retry mechanism or graceful shutdown
  }
};

module.exports = runGenerateOtpConsumer;
