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

export const saveBoardToCloud = async (email, boardData) => {
  const id = await addDoc(collection(getFirebaseDb(), "Board"), {
    boardWidth: parseInt(boardData?.boardWidth),
    boardHeight: parseInt(boardData?.boardHeight),
    generatedBoards: boardData?.generatedBoards.map((board) => ({
      board: board,
    })),
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
