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
  const [brightness, setBrightness] = useState(100);
  const [notificationPref, setNotificationPref] = useState("email");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [language, setLanguage] = useState("en");
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    // we can add more languages if needed
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
    const storedBrightness = localStorage.getItem("brightness") || 100;
    setBrightness(storedBrightness);
    const storedNotificationPref =
      localStorage.getItem("notificationPref") || "email";
    setNotificationPref(storedNotificationPref);
    const storedPaymentMethod =
      localStorage.getItem("paymentMethod") || "creditCard";
    setPaymentMethod(storedPaymentMethod);

    fetchTexts(language);
  }, [language]);

  const fetchTexts = async (lang) => {
    try {
      const response = await fetch(`/api/translate?language=${lang}`); // Fetch from API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch language texts");
      }
      const data = await response.json();
      setTexts(data); // Update texts state with fetched data
    } catch (error) {
      console.error("Error fetching language texts:", error);
      // Handle error fetching texts
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
  };

  const handleDarkModeChange = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.body.classList.toggle("dark-mode", newDarkMode);
    document.body.classList.toggle("light-mode", !newDarkMode);
  };

  const handleBrightnessChange = (e) => {
    const newBrightness = e.target.value;
    setBrightness(newBrightness);
    localStorage.setItem("brightness", newBrightness.toString());
    document.body.style.filter = `brightness(${newBrightness}%)`;
  };

  const handleNotificationChange = (e) => {
    setNotificationPref(e.target.value);
    localStorage.setItem("notificationPref", e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);
    localStorage.setItem("paymentMethod", selectedMethod);

    // Redirect based on payment method
    switch (selectedMethod) {
      case "creditCard":
      case "bankTransfer":
        // Redirect to Stripe or your payment processing page
        window.location.href = "https://stripe.com"; // Replace with your Stripe URL
        break;
      case "paypal":
        // Redirect to PayPal
        window.location.href = "https://www.paypal.com";
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
    document.body.style.filter = `brightness(${brightness}%)`;
  }, [darkMode, brightness]);

  return (
    <Layout>
      <div className={`settings-page ${darkMode ? "dark-mode" : "light-mode"}`}>
        <h2 className="text-3xl font-semibold mb-6">{texts.settings}</h2>

        <div className="settings-section">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <FaMoon className="mr-2" /> {texts.appearance}
          </h3>
          <label className="flex items-center cursor-pointer mb-4">
            <span className="mr-2">
              {darkMode ? texts.darkMode : texts.lightMode}
            </span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeChange}
              className="hidden"
            />
            <span
              className={`toggle-button ${
                darkMode ? "toggle-button-dark" : ""
              }`}
            ></span>
          </label>
          <label className="block mb-2 text-lg">
            {texts.brightness}Brightness
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={brightness}
            onChange={handleBrightnessChange}
            className="slider"
          />
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
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border rounded w-full"
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
//https://www.youtube.com/watch?v=JNA1VXuyIyc
//https://stackoverflow.com/questions/58542649/can-i-toggle-dark-mode-using-javascript
//https://www.youtube.com/watch?v=bSQ-QD1Iqi0
//https://sebhastian.com/handlechange-react/
