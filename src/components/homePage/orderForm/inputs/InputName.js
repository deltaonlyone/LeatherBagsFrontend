import styles from './Input.module.css';
import {useCallback, useEffect, useState} from "react";
import FormInput from "./FormInput";

const InputName = ({name, placeholder, value, setValue, errors, setErrors, submitting}) => {
    const [error, setError] = useState({
        hasError: false,
        message: ''
    });
    const setAllErrors = useCallback((err) => {
        setError(err);
        const newError = {...errors};
        if (err.hasError) {
            newError[name] = err.hasError
        } else {
            delete newError[name];
        }
        setErrors(newError);
    }, []);

    const handleInput = (event) => {
        setValue(event.target.value);
    }

    const checkError = useCallback(() => {
        if (!value) {
            setAllErrors({
                hasError: true,
                message: "Поле є обов'язковим"
            })
            return;
        } else if (value.match(/[^АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщьЮюЯя '-]/g)) {
            setAllErrors({
                hasError: true,
                message: "Поле може містити тільки українські літери"
            })
            return;
        } else if (value.trim() !== value) {
            setAllErrors({
                hasError: true,
                message: "Поле не може містити пробіли на початку або кінці"
            })
            return;
        } else if (value.length >= 30) {
            setAllErrors({
                hasError: true,
                message: "Поле може містити до 30 символів"
            })
            return;
        }

        setAllErrors({
            hasError: false,
            message: ''
        })
    }, [value, setAllErrors])

    useEffect(() => {
        if (submitting) {
            checkError();
        }
    }, [submitting, checkError]);

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