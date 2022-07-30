import { getFirebaseDb } from "./FirebaseUtils";
import {
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export const getUserSavedBoards = async (email) => {
  const userRef = doc(getFirebaseDb(), "User", email);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();
  return userData?.savedBoards;
};

export const updateBoardValues = async (
  boardId,
  generatedBoards,
  drawnConnectors,
  resultsCount
) => {
  let saveConnectors = [];
  if (!drawnConnectors || drawnConnectors?.length < 1) {
    for (let i = 0; i < resultsCount; i++) {
      saveConnectors.push({
        connector: [],
      });
    }
  } else {
    saveConnectors = drawnConnectors.map((connector) => ({
      connector: connector?.length > 0 ? connector : [],
    }));
  }
  await updateDoc(doc(getFirebaseDb(), "Board", boardId), {
    generatedBoards: generatedBoards.map((board) => ({
      board: board,
    })),
    drawnConnectors: saveConnectors,
  });
};

export const saveNewBoardToCloud = async (
  email,
  boardData,
  generatedBoards,
  drawnConnectors
) => {
  let saveConnectors = [];
  if (!drawnConnectors || drawnConnectors?.length < 1) {
    for (let i = 0; i < boardData.resultsCount; i++) {
      saveConnectors.push({
        connector: [],
      });
    }
  } else {
    saveConnectors = drawnConnectors.map((connector) => ({
      connector: connector?.length > 0 ? connector : [],
    }));
  }
  const id = await addDoc(collection(getFirebaseDb(), "Board"), {
    boardWidth: parseInt(boardData?.boardWidth),
    boardHeight: parseInt(boardData?.boardHeight),
    generatedBoards: generatedBoards.map((board) => ({
      board: board,
    })),
    drawnConnectors: saveConnectors,
    email,
  });

  await updateDoc(doc(getFirebaseDb(), "User", email), {
    savedBoards: arrayUnion({
      resultsCount: parseInt(boardData?.resultsCount),
      boardTitle: boardData?.boardTitle,
      date: boardData?.date,
      boardId: id,
    }),
  });
};

export const getBoardById = async (boardId) => {
  const boardRef = doc(getFirebaseDb(), "Board", boardId);
  const boardDoc = await getDoc(boardRef);
  const boardData = boardDoc.data();
  return boardData;
};
