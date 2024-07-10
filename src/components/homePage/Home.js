import styles from './Home.module.css';
import NavBar from "./navBar/NavBar";
import React from "react";
import TopInfo from "./topInfo/TopInfo";
import SaleTimer from "./saleTimer/SaleTimer";
const Home = () => {

    return(
      <div className={`${styles['home']}`}>
          <NavBar></NavBar>
          <TopInfo></TopInfo>
          <SaleTimer></SaleTimer>
      </div>
    );
}

export default Home