import {useCallback, useState} from "react";

export function handleBasicChange(setter) {
    return (e) => setter({
        title: e.title,
        value: e.value
    });
}

export function useSetupError(name, setErrors) {
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

    return [error, setAllErrors];
}