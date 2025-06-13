const { exec } = require('child_process');

const sendMessage = (message) => {
  exec(`adb emu sms send ${message.phone} "${message.text}"`, (error, stdout) => {
    if(error) console.log('error = ', error);
    console.log('messageSent:: ', stdout);
    // console.log('COMMANDS EXECUTED IN COMMAND LINE')
  });
}

const messages = [
  { phone: "+1234567890", text: "Dear UPI user A/C X3837 debited by 10000.0 on date 01Mar25 trf to AMAZON IN Refno 212129048021. If not u? call 17329847246. -SBIN" },
  { phone: "+0987654321", text: "Your credit card XXXX-1234 has been charged Rs. 5,000 at AMAZON.IN on 12Jan25. If not you, call 18001234567 immediately. -HDFC" },
  // { phone: "+1122334455", text: "Rs. 2,000 credited to your account X1923 via UPI on 12Jan25. Ref No: 9876543210. -ICICI" },
  // { phone: "+1234567890", text: "Rs. 1,500 debited via ATM withdrawal from A/C X5678 on 12Jan25. Available balance: Rs. 20,000. -AXIS" },
  // { phone: "+0987654321", text: "Payment of Rs. 799 made for Swiggy order via UPI from A/C X7890 on 12Jan25. -PAYTM" },
  // { phone: "+1122334455", text: "Credit card XXXX-5678 charged Rs. 12,000 at Flipkart on 12Jan25. Call 18007654321 if not you. -SBI" },
  // { phone: "+1234567890", text: "Rs. 4,000 debited for electricity bill payment from A/C X2345 on 12Jan25. -PNB" },
  // { phone: "+0987654321", text: "Dear customer, Rs. 3,200 auto-debited from A/C X6789 for LIC premium on 12Jan25. -BOB" },
  // { phone: "+1122334455", text: "Rs. 9,500 spent at HP PETROL PUMP using credit card XXXX-4321 on 12Jan25. -HDFC" },
  // { phone: "+1234567890", text: "Dear UPI user, Rs. 550 transferred to @paytm from A/C X6543 on 12Jan25. Ref: 7654321098. -AXIS" }
];
messages.push({phone: "+1234567890", text: 'Rs.50.00 paid thru A/C XX2894 on 2-3-25 18:59:11 to MOHHAMAD GUFRAN, UPI Ref 283736837, If not done, SMS BLOCKUPI to 232787329,-Canara Bank'})
messages.push({phone: "+1234567890", text: 'Your a/c XX0413 is debited on 15/12/2020 by INR 3,211.50 towards purchase. Avl Bal: INR 5,603.54.'})
// Duplicate messages to reach 50 entries
for (let i = 0; i < 1; i++) {
  messages.push(messages[i % messages.length]);
}

messages.forEach(message => sendMessage(message));

// keystore pass = smartspend
