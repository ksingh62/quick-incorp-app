import { db } from "@/app/prototype/_utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({ error: "User email is required" });
  }

  try {
    const emailsRef = collection(db, "emails");
    const q = query(
      emailsRef,
      where("to", "==", userEmail),
      where("read", "==", false)
    );
    const querySnapshot = await getDocs(q);

    const unreadCount = querySnapshot.size;
    res.status(200).json({ unreadCount });
  } catch (error) {
    console.error("Error fetching unread email count:", error);
    res.status(500).json({ error: "Error fetching unread email count" });
  }
}
