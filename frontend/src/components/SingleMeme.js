import Image from "../UI/Image";
import Likes from "./Likes";

const SingleMeme = (props) => {
  let meme = props.meme;
  const imageUrl = new URL(meme.meme_image, "http://127.0.0.1:8000").href;
  return (
    <>
      <Image imageUrl={imageUrl} alt="Meme" />
      <h1>{meme.title}</h1>
      <Likes
        total_likes={meme.total_likes}
        total_dislikes={meme.total_dislikes}
        id={meme.id}
        ifLike={meme.if_like}
        ifDislike={meme.if_dislike}
      />
    </>
  );
};

export default SingleMeme;
