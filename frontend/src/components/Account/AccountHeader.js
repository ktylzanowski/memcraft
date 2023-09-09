import ChangeIcon from "./ChangeIcon";
import ChangePassword from "./ChangePassword";
import AuthContext from "../../context/AuthContext";
import classes from "./AccountHeader.module.css";
import { useContext } from "react";
import IconUI from "../../UI/IconUI";

const AccountHeader = () => {
  const { user, icon } = useContext(AuthContext);
  const imageUrl = `http://127.0.0.1:8000/media/icons/${icon}`;

  return (
    <>
      <div className={classes.iconContainer}>
        <div className={classes.infoUser}>
          <a
            href="https://www.youtube.com/watch?v=B6ufVLfBKuU"
            target="_blank"
            rel="noreferrer"
          >
            <IconUI src={imageUrl} />
          </a>

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
