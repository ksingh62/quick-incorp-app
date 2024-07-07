import React, { useState, useEffect } from "react";
import { useUserAuth } from "@/app/prototype/_utils/auth-context";
import { db } from "@/app/prototype/_utils/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";

const Inbox = () => {
  const { user } = useUserAuth();
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "emails"), where("to", "==", user.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const emailsData = [];
        querySnapshot.forEach((doc) => {
          emailsData.push({ id: doc.id, ...doc.data() });
        });
        setEmails(emailsData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleEmailClick = async (email) => {
    setSelectedEmail(email);
    if (!email.read) {
      try {
        await axios.post("/api/markEmailAsRead", {
          messageId: email.messageId,
        });
        // Update the read status locally for instant UI update
        const updatedEmails = emails.map((e) =>
          e.id === email.id ? { ...e, read: true } : e
        );
        setEmails(updatedEmails);
      } catch (error) {
        console.error("Failed to mark email as read", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-2xl text-white">Inbox</h2>
        <ul>
          {emails.map((email) => (
            <li
              key={email.id}
              className={`p-2 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
                !email.read ? "font-bold" : ""
              }`}
              onClick={() => handleEmailClick(email)}
            >
              <h3 className="text-lg text-white">{email.subject}</h3>
              <p className="text-gray-400">{email.from}</p>
              {!email.read && <span className="text-red-500">●</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 bg-gray-900 p-4 overflow-y-auto">
        {selectedEmail ? (
          <div>
            <h2 className="text-2xl text-white">{selectedEmail.subject}</h2>
            <p className="text-gray-400">{selectedEmail.from}</p>
            <div
              className="mt-4 text-white"
              dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
            ></div>
            <ReplyForm
              to={selectedEmail.from}
              subject={`Re: ${selectedEmail.subject}`}
              parentEmail={selectedEmail}
            />
          </div>
        ) : (
          <p className="text-gray-400">Select an email to read</p>
        )}
      </div>
    </div>
  );
};

const ReplyForm = ({ to, subject, parentEmail }) => {
  const [message, setMessage] = useState("");
  const { user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/sendReply", {
        to,
        subject,
        text: message,
        userEmail: user.email,
        parentEmailId: parentEmail.id,
      });
      alert("Reply sent");
      setMessage(""); // Clear the message after sending
    } catch (error) {
      console.error("Failed to send reply", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your reply..."
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded mt-2"
      >
        Send Reply
      </button>
    </form>
  );
};

export default Inbox;
