import Modal from "../../UI/Modal";
import classes from "./Account.module.css";
import UserInfoForm from "./UserInfoForm";
import AccountNavbar from "./AccountNavbar";
import AccountHeader from "./AccountHeader";
import { useActionData } from "react-router";
import ModalMessage from "../../UI/ModalMessage";


const Account = () => {
  const message = useActionData();
  return (
    <Modal>
      {message && <ModalMessage>{message.message}</ModalMessage>}
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
