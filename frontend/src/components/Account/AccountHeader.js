import { useContext } from "react";

import ChangeIcon from "./ChangeIcon";
import ChangePassword from "./ChangePassword";
import AuthContext from "../../context/AuthContext";
import classes from "./AccountHeader.module.css";
import IconUI from "../../UI/IconUI";

const AccountHeader = () => {
  const { user, icon } = useContext(AuthContext);
  const imageUrl = process.env.REACT_APP_API_URL + `static/icons/${icon}`;

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
