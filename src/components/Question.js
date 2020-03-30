import React from "react";
import { Grid, Box, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import './question.css'

const QuestionInfo = props => (
  <div>
    <span
      className="question__info__title"
    >
      {props.title}:
    </span>
    <p className="question__info__title--2">
      {props.info}
    </p>
  </div>
);

export default function Question(props) {
  const { question, published_at, choices, voteForChoice } = props;

  const parseISOString = s => {
    if (s === undefined) return new Date();
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  };

  const formatDate = parseISOString(published_at);

  return (
    <Grid container style={{ marginTop: "3em" }}>
      <Grid item xs={12} md={5}>
        <Box>
          <QuestionInfo title="Question" info={question}></QuestionInfo>
          <QuestionInfo
            title="Date"
            info={
              formatDate.getDate() +
              "-" +
              (formatDate.getMonth() + 1) +
              "-" +
              formatDate.getFullYear() +
              " " +
              formatDate.getHours() +
              ":" +
              formatDate.getMinutes() +
              ":" +
              formatDate.getSeconds()
            }
          ></QuestionInfo>
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Choices choices={choices} voteForChoice={voteForChoice} />
      </Grid>
    </Grid>
  );
}

function Choices(props) {
  return (
    <Box>
      {props.choices ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Choice</TableCell>
                <TableCell className="question__tablecell">Votes</TableCell>
                <TableCell className="question__tablecell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.choices.map((choice, index) => (
                <TableRow key={index}>
                  <TableCell>{choice.choice}</TableCell>
                  <TableCell className="question__tablecell">
                    {choice.votes}
                  </TableCell>
                  <TableCell className="question__tablecell">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        props.voteForChoice(choice.url);
                      }}
                    >
                      Vote
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No data yet</p>
      )}
    </Box>
  );
}
