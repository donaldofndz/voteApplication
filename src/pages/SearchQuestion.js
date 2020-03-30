import React, { useState } from "react";
import { Grid, Box, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function SearchQuestion() {
  const initialFormState = { idQuestion: null };
  const [searchQuestion, setSearchQueston] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSearchQueston({ [name]: value });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box padding={3}>
          <p className="searchQuestion__title">
            Do you know the ID of the question?
          </p>
          <TextField
            label="ID"
            type="number"
            name="idQuestion"
            onChange={handleInputChange}
          />
          <Box marginTop={5}>
            <Button
              variant="contained"
              color="primary"
              disabled={
                searchQuestion.idQuestion < 0 ||
                searchQuestion.idQuestion == null
              }
            >
              <Link
                className="searchQuestion__link"
                to={`/questions/${searchQuestion.idQuestion}`}
              >
                Ir
              </Link>
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
