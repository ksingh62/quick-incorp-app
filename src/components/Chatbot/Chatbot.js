import { useState, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: "bot", content: "Hello! How can I assist you today?" },
      ]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages([...messages, { role: "user", content: userMessage }]);
    setInput("");

    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([
          ...messages,
          { role: "user", content: userMessage },
          { role: "bot", content: data.message },
        ]);
      } else {
        const errorData = await response.json();
        setMessages([
          ...messages,
          { role: "user", content: userMessage },
          { role: "bot", content: `Error: ${errorData.error}` },
        ]);
      }
    } catch (error) {
      setMessages([
        ...messages,
        { role: "user", content: userMessage },
        { role: "bot", content: "Error: Unable to reach the server." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          Chat with Us!
        </button>
      )}
      {isOpen && (
        <div className="w-96 h-128 bg-gray-900 text-gray-100 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="bg-gray-800 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">QuickIncorp Chatbot</h3>
            <button
              className="text-gray-100 hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 ml-20 max-w-80"
                    : "bg-gray-700 self-start max-w-80"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="bg-gray-800 p-4 rounded-b-lg flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 rounded-l-lg border-0 focus:ring-2 focus:ring-blue-600 bg-gray-700 text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
