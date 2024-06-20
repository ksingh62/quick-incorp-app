"use client";
import React, { useState, useEffect } from "react";
import "./settings.css";
import "./global.css";
import Layout from "@/components/Layout";
import { FaMoon, FaSun, FaBell, FaEnvelope, FaMobileAlt } from "react-icons/fa";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationPref, setNotificationPref] = useState("email");

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle("dark", storedDarkMode);
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleNotificationChange = (event) => {
    setNotificationPref(event.target.value);
    localStorage.setItem("notificationPref", event.target.value);
  };

  return (
    <Layout>
      <div className="settings-container mx-auto">
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
      </div>
    </Layout>
  );
};

export default Settings;
