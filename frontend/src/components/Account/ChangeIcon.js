import classes from "./Account.module.css";
import { useState } from "react";
const ChangeIcon = () => {
  const [showIcons, setShowIcons] = useState(false);
  const handlerIcons = () => {
    setShowIcons(!showIcons);
  };
  return (
    <>
      <button onClick={handlerIcons} className={classes.button}>
        Zmień ikonę
      </button>
      {showIcons && <p className={classes.title}>icons</p>}
    </>
  );
};

export default ChangeIcon;
