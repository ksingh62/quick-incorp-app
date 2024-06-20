// pages/api/translate.js

export default function handler(req, res) {
  const { language } = req.query;

  const translations = {
    en: {
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
    },
    es: {
      settings: "Configuración",
      appearance: "Apariencia",
      notifications: "Notificaciones",
      billingPayment: "Pago de Facturación",
      language: "Idioma",
      notificationPref: "Preferencias de Notificación",
      paymentMethod: "Método de Pago",
      darkMode: "Modo Oscuro",
      lightMode: "Modo Claro",
      email: "Correo Electrónico",
      text: "Texto",
      both: "Ambos",
      creditCard: "Tarjeta de Crédito",
      paypal: "PayPal",
      bankTransfer: "Transferencia Bancaria",
    },
    fr: {
      settings: "Paramètres",
      appearance: "Apparence",
      notifications: "Notifications",
      billingPayment: "Paiement de Facturation",
      language: "Langue",
      notificationPref: "Préférences de Notification",
      paymentMethod: "Méthode de Paiement",
      darkMode: "Mode Sombre",
      lightMode: "Mode Clair",
      email: "Email",
      text: "Texte",
      both: "Les Deux",
      creditCard: "Carte de Crédit",
      paypal: "PayPal",
      bankTransfer: "Virement Bancaire",
    },
    de: {
      settings: "Einstellungen",
      appearance: "Aussehen",
      notifications: "Benachrichtigungen",
      billingPayment: "Abrechnungszahlung",
      language: "Sprache",
      notificationPref: "Benachrichtigungseinstellungen",
      paymentMethod: "Zahlungsmethode",
      darkMode: "Dunkelmodus",
      lightMode: "Lichtmodus",
      email: "Email",
      text: "Text",
      both: "Beide",
      creditCard: "Kreditkarte",
      paypal: "PayPal",
      bankTransfer: "Banküberweisung",
    },
    // Add more languages as needed
  };

  res.status(200).json(translations[language] || translations.en);
}
