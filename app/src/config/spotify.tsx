export const authEndpoint = "https://accounts.spotify.com/authorize";
export const redirectUri = "http://localhost:3000/";
export const clientId = 'e29c42098c514b629146ede7a125fdb6' || "";
export const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-modify",
  "user-library-read",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-follow-modify",
  "user-follow-read",
];
export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;
