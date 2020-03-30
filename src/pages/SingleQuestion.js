import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuest, questSelector } from "../slices/quest";
import { apiRootSelector } from "../slices/apiRoot";
import Question from "../components/Question";
import CustomMessage from "../components/CustomMessage";
import CircularProgress from "@material-ui/core/CircularProgress";

const SingleQuestion = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const { loading, hasErrors, question } = useSelector(questSelector);
  const initialQuestionState = {
    vote: false
  };
  const { apiRoot, domain } = useSelector(apiRootSelector);
  const [questionState, setQuestionState] = useState(initialQuestionState);

  useEffect(() => {
    const urlRequest = `${domain}${apiRoot.questions_url}/${id}`;
    dispatch(fetchQuest(urlRequest));
  }, [dispatch]);

  const voteForChoice = url => {
    fetch(`${domain}${url}`, { method: "POST" })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        return fetchQuest(`${domain}${apiRoot.questions_url}${id}`);
      })
      .then(function(response) {
        dispatch(response);
        setQuestionState({
          vote: true
        });
      });
  };

  const renderSingleQuestion = () => {
    if (questionState.vote) {
      return <CustomMessage color="success" title="Thanks for voting" />;
    }
    if (loading) {
      return <CircularProgress />;
    }
    if (hasErrors) {
      return <CustomMessage color="error" title="There was a en error" />;
    }
    return <Question {...question} voteForChoice={voteForChoice} />;
  };

  return <div>{renderSingleQuestion()}</div>;
};

export default SingleQuestion;
