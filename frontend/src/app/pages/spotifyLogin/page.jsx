'use client';
import React, { useEffect, useState } from "react";

const CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID";
const CLIENT_SECRET = "YOUR_SPOTIFY_CLIENT_SECRET"; // ⚠️ Exposed here just for learning
const REDIRECT_URI = "http://localhost:3000/";
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private"
].join(" ");

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);

  // On first load, check for `code` in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !accessToken) {
      getAccessToken(code);
    }
  }, []);

  // Exchange authorization code for access token
  const getAccessToken = async (code) => {
    const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await res.json();
    console.log("Token Response:", data);

    if (data.access_token) {
      setAccessToken(data.access_token);
      window.history.replaceState({}, null, "/"); // Clean URL
      fetchProfile(data.access_token);
    } else {
      alert("Failed to get access token");
    }
  };

  // Fetch user's Spotify profile
  const fetchProfile = async (token) => {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Profile:", data);
    setProfile(data);
  };

  const handleLogin = () => {
    const url =
      "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
      }).toString();

    window.location.href = url;
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Spotify OAuth</h1>

      {!accessToken && (
        <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
          Login with Spotify
        </button>
      )}

      {profile && (
        <div style={{ marginTop: "20px" }}>
          <h2>Welcome, {profile.display_name}</h2>
          <p>Email: {profile.email}</p>
          {profile.images?.[0]?.url && (
            <img
              src={profile.images[0].url}
              alt="Profile"
              width={150}
              style={{ borderRadius: "50%" }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
