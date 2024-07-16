import styles from './Home.module.css';
import ItemInfo from "./itemInfo/ItemInfo";
import ItemVideo from "./itemVideo/ItemVideo";
import NavBar from "./navbar/NavBar";
import React from "react";
import TopInfo from "./topInfo/TopInfo";
import SaleTimer from "./saleTimer/SaleTimer";
import ItemInfoLines from "./itemInfoLines/ItemInfoLines";
import ItemComments from "./itemComments/ItemComments";
import OrderCreation from "./orderForm/OrderCreation";


const Home = () => {

    return(
      <div className={`${styles['home']}`}>
          <NavBar></NavBar>
          <TopInfo></TopInfo>
          <SaleTimer></SaleTimer>
          <ItemInfo></ItemInfo>
          <ItemVideo></ItemVideo>
          <ItemInfoLines></ItemInfoLines>
          <ItemComments></ItemComments>
          <SaleTimer></SaleTimer>
          <OrderCreation></OrderCreation>
          <NavBar></NavBar>
      </div>
    );
}

export default Home