const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "auth-service",
    brokers: ["localhost:9092"],
});

module.exports = kafka;

  