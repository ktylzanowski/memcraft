import ChangeIcon from "./ChangeIcon";
import ChangePassword from "./ChangePassword";
import AuthContext from "../../context/AuthContext";
import classes from "./Account.module.css";
import { useActionData } from "react-router";
import ModalMessage from "../../UI/ModalMessage";
import { useContext } from "react";

const AccountHeader = () => {
  const { user } = useContext(AuthContext);
  const imageUrl = `http://127.0.0.1:8000/media/icons/${user.icon}`;
  const message = useActionData();

  return (
    <>
      {message && <ModalMessage>{message.message}</ModalMessage>}
      <div className={classes.iconContainer}>
        <div className={classes.infoUser}>
          <img src={imageUrl} alt="icon" />
          <span className={classes.title}>{user.username}</span>
        </div>
        <ChangeIcon />
      </div>
      <div className={classes.changePassword}>
        <ChangePassword errors={message} />
      </div>
    </>
  );
};

export default AccountHeader;
