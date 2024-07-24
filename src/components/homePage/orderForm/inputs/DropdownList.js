import styles from './Input.module.css';
import { useEffect, useRef, useState } from "react";

const DropdownList = ({ name, placeholder, value, editable, options, onChange, setError, checkErrorTrigger }) => {
    const [error, setErrorObject] = useState({
        hasError: false,
        message: ''
    });

    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const isShown = () => {
        return hovered || focused;
    }

    const [index, setIndex] = useState(0);
    const scrollableRef = useRef();
    const scrollInView = (index) => {
        if (scrollableRef.current) {
            const selectedOption = scrollableRef.current.children[index];
            if (selectedOption) {
                selectedOption.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onChange({ target: { value: options[index] } });
        } else if (event.key === 'ArrowUp' && index > 0) {
            event.preventDefault();
            scrollInView(index - 1);
            setIndex(index - 1);
        } else if (event.key === 'ArrowDown' && index < options.length - 1) {
            event.preventDefault();
            scrollInView(index + 1);
            setIndex(index + 1);
        }
    }

    const checkError = () => {
        if (!value) {
            setErrorObject({
                hasError: true,
                message: "Поле є обов'язковим"
            })
            return true;
        }

        setErrorObject({
            hasError: false,
            message: ''
        });
        return false;
    }

    useEffect(() => {
        if (checkErrorTrigger) {
            setError(checkError());
        }
    }, [checkErrorTrigger]);

    return (
        <div className={styles.inputColumn}>
            <div className={styles.dropdown}
                 onKeyDown={handleKeyDown}
                 onMouseEnter={() => setHovered(true)}
                 onMouseLeave={() => setHovered(false)}>
                <div
                    className={`row ${styles.inputWrapper} 
                        ${error.hasError ? styles.errorWrapper : ''}
                        ${isShown() ? styles.hoveredWrapper : ''}`}>
                    <input type='text' name={name}
                           className={`${styles.listInput} ${editable ? '' : styles.unEditable}`}
                           onChange={onChange} value={value}
                           onFocus={() => setFocused(true)}
                           onBlur={() => setFocused(false)}
                           placeholder={placeholder}
                           contentEditable={editable}/>
                    <img src='/home/arrow.png' alt='arrow'
                         className={`${styles.arrow} ${isShown() ? styles.arrowUp : ''}`}/>
                </div>
                <div className={`${styles.dropdown_content} ${isShown() ? styles.showContent : ''}`}>
                    <div className={styles.scrollable} ref={scrollableRef}>
                        {options.map((c, i) => (
                            <option className={`${styles.dropdown_option} ${i === index ? styles.hoveredOption : ''}`}
                                    value={c} key={i}
                                    onClick={() => onChange({ target: { value: c } })}
                                    onMouseEnter={() => setIndex(i)}>
                                {c}
                            </option>
                        ))}
                    </div>
                </div>
            </div>
            <span className={styles.errorMessage}>{error.message}</span>
        </div>
    )
}

export default DropdownList;
