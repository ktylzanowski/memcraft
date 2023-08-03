import { useState, useEffect } from "react";

const Likes = (props) =>{
    const [totalLikes, setTotalLikes] = useState(props.total_likes)

    useEffect(() => {
      setTotalLikes(props.total_likes);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    const likeHandler = async () =>{
        const data = {
            "id": props.id,
        }
        const token = JSON.parse(localStorage.getItem("authTokens"));

        const response = await fetch("http://127.0.0.1:8000/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(token.access),
        },
        body: JSON.stringify(data)
    })

    const resdata = await response.json();
      
      if (!response.ok) {
        console.log("bad")
      } else{
        setTotalLikes(resdata)
      }
}

    return (
        <>
        <button onClick={likeHandler}>Dodaj like</button>
        <span>{totalLikes}</span>
        </>
    )
}

export default Likes;