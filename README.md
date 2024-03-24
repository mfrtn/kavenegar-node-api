# Kavenegar Node.js API Module

A zero-dependency TypeScript/JavaScript module for interacting with the Kavenegar API, allowing you to send SMS messages, manage message status, and perform other actions.

## Installation

```bash
npm install --save kavenegar-api
```

## Usage

### Initialization

Replace 'YOUR_API_KEY' with your actual API key.

```typescript
import { KavenegarApi } from 'kavenegar-api';
// OR
const { KavenegarApi } = require('kavenegar-api');

// Initialize the Kavenegar API with your API key
const apiKey = 'YOUR_API_KEY' || 0 // set apiKey to zero just for test connection;
const kavenegar = new KavenegarApi({ apiKey });
```

### Get Current Date for testing connection

```typescript
async function testConnection() {
    const date = await kavenegar.getDate();
    console.log('Connection successful. Current date:', date.datetime);
}
```

### Send a Single SMS

```typescript
async function sendSingleSMS() {
    const message = 'Hello, world!';
    const receptor = 'RECIPIENT_NUMBER';
    const result = await kavenegar.send({ message, receptor });
    console.log('Single SMS sent:', result);
}
```

### Send Multiple SMS Messages

```typescript
async function sendMultipleSMS() {
    const messages = ['Hello', 'Hi', 'Hey'];
    const receptors = ['RECIPIENT_1', 'RECIPIENT_2', 'RECIPIENT_3'];
    const senders = ['SENDER_1', 'SENDER_2', 'SENDER_3'];
    const result = await kavenegar.sendArray({ message: messages, receptor: receptors, sender: senders });
    console.log('Multiple SMS sent:', result);
}
```

### Verify a Phone Number with a Token

```typescript
async function verifyPhoneNumber() {
    const receptor = 'RECIPIENT_NUMBER';
    const token = '123456';
    const template = 'TEMPLATE_NAME';
    const result = await kavenegar.verifyLookup({ receptor, token, template });
    console.log('Verification result:', result);
}
```

### Check SMS Status

```typescript
async function checkSMSStatus() {
    const messageIds = [1234567890, 9876543210]; // Replace with actual message IDs
    const status = await kavenegar.status({ messageid: messageIds });
    console.log('SMS Status:', status);
}
```

### Cancel SMS Sending

```typescript
async function cancelSMSSending() {
    const messageId = 1234567890; // Replace with actual message ID
    const result = await kavenegar.cancel({ messageid: messageId });
    console.log('SMS Cancelled:', result);
}
```

### Receive SMS

```typescript
async function receiveSMS() {
    const lineNumber = 'YOUR_LINE_NUMBER'; // Replace with actual line number
    const isRead = 0; // 0 for unread, 1 for read
    const receivedMessages = await kavenegar.receive({ lineNumber, isRead });
    console.log('Received SMS:', receivedMessages);
}
```

### Retrieve Account Information

```typescript
async function getAccountInfo() {
    const accountInfo = await kavenegar.accountInfo();
    console.log('Account Information:', accountInfo);
}
```

### Configure Account Settings

```typescript
async function configureAccount() {
    const accountConfigs = {
        apilogs: 'enabled',
        dailyreport: 'disabled',
        debugmode: 'enabled',
        defaultsender: 'YOUR_SENDER_ID',
        mincreditalarm: 100,
        resendfailed: 'enabled'
    };
    const configuredSettings = await kavenegar.accountConfig(accountConfigs);
    console.log('Account Settings Configured:', configuredSettings);
}
```

### Make Text-to-Speech Call

```typescript
async function makeTTS() {
    const receptor = 'RECIPIENT_NUMBER';
    const message = 'Hello, this is a text-to-speech message.';
    const result = await kavenegar.callMakeTTS({ receptor, message });
    console.log('Text-to-Speech Call result:', result);
}
```

### Other functions you can use

- **statusLocalMessageId**
- **select**
- **selectOutbox**
- **latestOutbox**
- **countInbox**
- **countOutbox**

Feel free to customize and expand these examples according to your needs!

This README provides clear instructions on how to use the Kavenegar API module and includes examples for some of its functions.

For more information, visit the [Kavenegar official website](https://kavenegar.com/rest.html).
