import { db } from "@/app/prototype/_utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { messageId } = req.body;

    try {
      const emailRef = doc(db, "emails", messageId);
      await updateDoc(emailRef, {
        read: true,
      });

      res.status(200).json({ message: "Email marked as read" });
    } catch (error) {
      console.error("Error marking email as read:", error);
      res.status(500).json({ error: "Error marking email as read" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
