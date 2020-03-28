import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiRoot, apiRootSelector } from "./slices/apiRoot";
import { Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CustomMessage from "./components/CustomMessage";

const App = () => {
  const dispatch = useDispatch();
  const { apiRoot, loading, hasErrors } = useSelector(apiRootSelector);

  useEffect(() => {
    dispatch(fetchApiRoot("https://polls.apiblueprint.org"));
  }, [dispatch]);

  const renderPage = () => {
    if (loading) return <CircularProgress />;
    if (hasErrors)
      return (
        <CustomMessage
          title="Error"
          message="Something went wrong"
          color="error"
        />
      );

    return (
      <div>
        <p>Everything is fine, here is some text</p>
      </div>
    );
  };

  return <Container>{renderPage()}</Container>;
};

export default App;
