import {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Carousel.module.css';

const Carousel = ({images}) => {
    const mainWrapper = useRef();
    const mainWrapperWidth = useRef(0);
    const mainSliderWidth = useRef(0);

    const smallSlider = useRef();
    const smallSliderImages = useRef([]);
    const maxSmallOffset = useRef(0);
    const smallImageWidth = useRef(0);

    const additionalImages = images.length * 1;
    const newImages = [...images, ...images, ...images];

    const [sliderImages] = useState([...newImages]);
    const [transitionDuration, setTransitionDuration] = useState(-1);

    const [index, setIndex] = useState(additionalImages);
    const [xPosition, setXPosition] = useState(0);
    const [smallXPosition, setSmallXPosition] = useState(0);

    const canMove = useRef(2);

    const calculateSmallXPosition = useCallback((index) => {
        return Math.min(0, Math.max(
            -(index - 1) * smallImageWidth.current, maxSmallOffset.current));
    }, []);

    const setIndexAndPosition = (newIndex, withAnimation = true) => {
        if (withAnimation) {
            setTransitionDuration(0.5);
        } else {
            setTransitionDuration(0);
        }

        if (newIndex !== index || !withAnimation) {
            if (withAnimation) {
                canMove.current -= 1;
            }

            setIndex(newIndex);
            setXPosition(newIndex * 100);
            setSmallXPosition(calculateSmallXPosition(newIndex));
        }
    };

    const resetSlider = () => {
        if (index < additionalImages) {
            const newIndex = additionalImages + index % images.length;
            setIndexAndPosition(newIndex, false);
        } else if (index >= images.length + additionalImages) {
            const newIndex = additionalImages + (index - additionalImages) % images.length;
            setIndexAndPosition(newIndex, false);
        }
        canMove.current = 2;
    };

    const calculateSliderSize = () => {
        if (!smallSlider.current || !mainWrapper.current
            || smallSliderImages.current.length < 2) {
            return;
        }

        mainWrapperWidth.current = mainWrapper.current.getBoundingClientRect().right -
            mainWrapper.current.getBoundingClientRect().left;
        mainSliderWidth.current = mainWrapperWidth.current * images.length;

        const firstLeft = smallSliderImages.current[0].getBoundingClientRect().left;
        const secondLeft = smallSliderImages.current[1].getBoundingClientRect().left;
        const lastRight = smallSliderImages
            .current[smallSliderImages.current.length - 1]
            .getBoundingClientRect().right;

        smallImageWidth.current = secondLeft - firstLeft;
        let imagesWidth = lastRight - firstLeft;
        maxSmallOffset.current = smallSlider.current.offsetWidth - imagesWidth;
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            calculateSliderSize();
            setIndexAndPosition(index, false);
        });
        setTimeout(() => {
            calculateSliderSize();
            setIndexAndPosition(additionalImages, false);
        }, 1);
    }, []);

    const handleClickPrev = (e) => {
        e.stopPropagation();

        if (canMove.current > 0 && index > 1) {
            setIndexAndPosition(index - 1);
        }
    };

    const handleClickNext = (e) => {
        e.stopPropagation();

        if (canMove.current > 0 && index < sliderImages.length - 1) {
            setIndexAndPosition(index + 1);
        }
    };

    const mouseStart = useRef(0);
    const indexStart = useRef(0);
    const [dragged, setDragged] = useState(false);

    const lastUpdateTime = useRef(new Date());
    const throttleInterval = useRef(100);
    const draggingDuration = useRef(+(throttleInterval.current / 1000).toFixed(2));

    const handleSliderDragStart = (e) => {
        e.stopPropagation();
        e.dataTransfer.setDragImage(new Image(), 0, 0);
        startDragging(e.clientX);
    };

    const handleSliderTouchStart = (e) => {
        startDragging(e.touches[0].clientX);
    };

    const handleSliderDrag = (e) => {
        dragPosX(e.clientX);
    };

    const handleSliderTouchMove = (e) => {
        dragPosX(e.changedTouches[0].clientX);
    };

    const handleSliderDragEnd = () => {
        stopDragging();
    };

    const handleSliderTouchEnd = () => {
        stopDragging();
    };

    const startDragging = (x) => {
        setDragged(true);
        mouseStart.current = x;
        indexStart.current = index;
    }

    const dragPosX = (x) => {
        const currentTime = new Date();
        if (dragged && currentTime - lastUpdateTime.current > throttleInterval.current) {
            setTransitionDuration(draggingDuration.current);
            setDraggingIndex(x);

            lastUpdateTime.current = currentTime;
        }
    };

    const setDraggingIndex = (x) => {
        let xDiff = (mouseStart.current - x) / mainWrapperWidth.current;
        let indexDiff = xDiff < 0 ? Math.floor(xDiff + 0.2) : Math.ceil(xDiff - 0.2);
        indexDiff = Math.max(-2, Math.min(indexDiff, 2));
        let index = Math.max(0, Math.min(
            indexStart.current + indexDiff, sliderImages.length - 1));

        if (index < additionalImages ||
            index >= images.length + additionalImages) {
            stopDragging();
        }

        setIndexAndPosition(index);
    }

    const stopDragging = () => {
        setDragged(false);
    }

    return (
        <div className={`${styles.carousel} not-draggable`}>
            <div className={`${styles.aspectRatioBox} ${styles.ratio120}`}>
                <div className={`${styles.mainWrapper} ${styles.coveredImage}`}
                     ref={mainWrapper} draggable='true'
                     onDragStart={handleSliderDragStart}
                     onDrag={handleSliderDrag}
                     onDragEnd={handleSliderDragEnd}
                     onTouchStart={handleSliderTouchStart}
                     onTouchMove={handleSliderTouchMove}
                     onTouchEnd={handleSliderTouchEnd}>
                    <div className={styles.mainSlider}
                         onTransitionEnd={resetSlider}
                         style={{
                             transform: `translateX(${-xPosition}%)`,
                             transition: `transform ${transitionDuration}s 
                                    ${dragged ? 'linear' : 'ease-in-out'}`
                         }}>
                        {sliderImages.map((image, i) => (
                            <img draggable='false' src={image} alt={`sliderImg${i}`} key={i}/>
                        ))}
                    </div>
                </div>
                <img className={`${styles.arrow} ${styles.arrowLeft}`}
                     src='/home/arrow.png' alt='arrow'
                     draggable='false'
                     onClick={handleClickPrev}/>
                <img className={`${styles.arrow} ${styles.arrowRight}`}
                     src='/home/arrow.png' alt='arrow'
                     draggable='false'
                     onClick={handleClickNext}/>
            </div>
            <div className={styles.smallWrapper}>
                <div className={styles.smallSlider} ref={smallSlider}
                     style={{
                         transform: `translateX(${smallXPosition}px)`,
                         transitionDuration: `${transitionDuration}s`
                     }}>
                    {sliderImages.map((image, i) => (
                        <div className={`${styles.cover} ${styles.coveredImage}`}
                             key={i} onClick={() => setIndexAndPosition(i)}
                             ref={(el) => (smallSliderImages.current[i] = el)}>
                            <img src={image} alt={image}/>
                            <div className={`${styles.blurImage} ${index === i ? '' : 'hidden'}`}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel