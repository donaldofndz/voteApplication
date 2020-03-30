import React from "react";
import { Grid, Box } from "@material-ui/core";
import "./landingPage.css";

export default function LandingPage() {
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box padding={3}>
          <p className="landingPage__title">Hey I'm José Fernández</p>
          <p className="landingPage__title--2">
            I'm a full stack developer, currently working at Globant. I love
            programming bouth JS and NodeJS
          </p>
          <p className="landingPage__title--text">
            This is my react implementation for the HeyCar! FrontEnd remote task
          </p>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box padding={3}>
          <div className="blueSquare">
            <p className="landingPage__square__title"> Main Links </p>
            <p className="landingPage__square__links">
              This are different links about me
            </p>
            <Box>
              <p>
                <a
                  href="https://www.linkedin.com/in/donaldo-fernandez/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/donaldofndz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </p>
              <p>
                <a
                  href="https://donaldofndz.github.io/curriculumReact/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CVPage
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/donaldofndz/voteapplication"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Current Repo
                </a>
              </p>
            </Box>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
