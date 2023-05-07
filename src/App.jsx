import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Calculator from "./components/Calculator/Calculator";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [theme, setTheme] = useState("main");

  useEffect(() => {
    localStorage.getItem("theme") &&
      setTheme(() => JSON.parse(localStorage.getItem("theme")));
  }, []);

  return (
    <div
      className={`${styles.main} ${theme === "dark" && styles.dark} ${
        theme === "blueviolet" && styles.blueviolet
      } ${theme === "classic" && styles.classic} ${
        theme === "monochrome" && styles.monochrome
      }`}
    >
      <Navbar theme={theme} setTheme={setTheme} />
      <Calculator theme={theme} />
    </div>
  );
}
export default App;
