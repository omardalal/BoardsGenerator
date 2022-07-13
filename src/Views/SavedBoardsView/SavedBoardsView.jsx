import React, { useEffect, useState } from "react";
import { styles } from "./styles.ts";
import { ChevronRight } from "@carbon/react/icons";
import useAuth from "../../CustomHooks/useAuth";
import { getBoardById, getUserSavedBoards } from "../../Utilities/StorageUtils";
import BoardView from "../BoardView/BoardView";
import { Loading } from "@carbon/react";

const SavedBoardsView = () => {
  const [hoveredRow, setHoveredRow] = useState(-1);

  const [savedBoards, setSavedBoards] = useState([]);
  const [inBoardView, setInBoardView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [boardData, setBoardData] = useState();

  const loggedUser = useAuth();

  useEffect(() => {
    if (!loggedUser?.pending && !loggedUser.isSignedIn) {
      setIsLoading(false);
    }
    if (!loggedUser?.user?.email) {
      return;
    }

    const getSavedBoards = async () =>
      await getUserSavedBoards(loggedUser?.user?.email);

    getSavedBoards()
      .then((boards) => setSavedBoards(boards))
      .catch((err) =>
        console.error("Failed to fetch saved boards, Error: " + err)
      )
      .finally(() => setIsLoading(false));
  }, [loggedUser]);

  const getSaveRow = (save, index) => {
    return (
      <div
        style={styles.saveRow(index === hoveredRow)}
        onMouseEnter={() => setHoveredRow(index)}
        onMouseLeave={() => setHoveredRow(-1)}
        onClick={async () => {
          try {
            setIsLoading(true);
            const board = await getBoardById(save.boardId);
            setBoardData({
              ...save,
              boardWidth: board.boardWidth,
              boardHeight: board.boardHeight,
              generatedBoards: board?.generatedBoards?.map((board) => [
                ...board.board,
              ]),
            });
            setInBoardView(true);
          } catch (error) {
            console.error("Failed to get board data, Error: " + error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <h4>{save.boardTitle}</h4>
        <p>{`${save.resultsCount} Results`}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: 10 }}>{save.date}</p>
          <ChevronRight style={{ width: 22, height: 22 }} />
        </div>
      </div>
    );
  };

  if (inBoardView) {
    return (
      <BoardView
        backOnPress={() => setInBoardView(false)}
        boardData={boardData}
      />
    );
  }

  return (
    <div style={styles.savesBox} className={"defaultBoxShadowBlack"}>
      {isLoading && <Loading />}
      <h3 style={styles.title}>Saved Boards</h3>
      <div style={styles.savesTable}>
        {!isLoading && loggedUser?.isSignedIn ? (
          savedBoards?.length > 0 ? (
            savedBoards?.map((board, index) =>
              getSaveRow(
                {
                  boardTitle: board.boardTitle,
                  resultsCount: board.resultsCount,
                  date: board.date,
                  boardId: board.boardId.id,
                },
                index
              )
            )
          ) : (
            <p style={styles.infoMsg}>You don't have any saved boards.</p>
          )
        ) : (
          <p style={styles.infoMsg}>
            You must be logged in to access your saved boards.
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedBoardsView;
