import React from "react";
import SignInSide from "./views/login";
import SignUp from "./views/signup";
import { Route, Link } from "react-router-dom";
import VideoRoomComponent from "./VideoRoomComponent";
import Welcome from "./views/welcome";
import Team from "./views/team";

function App() {
  return (
    <div className="App">
        <Route path="/login" component={SignInSide} />
        <Route path="/signup" component={SignUp} />
        <Route path="/call/:sessionId" component={VideoRoomComponent} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/team" component={Team} />
    </div>
  );
}

export default App;