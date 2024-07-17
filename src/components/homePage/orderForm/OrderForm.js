import React, { useState } from 'react';
import axios from 'axios';
import styles from './OrderForm.module.css';

const OrderForm = () => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

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
                        Limit: '50',
                        Page: '1'
                    }
                });

                setSuggestions(response.data.data[0].Addresses);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleCitySelect = (city) => {
        setCity(city);
        setSuggestions([]);
        setShowSuggestions(false);
    };

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
                            <input type='radio' name='size' value='L' checked='true'/>
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
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className={styles.suggestions}>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleCitySelect(suggestion.Present)}>
                                    {suggestion.Present}
                                </li>
                            ))}
                        </ul>
                    )}
                    <input type='text' name='department' placeholder='Відділення нової пошти'/>
                </div>
            </div>
            <button type='submit'>Замовити</button>
        </form>
    )
}

export default OrderForm