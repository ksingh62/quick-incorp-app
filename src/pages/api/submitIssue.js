import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import { db } from "@/app/prototype/_utils/firebase";
import { doc, runTransaction, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { subject, description, user } = req.body;

    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    const transporter = nodemailer.createTransport(mg(auth));

    // Function to get the next ticket number using Firestore transaction
    async function getNextTicketNumber() {
      const counterRef = doc(db, "counters", "tickets");

      try {
        const newTicketNumber = await runTransaction(
          db,
          async (transaction) => {
            const counterDoc = await transaction.get(counterRef);

            if (!counterDoc.exists()) {
              throw new Error("Counter document does not exist!");
            }

            const newCount = counterDoc.data().current + 1;
            transaction.update(counterRef, { current: newCount });

            return newCount;
          }
        );

        return newTicketNumber;
      } catch (error) {
        console.error("Error getting next ticket number:", error);
        throw error;
      }
    }

    try {
      const ticketNumber = await getNextTicketNumber();

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

      const mailOptionsAdmin = {
        from: "no-reply@yourdomain.com",
        to: "quickincorp51@gmail.com", // Replace with the admin email address
        subject: `New Support Issue from ${user.email}: ${subject} (Ticket #${ticketNumber})`,
        html: emailTemplate(
          "New Support Issue",
          `A new support issue has been submitted with the following details:<br><br>
          <strong>User:</strong> ${user.email}<br>
          <strong>Subject:</strong> ${subject}<br>
          <strong>Description:</strong>
          ${description}<br><br>
          <strong>Ticket Number:</strong> ${ticketNumber}`
        ),
      };

      const mailOptionsUser = {
        from: "no-reply@yourdomain.com",
        to: user.email,
        subject: `Support Issue Received (Ticket #${ticketNumber})`,
        html: emailTemplate(
          "Support Issue Received",
          `Dear ${user.email},<br><br>
          Thank you for submitting your support issue. Your issue is currently being processed.<br><br>
          <strong>Ticket Number:</strong> ${ticketNumber}<br><br>
          We will notify you once your issue has been reviewed.<br><br>
          Best regards,<br>
          The Support Team`
        ),
      };

      await transporter.sendMail(mailOptionsAdmin);
      await transporter.sendMail(mailOptionsUser);

      // Store the ticket information in Firestore
      await setDoc(doc(db, "tickets", `${ticketNumber}`), {
        subject,
        description,
        user: user.email,
        ticketNumber,
        timestamp: new Date(),
      });

      console.log("Emails sent and ticket stored successfully");
      res.status(200).json({
        message: "Emails sent and ticket stored successfully",
        ticketNumber,
      });
    } catch (error) {
      console.error("Error sending emails or storing ticket:", error);
      res.status(500).json({
        error: "Error sending emails or storing ticket",
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
