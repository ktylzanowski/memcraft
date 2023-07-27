import classes from "./Account.module.css"

const AccountNavbar = () => {
  return (
    <>
      <div className={classes.nav}>
        <ul>
          <li>Główne dane</li>
          <li>Moje memy</li>
          <li>Newsletter</li>
          <li>Historia zakupów</li>
        </ul>
      </div>
    </>
  );
};

export default AccountNavbar;
