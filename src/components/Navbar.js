import React from "react";
import { Grid, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  return (
    <Box>
      <Grid container justify="space-evenly">
        <Grid item xs={12} md={3} style={{ textAlign: "center", marginTop: "1em"  }}>
          <Box>
            <Link to="/">Instructions</Link>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          style={{ textAlign: "center", marginTop: "1em" }}
        >
          <Link to="/questions">List Of Questions</Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          style={{ textAlign: "center", marginTop: "1em" }}
        >
          <Link to="/SearchQuestion">Serch Question</Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          style={{ textAlign: "center", marginTop: "1em" }}
        >
          <Link to="/SearchQuestion">New Queston</Link>
        </Grid>
      </Grid>
      <hr style={{ marginTop: "1.5em", borderColor: "#fafafa" }} />
    </Box>
  );
}
