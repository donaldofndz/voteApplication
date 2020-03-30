import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestList, questListSelector } from "../slices/questList";
import { apiRootSelector } from "../slices/apiRoot";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomMessage from "../components/CustomMessage";
import GridOfQuestions from "../components/GridOfQuestions";

export default function ListOFQuestions() {
  const dispatch = useDispatch();
  const { questList, loading, isEmpty, hasErrors } = useSelector(
    questListSelector
  );

  const { apiRoot } = useSelector(apiRootSelector);

  useEffect(() => {
    dispatch(
      fetchQuestList(`https://polls.apiblueprint.org${apiRoot.questions_url}`)
    );
  }, [dispatch]);

  const renderPage = () => {
    if (loading) return <CircularProgress />;
    if (hasErrors)
      return (
        <CustomMessage
          title="Error"
          message="Something while trying to lead the List Of Questions"
          color="error"
        />
      );
    if (isEmpty)
      return (
        <CustomMessage
          title="Info"
          message="Something while trying to lead the List Of Questions"
          color="info"
        />
      );

    return <GridOfQuestions questList={questList} />;
  };

  return <div>{renderPage()}</div>;
}
