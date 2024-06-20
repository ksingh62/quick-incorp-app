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
    brightness: "Brightness",
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
        brightness: "Brightness",
        email: "Email",
        text: "Text",
        both: "Both",
        creditCard: "Credit Card",
        paypal: "PayPal",
        bankTransfer: "Bank Transfer",
      });
    } else if (language === "es") {
      setTexts({
        settings: "Configuración",
        appearance: "Apariencia",
        notifications: "Notificaciones",
        billingPayment: "Pago de Facturación",
        language: "Idioma",
        notificationPref: "Preferencias de Notificación",
        paymentMethod: "Método de Pago",
        darkMode: "Modo Oscuro",
        lightMode: "Modo Claro",
        brightness: "Brillo",
        email: "Correo Electrónico",
        text: "Texto",
        both: "Ambos",
        creditCard: "Tarjeta de Crédito",
        paypal: "PayPal",
        bankTransfer: "Transferencia Bancaria",
      });
    } else if (language === "fr") {
      setTexts({
        settings: "Paramètres",
        appearance: "Apparence",
        notifications: "Notifications",
        billingPayment: "Paiement de Facturation",
        language: "Langue",
        notificationPref: "Préférences de Notification",
        paymentMethod: "Méthode de Paiement",
        darkMode: "Mode Sombre",
        lightMode: "Mode Clair",
        brightness: "Luminosité",
        email: "Email",
        text: "Texte",
        both: "Les Deux",
        creditCard: "Carte de Crédit",
        paypal: "PayPal",
        bankTransfer: "Virement Bancaire",
      });
    } else if (language === "de") {
      setTexts({
        settings: "Einstellungen",
        appearance: "Aussehen",
        notifications: "Benachrichtigungen",
        billingPayment: "Abrechnungszahlung",
        language: "Sprache",
        notificationPref: "Benachrichtigungseinstellungen",
        paymentMethod: "Zahlungsmethode",
        darkMode: "Dunkelmodus",
        lightMode: "Lichtmodus",
        brightness: "Helligkeit",
        email: "Email",
        text: "Text",
        both: "Beide",
        creditCard: "Kreditkarte",
        paypal: "PayPal",
        bankTransfer: "Banküberweisung",
      });
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    fetchTexts(selectedLanguage);
  };

  const handleDarkModeChange = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
    document.body.classList.toggle("light-mode", !newDarkMode);
  };

  const handleBrightnessChange = (e) => {
    const newBrightness = e.target.value;
    setBrightness(newBrightness);
    localStorage.setItem("brightness", newBrightness);
    document.body.style.filter = `brightness(${newBrightness}%)`;
  };

  const handleNotificationChange = (e) => {
    setNotificationPref(e.target.value);
    localStorage.setItem("notificationPref", e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    localStorage.setItem("paymentMethod", e.target.value);
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
          <label className="block mb-2 text-lg">{texts.brightness}:</label>
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
          <label className="block mb-2 text-lg">{texts.language}:</label>
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
