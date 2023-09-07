import Modal from "react-bootstrap/Modal";
import notifcationDeactive from "../../images/notificationDeactivate.png";
import notificationActive from "../../images/notificationActive.png";
import { useEffect, useState } from "react";
import classes from "./Notifications.module.css";
import useNotification from "../../hooks/useNotifications";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { notifications, markupNotifications, isRead } = useNotification();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show === true) {
      markupNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRead, show]);
  return (
    <>
      <img
        src={isRead ? notificationActive : notifcationDeactive}
        className={classes.icon}
        style={{ marginRight: "15px" }}
        onClick={handleShow}
        alt="Powiadomienia"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Powiadomienia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Link to={`/meme/${notification.meme}`} key={notification.id} onClick={handleClose}>
                <p className={classes.text} >
                  {notification.content}
                </p>
              </Link>
            ))
          ) : (
            <p style={{ color: "black" }}>Brak powiadomień</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Notifications;
