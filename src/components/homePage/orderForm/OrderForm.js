import styles from './OrderForm.module.css'
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import InputPhoneNum from "./inputs/InputPhoneNum";
import InputName from "./inputs/InputName";
import DropdownList from "./inputs/DropdownList";

const OrderForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phoneNum, setPhoneNum] = useState('+380');

    const sizes = [{
        value: 'L',
        label: 'Стандартний L'
    }, {
        value: 'XL',
        label: 'Великий XL'
    }];
    const [size, setSize] = useState(sizes[0].value);

    const colors = ['Чорний', 'Синій', 'Червоний', 'Коричневий'];
    const [color, setColor] = useState(colors[0]);

    const [hasError, setHasError] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const checkError = (error) => {
        setHasError(hasError || error);
    }

    const sendData = (event) => {
        event.preventDefault();
        setTrigger(true);
        console.log({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            phoneNum: phoneNum,
            size: size,
            color: color,
            city: '1',
            department: 1
        })
    };
  
    const [city, setCity] = useState('');
    const [cityRef, setCityRef] = useState('');
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
        if (cityName.length > 2) {
            try {
                const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                    apiKey: 'ad9f19d77f0329680046910f08946c8f',
                    modelName: 'AddressGeneral',
                    calledMethod: 'searchSettlements',
                    methodProperties: {
                        CityName: cityName,
                        Limit: '10',
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
                        WarehouseId: departmentNum,
                        Page: '1',
                        Limit: '20',
                        CityRef: cityRef,
                        Language: 'UA'

                    }
                });
                console.log(cityRef)
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
        setCityRef(selectedCity.DeliveryCity)
        console.log(selectedCity)
        setCitySuggestions([]);
        setShowCitySuggestions(false);
    };

    const handleDepartmentSelect = (selectedDepartment) => {
        setDepartment(selectedDepartment);
        console.log(selectedDepartment)

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
            <div className={styles.formRow}>
                <h5>Ваші персональні дані</h5>
            </div>
            <div className={styles.formRow}>
                <div className={styles.twoColumns}>
                    <InputName name='firstName' placeholder="Ім'я"
                               value={firstName} setValue={setFirstName}
                               checkErrorTrigger={trigger}
                               setError={checkError}/>
                </div>
                <div className={styles.twoColumns}>
                    <InputName name='lastName' placeholder='Прізвище'
                               value={lastName} setValue={setLastName}
                               checkErrorTrigger={trigger}
                               setError={checkError}/>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.twoColumns}>
                    <InputName name='middleName' placeholder='По батькові'
                               value={middleName} setValue={setMiddleName}
                               checkErrorTrigger={trigger}
                               setError={checkError}/>
                </div>
                <div className={styles.twoColumns}>
                    <InputPhoneNum value={phoneNum} setValue={setPhoneNum}
                                   checkErrorTrigger={trigger} setError={checkError}/>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.twoColumns}>
                    <h5>Оберіть розмір</h5>
                </div>
                <div className={styles.twoColumns}>
                    <h5>Оберіть колір</h5>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.twoColumns}>
                    <fieldset>
                        {sizes.map((s, i) => (
                            <div className={styles.radioRow} key={i}
                                 onClick={() => setSize(s.value)}>
                                <input type='radio' name='size' value={s.value}
                                       onChange={() => setSize(s.value)}
                                       checked={size === s.value}/>
                                <label htmlFor='size'>{s.label}</label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                <div className={styles.twoColumns}>
                    <DropdownList name='color' placeholder='Колір'
                                  value={color} editable={false}
                                  options={colors} onChange={setColor}
                                  checkErrorTrigger={hasError} setError={checkError}/>
                </div>
            </div>
            <div className={`${styles.formRow} ${styles.centeredRow}`}>
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
            <button type='submit' onClick={sendData} disabled={hasError}>Замовити</button>
        </form>
    );
};

export default OrderForm
