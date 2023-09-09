import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button2 from "../../UI/Button2";
import IconUI from "../../UI/IconUI";
import AuthContext from "../../context/AuthContext";
function ChangeIcon() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(false);

  const { setIcon } = useContext(AuthContext);

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
    const response = await fetch("http://127.0.0.1:8000/accounts/userinfo/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + String(token.access),
      },
      body: JSON.stringify({ icon: photoName }),
    });
    const responseData = await response.json();
    if (response.ok) {
      setIcon(responseData.data.icon);
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
              onClick={() => handlePhotoClick(photo.name)}
            />
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangeIcon;
