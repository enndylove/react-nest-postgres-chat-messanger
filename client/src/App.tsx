import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { USER_INFO } from "./constans.ts";
import { UserInfo } from "./types.ts";
import { storage } from "./utils.ts";
import WelcomeScreen from "./components/WelcomeScreen.tsx";
import ChatScreen from "./components/ChatScreen.tsx";

function App() {
  const userInfo = storage.get<UserInfo>(USER_INFO);

  return (
    <section className="w-[480px] h-full mx-auto flex flex-col py-4">
      {userInfo ? <ChatScreen /> : <WelcomeScreen />}
    </section>
  );
}

export default App;