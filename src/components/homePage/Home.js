import styles from './Home.module.css';
import ItemInfo from "./itemInfo/ItemInfo";
import ItemVideo from "./itemVideo/ItemVideo";
import NavBar from "./navBar/NavBar";
import React, {useState} from "react";
import TopInfo from "./topInfo/TopInfo";
import SaleTimer from "./saleTimer/SaleTimer";
import ItemInfoLines from "./itemInfoLines/ItemInfoLines";
import ItemComments from "./itemComments/ItemComments";
import OrderCreation from "./orderForm/OrderCreation";
import SaleInfiniteLine from "./saleInfiniteLine/SaleInfiniteLine";
import ModalOrderForm from "./orderForm/modalForm/ModalOrderForm";
import ResultDialogs from "./resultDialogs/ResultDialogs";


const Home = () => {
    const [isOpen, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        type: null,
        size: null,
        color: null,
        keyHolder: null
    });
    const [result, setResult] = useState('');

    const openModalForm = (type, size, color, keyHolder) => {
        setFormValues({
            type,
            size,
            color,
            keyHolder
        });
        setOpen(true);
    };

    return (
        <div className={`${styles['home']} nonDraggable`}>
            <div id='home'>
                <NavBar></NavBar>
            </div>
            <TopInfo></TopInfo>
            <SaleTimer></SaleTimer>
            <div id='bag'>
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
                          openForm={openModalForm}
                          setResult={setResult}
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
                          openForm={openModalForm}
                          setResult={setResult}
                />
            </div>
            <div id='video'>
                <ItemVideo></ItemVideo>
            </div>
            <ItemInfoLines></ItemInfoLines>
            <div id='comments'>
                <ItemComments></ItemComments>
            </div>
            <SaleTimer></SaleTimer>
            <div id='order'>
                <OrderCreation setResult={setResult}></OrderCreation>
            </div>
            <NavBar></NavBar>
            <ModalOrderForm isOpen={isOpen}
                            setOpen={setOpen}
                            formValues={formValues}
                            result={result}
                            setResult={setResult}
            />
            <ResultDialogs result={result}
                           setResult={setResult}
            />
        </div>
    );
}

export default Home