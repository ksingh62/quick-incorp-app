const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

admin.initializeApp();

const db = admin.firestore();

const auth = {
  auth: {
    api_key: functions.config().mailgun.api_key,
    domain: functions.config().mailgun.domain,
  },
};

const transporter = nodemailer.createTransport(mg(auth));

const sendWeeklyEmails = async () => {
  try {
    const advisorsSnapshot = await db.collection("advisors").get();
    const advisors = advisorsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    for (const advisor of advisors) {
      if (!advisor.id) {
        console.error(
            `Advisor ID is missing for advisor: ${JSON.stringify(advisor)}`,
        );
        continue;
      }

      const {name, email, impressions, calendlyClicks} = advisor;

      if (!email) {
        console.error(
            `Email is missing for advisor: ${JSON.stringify(advisor)}`,
        );
        continue;
      }

      const emailTemplate = `
        <p>Hi ${name},</p>
        <p>Here are your weekly insights:</p>
        <ul>
          <li>Impressions: ${impressions}</li>
          <li>Calendly Clicks: ${calendlyClicks}</li>
        </ul>
      `;

      const mailOptions = {
        from: "no-reply@yourdomain.com",
        to: email,
        subject: `Weekly Advisor Insights for ${advisor.name}`,
        html: emailTemplate,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${name} (${email})`);

        await db.collection("advisors").doc(advisor.id).update({
          impressions: 0,
          calendlyClicks: 0,
        });
      } catch (error) {
        console.error(
            `Failed to send email or update Firestore for advisor: 
            ${JSON.stringify(advisor)}. Error: ${error.message}`,
        );
      }
    }
  } catch (error) {
    console.error("Error sending weekly emails:", error);
    throw error;
  }
};

// Cloud Function to send weekly emails
exports.scheduledSendWeeklyEmails = functions.pubsub
    .schedule("every sunday 00:00")
    .onRun(sendWeeklyEmails);

// HTTP Trigger to test the function
exports.triggerWeeklyEmails = functions.https.onRequest(async (req, res) => {
  try {
    await sendWeeklyEmails();
    res.send("Weekly emails sent successfully.");
  } catch (error) {
    res.status(500).send("Error sending weekly emails: " + error.message);
  }
});

// https://us-central1-quickincorp-101de.cloudfunctions.net/triggerWeeklyEmails

// https://www.youtube.com/watch?v=iuGPFbLlKYQ
// https://firebase.google.com/docs/functions
// https://www.youtube.com/watch?v=CFns6KByT1Y
