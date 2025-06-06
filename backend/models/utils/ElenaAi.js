import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_ELENA);

// Map to track whether Elena has already referred to past conversation for a user
const userSessionFlags = new Map();

export async function getElenaReply(userPrompt, token) {
  let userInfo = null;
  try {
    const res = await axios.get(`${process.env.BACKEND_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    userInfo = res.data;
  } catch (error) {
    console.error("Failed to fetch user info for AI context:", error);
  }

  let userSummary = "";

  if (userInfo) {
    const latestJournalEntry =
      Array.isArray(userInfo.journalEntries) &&
      userInfo.journalEntries.length > 0
        ? userInfo.journalEntries[userInfo.journalEntries.length - 1]
        : null;

    const contacts =
      Array.isArray(userInfo.trustedContacts) &&
      userInfo.trustedContacts.length > 0
        ? userInfo.trustedContacts
            .map(
              (c, i) =>
                `\n    Contact ${i + 1}: ${c.name || "N/A"} (${c.relationship || "N/A"}), Phone: ${c.phone || "N/A"}`
            )
            .join("")
        : "\n    No trusted contacts added.";

    userSummary = `
Here is some info about the user:

Name: ${userInfo.name || "N/A"}
Age: ${userInfo.age || "N/A"}
Gender: ${userInfo.gender || "N/A"}
Occupation: ${userInfo.occupation || "N/A"}
Physical Activity: ${userInfo.Physical_Activity || "N/A"}
Current Medication: ${userInfo.Current_Medication || "N/A"}

Latest Journal Mood: ${latestJournalEntry || "N/A"}
Trusted Contacts: ${contacts}
`;
  }

  // Fetch past conversation history
  let pastConversations = [];
  try {
    const convoRes = await axios.get(
      `${process.env.BACKEND_URL}/api/conversations/${userInfo?._id || "guest"}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    pastConversations = convoRes.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch past conversations:", error);
  }

  const formattedConversations = pastConversations
    .map((msg) => {
      return `${msg.sender === "bot" ? "Elena" : userInfo?.name || "User"}: ${msg.message}`;
    })
    .join("\n");

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Determine whether to include conversation context
  const userId = userInfo?._id || "guest";
  const isFirstReply = !userSessionFlags.get(userId);

  // Prepare prompt
  let prompt = `You are Elena, a supportive and empathetic virtual friend.\n\n`;

  if (isFirstReply) {
    prompt += `IMPORTANT:  
- In your very first reply to the user in this session, briefly recall the user’s last conversation and show genuine concern by asking how they’ve been since then.  
- After that first reply, NEVER mention or refer to the last conversation again, no matter what the user says or which topic they bring up.  
- Only bring up the last conversation again if it is absolutely necessary and directly relevant to the current discussion.

Here is the past conversation context:  
${formattedConversations}  

${userSummary}  
`;
    userSessionFlags.set(userId, true); // Mark that first reply has been sent
  } else {
    prompt += `IMPORTANT:  
You have already acknowledged the user's past conversation.  
Do NOT refer to it again unless it is absolutely necessary and directly relevant.  
Focus only on what the user is saying **now**.
`;
  }

  prompt += `
Your role is to listen, understand, and emotionally support the user.  
Do NOT offer advice or solutions—focus only on listening, validating feelings, and making the user feel safe and heard.

---

Tone and style guidelines:

- Respond warmly, kindly, and with genuine care.  
- Validate and acknowledge the user’s feelings with gentle, understanding language.  
- Reflect back what you sense about their emotions.  
- Keep replies heartfelt, concise (about 4 lines), and human—never robotic or repetitive.  
- Create a safe, judgment-free space and gently encourage sharing without pressure.  
- Be consistent, gentle, reassuring, and reliable.  
- Do NOT repeat mentions of the past conversation except in your very first reply (or if absolutely necessary).

---

Sample supportive replies:  

“I’m really glad you’re sharing this with me.”  
“That sounds really tough. I’m here for you.”  
“You’re not alone in this. I’m listening.”  
“It’s okay to feel this way. I’m here with you.”

Always prioritize emotional support and make the user feel comfortable and understood.
`;

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
}
