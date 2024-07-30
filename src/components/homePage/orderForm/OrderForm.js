import styles from './OrderForm.module.css'
import React, {useCallback, useState} from 'react';
import InputPhoneNum from "./inputs/InputPhoneNum";
import InputName from "./inputs/InputName";
import DropdownList from "./inputs/DropdownList";
import DeliveryInputs from "./DeliveryInputs";

const OrderForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phoneNum, setPhoneNum] = useState('+380');

    const types = [{
        title: 'Сумка бананка з натуральної шкіри',
        value: 'Сумка бананка з натуральної шкіри'
    }, {
        title: 'Сумка бананка з натуральної шкіри з срібним замком',
        value: 'Сумка бананка з натуральної шкіри з срібним замком'
    }];
    const [type, setType] = useState(types[0]);
    const handleTypeChange = (e) => {
        setType({
            title: e.title,
            value: e.title
        });
    }

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
    const [city, setCity] = useState({
        title: '',
        value: null
    });
    const [department, setDepartment] = useState({
        title: '',
        value: null
    });


    const [hasError, setHasError] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const checkError = useCallback((error) => {
        setHasError(hasError || error);
    }, [hasError]);

    const sendData = (event) => {
        event.preventDefault();
        setTrigger(true);
        console.log({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            phoneNum: phoneNum,
            type: type,
            size: size,
            color: color.value,
            keyHolder: keyHolder,
            city: city.title,
            department: department.value
        })
    };

    return (
        <form className={`column ${styles.orderForm}`}>
            <h3>ЗРОБІТЬ ЗАМОВЛЕННЯ</h3>
            <h4>НАШ МЕНЕДЖЕР ЗВ'ЯЖЕТЬСЯ З ВАМИ</h4>
            <div className={styles.formRow}>
                <h5>Ваші персональні дані</h5>
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
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
            <div className={`${styles.formRow} ${styles.inputRow}`}>
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
                <h5>Оберіть вид сумки</h5>
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
                <div className={styles.oneColumn}>
                    <DropdownList name='type' placeholder='Тип cумки'
                                  value={type} editable={false}
                                  options={types} onChange={handleTypeChange}
                                  checkErrorTrigger={hasError} setError={checkError}
                    />
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
            <div className={`${styles.formRow} ${styles.inputRow}`}>
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
                                      checkErrorTrigger={hasError} setError={checkError}
                        />
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
            <DeliveryInputs hasError={hasError} checkError={checkError}
                            city={city} setCity={setCity}
                            department={department} setDepartment={setDepartment}/>
            <button type='submit' onClick={sendData} disabled={hasError}>Замовити</button>
        </form>
    );
};

export default OrderForm
