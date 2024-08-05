import styles from './Input.module.css';
import {useCallback, useEffect, useRef, useState} from "react";

const DropdownList = ({
                          name, placeholder, value,
                          editable, options, onChange,
                          disabled, onScrollDown,
                          setErrors, submitting
                      }) => {
    const [error, setError] = useState({
        hasError: false,
        message: ''
    });
    const setAllErrors = useCallback((err) => {
        setError(err);
        setErrors((prevError) => {
            const newError = {...prevError};
            if (err.hasError) {
                newError[name] = err.hasError
            } else {
                delete newError[name];
            }
            return newError;
        });
    }, [name, setErrors]);

    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const isShown = () => {
        return !disabled && (hovered || focused);
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
            event.stopPropagation();
            onChange(options[index]);
        } else if (event.key === 'ArrowUp' && index > 0) {
            event.preventDefault();
            event.stopPropagation();
            scrollInView(index - 1);
            setIndex(index - 1);
        } else if (event.key === 'ArrowDown' && index < options.length - 1) {
            event.preventDefault();
            event.stopPropagation();
            scrollInView(index + 1);
            setIndex(index + 1);
        }
    }

    const checkError = useCallback(() => {
        if (value.value === null) {
            setAllErrors({
                hasError: true,
                message: "Поле є обов'язковим"
            })
            return;
        }

        setAllErrors({
            hasError: false,
            message: ''
        });
    }, [value.value, setAllErrors]);

    const hasMounted = useRef(false);
    useEffect(() => {
        if (hasMounted.current) {
            if (setErrors) {
                checkError();
            }
        } else {
            hasMounted.current = true;
        }
    }, [value.value]);

    useEffect(() => {
        if (submitting) {
            checkError();
        }
    }, [submitting, checkError]);

    const input = useRef();
    const onWrapperClick = () => {
        if (input.current) {
            input.current.focus();
        }
    }

    const onScroll = (e) => {
        const element = e.target;
        if (Math.abs(element.scrollHeight - (element.scrollTop + element.clientHeight)) <= 1) {
            onScrollDown();
        }
    }

    return (
        <div className={styles.inputColumn}>
            <div className={styles.dropdown}
                 onKeyDown={handleKeyDown}
                 onMouseEnter={() => setHovered(true)}
                 onMouseLeave={() => setHovered(false)}
                 onClick={onWrapperClick}>
                <div
                    className={`row ${styles.inputWrapper}
                        ${error.hasError ? isShown() ? styles.dropdownErrorWrapper : styles.errorWrapper : ''}
                        ${isShown() ? styles.hoveredWrapper : ''}
                        ${disabled ? styles.disabledWrapper : ''}`}>
                    <input type='text' name={name}
                           className={`${styles.listInput} ${editable ? '' : styles.unEditable}`}
                           onChange={(e) => onChange({
                               title: e.target.value,
                               value: null
                           })}
                           value={value.title}
                           onFocus={(e) => {
                               setFocused(true);
                               if (value.title !== value.value) {
                                   onChange({
                                       title: e.target.value,
                                       value: null
                                   });
                               }
                           }}
                           onBlur={() => {
                               setFocused(false);
                               checkError();
                           }}
                           placeholder={placeholder}
                           ref={input}
                           autoComplete='off'
                           readOnly={!editable || disabled}/>
                    <img src='/home/arrow.png' alt='arrow'
                         className={`${styles.arrow} ${isShown() ? styles.arrowUp : ''}`}/>
                </div>
                <div className={`${styles.dropdown_content}
                 ${isShown() ? styles.showContent : ''}
                 ${error.hasError ? styles.dropdownError : styles.dropdownBorder}`}>
                    <div className={styles.scrollable} ref={scrollableRef}
                         onScroll={onScrollDown ? onScroll : () => {
                         }}>
                        {options.map((c, i) => (
                            <option className={`${styles.dropdown_option} ${i === index ? styles.hoveredOption : ''}`}
                                    value={c.title} key={i}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onChange({
                                            title: c.title,
                                            value: c.value
                                        });
                                    }}
                                    onMouseEnter={() => setIndex(i)}>
                                {c.title}
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
