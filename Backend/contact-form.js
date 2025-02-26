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
