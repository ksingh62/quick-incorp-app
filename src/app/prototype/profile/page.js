"use client"
import { useState, useEffect } from "react";
import { db } from "@/app/prototype/_utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUserAuth } from "@/app/prototype/_utils/auth-context"; // Use the correct import path

const Profile = () => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No data available</div>;
  }

  return (
    <section className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="mt-4">
        <p><strong>First Name:</strong> {userData.firstName}</p>
        <p><strong>Last Name:</strong> {userData.lastName}</p>
        <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
        <p><strong>Corporation Name:</strong> {userData.corporationName}</p>
        <p><strong>Corporation Type:</strong> {userData.corpType}</p>
        <p><strong>Corporation Province:</strong> {userData.corpProvince}</p>
        <p><strong>Address:</strong> {userData.address}</p>
        <p><strong>City:</strong> {userData.city}</p>
        <p><strong>Province:</strong> {userData.province}</p>
        <p><strong>ZIP/Postal Code:</strong> {userData.postalCode}</p>
      </div>
    </section>
  );
};

export default Profile;
