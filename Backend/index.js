/*
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const ses = new AWS.SES();

exports.handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body);

        const params = {
            Destination: { ToAddresses: ["tallen812victor@gmail.com"] },
            Message: {
                Body: { Text: { Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` }},
                Subject: { Data: "New Contact Form Submission" }
            },
            Source: "vallen4936@sdsu.edu"
        };

        await ses.sendEmail(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully!" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error sending email", error: error.message })
        };
    }
};

*/
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient(); 
const {v4: uuidv4} = require('uuid');

exports.handler = async (event) => {
  try {
    console.log('Raw input data:', event); // Add this line to log the raw input data

    const formData = {
      name: event.name,
      email: event.email,
      message: event.message,
    };

    const item = {
      SubmissionId: generateUUID(), // Generate a UUID
      ...formData, // Use the form data as attributes
    };

    // Store the form data in DynamoDB
    await storeFormData(item);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error submitting the form' }),
    };
  }
};

async function storeFormData(item) {
  const params = {
    TableName: 'FormSubmissions', // Replace with your DynamoDB table name
    Item: item,
  };

  await dynamodb.put(params).promise();
}

function generateUUID() {
  return uuidv4();
}
