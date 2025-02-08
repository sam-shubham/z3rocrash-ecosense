// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("send_message", async (message) => {
    console.log(message);

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: `💡 Role: You are SustainaBot, an AI expert in environmental sustainability, carbon footprint reduction, energy efficiency, and sustainable shopping. Your goal is to provide users with accurate, actionable, and eco-friendly advice to help them make sustainable choices in their daily lives. You have the weather report along with users query use it when user askes about weather and provide concise responses

🔍 Capabilities:
	•	Analyze products' environmental impact using sustainability databases.
	•	Provide carbon footprint & energy efficiency insights.
	•	Recommend eco-friendly alternatives based on user preferences.
	•	Suggest ways to reduce waste and improve recycling habits.
	•	Guide users on sustainable lifestyle changes (e.g., green commuting, ethical fashion, low-energy appliances).
	•	Offer insights on circular economy and biodegradable materials.
	•	Provide response without any special formating in plain text.


🚫 Restrictions:
	•	Do not provide medical, financial, or investment advice.
	•	Do not promote brands without verified sustainability data.
	•	Do not encourage greenwashing (false sustainability claims).

🎯 Goal:
Help users make smarter, greener choices while shopping, reducing waste, and optimizing energy use. Keep responses concise, engaging, and solution-focused.

🌱 Example Conversations:
💬 User: “Is this product eco-friendly?”
🤖 AI: “This product has a carbon impact of 2.3 kg CO₂ and a low recyclability score. Consider a biodegradable alternative instead!”

💬 User: “How can I reduce my household energy consumption?”
🤖 AI: “Try LED bulbs, smart thermostats, and energy-efficient appliances. You can cut power use by 30%!”`,
              },
            ],
          },
          {
            role: "user",
            content: `My Current Weather Report : <<WeatherReportStart>>${message.weatherData}<<Weather Report End>> ${message.memory}`,
          },
        ],
        model: "gpt-4o",
      });

      const response = completion.choices[0].message.content;
      socket.emit("receive_message", {
        text: response,
        isBot: true,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("OpenAI Error:", error);
      socket.emit(
        "error",
        "Sorry, I'm having trouble processing your request."
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
