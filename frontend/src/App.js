import React, { useState, useEffect } from "react";
import SignInSide from "./views/login";
import SignUp from "./views/signup";
import { Route, Link } from "react-router-dom";
import VideoRoomComponent from "./VideoRoomComponent";
import Welcome from "./views/welcome";
import Team from "./views/team";
import JoinTeam from "./views/jointeam";
import Cookies from "js-cookie";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuth(!!token);
  }, []);

  console.log(isAuth);

  return (
    <div className="App">
      <Route path="/login" render={() => isAuth?<Welcome/> : <SignInSide/>} />
      <Route path="/signup" render={() => isAuth?<Welcome/> : <SignUp/>} />
      <Route path="/call/:sessionId" render={(props) => isAuth?<VideoRoomComponent {...props}/> : <SignInSide/>} />
      <Route path="/welcome" render={() => isAuth?<Welcome/> : <SignInSide/>} />
      <Route path="/team/:teamId" render={(props) => isAuth?<Team {...props}/> : <SignInSide/>} />
      <Route path="/jointeam" render={() => isAuth?<JoinTeam/> : <SignInSide/>} />
    </div>
  );
}

export default App;
