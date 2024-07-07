import { db } from "@/app/prototype/_utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userEmail } = req.query;
    try {
      const q = query(collection(db, "emails"), where("to", "==", userEmail));
      const querySnapshot = await getDocs(q);
      const emails = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      res
        .status(500)
        .json({ error: "Error fetching emails", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
