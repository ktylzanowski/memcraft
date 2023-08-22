import AccountNavbar from "./AccountNavbar"
import { Outlet} from "react-router-dom";
import Modal from "../../UI/Modal";
import classes from  "./Account.module.css"

const AccountRoot = () =>{
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
}

export default AccountRoot