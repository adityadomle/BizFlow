// src/utils/speakWithElevenLabs.js

export const speakWithElevenLabs = async (text) => {
  const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID", {
    method: "POST",
    headers: {
      "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.7
      }
    })
  });

  if (!response.ok) throw new Error("Failed to fetch speech");

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
};
