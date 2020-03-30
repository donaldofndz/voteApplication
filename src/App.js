import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiRoot, apiRootSelector } from "./slices/apiRoot";
import { Grid, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CustomMessage from "./components/CustomMessage";
import ListOFQuestions from "./pages/ListOfQuestions";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/Navbar";
import SingleQuestion from "./pages/SingleQuestion";
import SearchQuestion from "./pages/SearchQuestion";
import CreateQuestion from "./pages/CreateQuestion";
import Constants from "./constants/Constants";

const App = () => {
  const dispatch = useDispatch();
  const { apiRoot, loading, hasErrors, domain } = useSelector(apiRootSelector);
  const constants = new Constants();

  useEffect(() => {
    dispatch(fetchApiRoot(constants.getUrl().url));
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
      <Container>
        <Grid item className="titleMain">
          <p className="titleMain__text">VoteApp</p>
        </Grid>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/questions" component={ListOFQuestions} />
            <Route exact path="/questions/:id" component={SingleQuestion} />
            <Route exact path="/searchquestion" component={SearchQuestion} />
            <Route exact path="/createquestion" component={CreateQuestion} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Container>
    );
  };

  return <div>{renderPage()}</div>;
};

export default App;
