"use client";
import React, { useState, useEffect } from "react";
import "./settings.css";
import Layout from "@/components/Layout";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaEnvelope,
  FaMobileAlt,
  FaCreditCard,
  FaPaypal,
  FaUniversity,
} from "react-icons/fa";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationPref, setNotificationPref] = useState("email");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    const storedNotificationPref =
      localStorage.getItem("notificationPref") || "email";
    setNotificationPref(storedNotificationPref);
    const storedPaymentMethod =
      localStorage.getItem("paymentMethod") || "creditCard";
    setPaymentMethod(storedPaymentMethod);
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleNotificationChange = (event) => {
    setNotificationPref(event.target.value);
    localStorage.setItem("notificationPref", event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
    localStorage.setItem("paymentMethod", selectedMethod);

    if (selectedMethod === "creditCard") {
      window.location.href = "https://stripe.com";
    } else if (selectedMethod === "paypal") {
      window.location.href = "https://paypal.com";
    }
  };

  return (
    <Layout>
      <div
        className={`settings-container mx-auto ${darkMode ? "dark" : "light"}`}
      >
        <h2 className="text-4xl font-semibold mb-6">Settings</h2>

        <div className="settings-section">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaSun className="mr-2" /> Appearance
          </h3>
          <div className="settings-option flex items-center">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeToggle}
              className="mr-2"
            />
            <span className="text-lg">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaBell className="mr-2" /> Notifications
          </h3>
          <label className="block mb-2 text-lg">
            Notification Preferences:
          </label>
          <select
            value={notificationPref}
            onChange={handleNotificationChange}
            className="p-2 border rounded w-full"
          >
            <option value="email">Email</option>
            <option value="text">Text</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div className="settings-section">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCreditCard className="mr-2" /> Billing Payment
          </h3>
          <label className="block mb-2 text-lg">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="p-2 border rounded w-full"
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
