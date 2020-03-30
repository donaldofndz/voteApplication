import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Button } from "@material-ui/core/";
import "./gridOfQuestions.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function GridOfQuestions(props) {
  const { questList } = props;

  return (
    <Grid container>
      {questList.map((quest, index) => (
        <Grid item key={index} xs={12}>
          <Question {...quest} />
        </Grid>
      ))}
    </Grid>
  );
}

const QuestionMainInfo = props => (
  <Grid item xs={12} md={9}>
    <QuestionText
      description={"Question"}
      value={props.question}
    ></QuestionText>
    <QuestionText
      description={"Date"}
      value={
        props.formatDate.getDate() +
        "-" +
        (props.formatDate.getMonth() + 1) +
        "-" +
        props.formatDate.getFullYear() +
        " " +
        props.formatDate.getHours() +
        ":" +
        props.formatDate.getMinutes() +
        ":" +
        props.formatDate.getSeconds()
      }
    ></QuestionText>
  </Grid>
);

const Question = props => {
  const initialQuestionState = {
    showQuestions: false
  };
  const [questionState, setQuestionState] = useState(initialQuestionState);

  const updateQuestionState = currentShowQuestions => {
    setQuestionState({
      showQuestions: currentShowQuestions
    });
  };

  const parseISOString = s => {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  };

  const formatDate = parseISOString(props.published_at);

  return (
    <Box marginBottom={2} marginTop={2} padding={2} className="question">
      <Grid container>
        <QuestionMainInfo formatDate={formatDate} question={props.question} />
        <Grid container item xs={12} md={3} alignItems="center">
          <Button variant="outlined" color="primary">
            <Link className="question__details" to={props.url}>
              Show Question Details
            </Link>
          </Button>
        </Grid>
      </Grid>
      {questionState.showQuestions ? (
        <Box>
          <QuestionText description={"Choices"} value={""}></QuestionText>
          <Choices choices={props.choices} />
          <Box marginTop={3}>
            <p
              className="question__link"
              onClick={() => updateQuestionState(false)}
            >
              Hide Results <span className="question__title--bold"> - </span>
            </p>
          </Box>
        </Box>
      ) : (
        <Box>
          <p
            className="question__link"
            onClick={() => updateQuestionState(true)}
          >
            Show Results <span className="question__title--bold"> + </span>
          </p>
        </Box>
      )}
    </Box>
  );
};

function Choices(props) {
  return (
    <Box className="question__choices">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Choice</TableCell>
              <TableCell>Votes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.choices.map((choice, index) => (
              <TableRow key={index}>
                <TableCell>{choice.choice}</TableCell>
                <TableCell>{choice.votes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function QuestionText(props) {
  return (
    <p>
      <span className="question__title">
        <span className="question__title--description">
          {props.description}:
        </span>
        <span className="question__title--value">{props.value}</span>
      </span>
    </p>
  );
}
