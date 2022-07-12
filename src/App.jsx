import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import NewBoardView from "./Views/NewBoardView/NewBoardView";
import SavedBoardsView from "./Views/SavedBoardsView/SavedBoardsView";
import LoginView from "./Views/LoginView/LoginView";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={"AppContainer"}>
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 0 && <NewBoardView />}
      {selectedTab === 1 && <SavedBoardsView />}
      {selectedTab === 2 && (
        <LoginView isLogin setSelectedTab={setSelectedTab} />
      )}
      {selectedTab === 3 && <LoginView setSelectedTab={setSelectedTab} />}
    </div>
  );
}

export default App;
