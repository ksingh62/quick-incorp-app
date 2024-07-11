import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import os from "os";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, formData, applicationId, uploadedFiles } = req.body;

    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    const transporter = nodemailer.createTransport(mg(auth));

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

    try {
      // Send email to user
      const mailOptionsUser = {
        from: "no-reply@yourdomain.com",
        to: email,
        subject: `Tax Application Received - Application ID: ${applicationId}`,
        html: emailTemplate(
          "New Tax Application Received",
          `Dear ${email},<br><br>
          Thank you for submitting your tax application. Your application is currently being processed.<br><br>
          <strong>Application ID:</strong> ${applicationId}<br><br>
          We will notify you once your application has been reviewed.<br><br>
          Best regards,<br>
          The Team`
        ),
        messageId: `application-${applicationId}`,
      };

      await transporter.sendMail(mailOptionsUser);

      // Download files from Firebase Storage and attach them
      const attachments = await Promise.all(
        Object.entries(uploadedFiles).map(async ([key, url]) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to download file: ${url}`);
          }
          const buffer = await response.buffer();
          const fileName = key.split("/").pop();
          const tempPath = path.join(os.tmpdir(), fileName);
          fs.writeFileSync(tempPath, buffer);
          return {
            filename: fileName,
            path: tempPath,
          };
        })
      );

      const mailOptionsAccountant = {
        from: "no-reply@yourdomain.com",
        to: "quickincorp51@gmail.com",
        subject: `New Tax Application - Application ID: ${applicationId}`,
        html: emailTemplate(
          "New Tax Application",
          `A new tax application has been submitted with the following details:<br><br>
          <strong>Application ID:</strong> ${applicationId}<br><br>
          ${Object.entries(formData)
            .filter(([_, value]) => value)
            .map(([key, value]) => `<strong>${key}:</strong> ${value}<br>`)
            .join("")}<br>
          Please review the attached documents.`
        ),
        attachments,
      };

      await transporter.sendMail(mailOptionsAccountant);

      // Clean up temporary files
      attachments.forEach((attachment) => {
        fs.unlinkSync(attachment.path);
      });

      console.log("Emails sent successfully");
      res.status(200).json({
        message: "Emails sent successfully",
        applicationId,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({
        error: "Error sending email",
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
