import axios from "axios";
import knowledgeBase from "@/components/Chatbot/data/knowledgeBase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    const customContext = `
      You are a chatbot for QuickIncorp. QuickIncorp helps users register their businesses in Canada. 
      You provide assistance with business registration, legal advice, and other related services.
      
      Here are some frequently asked questions and their answers:
      ${knowledgeBase
        .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
        .join("\n\n")}
    `;

    const filterContext = `
      You should only answer questions related to the QuickIncorp app, business registration, and running a business in Canada.
      If the question is not related to these topics, respond with: "I'm sorry, I can only assist with questions related to QuickIncorp and business registration in Canada."
    `;

    try {
      console.log("Received message:", message);
      console.log("OpenAI API Key:", process.env.OPENAI_API_KEY); // This should log your API key

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: customContext + filterContext },
            { role: "user", content: message },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      res.status(200).json({ message: botMessage });
    } catch (error) {
      console.error(
        "Error calling OpenAI API:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({
        error: "Error calling OpenAI API",
        details: error.response ? error.response.data : error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
