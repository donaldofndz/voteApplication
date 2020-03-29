import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestList, questListSelector } from "../slices/questList";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomMessage from "../components/CustomMessage"
import GridOfQuestions from "../components/GridOfQuestions";

export default function ListOFQuestions() {
  const dispatch = useDispatch();
  const { questList, loading, isEmpty, hasErrors } = useSelector(
    questListSelector
  );
  useEffect(() => {
    dispatch(fetchQuestList("https://polls.apiblueprint.org/questions?"));
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
