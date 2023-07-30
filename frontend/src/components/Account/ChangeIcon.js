import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import classes from "./Account.module.css";

function ChangeIcon() {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const photos = [
    {
      id: 1,
      url: "http://127.0.0.1:8000/media/icons/steveface.png",
      name: "steveface.png",
    },
    {
      id: 2,
      url: "http://127.0.0.1:8000/media/icons/zombieface.png",
      name: "zombieface.png",
    },
    {
      id: 3,
      url: "http://127.0.0.1:8000/media/icons/sheepface.png",
      name: "sheepface.png",
    },
    {
      id: 4,
      url: "http://127.0.0.1:8000/media/icons/pigface.png",
      name: "pigface.png",
    },
    {
      id: 5,
      url: "http://127.0.0.1:8000/media/icons/endermanface.png",
      name: "endermanface.png",
    },
    {
      id: 6,
      url: "http://127.0.0.1:8000/media/icons/creeperface.png",
      name: "creeperface.png",
    },
    {
      id: 7,
      url: "http://127.0.0.1:8000/media/icons/cowface.png",
      name: "cowface.png",
    },
  ];
  const handlePhotoClick = async (photoName) => {
    const token = JSON.parse(localStorage.getItem("authTokens"));
    const response = await fetch("http://127.0.0.1:8000/accounts/info/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + String(token.access),
      },
      body: JSON.stringify({'icon': photoName}),
    });
    if (response.ok) {
      console.log("OK");
      
    } else {
      console.log("BAD");
    }
  
  };
  return (
    <>
      <Button ref={target} onClick={() => setShow(!show)}>
        Wybierz ikonę
      </Button>
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.url}
                alt={`Zdjęcie ${photo.id}`}
                className={classes.icon}
                onClick={() => handlePhotoClick(photo.name)}
              />
            ))}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default ChangeIcon;
