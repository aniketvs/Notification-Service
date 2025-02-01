const runGenerateOtpConsumer=require('../service/otp-service/generateOtpConsumer');

const startConsumers = async () => {
  try {
    await runGenerateOtpConsumer();
    console.log("✅ Kafka Consumers started successfully");
  } catch (err) {
    console.error("❌ Failed to start consumers:", err);
    process.exit(1);
  }
};

module.exports = startConsumers;
