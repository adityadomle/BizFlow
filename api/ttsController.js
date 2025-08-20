import axios from 'axios';

export const textToSpeech = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.6
        }
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    res.set({ 'Content-Type': 'audio/mpeg' });
    res.send(response.data);
  } catch (error) {
    console.error('TTS failed:', error);
    res.status(500).json({ error: 'Text-to-speech failed' });
  }
};
