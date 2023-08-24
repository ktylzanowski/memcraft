import classes from "./AccountNavbar.module.css"

const AccountNavbar = () => {
  return (
    <>
      <div className={classes.nav}>
        <ul>
          <li>Główne dane</li>
          <li>Moje memy</li>
          <li>Polubione i nie</li>
          <li>Komentarze</li>
          <li>Historia zakupów</li>
        </ul>
      </div>
    </>
  );
};

export default AccountNavbar;
