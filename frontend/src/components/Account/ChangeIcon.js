import classes from "./Account.module.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3" style={{ color: "black" }}>Wybierz ikonę</Popover.Header>
    <Popover.Body>
      
    </Popover.Body>
  </Popover>
);

const ChangeIcon = () => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <button className={classes.button}>
        Zmień ikonę
      </button>
  </OverlayTrigger>
);


export default ChangeIcon;
