import Logo from "../../assets/logo-voitto-white-full.png";
import "./Header.css";
export const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt="Logo Voitto" />
      </div>
      <div className="title">
        <h2>Livraria</h2>
      </div>
    </div>
  );
};
