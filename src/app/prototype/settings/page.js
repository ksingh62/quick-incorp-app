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
  FaGlobe,
} from "react-icons/fa";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationPref, setNotificationPref] = useState("email");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [language, setLanguage] = useState("en");
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    // Add more languages as needed
  ]);
  const [texts, setTexts] = useState({
    settings: "Settings",
    appearance: "Appearance",
    notifications: "Notifications",
    billingPayment: "Billing Payment",
    language: "Language",
    notificationPref: "Notification Preferences",
    paymentMethod: "Payment Method",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    email: "Email",
    text: "Text",
    both: "Both",
    creditCard: "Credit Card",
    paypal: "PayPal",
    bankTransfer: "Bank Transfer",
  });

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    const storedNotificationPref =
      localStorage.getItem("notificationPref") || "email";
    setNotificationPref(storedNotificationPref);
    const storedPaymentMethod =
      localStorage.getItem("paymentMethod") || "creditCard";
    setPaymentMethod(storedPaymentMethod);

    fetchTexts("en");
  }, []);

  const fetchTexts = async (language) => {
    if (language === "en") {
      setTexts({
        settings: "Settings",
        appearance: "Appearance",
        notifications: "Notifications",
        billingPayment: "Billing Payment",
        language: "Language",
        notificationPref: "Notification Preferences",
        paymentMethod: "Payment Method",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        email: "Email",
        text: "Text",
        both: "Both",
        creditCard: "Credit Card",
        paypal: "PayPal",
        bankTransfer: "Bank Transfer",
      });
      return;
    }

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        body: JSON.stringify({
          texts: [
            "Settings",
            "Appearance",
            "Notifications",
            "Billing Payment",
            "Language",
            "Notification Preferences",
            "Payment Method",
            "Dark Mode",
            "Light Mode",
            "Email",
            "Text",
            "Both",
            "Credit Card",
            "PayPal",
            "Bank Transfer",
          ],
          targetLanguage: language,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setTexts({
        settings: data.translations[0],
        appearance: data.translations[1],
        notifications: data.translations[2],
        billingPayment: data.translations[3],
        language: data.translations[4],
        notificationPref: data.translations[5],
        paymentMethod: data.translations[6],
        darkMode: data.translations[7],
        lightMode: data.translations[8],
        email: data.translations[9],
        text: data.translations[10],
        both: data.translations[11],
        creditCard: data.translations[12],
        paypal: data.translations[13],
        bankTransfer: data.translations[14],
      });
    } catch (error) {
      console.error("Error fetching texts:", error);
    }
  };

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

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    fetchTexts(selectedLanguage);
  };

  return (
    <Layout>
      <div
        className={`settings-container mx-auto ${darkMode ? "dark" : "light"}`}
      >
        <h2 className="text-4xl font-semibold mb-6">{texts.settings}</h2>

        <div className="settings-section">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaSun className="mr-2" /> {texts.appearance}
          </h3>
          <div className="settings-option flex items-center">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeToggle}
              className="mr-2"
            />
            <span className="text-lg">
              {darkMode ? texts.darkMode : texts.lightMode}
            </span>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaBell className="mr-2" /> {texts.notifications}
          </h3>
          <label className="block mb-2 text-lg">
            {texts.notificationPref}:
          </label>
          <select
            value={notificationPref}
            onChange={handleNotificationChange}
            className="p-2 border rounded w-full"
          >
            <option value="email">{texts.email}</option>
            <option value="text">{texts.text}</option>
            <option value="both">{texts.both}</option>
          </select>
        </div>

        <div className="settings-section">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCreditCard className="mr-2" /> {texts.billingPayment}
          </h3>
          <label className="block mb-2 text-lg">{texts.paymentMethod}:</label>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="p-2 border rounded w-full"
          >
            <option value="creditCard">{texts.creditCard}</option>
            <option value="paypal">{texts.paypal}</option>
            <option value="bankTransfer">{texts.bankTransfer}</option>
          </select>
        </div>

        <div className="settings-section">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaGlobe className="mr-2" /> {texts.language}
          </h3>
          <label className="block mb-2 text-lg">{texts.language}:</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border rounded w-full"
            size="5"
          >
            {availableLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
