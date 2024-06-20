import { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef(null);

  const sendMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "user", text: message },
    ]);
    setInput("");

    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "bot", text: data.message },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg focus:outline-none"
      >
        {isOpen ? "Close" : "Chat"}
      </button>
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col mt-2">
          <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.from === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-2 border-t border-gray-300 flex"
          >
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-r-lg"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
