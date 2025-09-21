import React, { useEffect, useState } from "react";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPES = import.meta.env.VITE_SCOPES;

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const accessToken = params.get("access_token");
      if (accessToken) {
        setToken(accessToken);
        window.location.hash = ""; // clean url
      }
    }
  }, []);

  const login = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}&response_type=token&show_dialog=true`;

    window.location.href = authUrl;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      {!token ? (
        <button onClick={login} style={{ padding: "1rem 2rem", fontSize: "1.2rem" }}>
          Login with Spotify
        </button>
      ) : (
        <h2>✅ Logged in with token: {token.substring(0, 15)}...</h2>
      )}
    </div>
  );
}

export default App;
