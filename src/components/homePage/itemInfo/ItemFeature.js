import style from './ItemFeature.module.css';

const ItemFeature = (props) => {
    return <div className={`row ${style.feature}`}>
        <img className={style.mark}
             src='/home/mark.png' alt='mark'/>
        <p className={style.text}>{props.text}</p>
    </div>;
}

export default ItemFeature;