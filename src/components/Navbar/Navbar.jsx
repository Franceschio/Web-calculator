import { useState } from "react";
import styles from "./index.module.scss";

const Navbar = ({ theme, setTheme }) => {
  const [navbar, setNavbar] = useState(false);

  const activeNav = () => {
    setNavbar((prev) => !prev);
  };

  const changeTheme = (value) => {
    setTheme(() => value);
    setNavbar((prev) => !prev);
    localStorage.setItem("theme", JSON.stringify(value));
  };

  return (
    <div
      className={`${styles.Navbar} ${navbar && styles.navActive} ${
        theme === "dark" && styles.dark
      } ${theme === "blueviolet" && styles.blueviolet} ${
        theme === "classic" && styles.classic
      } ${theme === "monochrome" && styles.monochrome}`}
    >
      <div className={styles.nav}>
        <ul>
          <li onClick={() => changeTheme("main")} className={styles.theme}>
            <img
              src="https://img.icons8.com/?size=512&id=ujRmpOIupIsv&format=png"
              alt="Standard"
            />
            <p>Standard</p>
          </li>
          <li onClick={() => changeTheme("dark")} className={styles.theme}>
            <img
              src="https://img.icons8.com/?size=512&id=vMkgItIdhG6L&format=png"
              alt="dark"
            />
            <p>Dark</p>
          </li>
          <li
            onClick={() => changeTheme("blueviolet")}
            className={styles.theme}
          >
            <img
              src="https://img.icons8.com/?size=512&id=aqWDxhA3yiU1&format=png"
              alt="Blueviolet"
            />
            <p>Blueviolet</p>
          </li>
          <li onClick={() => changeTheme("classic")} className={styles.theme}>
            <img
              src="https://img.icons8.com/?size=512&id=12780&format=png"
              alt="Classic"
            />
            <p>Classic</p>
          </li>
          <li
            onClick={() => changeTheme("monochrome")}
            className={styles.theme}
          >
            <img
              src="https://img.icons8.com/?size=512&id=wJpVRUSplDTX&format=png"
              alt="Monochrome"
            />
            <p>Monochrome</p>
          </li>
        </ul>
      </div>
      <div onClick={activeNav} className={styles.openNav}>
        <p className={`${styles.navOpen} ${navbar && styles.navOpenActive}`}>
          {"<"}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
