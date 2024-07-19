import styles from './Input.module.css';
import {useEffect, useRef, useState} from "react";
import FormInput from "./FormInput";

const InputName = ({name, placeholder, value, setValue, setError, checkErrorTrigger}) => {
    const [error, setErrorObject] = useState({
        hasError: false,
        message: ''
    });

    const handleInput = (event) => {
        setValue(event.target.value);
    }

    const checkError = () => {
        if (!value) {
            setErrorObject({
                hasError: true,
                message: "Поле є обов'язковим"
            })
            return true;
        } else if (value.match(/[^АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщьЮюЯя' \-]/g)) {
            setErrorObject({
                hasError: true,
                message: "Поле може містити тільки українські літери"
            })
            return true;
        } else if (value.length >= 30) {
            setErrorObject({
                hasError: true,
                message: "Поле може містити до 30 символів"
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

    const [focused, setFocused] = useState(false);

    return (
        <FormInput error={error} focused={focused}>
            <input type='text' name={name}
                   className={`${styles.input} ${error.hasError ? styles.errorInput : ''}`}
                   placeholder={placeholder}
                   value={value}
                   onInput={handleInput}
                   onFocus={() => setFocused(true)}
                   onBlur={() => {
                       setFocused(true);
                       checkError();
                   }}
                   required/>
        </FormInput>
    )
}

export default InputName