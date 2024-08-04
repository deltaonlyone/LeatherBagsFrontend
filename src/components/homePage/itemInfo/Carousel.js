import {useState} from 'react';
import style from './Carousel.module.css';
import styled from 'styled-components';

const MainSlider = styled.div.withConfig({
    shouldForwardProp: (prop) => !['index'].includes(prop)
})`
    display: flex;
    width: 100%;
    height: 100%;
    transform: ${props => `translateX(-${props.index * 100}%)`};
    transition: transform 0.6s ease-in-out;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const SmallSlider = styled.div.withConfig({
    shouldForwardProp: (prop) => !['xPosition'].includes(prop)
})`
    display: flex;
    width: fit-content;
    transform: ${props => `translateX(${props.xPosition}%)`};
    transition: transform 0.6s ease-in-out;
`;

const Carousel = (props) => {
    const [index, setIndex] = useState(0);
    const [xPosition, setXPosition] = useState(0);

    const maxSmallOffset = -(props.images.length - 3) * 35;

    const setIndexAndPosition = (newIndex) => {
        setIndex(newIndex);
        setXPosition(Math.min(0, Math.max(
            -(newIndex - 1) * 35, maxSmallOffset)));
    };

    const handleClickPrev = () => {
        if (index === 0) {
            setIndexAndPosition(props.images.length - 1);
        } else {
            setIndexAndPosition(index - 1);
        }
    };

    const handleClickNext = () => {
        if (index === props.images.length - 1) {
            setIndexAndPosition(0);
        } else {
            setIndexAndPosition(index + 1);
        }
    };

    return (
        <div className={`column`}>
            <div className={`${style.aspectRatioBox} ${style.ratio120}`}>
                <div className={`${style.mainWrapper} ${style.coveredImage}`}>
                    <MainSlider index={index}>
                        {props.images.map((image, i) => (
                            <img src={image} alt={image} key={i}/>
                        ))}
                    </MainSlider>
                    <img className={`${style.arrow} ${style.arrowLeft}`} src='/home/arrow.png' alt='arrow'
                         onClick={handleClickPrev}/>
                    <img className={`${style.arrow} ${style.arrowRight}`} src='/home/arrow.png' alt='arrow'
                         onClick={handleClickNext}/>
                </div>
            </div>
            <div className={style.smallWrapper}>
                <SmallSlider xPosition={xPosition}>
                    {props.images.map((image, i) => (
                        <div className={`${style.cover} ${style.coveredImage}`}
                             key={i} onClick={() => setIndexAndPosition(i)}>
                            <img src={image} alt={image}/>
                            <div className={`${style.blurImage} ${index === i ? '' : 'hidden'}`}/>
                        </div>
                    ))}
                </SmallSlider>
            </div>
        </div>
    )
}

export default Carousel