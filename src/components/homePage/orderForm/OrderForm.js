import styles from './OrderForm.module.css'
import React, {useCallback, useRef, useState} from 'react';
import axios from 'axios';
import InputPhoneNum from "./inputs/InputPhoneNum";
import InputName from "./inputs/InputName";
import DropdownList from "./inputs/DropdownList";

const pageLimit = 15;

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

    const colors = [{
        title: 'Чорний',
        value: 'Чорний'
    }, {
        title: 'Синій',
        value: 'Синій'
    }, {
        title: 'Червоний',
        value: 'Червоний'
    }, {
        title: 'Коричневий',
        value: 'Коричневий'
    }];
    const [color, setColor] = useState(colors[0]);
    const handleColorChange = (e) => {
        setColor({
            title: e.title,
            value: e.title
        });
    }

    const [keyHolder, setKeyHolder] = useState(true);

    const [hasError, setHasError] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const checkError = useCallback((error) => {
        setHasError(hasError || error);
    }, [hasError])

    const sendData = (event) => {
        event.preventDefault();
        setTrigger(true);
        console.log({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            phoneNum: phoneNum,
            size: size,
            color: color.value,
            keyHolder: keyHolder,
            city: city.title,
            department: department.value
        })
    };

    const [city, setCity] = useState({
        title: '',
        value: null
    });
    const [citySuggestions, setCitySuggestions] = useState([]);
    let cityPage = useRef(1);
    let cityHasNext = useRef(true);

    const loadCitySuggestions = useCallback(async (cityName, refresh) => {
        if (refresh) {
            cityPage.current = 1;
            cityHasNext.current = true;
        } else if (cityHasNext.current) {
            cityPage.current++;
        } else {
            return;
        }
        if (cityName) {
            try {
                const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                    apiKey: 'ad9f19d77f0329680046910f08946c8f',
                    modelName: 'AddressGeneral',
                    calledMethod: 'searchSettlements',
                    methodProperties: {
                        CityName: cityName,
                        Limit: pageLimit,
                        Page: cityPage.current,
                        Warehouse: 1
                    }
                });
                setCitySuggestions([...(refresh ? [] : citySuggestions),
                    ...response.data.data[0].Addresses.map(v => {
                        return {
                            title: v.Present,
                            value: v.DeliveryCity
                        }
                    })]);
                cityHasNext.current = response.data.data[0].TotalCount > pageLimit * cityPage.current;
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        } else {
            setCitySuggestions([]);
        }
    }, [citySuggestions]);

    const handleCityChange = useCallback(async (e) => {
        if (city.title !== e.title) {
            setCity({
                title: e.title,
                value: e.value
            });
        }
        await loadCitySuggestions(e.title, true);
    }, [loadCitySuggestions, city.title]);

    const handleCityScrollDown = useCallback(() => {
        loadCitySuggestions(city.title, false);
    }, [loadCitySuggestions, city.title]);

    const [department, setDepartment] = useState({
        title: '',
        value: null
    });
    const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
    let departmentPage = useRef(1);
    let departmentHasNext = useRef(true);

    const loadDepartmentSuggestions = useCallback(async (departmentNum, refresh) => {
        if (refresh) {
            departmentPage.current = 1;
            departmentHasNext.current = true;
        } else if (departmentHasNext.current) {
            departmentPage.current++;
        } else {
            return;
        }

        if (city.value) {
            try {
                const properties = {
                    Page: departmentPage.current,
                    Limit: pageLimit,
                    CityRef: city.value,
                    Language: 'UA'
                };
                if (departmentNum) {
                    properties.WarehouseId = departmentNum;
                }

                const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                    apiKey: 'ad9f19d77f0329680046910f08946c8f',
                    modelName: 'AddressGeneral',
                    calledMethod: 'getWarehouses',
                    methodProperties: properties
                });

                setDepartmentSuggestions([...(refresh ? [] : departmentSuggestions),
                    ...response.data.data.map(v => {
                        return {
                            title: v.Description,
                            value: v.Description
                        }
                    })]);
                departmentHasNext.current = response.data.info.totalCount > pageLimit * departmentPage.current;
            } catch (error) {
                console.error('Error fetching department data:', error);
            }
        } else {
            setDepartmentSuggestions([]);
        }
    }, [city.value, departmentSuggestions]);

    const handleDepartmentChange = useCallback(async (e) => {
        if (department.title !== e.title) {
            setDepartment(e);
        }
        await loadDepartmentSuggestions(e.title, true);
    }, [loadDepartmentSuggestions, department.title]);

    const handleDepartmentScrollDown = useCallback(() => {
        loadDepartmentSuggestions(department.title, false);
    }, [loadDepartmentSuggestions, department.title]);

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
                            <div className={styles.fieldsetRow} key={i}
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
                    <div className='column'>
                        <DropdownList name='fill' placeholder='Колір'
                                      value={color} editable={false}
                                      options={colors} onChange={handleColorChange}
                                      checkErrorTrigger={hasError} setError={checkError}/>
                        <div className={styles.inputWrapper}>
                            <div className={styles.fieldsetRow}
                                 onClick={() => setKeyHolder(!keyHolder)}>
                                <input type='checkbox' name='keyHolder' checked={keyHolder}
                                       onChange={() => {
                                       }}/>
                                <label htmlFor='keyHolder'>Ключниця</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.formRow} ${styles.centeredRow}`}>
                <div className={`${styles.inputColumn} ${styles.oneColumn}`}>
                    <h5>Деталі доставки</h5>
                    <DropdownList
                        name='place'
                        placeholder='Місто'
                        value={city}
                        editable={true}
                        options={citySuggestions}
                        onChange={handleCityChange}
                        onScrollDown={handleCityScrollDown}
                        checkErrorTrigger={hasError}
                        setError={checkError}
                    />
                    <DropdownList
                        name='department'
                        placeholder='Відділення нової пошти'
                        value={department}
                        editable={true}
                        options={departmentSuggestions}
                        onChange={handleDepartmentChange}
                        onScrollDown={handleDepartmentScrollDown}
                        checkErrorTrigger={hasError}
                        setError={checkError}
                        disabled={!city.value}
                    />
                </div>
            </div>
            <button type='submit' onClick={sendData} disabled={hasError}>Замовити</button>
        </form>
    );
};

export default OrderForm
