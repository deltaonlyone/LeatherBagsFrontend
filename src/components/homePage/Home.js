import styles from './Home.module.css';
import ItemInfo from "./itemInfo/ItemInfo";
import ItemVideo from "./itemVideo/ItemVideo";
import NavBar from "./navBar/NavBar";
import React from "react";
import TopInfo from "./topInfo/TopInfo";
import SaleTimer from "./saleTimer/SaleTimer";
import ItemInfoLines from "./itemInfoLines/ItemInfoLines";
import ItemComments from "./itemComments/ItemComments";
import OrderCreation from "./orderForm/OrderCreation";
import SaleInfiniteLine from "./saleInfiniteLine/SaleInfiniteLine";


const Home = () => {

    return (
        <div className={`${styles['home']} nonDraggable`}>
            <NavBar></NavBar>
            <TopInfo></TopInfo>
            <SaleTimer></SaleTimer>
            <ItemInfo type={1}
                      images={[
                          '/home/mainImage.webp',
                          '/home/img2.webp', '/home/mainImage.webp',
                          '/home/mainImage.webp', '/home/mainImage.webp'
                      ]}
                      features={[
                          'Кольори: чорний, темно-коричневий, світло-коричневий, вишневий, рудий, бежевий, світло-бежевий',
                          'Виконана з натуральної шкіри',
                          'Міцна, надійна та практична підкладка',
                          'Всередині три відділення, щоб зручно розділити телефон, ключі, гроші та різні дрібнички',
                          'Металевий бігунок з фіксатором, який надійно і плавно їздить по блискавці',
                          'Розмір L: 13х27х8,5 см',
                          'Розмір XL: 30х20х9 см'
                      ]}
            />
            <SaleInfiniteLine></SaleInfiniteLine>
            <ItemInfo type={2}
                      images={[
                          '/home/mainImage.webp',
                          '/home/img2.webp', '/home/mainImage.webp'
                      ]}
                      features={[
                          'Кольори: чорний, темно-коричневий, світло-коричневий, вишневий, рудий, бежевий, світло-бежевий',
                          'Виконана з натуральної шкіри',
                          'Міцна, надійна та практична підкладка',
                          'Всередині три відділення, щоб зручно розділити телефон, ключі, гроші та різні дрібнички',
                          'Металевий бігунок з фіксатором, який надійно і плавно їздить по блискавці',
                          'Розмір L: 13х27х8,5 см'
                      ]}
            />
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