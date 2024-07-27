import { AppProvider } from "./context/context";
import { Login } from "./components/Login";
import { SpotifyPlayer } from "./components/SpotifyPlayer";

const AppContent = () => {
  const authCode = new URLSearchParams(window.location.search).get('code');

  return authCode ? <SpotifyPlayer authCode={authCode} /> : <Login />;
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
