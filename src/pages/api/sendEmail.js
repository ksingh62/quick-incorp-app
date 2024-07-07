// sendEmail.js
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import { db } from "@/app/prototype/_utils/firebase";
import { doc, runTransaction, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { subject, description, userEmail, replyTo } = req.body;

    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    const transporter = nodemailer.createTransport(mg(auth));

    async function getNextApplicationId() {
      const counterRef = doc(db, "counters", "applications");
      try {
        const newApplicationId = await runTransaction(
          db,
          async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            if (!counterDoc.exists()) {
              await transaction.set(counterRef, { current: 0 }); // Initialize if it doesn't exist
              throw new Error(
                "Counter document did not exist, so it was initialized. Please try again."
              );
            }
            const newCount = counterDoc.data().current + 1;
            transaction.update(counterRef, { current: newCount });
            return newCount;
          }
        );
        return newApplicationId;
      } catch (error) {
        console.error("Error getting next application ID:", error);
        throw error;
      }
    }

    const storeSentEmail = async (emailData) => {
      try {
        await setDoc(doc(db, "emails", emailData.messageId), {
          ...emailData,
          read: false, // Set read flag to false
        });
      } catch (error) {
        console.error("Error storing email:", error);
      }
    };

    try {
      const applicationId = await getNextApplicationId();

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

      const mailOptionsUser = {
        from: "no-reply@yourdomain.com",
        to: userEmail,
        subject: `Application Received - Application ID: ${applicationId}`,
        html: emailTemplate(
          "Application Received",
          `Dear ${userEmail},<br><br>
          Thank you for submitting your application. Your application is currently being processed.<br><br>
          <strong>Application ID:</strong> ${applicationId}<br><br>
          We will notify you once your application has been reviewed.<br><br>
          Best regards,<br>
          The Team`
        ),
        messageId: `application-${applicationId}`,
      };

      if (replyTo) {
        mailOptionsUser.replyTo = replyTo;
      }

      await transporter.sendMail(mailOptionsUser);

      const cleanHtml = (htmlContent) => {
        return htmlContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
      };

      mailOptionsUser.html = cleanHtml(mailOptionsUser.html);

      await storeSentEmail({
        to: userEmail,
        from: "no-reply@yourdomain.com",
        subject: mailOptionsUser.subject,
        html: mailOptionsUser.html,
        timestamp: new Date(),
        messageId: mailOptionsUser.messageId,
        read: false, // Set read flag to false
      });

      console.log("Email sent and stored successfully");
      res
        .status(200)
        .json({ message: "Email sent and stored successfully", applicationId });
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ error: "Error sending email", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
