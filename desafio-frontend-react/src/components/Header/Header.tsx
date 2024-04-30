import styles from "./Header.module.css";

import logo from "./assets/img/logo-ot.png";
import userIcon from "./assets/svg/user-icon.svg";

import "primeicons/primeicons.css";

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <img className={styles.logo} src={logo} alt="Logo Oliveira Trust" />
      <div className={styles.headerLogin}>
        <button className={styles.headerButtonLogin}>
          <img src={userIcon} alt="Icone Usuário" />
          <span className={styles.userName}>Otávio Oliveira</span>
        </button>
        <button className={styles.headerButtonLogOut}>
          <span className="pi pi-sign-out" style={{ color: "#767676" }}></span>
        </button>
      </div>
    </div>
  );
}
