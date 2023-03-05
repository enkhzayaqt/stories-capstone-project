import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CreateStory from "./components/CreateStory";
import HeaderBar from "./components/HeaderBar";
import Footer from "./components/Footer"
import StoryDetails from "./components/StoryDetails";
import EditStory from "./components/EditStory";
import * as sessionActions from "./store/session";
import HomePage from "./components/HomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <HeaderBar />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/stories/new">
            <CreateStory />
          </Route>
          <Route exact path="/stories/:storyId/edit">
            <EditStory />
          </Route>
          <Route exact path="/stories/:id">
            <StoryDetails />
          </Route>
        </Switch>
      )}
      <Footer/>
    </>
  );
}

export default App;
