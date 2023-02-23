import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CreateStory from "./components/CreateStory";
import Stories from "./components/Stories";
import HeaderBar from "./components/HeaderBar";
import StoryDetails from "./components/StoryDetails";
import EditStory from "./components/EditStory";
import * as sessionActions from "./store/session";

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
            <Stories />
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
    </>
  );
}

export default App;
