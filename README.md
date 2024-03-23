# Kavenegar Node.js API Module

A zero-dependency TypeScript/JavaScript module for interacting with the Kavenegar API, allowing you to send SMS messages, manage message status, and perform other actions.

## Installation

npm install kavenegar-api

## Usage

### Examples

Replace 'YOUR_API_KEY', 'SENDER_NUMBER', and 'RECIPIENT_NUMBER' with your actual values.

```typescript
import { KavenegarApi, KavenegarConfigs } from 'kavenegar-api';
// Or
const { KavenegarApi } = require('kavenegar-api');

// Initialize the Kavenegar API with your API key
const apiKey = 'YOUR_API_KEY';

// Or use 0 as apiKey just for test connection
// const apiKey = 0;

const kavenegar = new KavenegarApi({ apiKey });

// Example: Get the current date (used for testing connection)
async function testConnection() {
    const date = await kavenegar.getDate();
    console.log('Connection successful. Current date:', date.datetime);
}

// Example: Send a single SMS
async function sendSingleSMS() {
    const message = 'Hello, world!';
    const receptor = 'RECIPIENT_NUMBER';
    const result = await kavenegar.send({ message, receptor });
    console.log('Single SMS sent:', result);
}

// Example: Send multiple SMS messages at once
async function sendMultipleSMS() {
    const messages = ['Hello', 'Hi', 'Hey'];
    const receptors = ['RECIPIENT_1', 'RECIPIENT_2', 'RECIPIENT_3'];
    const senders = ['SENDER_1', 'SENDER_2', 'SENDER_3'];
    const result = await kavenegar.sendArray({ message: messages, receptor: receptors, sender: senders });
    console.log('Multiple SMS sent:', result);
}

// Example: Verify a phone number with a token
async function verifyPhoneNumber() {
    const receptor = 'RECIPIENT_NUMBER';
    const token = '123456';
    const template = 'TEMPLATE_NAME';
    const result = await kavenegar.verifyLookup({ receptor, token, template });
    console.log('Verification result:', result);
}

// Call functions as needed
testConnection();
sendSingleSMS();
sendMultipleSMS();
verifyPhoneNumber();
```
