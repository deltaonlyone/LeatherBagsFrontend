import styles from './Input.module.css';
import {useCallback, useEffect, useState} from "react";
import FormInput from "./FormInput";

const InputPhoneNum = ({name, value, setValue, setErrors, submitting}) => {
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

    const [displayValue, setDisplayValue] = useState('+380');
    const handleInput = (event) => {
        let rawValue = event.target.value.substring(1)
            .replace(/\D/g, '');
        let formatedValue = '+38 0';

        if (rawValue.length < 3) {
            rawValue = '+380';
            setValue(rawValue);
            setDisplayValue('+38 0');
        } else {
            rawValue = '+380' + rawValue.substring(3);
        }
        if (rawValue.length > 13) {
            rawValue = rawValue.substring(0, 13);
        }

        for (let i = 4; i < rawValue.length; i++) {
            if (i === 6 || i === 9 || i === 11) {
                formatedValue += ' ';
            }
            formatedValue += rawValue[i];
        }

        setValue(rawValue);
        setDisplayValue(formatedValue);
    }

    const checkError = useCallback(() => {
        if (!value || value.length < 13) {
            setAllErrors({
                hasError: true,
                message: 'Номер телефону введено неправильно'
            });
            return;
        }

        setAllErrors({
            hasError: false,
            message: ''
        });
    }, [value, setAllErrors])

    useEffect(() => {
        if (submitting) {
            checkError();
        }
    }, [submitting, checkError]);

    const [focused, setFocused] = useState(false);

    return (
        <FormInput error={error} focused={focused}>
                <input type='tel' name='phoneNum'
                       className={`${styles.input} ${error.hasError ? styles.errorInput : ''}`}
                       placeholder='+38 050 517 52 51'
                       value={displayValue}
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

export default InputPhoneNum