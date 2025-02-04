import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const model = process.env.REACT_APP_OPENAI_MODEL;

// Function to fetch chat response from OpenAI
const getChatResponse = async (userMessage) => {
  if (!apiKey) {
    return "API key not found!";
  }

  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: model,
        messages: [
          {
            role: "system",
            content: "You are a helpful chatbot that generates interview questions. Please only respond with a clear interview question without any introductory text. Do not repeat questions."
          },
          {
            role: "user",
            content: userMessage
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.choices[0].message.content.trim();
    } else {
      return `Failed to fetch response: ${response.status}`;
    }
  } catch (error) {
    return `Error occurred: ${error.message}`;
  }
};

// Function to handle speech-to-text

export { getChatResponse };
