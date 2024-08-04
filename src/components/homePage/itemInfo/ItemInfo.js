import style from './ItemInfo.module.css';
import Carousel from "./Carousel";
import ItemFeature from "./ItemFeature";
import DropdownList from "../orderForm/inputs/DropdownList";
import React, {useEffect, useState} from "react";
import {colorOptions, keyHolderOptions, sizeOptions} from "../bagsInfo/BagsOptions";
import handleBasicChange from "../orderForm/inputs/HandleChanges";
import {bagPrice, bagPriceFull} from "../bagsInfo/BagsPrices";

const ItemInfo = ({type, images, features}) => {
    const [sizes, setSizes] = useState(sizeOptions(type));
    const [size, setSize] = useState(sizes[0]);

    const [colors, setColors] = useState(colorOptions(type, size.value));
    const [color, setColor] = useState(colors[0]);

    const keyHolderStates = keyHolderOptions();
    const [keyHolder, setKeyHolder] = useState(keyHolderStates[0]);

    useEffect(() => {

    }, []);

    return (
        <div className={'centeredComponent'}>
            <div className={`row ${style.content}`}>
                <div className={style.slider}>
                    <Carousel mainWidth='30vw' mainHeight='60vh'
                              images={images}/>
                </div>
                <div className={`column ${style.infoText}`}>
                    <h3 className={style.titleText}>СУМКА БАНАНКА З НАТУРАЛЬНОЇ ШКІРИ РОЗМІР L або XL!</h3>
                    <div className={`row ${style.price}`}>
                        <p className={style.oldPrice}>{bagPriceFull(type, size.value, keyHolder.value)}₴</p>
                        <p className={style.newPrice}>{bagPrice(type, size.value, keyHolder.value)}₴</p>
                    </div>
                    <div className={`column ${style.optionList}`}>
                        <div className={style.option}>
                            <DropdownList name='fill' placeholder='Колір'
                                          value={color} editable={false}
                                          options={colors} onChange={handleBasicChange(setColor)}
                            />
                        </div>
                        <div className={style.option}>
                            <DropdownList name='fill' placeholder='Розмір'
                                          value={size} editable={false}
                                          options={sizes} onChange={handleBasicChange(setSize)}
                            />
                        </div>
                        <div className={style.option}>
                            <DropdownList name='fill' placeholder='Ключниця'
                                          value={keyHolder} editable={false}
                                          options={keyHolderStates} onChange={handleBasicChange(setKeyHolder)}
                            />
                        </div>
                    </div>
                    {features.map((e, i) =>
                        <ItemFeature text={e} key={i}/>)}
                    <button className={style.orderButton}>Замовити</button>
                </div>
            </div>
        </div>
    )
}

export default ItemInfo