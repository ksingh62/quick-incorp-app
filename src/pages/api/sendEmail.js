import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, phoneNumber, corporationName, corpType, corpProvince, address, city, province, postalCode } = req.body;

    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    const transporter = nodemailer.createTransport(mg(auth));

    const mailOptions = {
      from: 'no-reply@yourdomain.com',  // Replace with your Mailgun verified sender email
      to: 'kapilmeetbaath@gmail.com',
      subject: 'New Business Registration',
      text: `A new business registration has been submitted with the following details:
      
      Personal Information:
      First Name: ${firstName}
      Last Name: ${lastName}
      Phone Number: ${phoneNumber}

      Corporation Details:
      Corporation Name: ${corporationName}
      Corporation Type: ${corpType}
      Corporation Province: ${corpProvince}

      Business Address:
      Address: ${address}
      City: ${city}
      Province: ${province}
      Postal Code: ${postalCode}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: 'Error sending email', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
