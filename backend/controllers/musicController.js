import axios from "axios";

const LAST_FM_API_KEY = process.env.MUSIC_CLIENT_ID; // Store safely in .env

export const getChillTracks = async (req, res) => {
  try {
    const { tag = "soothing" } = req.query;

    const response = await axios.get("https://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "tag.gettoptracks",
        tag,
        api_key: LAST_FM_API_KEY,
        format: "json",
        limit: 20,
      },
    });

    const tracks = response.data.tracks.track.map((track) => ({
      name: track.name,
      artist: track.artist.name,
      url: track.url,
      image: track.image?.[2]?.["#text"], // Medium image
    }));

    res.json(tracks);
  } catch (error) {
    console.error("Failed to fetch tracks:", error.message);
    res.status(500).json({ error: "Failed to fetch soothing tracks" });
  }
};

