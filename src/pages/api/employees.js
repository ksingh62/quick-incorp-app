import { db } from "@/app/prototype/_utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, income, province } = req.body;
    try {
      const docRef = await addDoc(collection(db, "employees"), {
        name,
        income,
        province,
      });
      res.status(200).json({ id: docRef.id });
    } catch (e) {
      res.status(500).json({ error: "Failed to add employee" });
    }
  } else if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const employees = [];
      querySnapshot.forEach((doc) => {
        employees.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json(employees);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  }
}
