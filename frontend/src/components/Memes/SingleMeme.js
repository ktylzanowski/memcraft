import Image from "../../UI/Image";
import Likes from "./Likes";

const SingleMeme = (props) => {
  const { meme, error } = props;

  if (error) {
    return <p>{error}</p>;
  }

  const imageUrl = new URL(meme.meme_image, "http://127.0.0.1:8000").href;

  return (
    <>
      <Image imageUrl={imageUrl} alt="Meme" />
      <h1>{meme.title}</h1>
      <h4>{meme.author_name}</h4>
      <Likes
        totalLikes={meme.total_likes}
        totalDislikes={meme.total_dislikes}
        id={meme.id}
        ifLike={meme.if_like}
        ifDislike={meme.if_dislike}
      />
    </>
  );
};

export default SingleMeme;
