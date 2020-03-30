import React from "react";
import { Grid, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  return (
    <Box>
      <Grid container justify="space-evenly">
        <Grid item xs={12} md={3} className="navBar">
          <Box>
            <Link to="/">Instructions</Link>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          className="navBar__item"
        >
          <Link to="/questions">List Of Questions</Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          className="navBar__item"
        >
          <Link to="/SearchQuestion">Serch Question</Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          className="navBar__item"
        >
          <Link to="/createquestion">New Question</Link>
        </Grid>
      </Grid>
      <hr className="navBar__line" />
    </Box>
  );
}
