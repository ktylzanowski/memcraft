import ChangeIcon from "./ChangeIcon";
import ChangePassword from "./ChangePassword";
import AuthContext from "../../context/AuthContext";
import classes from "./AccountHeader.module.css";
import { useContext } from "react";

const AccountHeader = () => {
  const { user } = useContext(AuthContext);
  const imageUrl = `http://127.0.0.1:8000/media/icons/${user.icon}`;

  return (
    <>
      <div className={classes.iconContainer}>
        <div className={classes.infoUser}>
          <img src={imageUrl} alt="icon" />
          <span className={classes.username}>{user.username}</span>
        </div>
        <ChangeIcon />
      </div>
      <div className={classes.changePassword}>
        <ChangePassword />
      </div>
    </>
  );
};

export default AccountHeader;
