import React from "react";
import SignInSide from "./login";
import SignUp from "./signup";
import { Route, Link } from "react-router-dom";
import home from "./home";
import VideoRoomComponent from "./VideoRoomComponent";

function App() {
  return (
    <div className="App">
        <Route path="/login" component={SignInSide} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={home} />
        <Route path="/call/:sessionId" component={VideoRoomComponent} />
    </div>
  );
}

export default App;