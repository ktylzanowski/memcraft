import Modal from "../UI/Modal";
import classes from "./Account.module.css";

const Account = () => {
  return (
    <Modal>
      <div className={classes.account}>
        <div className={classes.nav}>
          <ul>
            <li>Główne dane</li>
            <li>Moje memy</li>
          </ul>
        </div>
        <div className={classes.main}></div>
      </div>
    </Modal>
  );
};

export default Account;
