import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/app/prototype/_utils/firebase";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      corporationName,
      corpType,
      corpProvince,
      address,
      city,
      province,
      postalCode,
    } = req.body;

    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    const transporter = nodemailer.createTransport(mg(auth));
    const applicationId = await getNextApplicationId();
    const messageId = uuidv4(); // Generate unique ID for email

    const emailTemplate = (subject, content) => `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          .container {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #007bff;
          }
          p {
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>${subject}</h2>
          <p>${content}</p>
        </div>
      </body>
      </html>
    `;

    const mailOptionsLawyer = {
      from: "no-reply@yourdomain.com",
      to: "quickincorp51@gmail.com",
      subject: `New Business Registration - Application ID: ${applicationId}`,
      html: emailTemplate(
        "New Business Registration",
        `A new business registration has been submitted with the following details:<br><br>
        <strong>Personal Information:</strong><br>
        First Name: ${firstName}<br>
        Last Name: ${lastName}<br>
        Phone Number: ${phoneNumber}<br><br>
        <strong>Corporation Details:</strong><br>
        Corporation Name: ${corporationName}<br>
        Corporation Type: ${corpType}<br>
        Corporation Province: ${corpProvince}<br><br>
        <strong>Business Address:</strong><br>
        Address: ${address}<br>
        City: ${city}<br>
        Province: ${province}<br>
        Postal Code: ${postalCode}<br><br>
        Application ID: ${applicationId}`
      ),
      messageId,
    };

    const mailOptionsUser = {
      from: "no-reply@yourdomain.com",
      to: email,
      subject: `Application Received - Application ID: ${applicationId}`,
      html: emailTemplate(
        "Application Received",
        `Dear ${firstName} ${lastName},<br><br>
        Thank you for submitting your business registration application. Your application is currently being processed.<br><br>
        <strong>Application ID:</strong> ${applicationId}<br><br>
        We will notify you once your application has been reviewed.<br><br>
        Best regards,<br>
        The Team`
      ),
      messageId,
    };

    try {
      await transporter.sendMail(mailOptionsLawyer);
      await transporter.sendMail(mailOptionsUser);
      await storeSentEmail(mailOptionsLawyer);
      await storeSentEmail(mailOptionsUser);
      console.log("Emails sent successfully");
      res
        .status(200)
        .json({ message: "Emails sent successfully", applicationId });
    } catch (error) {
      console.error("Error sending emails:", error);
      res
        .status(500)
        .json({ error: "Error sending emails", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
