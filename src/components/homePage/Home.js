import styles from './Home.module.css';
import NavBar from "./navBar/NavBar";
import React from "react";
const Home = () => {

    return(
      <div className={`${styles['home']}`}>
          <NavBar></NavBar>
      </div>
    );
}

export default Home