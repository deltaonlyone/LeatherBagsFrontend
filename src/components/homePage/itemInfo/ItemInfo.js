import style from './ItemInfo.module.css';
import Carousel from "./Carousel";
import ItemFeature from "./ItemFeature";

const ItemInfo = () => {
    return (
        <div className={style.center}>
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