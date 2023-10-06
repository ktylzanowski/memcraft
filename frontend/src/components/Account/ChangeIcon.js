import { useContext, useState } from "react";

import classes from "./ChangeIcon.module.css";
import Modal from "react-bootstrap/Modal";
import Button2 from "../../UI/Button2";
import IconUI from "../../UI/IconUI";
import AuthContext from "../../context/AuthContext";

function ChangeIcon() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [error, setError] = useState(false);
  const { setIcon } = useContext(AuthContext);

  const photos = [
    {
      id: 1,
      url: process.env.REACT_APP_API_URL + "static/icons/steveface.png",
      name: "steveface.png",
    },
    {
      id: 2,
      url: process.env.REACT_APP_API_URL + "static/icons/zombieface.png",
      name: "zombieface.png",
    },
    {
      id: 3,
      url: process.env.REACT_APP_API_URL + "static/icons/sheepface.png",
      name: "sheepface.png",
    },
    {
      id: 4,
      url: process.env.REACT_APP_API_URL + "static/icons/pigface.png",
      name: "pigface.png",
    },
    {
      id: 5,
      url: process.env.REACT_APP_API_URL + "static/icons/endermanface.png",
      name: "endermanface.png",
    },
    {
      id: 6,
      url: process.env.REACT_APP_API_URL + "static/icons/creeperface.png",
      name: "creeperface.png",
    },
    {
      id: 7,
      url: process.env.REACT_APP_API_URL + "static/icons/cowface.png",
      name: "cowface.png",
    },
    {
      id: 8,
      url: process.env.REACT_APP_API_URL + "static/icons/witherface.png",
      name: "witherface.png",
    },
    {
      id: 9,
      url: process.env.REACT_APP_API_URL + "static/icons/villagerface.png",
      name: "villagerface.png",
    },
    {
      id: 10,
      url: process.env.REACT_APP_API_URL + "static/icons/chickenface.png",
      name: "chickenface.png",
    },
    {
      id: 11,
      url: process.env.REACT_APP_API_URL + "static/icons/skeletonface.png",
      name: "skeletonface.png",
    },
    {
      id: 12,
      url:
        process.env.REACT_APP_API_URL + "static/icons/witherskeletonface.png",
      name: "witherskeletonface.png",
    },
    {
      id: 13,
      url: process.env.REACT_APP_API_URL + "static/icons/blazeface.png",
      name: "blazeface.png",
    },
    {
      id: 14,
      url: process.env.REACT_APP_API_URL + "static/icons/ghastface.png",
      name: "ghastface.png",
    },
    {
      id: 15,
      url: process.env.REACT_APP_API_URL + "static/icons/zombiepigmanface.png",
      name: "zombiepigmanface.png",
    },
    {
      id: 16,
      url: process.env.REACT_APP_API_URL + "static/icons/wolfface.png",
      name: "wolfface.png",
    },
    {
      id: 17,
      url: process.env.REACT_APP_API_URL + "static/icons/slimeface.png",
      name: "slimeface.png",
    },
    {
      id: 18,
      url: process.env.REACT_APP_API_URL + "static/icons/mooshroomface.png",
      name: "mooshroomface.png",
    },
  ];

  const handlePhotoClick = async (photoName) => {
    const token = JSON.parse(localStorage.getItem("authTokens"));
    setSelectedIcon(photoName);
    const response = await fetch(
      process.env.REACT_APP_API_URL + "accounts/userinfo/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(token.access),
        },
        body: JSON.stringify({ icon: photoName }),
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      setIcon(responseData.data.icon);
      setSelectedIcon(false)
      handleClose();
    } else {
      setError("Coś poszło nie tak!");
    }
  };
  return (
    <>
      <Button2 onClick={handleShow}>Zmień ikonę</Button2>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>
            {error ? error : "Kliknij na ikonę aby ją zmienić!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {photos.map((photo) => (
            <IconUI
              key={photo.id}
              src={photo.url}
              className={selectedIcon === photo.name ? classes.selectedIcon : null}
              onClick={() => handlePhotoClick(photo.name)}
            />
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangeIcon;
