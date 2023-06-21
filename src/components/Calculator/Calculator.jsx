import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { BsFillBackspaceFill } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
const Calculator = ({ theme }) => {
  const [screenNum, setScreenNum] = useState("0");

  const [backScreenNum, setBackScreenNum] = useState(null);

  const [result, setResult] = useState(null);

  const [actualOp, setActualOp] = useState(null);

  //Settare il numero principale

  const setNum = (value) => {
    result && setResult(() => null);
    setScreenNum((prev) => (prev !== "0" ? prev + value : value));
  };

  //Settare il numero secondario

  const setBack = (value) => {
    if (backScreenNum) {
      switch (actualOp) {
        case "/":
          setBackScreenNum(
            () => `${Number(backScreenNum) / Number(screenNum)}`
          );
          setActualOp(() => value);
          setScreenNum(() => "0");
          return;

        case "x":
          setBackScreenNum(
            () => `${Number(backScreenNum) * Number(screenNum)}`
          );
          setActualOp(() => value);
          setScreenNum(() => "0");
          return;

        case "+":
          setBackScreenNum(
            () => `${Number(backScreenNum) + Number(screenNum)}`
          );
          setActualOp(() => value);
          setScreenNum(() => "0");
          return;

        case "-":
          setBackScreenNum(
            () => `${Number(backScreenNum) - Number(screenNum)}`
          );
          setActualOp(() => value);
          setScreenNum(() => "0");
          return;
      }
    } else {
      result && setResult(() => null);
      setBackScreenNum(() => `${screenNum}`);
      setScreenNum(() => "0");
      setActualOp(() => value);
    }
  };

  //Cancellare la singola cifra
  const back = () => {
    result && setResult(() => null);
    setScreenNum((prev) => prev.slice(0, prev.length - 1));
  };

  //Azzerare tutto

  const deleteAll = () => {
    result && setResult(() => null);
    setScreenNum(() => "0");
    setBackScreenNum(() => null);
    setActualOp(() => null);
  };

  //equazione

  const equalTo = () => {
    if (actualOp) {
      switch (actualOp) {
        case "/":
          if (screenNum === "0") {
            setResult(() => "Errore");
          } else {
            backScreenNum === "0"
              ? setResult(() => "0")
              : setResult(() => Number(backScreenNum) / Number(screenNum));
          }
          return;

        case "x":
          backScreenNum === "0" || screenNum === "0"
            ? setResult(() => "0")
            : setResult(() => Number(backScreenNum) * Number(screenNum));
          return;

        case "+":
          setResult(() => Number(backScreenNum) + Number(screenNum));
          return;

        case "-":
          backScreenNum === screenNum
            ? setResult(() => "0")
            : setResult(() => Number(backScreenNum) - Number(screenNum));
          return;
      }
    }
  };

  //Rendere un numero negativo

  const negNum = () => {
    result && setResult(() => null);
    screenNum !== "0" &&
      setScreenNum((prev) =>
        prev.includes("-") ? String(-1 * Number(prev)) : "-" + prev
      );
  };

  //Evitare bug legati al risultato e favoire il corretto funzinamento dell'applicativo

  useEffect(() => {
    !screenNum && setScreenNum(() => "0");
    if (result) {
      setBackScreenNum(() => null);
      setScreenNum(() => String(result));
      setActualOp(() => null);
    }
  }, [screenNum, result]);

  return (
    <div
      className={`${styles.Calculator} ${theme === "dark" && styles.dark} ${
        theme === "blueviolet" && styles.blueviolet
      } ${theme === "classic" && styles.classic} ${
        theme === "monochrome" && styles.monochrome
      }`}
    >
      <div className={styles.screen}>
        <div className={styles.numbers}>
          <div className={styles.secondNum}>
            {backScreenNum} {actualOp}
          </div>
          <div className={styles.firstNum}>{screenNum}</div>
        </div>
      </div>
      <div className={styles.grid}>
        <div
          onClick={deleteAll}
          className={`${styles.button} ${styles.operator} ${
            theme === "classic" && styles.c
          }`}
        >
          {screenNum === "0" && !backScreenNum ? "AC" : "C"}
        </div>
        <div onClick={back} className={`${styles.button} ${styles.backNum}`}>
          <BsFillBackspaceFill />
        </div>
        <div
          onClick={() => setBack("/")}
          className={`${styles.button} ${styles.operator}`}
        >
          /
        </div>
        <div onClick={() => setNum("1")} className={styles.button}>
          1
        </div>
        <div onClick={() => setNum("2")} className={styles.button}>
          2
        </div>
        <div onClick={() => setNum("3")} className={styles.button}>
          3
        </div>
        <div
          onClick={() => setBack("x")}
          className={`${styles.button} ${styles.operator}`}
        >
          x
        </div>
        <div onClick={() => setNum("4")} className={styles.button}>
          4
        </div>
        <div onClick={() => setNum("5")} className={styles.button}>
          5
        </div>
        <div onClick={() => setNum("6")} className={styles.button}>
          6
        </div>
        <div
          onClick={() => setBack("+")}
          className={`${styles.button} ${styles.operator}`}
        >
          +
        </div>
        <div onClick={() => setNum("7")} className={styles.button}>
          7
        </div>
        <div onClick={() => setNum("8")} className={styles.button}>
          8
        </div>
        <div onClick={() => setNum("9")} className={styles.button}>
          9
        </div>
        <div
          onClick={() => setBack("-")}
          className={`${styles.button} ${styles.operator}`}
        >
          -
        </div>
        <div onClick={negNum} className={`${styles.button} ${styles.operator}`}>
          -/+
        </div>
        <div onClick={() => setNum("0")} className={styles.button}>
          0
        </div>
        <div onClick={equalTo} className={`${styles.button} ${styles.equal}`}>
          =
        </div>
      </div>
    </div>
  );
};

export default Calculator;
