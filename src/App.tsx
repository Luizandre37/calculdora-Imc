import { useState } from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import { levels, calculateImc, Level } from "./helpers/imc";
import leftArrowImage from './assets/leftarrow.png';
import { GrideItem } from "./components/GridItem";

export const App = () => {
  const [heightFilder, setHeightFilder] = useState<number>(0);
  const [weightFilder, setWeightFilder] = useState<number>(0);
  const[toShow, setToShow] = useState<Level | null >(null)


  const handleCalculateButton = () => {
    if (heightFilder && weightFilder) {
      setToShow(calculateImc(heightFilder, weightFilder))
    } else {
      alert("Digite todos os campos");
    }
  };
  const handleBackButton = () => {
    setToShow(null);
    setHeightFilder(0);
    setWeightFilder(0)
  }


  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSider}>
          <h1>CALCULE O SEU IMC</h1>
          <p>
            O Índice de Massa Corporal (IMC) é a principal maneira de descobrir
            se você está com peso ideal ou se apresenta magreza, sobrepeso ou
            obesidade
          </p>
          <input
            type="number"
            placeholder=" Digite a sua altura Ex: 1.5 (em métros)"
            value={heightFilder > 0 ? heightFilder : ""}
            onChange={(e) => setHeightFilder(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder=" Digite  seu peso Ex: 75.3 (em kg)"
            value={weightFilder > 0 ? weightFilder : ""}
            onChange={(e) => setWeightFilder(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button onClick={handleCalculateButton} disabled={toShow ? true : false} >Calcular</button>
        </div>
        <div className={styles.rightSider}>
          {!toShow && 
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GrideItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton} >
              <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GrideItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default App;
