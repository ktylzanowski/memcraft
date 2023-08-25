import { useLoaderData } from "react-router-dom";
import classes from "./UserMemes.module.css";

const UserMemes = () => {
    const data = useLoaderData();
    return (
        <div>
            {data.map((meme) => (
                <div className={classes.memeContainer} key={meme.id}>
                    <img src={meme.meme_image} alt={meme.title} />
                    <h2>{meme.title}</h2>
                </div>
            ))}
        </div>
    );
};

export default UserMemes;