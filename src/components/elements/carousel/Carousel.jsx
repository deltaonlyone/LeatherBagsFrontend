import {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Carousel.module.css';

const Carousel = ({images}) => {
    const mainWrapper = useRef();
    const mainSlider = useRef();
    const mainWrapperWidth = useRef(0);
    const mainSliderWidth = useRef(0);

    const smallSlider = useRef();
    const smallSliderImages = useRef([]);
    const maxSmallOffset = useRef(0);
    const smallImageWidth = useRef(0);

    const additionalImages = images.length;
    const newImages = [...images, ...images, ...images];

    const [sliderImages] = useState([...newImages]);
    const [transitionDuration, setTransitionDuration] = useState(-1);

    const [index, setIndex] = useState(additionalImages);
    const [xPosition, setXPosition] = useState(0);
    const [smallXPosition, setSmallXPosition] = useState(0);

    const moveTo = useRef(0);
    const [restarted, setRestarted] = useState(false);

    const calculateSmallXPosition = useCallback((index) => {
        return Math.min(0, Math.max(
            -(index - 1) * smallImageWidth.current, maxSmallOffset.current));
    }, []);

    const movePosition = (pos) => {
        if (moveTo.current * pos >= 0) {
            moveTo.current += pos;
            if (Math.abs(moveTo.current) === 1) {
                setIndexAndPosition(index + moveTo.current);
            }
        } else {
            moveTo.current = pos;
        }
    }

    const setIndexAndPosition = (newIndex, withAnimation = true) => {
        if (withAnimation) {
            setTransitionDuration(0.6);
        } else {
            setTransitionDuration(0);
        }

        if (newIndex !== index || !withAnimation) {
            setIndex(newIndex);
            setXPosition(newIndex * 100);
            setSmallXPosition(calculateSmallXPosition(newIndex));
        }
    };

    const onTransformEnd = () => {
        if (moveTo.current > 0) {
            moveTo.current -= 1;
        } else if (moveTo.current < 0) {
            moveTo.current += 1;
        }

        if (index < additionalImages) {
            const newIndex = additionalImages + index % images.length;
            setIndexAndPosition(newIndex, false);
            setRestarted(true);
        } else if (index >= images.length + additionalImages) {
            const newIndex = additionalImages + (index - additionalImages) % images.length;
            setIndexAndPosition(newIndex, false);
            setRestarted(true);
        } else if (moveTo.current > 0) {
            setIndexAndPosition(index + 1);
        } else if (moveTo.current < 0) {
            setIndexAndPosition(index - 1);
        }
    };

    useEffect(() => {
        if (restarted) {
            setRestarted(false);
            setTimeout(() => {
                onTransformEnd();
            }, 100);
        }
    }, [restarted]);

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
        }, 10);
    }, []);

    const handleClickPrev = (e) => {
        e.stopPropagation();

        if (index > 1) {
            movePosition(-1);
        }
    };

    const handleClickNext = (e) => {
        e.stopPropagation();

        if (index < sliderImages.length - 1) {
            movePosition(1)
        }
    };

    const mouseStart = useRef(0);
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
    }

    const dragPosX = (x) => {
        const currentTime = new Date();
        if (currentTime - lastUpdateTime.current > throttleInterval.current) {
            setTransitionDuration(draggingDuration.current);
            lastUpdateTime.current = currentTime;
            setDraggingIndex(x);
        }
    };

    const setDraggingIndex = (x) => {
        let xDiff = (mouseStart.current - x) / mainWrapperWidth.current;
        let move = xDiff < 0 ? Math.floor(xDiff + 0.3) : Math.ceil(xDiff - 0.3);

        if (move) {
            mouseStart.current = x;
            movePosition(move);
        }
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
                         onTransitionEnd={onTransformEnd}
                         style={{
                             transform: `translateX(${-xPosition}%)`,
                             transition: `transform ${transitionDuration}s 
                                    ${dragged ? 'linear' : 'ease-in-out'}`
                         }}
                         ref={mainSlider}>
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