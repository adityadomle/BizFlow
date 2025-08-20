import axios from 'axios';

export const getBusinessSuggestion = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a business assistant bot." },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ reply: answer });
  } catch (err) {
    console.error("Suggestion failed:", err);
    res.status(500).json({ error: "AI suggestion failed." });
  }
};
