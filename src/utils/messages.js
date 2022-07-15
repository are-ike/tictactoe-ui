const messages = {
  CREATE: "CREATE", //Sent by a player to create a game
  JOIN: "JOIN", //Sent by a player to join a game(for player 2)
  START: "START", //Sent by player 1 to start the game
  PLAY: "PLAY", //Sent by both players for each play
  PLAYED: "PLAYED", //Sent to indicate a player has played
  REDIRECT: "REDIRECT", //Sent to redirect player 2 to game page
  GAME: "GAME", //Sent at the start of the game
};

export const createMessage = ({ playerNo, playerName, gameId, message }) => ({
  playerNo,
  playerName,
  gameId,
  message,
});

export const createPlayMessage = ({ playerNo, gridIdx, gameId}) => ({
  gridIdx,
  playerNo,
  gameId,
  message: messages.PLAY,
});

export default messages;
