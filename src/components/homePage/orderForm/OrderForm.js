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
            city: city,
            department: department
        })
    };

    const [city, setCity] = useState('');
    const [cityRef, setCityRef] = useState('');
    const [department, setDepartment] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [departmentSuggestions, setDepartmentSuggestions] = useState([]);


    const handleCityChange = async (e) => {
        const cityName = e.target.value;
        setCity(cityName);
        if (cityName.length > 0) {
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
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        } else {
            setCitySuggestions([]);
        }
    };

    const handleDepartmentChange = async (e) => {
        const departmentNum = e.target.value;
        setDepartment(departmentNum);
        try {
            if(city.length>0){
            const data = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
                apiKey: 'ad9f19d77f0329680046910f08946c8f',
                modelName: 'AddressGeneral',
                calledMethod: 'searchSettlements',
                methodProperties: {
                    Page: '1',
                    Limit: '1',
                    CityName: city,
                    Warehouse: "1"
                }
            });
            setCityRef(data.data.data[0].Addresses[0].DeliveryCity)
            }else{
                setCityRef("")
            }
        } catch (error) {
            console.error('Error fetching department data:', error);
        }
        if (departmentNum.length > 0) {
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

                setDepartmentSuggestions(response.data.data);
            } catch (error) {
                console.error('Error fetching department data:', error);
            }
        } else {
            setDepartmentSuggestions([]);
        }
    };

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
                                  options={colors} onChange={e => setColor(e.target.value)}
                                  checkErrorTrigger={hasError} setError={checkError}/>
                </div>
            </div>
            <div className={`${styles.formRow} ${styles.centeredRow}`}>
                <div className={`${styles.inputColumn}`}>
                    <h5>Деталі доставки</h5>

                    <div className={styles.oneColumn}>
                        <DropdownList
                            name='city'
                            placeholder='Місто'
                            value={city}
                            editable={true}
                            options={citySuggestions.map(suggestion => suggestion.Present)}
                            onChange={handleCityChange}
                            checkErrorTrigger={hasError}
                            setError={checkError}
                        />
                    </div>
                    <div className={styles.oneColumn}>
                        <DropdownList
                            name='department'
                            placeholder='Відділення нової пошти'
                            value={department}
                            editable={true}
                            options={departmentSuggestions.map(suggestion => suggestion.Description)}
                            onChange={handleDepartmentChange}
                            checkErrorTrigger={hasError}
                            setError={checkError}
                        />
                    </div>
                </div>
            </div>
            <button type='submit' onClick={sendData} disabled={hasError}>Замовити</button>
        </form>
    );
};

export default OrderForm
