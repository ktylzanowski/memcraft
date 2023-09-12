import { useActionData } from "react-router";

import UserInfoForm from "./UserInfoForm";
import AccountHeader from "./AccountHeader";
import ModalMessage from "../../UI/ModalMessage";

const Account = () => {
  const message = useActionData();
  return (
    <>
      {message && <ModalMessage>{message.message}</ModalMessage>}
      <AccountHeader />
      <UserInfoForm />
    </>
  );
};

export default Account;
