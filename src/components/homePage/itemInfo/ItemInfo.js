import style from './ItemInfo.module.css';
import Carousel from "./Carousel";
import ItemFeature from "./ItemFeature";
import DropdownList from "../orderForm/inputs/DropdownList";
import React, {useState} from "react";

const ItemInfo = () => {
    const colors = [{
        title: 'Чорний',
        value: 'Чорний'
    }, {
        title: 'Синій',
        value: 'Синій'
    }, {
        title: 'Червоний',
        value: 'Червоний'
    }, {
        title: 'Коричневий',
        value: 'Коричневий'
    }];
    const [color, setColor] = useState(colors[0]);
    const handleColorChange = (e) => {
        setColor({
            title: e.title,
            value: e.value
        });
    }

    const sizes = [{
        title: 'Стандартний L',
        value: 'L'
    }, {
        title: 'Великий XL',
        value: 'XL'
    }];
    const [size, setSize] = useState(sizes[0]);
    const handleSizeChange = (e) => {
        setSize({
            title: e.title,
            value: e.value
        });
    }

    const keyHolders = [{
        title: 'З ключницею',
        value: true
    }, {
        title: 'Без ключниці',
        value: false
    }];
    const [keyHolder, setKeyHolder] = useState(keyHolders[0]);
    const handleKeyHolderChange = (e) => {
        setKeyHolder({
            title: e.title,
            value: e.value
        });
    }

    return (
        <div className={'centeredComponent'}>
            <div className={`row ${style.content}`}>
                <div className={style.slider}>
                    <Carousel mainWidth='30vw' mainHeight='60vh'
                              images={['/home/mainImage.webp',
                                  '/home/img2.webp', '/home/mainImage.webp',
                                  '/home/mainImage.webp', '/home/mainImage.webp']}/>
                </div>
                <div className={`column ${style.infoText}`}>
                    <h3 className={style.titleText}>СУМКА БАНАНКА З НАТУРАЛЬНОЇ ШКІРИ РОЗМІР L або XL!</h3>
                    <div className={`row ${style.price}`}>
                        <p className={style.oldPrice}>10000₴</p>
                        <p className={style.newPrice}>15000₴</p>
                    </div>
                    <div className={`column`}>
                        <div className={style.option}>
                            <DropdownList name='fill' placeholder='Колір'
                                          value={color} editable={false}
                                          options={colors} onChange={handleColorChange}
                            />
                        </div>
                        <div className={style.option}>
                            <DropdownList name='fill' placeholder='Розмір'
                                          value={size} editable={false}
                                          options={sizes} onChange={handleSizeChange}
                            />
                        </div>
                        <div className={style.option}>
                            <DropdownList name='fill' placeholder='Ключниця'
                                          value={keyHolder} editable={false}
                                          options={keyHolders} onChange={handleKeyHolderChange}
                            />
                        </div>
                    </div>
                    <ItemFeature
                        text='Кольори: чорний, темно-коричневий, світло-коричневий, вишневий, рудий, бежевий, світло-бежевий'/>
                    <ItemFeature text='Виконана з натуральної шкіри'/>
                    <ItemFeature text='Міцна, надійна та практична підкладка'/>
                    <ItemFeature
                        text='Всередині три відділення, щоб зручно розділити телефон, ключі, гроші та різні дрібнички'/>
                    <ItemFeature text='Металевий бігунок з фіксатором, який надійно і плавно їздить по блискавці'/>
                    <ItemFeature text='Розмір L: 13х27х8,5 см'/>
                    <ItemFeature text='Розмір XL: 30х20х9 см'/>
                    <button className={style.orderButton}>Замовити</button>
                </div>
            </div>
        </div>
    )
}

export default ItemInfo