import "./Logo.css";
import logoImage from "../../../../assets/images/logo.png";
const Logo = (): JSX.Element => {
  return (
    <div className="Logo">
      <img src={logoImage} alt="logo" />
    </div>
  );
};

export default Logo;
