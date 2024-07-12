import styles from './Home.module.css';
import ItemInfo from "./itemInfo/ItemInfo";
import ItemVideo from "./itemVideo/ItemVideo";
import NavBar from "./navbar/NavBar";
import React from "react";
import TopInfo from "./topInfo/TopInfo";
import SaleTimer from "./saleTimer/SaleTimer";
import ItemInfoLines from "./itemInfoLines/ItemInfoLines";


const Home = () => {

    return (
        <div className={`${styles['home']}`}>
            <NavBar></NavBar>
            <TopInfo></TopInfo>
            <SaleTimer></SaleTimer>
            <ItemInfo></ItemInfo>
            <ItemVideo></ItemVideo>
            <ItemInfoLines></ItemInfoLines>
            <SaleTimer></SaleTimer>
            <NavBar></NavBar>
        </div>
    );
}

export default Home