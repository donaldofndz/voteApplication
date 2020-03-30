import React from "react";
import { Grid, Box, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const QuestionInfo = props => (
  <div>
    <span
      style={{ fontSize: "0.8em", fontWeight: "200", marginBottom: ".5em" }}
    >
      {props.title}:
    </span>
    <p style={{ fontSize: "1.2em", fontWeight: "500", marginTop: "0" }}>
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
                <TableCell style={{ textAlign: "center" }}>Votes</TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.choices.map((choice, index) => (
                <TableRow key={index}>
                  <TableCell>{choice.choice}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {choice.votes}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
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
