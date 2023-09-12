import { Outlet } from "react-router-dom";

import AccountNavbar from "./AccountNavbar";
import Modal from "../../UI/Modal";
import classes from "./AccountRoot.module.css";

const AccountRoot = () => {
  return (
    <>
      <Modal>
        <div className={classes.account}>
          <AccountNavbar />
          <div className={classes.main}>
            <Outlet />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountRoot;
