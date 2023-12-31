import classes from "./LikeIcon.module.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const LikeIcon = ({ src, alt, onClick }) => {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Musisz być zalogowany!
    </Tooltip>
  );

  return (
    <>
      {!token ? (
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <img src={src} alt={alt} onClick={onClick} className={classes.img} />
        </OverlayTrigger>
      ) : (
        <img src={src} alt={alt} onClick={onClick} className={classes.img} />
      )}
    </>
  );
};

export default LikeIcon;
