import {useState} from 'react';
import style from './Carousel.module.css';
import styled from 'styled-components';

const MainWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => !['mainWidth', 'mainHeight',
        'heightNumber', 'arrowSize', 'heightMetric'].includes(prop)
})`
    width: ${props => props.mainWidth};
    height: ${props => props.mainHeight};
    overflow: hidden;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

    img {
        width: ${props => props.mainWidth};
        height: ${props => props.mainHeight};
        object-fit: cover;
    }

    .arrow {
        height: ${props => props.arrowSize + props.heightMetric};
        width: ${props => props.arrowSize + props.heightMetric};
        position: absolute;
        top: ${props => (props.heightNumber - props.arrowSize) / 2 + props.heightMetric};
    }
`;

const MainSlider = styled.div.withConfig({
    shouldForwardProp: (prop) => !['xPosition', 'widthMetric'].includes(prop)
})`
    display: flex;
    width: 100%;
    height: 100%;
    transform: ${props => `translateX(${props.xPosition + props.widthMetric})`};
    transition: transform 0.6s ease-in-out;
`;

const SmallWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => !['widthNumber', 'smallSize'].includes(prop)
})`
    width: ${props => props.widthNumber - 0.2}vw;
    height: ${props => props.smallSize};
    margin-top: 2vh;
    padding-bottom: 0.2vw;
    padding-right: 0.2vw;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    border-radius: 1vw;

    img {
        width: ${props => props.smallSize};
        height: ${props => props.smallSize};
        object-fit: cover;
    }

    .cover {
        box-shadow: 0.2vw 0.2vw 0.2vw rgba(0, 0, 0, 0.3);
    }

    .cover:not(:first-child) {
        margin-left: 2vw;
    }

    .blurImage {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        width: ${props => props.smallSize};
        height: ${props => props.smallSize};
    }
`;

const SmallSlider = styled.div.withConfig({
    shouldForwardProp: (prop) => !['xPosition'].includes(prop)
})`
    display: flex;
    height: 100%;
    transform: ${props => `translateX(${props.xPosition}vw)`};
    transition: transform 0.6s ease-in-out;
`;

const Carousel = (props) => {
    let heightNumber = props.mainHeight.match(/\d+/)[0];
    const heightMetric = props.mainHeight.substring(heightNumber.length);
    heightNumber = +heightNumber;

    let widthNumber = props.mainWidth.match(/\d+/)[0];
    const widthMetric = props.mainWidth.substring(widthNumber.length);
    widthNumber = +widthNumber;

    const smallImageSize = +props.smallSize.match(/\d+/)[0];
    const maxSmallOffset = -(smallImageSize * props.images.length
        + 2 * (props.images.length - 1) + 0.2 - widthNumber);
    const arrowSize = heightNumber / 8;

    const [index, setIndex] = useState(0);
    const [xPosition, setXPosition] = useState(0);
    const [smallXPosition, setSmallXPosition] = useState(0);

    const setIndexAndPosition = (newIndex) => {
        setIndex(newIndex);
        setXPosition(-newIndex * widthNumber);
        setSmallXPosition(Math.max(
            -newIndex * (smallImageSize + 2), maxSmallOffset));
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
            <MainWrapper className={style.coveredImage} mainWidth={props.mainWidth} mainHeight={props.mainHeight}
                         arrowSize={arrowSize} heightNumber={heightNumber} heightMetric={heightMetric}>
                <MainSlider xPosition={xPosition} widthMetric={widthMetric}>
                    {props.images.map((image, i) => (
                        <img src={image} alt={image} key={i}/>
                    ))}
                </MainSlider>
                <img className={`arrow ${style.arrowLeft}`} src='/home/arrow.png' alt='arrow'
                     onClick={handleClickPrev}/>
                <img className={`arrow ${style.arrowRight}`} src='/home/arrow.png' alt='arrow'
                     onClick={handleClickNext}/>
            </MainWrapper>
            <SmallWrapper widthNumber={widthNumber} smallSize={props.smallSize}>
                <SmallSlider xPosition={smallXPosition}>
                    {props.images.map((image, i) => (
                        <div className={`cover ${style.coveredImage}`}
                             key={i} onClick={() => setIndexAndPosition(i)}>
                            <img src={image} alt={image}/>
                            <div className={`blurImage ${index === i ? '' : 'hidden'}`}/>
                        </div>
                    ))}
                </SmallSlider>
            </SmallWrapper>
        </div>
    )
}

export default Carousel