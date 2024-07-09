import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import { db } from "@/app/prototype/_utils/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, text, userEmail, parentEmailId } = req.body;

    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    const transporter = nodemailer.createTransport(mg(auth));

    const storeSentEmail = async (emailData) => {
      try {
        await setDoc(doc(db, "emails", emailData.messageId), emailData);
        await updateDoc(doc(db, "emails", parentEmailId), {
          replies: emailData.messageId,
        });
      } catch (error) {
        console.error("Error storing email:", error);
      }
    };

    try {
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

      const mailOptions = {
        from: "no-reply@yourdomain.com",
        to: to,
        subject: subject,
        html: emailTemplate(subject, text),
        messageId: `reply-${Date.now()}`, // Generate a unique ID for the reply
      };

      await transporter.sendMail(mailOptions);

      const cleanHtml = (htmlContent) => {
        return htmlContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
      };

      mailOptions.html = cleanHtml(mailOptions.html);

      await storeSentEmail({
        to: to,
        from: "no-reply@yourdomain.com",
        subject: mailOptions.subject,
        html: mailOptions.html,
        timestamp: new Date(),
        messageId: mailOptions.messageId,
        parentEmailId: parentEmailId,
      });

      console.log("Reply email sent and stored successfully");
      res
        .status(200)
        .json({ message: "Reply email sent and stored successfully" });
    } catch (error) {
      console.error("Error sending reply email:", error);
      res
        .status(500)
        .json({ error: "Error sending reply email", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
