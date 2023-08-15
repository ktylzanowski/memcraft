import Modal from "../../UI/Modal";
import classes from "./Account.module.css";
import UserInfoForm from "./UserInfoForm";
import AccountNavbar from "./AccountNavbar";
import AccountHeader from "./AccountHeader";

const Account = () => {
  return (
    <Modal>
      <div className={classes.account}>
        <AccountNavbar />
        <div className={classes.main}>
          <AccountHeader />
          <UserInfoForm />
        </div>
      </div>
    </Modal>
  );
};

export default Account;
