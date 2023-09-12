import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import notifcationDeactive from "../../images/notificationDeactivate.png";
import notificationActive from "../../images/notificationActive.png";
import classes from "./Notifications.module.css";
import useNotification from "../../hooks/useNotifications";
;

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
        className={`${classes.icon} ${
          isRead ? classes.activeIcon : classes.inactiveIcon
        }`}
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
              <Link
                to={`/meme/${notification.meme}`}
                key={notification.id}
                onClick={handleClose}
              >
                <p className={classes.text}>{notification.content}</p>
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
