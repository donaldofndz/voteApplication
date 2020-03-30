import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Button } from "@material-ui/core";
import { apiRootSelector } from "../slices/apiRoot";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomMessage from "../components/CustomMessage";

const CreateQuestionInput = props => (
  <FormControl fullWidth variant="outlined">
    <InputLabel htmlFor="outlined-adornment-amount">{props.title}</InputLabel>
    <OutlinedInput
      startAdornment={
        <InputAdornment position="start">{props.textAdornment}</InputAdornment>
      }
      labelWidth={60}
      name={props.name}
      onChange={props.handleInputChange}
    />
  </FormControl>
);

export default function CreateQuestion() {
  const initialFormState = {
    question: "",
    choices: [],
    disabledSubmit: true,
    submit: false
  };
  const [createQuestion, setCreateQuestion] = useState(initialFormState);
  const { apiRoot, domain } = useSelector(apiRootSelector);

  const handleInputChange = event => {
    const { name, value } = event.target;
    let editValue = value;
    if (name === "choices") {
      editValue = editValue.split(",");
    }
    let valueDisabled =
      createQuestion.choices.length > 1 && createQuestion.question.length > 0;
    setCreateQuestion({
      ...createQuestion,
      [name]: editValue,
      disabledSubmit: !valueDisabled
    });
  };

  const submitQuestion = event => {
    fetch(`${domain}${apiRoot.questions_url}?`, {
      method: "POST",
      body: JSON.stringify({
        question: createQuestion.question,
        choices: createQuestion.choices
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response) {
          setCreateQuestion({ ...createQuestion, submit: true });
        }
      });
  };

  return (
    <Grid container>
      {createQuestion.submit && (
        <CustomMessage color="success" title="Your question was created!" />
      )}
      <Grid item xs={12}>
        <Box paddingX={3}>
          <p className="createQuestion__title">Create Question</p>
        </Box>
        <Box paddingX={3}>
          <CreateQuestionInput
            name="question"
            title="Question"
            textAdornment="Question:"
            handleInputChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box paddingX={3}>
          <p className="createQuestion__title">Create Choices</p>
          <p className="createQuestion__title--2">
            Separete with commas the differents choices, for example: pytho,
            ruby, JS
          </p>
        </Box>
        <Box paddingX={3}>
          <Box marginBottom={3}>
            <CreateQuestionInput
              name="choices"
              title="Choice"
              textAdornment="Choices:"
              handleInputChange={handleInputChange}
            />
          </Box>
        </Box>
        {createQuestion.choices.length > 1 && (
          <p className="createQuestion__title--2">
            Current Choices:
            {createQuestion.choices.map((element, index) => (
              <span key={index} className="createQuestion__choices">
                <span className="createQuestion__choices--inside">
                  {index + 1}
                </span>
                {": "}
                {element}
              </span>
            ))}
          </p>
        )}
        <Box
          paddingX={3}
          paddingTop={3}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            color="primary"
            disabled={createQuestion.disabledSubmit}
            onClick={submitQuestion}
          >
            Create Question
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
