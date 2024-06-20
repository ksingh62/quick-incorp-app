"use client";
import React, { useState, useEffect } from "react";
import "./settings.css";
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
};

export default Settings;
