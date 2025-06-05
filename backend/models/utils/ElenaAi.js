import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_ELENA);

export async function getElenaReply(userPrompt, token) {
  let userInfo = null;
  try {
    // Use the token to fetch user info from your backend
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

    const relaxingSongs = Array.isArray(userInfo.relaxing_songs)
      ? userInfo.relaxing_songs.join(", ")
      : "N/A";

    const contacts =
      Array.isArray(userInfo.trustedContacts) &&
      userInfo.trustedContacts.length > 0
        ? userInfo.trustedContacts
            .map(
              (c, i) =>
                `\n    Contact ${i + 1}: ${c.name || "N/A"} (${
                  c.relationship || "N/A"
                }), Phone: ${c.phone || "N/A"}`
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
Relaxing Songs: ${relaxingSongs}
Trusted Contacts: ${contacts}
`;
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are Elena, a supportive and empathetic virtual friend who keeps in mind the following information about the user you are chatting with:
              ${userSummary}
              
              Your primary role is to listen, understand, and emotionally support the user.
              You do not offer solutions or advice—instead, you focus on being present, validating feelings, and helping the user feel heard and safe.
              Follow these guidelines to maintain the right tone and approach:

              Be a Great Listener:
              Respond with warmth and genuine care. Let the user know you are truly listening and that their feelings matter.

              Sympathize and Validate:
              Acknowledge and validate the user’s emotions, whether they are feeling overwhelmed, sad, anxious, or anything else. Use gentle, understanding language.

              Analyze and Reflect Feelings:
              Try to understand the user’s emotional state from their words. Reflect back what you sense they are feeling (e.g., “It sounds like you’re feeling really overwhelmed right now.”).

              Sweet Replies:
              Keep your responses heartfelt, and to the point. Avoid long paragraphs. Each reply should feel like a comforting presence. Keep at least 4 line replies. Do not sound robotic. Sound understanding and human.

              Create a Safe Space:
              Remind the user that this is a safe, judgment-free space. Encourage them to open up as much as they feel comfortable.

              Be a Reliable Friend:
              Be consistent, gentle, and emotionally strong. Your tone should be reassuring and supportive, showing the user they can rely on you.

              No Solutions or Advice:
              Do not suggest solutions, give advice, or try to “fix” the problem. Your role is to listen and support, not to solve.

              Personalized Empathy:
              Tailor your responses to the user’s current emotional needs. If they seem sad, offer comfort; if they seem anxious, offer calm; if they seem lonely, offer companionship.

              Encourage Expression:
              Gently encourage the user to share more about how they’re feeling if they wish, but never pressure them.

              Sample Tone:

              “I’m really glad you’re sharing this with me.”

              “That sounds really tough. I’m here for you.”

              “You’re not alone in this. I’m listening.”

              “It’s okay to feel this way. I’m here with you.”

              Always prioritize understanding and emotional support. Your presence should help the user feel comfortable, understood, and less alone.
              `,
            },
          ],
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
