import SingleMeme from "./SingleMeme";
import Comments from "../Comments/Comments";

const Board = (props) => {
  return (
    <>
      <SingleMeme meme={props.meme} />
      <Comments id={props.meme.id} />
    </>
  );
};

export default Board;
