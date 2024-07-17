import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderForm.module.css';

const OrderForm = () => {
    const [city, setCity] = useState('');
    const [cityShortName, setCityShortName] = useState('');
    const [department, setDepartment] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);
    const [showDepartmentSuggestions, setShowDepartmentSuggestions] = useState(false);
    const [isCityFocused, setIsCityFocused] = useState(false);
    const [isDepartmentFocused, setIsDepartmentFocused] = useState(false);
    const [activeCitySuggestion, setActiveCitySuggestion] = useState(0);
    const [activeDepartmentSuggestion, setActiveDepartmentSuggestion] = useState(0);
    const citySuggestionsListRef = useRef(null);
    const departmentSuggestionsListRef = useRef(null);


    const handleCityChange = async (e) => {
        const cityName = e.target.value;
        setCity(cityName);
        setCityShortName(cityName.MainDescription)
        if (cityName.length > 2) {
            try {
                const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                    apiKey: 'ad9f19d77f0329680046910f08946c8f',
                    modelName: 'AddressGeneral',
                    calledMethod: 'searchSettlements',
                    methodProperties: {
                        CityName: cityName,
                        Limit: '5',
                        Page: '1',
                        Warehouse: "1"
                    }
                });
                setCitySuggestions(response.data.data[0].Addresses);
                setShowCitySuggestions(true);
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        } else {
            setCitySuggestions([]);
            setShowCitySuggestions(false);
        }
    };

    const handleDepartmentChange = async (e) => {
        const departmentNum = e.target.value;
        setDepartment(departmentNum);

        if (departmentNum.length > 0 && city.length > 0) {
            try {
                const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                    apiKey: 'ad9f19d77f0329680046910f08946c8f',
                    modelName: 'AddressGeneral',
                    calledMethod: 'getWarehouses',
                    methodProperties: {
                        // FindByString: departmentNum,
                        CityName: cityShortName,
                        Page: '1',
                        Limit: '20',
                        Language: 'UA',
                        WarehouseId: departmentNum
                    }
                });
                setDepartmentSuggestions(response.data.data);
                setShowDepartmentSuggestions(true);
            } catch (error) {
                console.error('Error fetching department data:', error);
            }
        } else {
            setDepartmentSuggestions([]);
            setShowDepartmentSuggestions(false);
        }
    };

    const handleCitySelect = (selectedCity) => {
        setCity(selectedCity.Present);
        setCityShortName(selectedCity.MainDescription)
        setCitySuggestions([]);
        setShowCitySuggestions(false);
    };

    const handleDepartmentSelect = (selectedDepartment) => {
        setDepartment(selectedDepartment);
        setDepartmentSuggestions([]);
        setShowDepartmentSuggestions(false);
    };

    const handleCityFocus = () => {
        setIsCityFocused(true);
        setShowCitySuggestions(true);
    };

    const handleCityBlur = () => {
        setIsCityFocused(false);
        setShowCitySuggestions(false);
    };

    const handleDepartmentFocus = () => {
        setIsDepartmentFocused(true);
        setShowDepartmentSuggestions(true);
    };

    const handleDepartmentBlur = () => {
        setIsDepartmentFocused(false);
        setShowDepartmentSuggestions(false);
    };

    const handleCityKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            if (activeCitySuggestion < citySuggestions.length - 1) {
                setActiveCitySuggestion((prev) => prev + 1);
                scrollToActiveCitySuggestion();
            }
        } else if (e.key === 'ArrowUp') {
            if (activeCitySuggestion > 0) {
                setActiveCitySuggestion((prev) => prev - 1);
                scrollToActiveCitySuggestion();
            }
        } else if (e.key === 'Enter') {
            handleCitySelect(citySuggestions[activeCitySuggestion].Present);
            setActiveCitySuggestion(0);
        }
    };

    const handleDepartmentKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            if (activeDepartmentSuggestion < departmentSuggestions.length - 1) {
                setActiveDepartmentSuggestion((prev) => prev + 1);
                scrollToActiveDepartmentSuggestion();
            }
        } else if (e.key === 'ArrowUp') {
            if (activeDepartmentSuggestion > 0) {
                setActiveDepartmentSuggestion((prev) => prev - 1);
                scrollToActiveDepartmentSuggestion();
            }
        } else if (e.key === 'Enter') {
            handleDepartmentSelect(departmentSuggestions[activeDepartmentSuggestion].Description);
            setActiveDepartmentSuggestion(0);
        }
    };

    const scrollToActiveCitySuggestion = () => {
        if (citySuggestionsListRef.current) {
            const activeElement = citySuggestionsListRef.current.querySelector(`.${styles.active}`);
            if (activeElement) {
                citySuggestionsListRef.current.scrollTop = activeElement.offsetTop - citySuggestionsListRef.current.offsetTop;
            }
        }
    };

    const scrollToActiveDepartmentSuggestion = () => {
        if (departmentSuggestionsListRef.current) {
            const activeElement = departmentSuggestionsListRef.current.querySelector(`.${styles.active}`);
            if (activeElement) {
                departmentSuggestionsListRef.current.scrollTop = activeElement.offsetTop - departmentSuggestionsListRef.current.offsetTop;
            }
        }
    };

    useEffect(() => {
        scrollToActiveCitySuggestion();
    }, [activeCitySuggestion]);

    useEffect(() => {
        scrollToActiveDepartmentSuggestion();
    }, [activeDepartmentSuggestion]);

    return (
        <form className={`column ${styles.orderForm}`}>
            <h3>ЗРОБІТЬ ЗАМОВЛЕННЯ</h3>
            <h4>НАШ МЕНЕДЖЕР ЗВ'ЯЖЕТЬСЯ З ВАМИ</h4>
            <h5>Ваші персональні дані</h5>
            <div className={styles.formRow}>
                <div className={`${styles.inputColumn} ${styles.twoColumns}`}>
                    <input type='text' name='firstName' placeholder="Ім'я"/>
                    <input type='text' name='middleName' placeholder='По батькові'/>
                </div>
                <div className={`${styles.inputColumn} ${styles.twoColumns}`}>
                    <input type='text' name='lastName' placeholder='Прізвище'/>
                    <input type='tel' name='phoneNum' placeholder='+380000000000'/>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={`${styles.inputColumn} ${styles.twoColumns}`}>
                    <h5>Оберіть розмір</h5>
                    <fieldset>
                        <div className={styles.radioRow}>
                            <input type='radio' name='size' value='L' defaultChecked />
                            <label htmlFor='size'>Стандартний L</label>
                        </div>
                        <div className={styles.radioRow}>
                            <input type='radio' name='size' value='XL'/>
                            <label htmlFor='size'>Великий XL</label>
                        </div>
                    </fieldset>
                </div>
                <div className={`${styles.inputColumn} ${styles.twoColumns}`}>
                    <h5>Оберіть колір</h5>
                    <select>
                        <option value='Чорний'>Чорний</option>
                        <option value='Синій'>Синій</option>
                        <option value='Червоний'>Червоний</option>
                        <option value='Коричневий'>Коричневий</option>
                    </select>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={`${styles.inputColumn} ${styles.oneColumn}`}>
                    <h5>Деталі доставки</h5>
                    <input
                        type='text'
                        name='city'
                        placeholder='Місто'
                        value={city}
                        onChange={handleCityChange}
                        onFocus={handleCityFocus}
                        onBlur={handleCityBlur}
                        onKeyDown={handleCityKeyDown}
                    />
                    {isCityFocused && showCitySuggestions && citySuggestions.length > 0 && (
                        <ul className={styles.suggestions} ref={citySuggestionsListRef}>
                            {citySuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className={index === activeCitySuggestion ? styles.active : ''}
                                    onMouseDown={() => handleCitySelect(suggestion)}
                                >
                                    {suggestion.Present}
                                </li>
                            ))}
                        </ul>
                    )}
                    <input
                        type='text'
                        name='department'
                        placeholder='Відділення нової пошти'
                        value={department}
                        onChange={handleDepartmentChange}
                        onFocus={handleDepartmentFocus}
                        onBlur={handleDepartmentBlur}
                        onKeyDown={handleDepartmentKeyDown}
                    />
                    {isDepartmentFocused && showDepartmentSuggestions && departmentSuggestions.length > 0 && (
                        <ul className={styles.suggestions} ref={departmentSuggestionsListRef}>
                            {departmentSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className={index === activeDepartmentSuggestion ? styles.active : ''}
                                    onMouseDown={() => handleDepartmentSelect(suggestion.Description)}
                                >
                                    {suggestion.Description}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <button type='submit'>Замовити</button>
        </form>
    );
};

export default OrderForm;
