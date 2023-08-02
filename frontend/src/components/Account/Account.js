import { useContext } from "react";
import Modal from "../../UI/Modal";
import classes from "./Account.module.css";
import AuthContext from "../../context/AuthContext";
import UserInfoForm from "./UserInfoForm";
import AccountNavbar from "./AccountNavbar";
import ChangeIcon from "./ChangeIcon";
import ChangePassword from "./ChangePassword";
import { useActionData } from "react-router";
import ModalMessage from "../../UI/ModalMessage"

const Account = () => {
  const { user } = useContext(AuthContext);
  const message = useActionData()
  const imageUrl = `http://127.0.0.1:8000/media/icons/${user.icon}`;
  return (
    <Modal>
      {message && <ModalMessage>{message.message}</ModalMessage>}
      <div className={classes.account}>
        <AccountNavbar />
        <div className={classes.main}>
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
          <UserInfoForm />
        </div>
      </div>
    </Modal>
  );
};

export default Account;
