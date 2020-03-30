import React from "react";
import { Grid, Box } from "@material-ui/core";

export default function CustomMessage(props) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          bgcolor={props.color + ".main"}
          color={props.color + ".contrastText"}
          p={2}
        >
          <p>
            <span>{props.title}</span>
            {props.message}
          </p>
        </Box>
      </Grid>
    </Grid>
  );
}
