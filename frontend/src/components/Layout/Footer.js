import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.author}>Kacper Tylzanowski</div>
      <div className={classes.links}>Memcraft</div>
    </footer>
  );
};

export default Footer;
