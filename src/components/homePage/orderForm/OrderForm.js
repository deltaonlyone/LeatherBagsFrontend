import styles from './OrderForm.module.css'
import React, {useEffect, useState} from 'react';
import InputPhoneNum from "./inputs/InputPhoneNum";
import InputName from "./inputs/InputName";
import DropdownList from "./inputs/DropdownList";
import DeliveryInputs from "./DeliveryInputs";
import {colorOptions, keyHolderOptions, sizeOptions, typeOptions} from "../../../services/BagsOptions";
import {bagPrice} from "../../../services/BagsPrices";
import handleBasicChange from "./inputs/HandleChanges";
import {requestBag} from "../../../services/ApiService";

const OrderForm = ({pType, pSize, pColor, pKeyHolder}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phoneNum, setPhoneNum] = useState('+380');


    const [types] = useState(typeOptions());
    const [type, setType] = useState(pType ? pType : types[0]);

    const [sizes, setSizes] = useState(sizeOptions(type.value));
    const [size, setSize] = useState(pSize ? pSize : sizes[0]);

    const [colors, setColors] = useState(colorOptions(type.value, size.value));
    const [color, setColor] = useState(pColor ? pColor : colors[0]);

    const [keyHolderStates] = useState(keyHolderOptions());
    const [keyHolder, setKeyHolder] = useState(pKeyHolder ? pKeyHolder : keyHolderStates[0]);

    useEffect(() => {
        const sizes = sizeOptions(type.value);
        setSizes(sizes);
        setSize(sizes[0]);
    }, [type.value]);

    useEffect(() => {
        const colors = colorOptions(type.value, size.value);
        setColors(colors);
        setColor(colors[0]);
    }, [type.value, size.value]);

    const [city, setCity] = useState({
        title: '',
        value: null
    });
    const [department, setDepartment] = useState({
        title: '',
        value: null
    });
    const [deliveryPrice, setDeliveryPrice] = useState(0);

    const [price, setPrice] = useState(bagPrice(type.value, size.value, keyHolder.value));
    useEffect(() => {
        setPrice(bagPrice(type.value, size.value, keyHolder.value))
    }, [type.value, size.value, keyHolder.value]);

    const formFields = [
        'firstName',
        'lastName',
        'middleName',
        'num',
        'type',
        'fill',
        'keyholder',
        'size',
        'place',
        'department'
    ];
    const [submitting, setSubmitting] = useState(0);
    const [errors, setErrors] = useState({});

    const sendData = (event) => {
        event.preventDefault();
        const newErrors = {};
        for (const field of formFields) {
            newErrors[field] = true;
        }
        setErrors(newErrors);
        setSubmitting(2);
    };

    useEffect(() => {
        if (submitting === 2) {
            setSubmitting(1);
        } else if (submitting === 1) {
            if (Object.keys(errors).length === 0) {
                    requestBag({
                        firstName: firstName,
                        lastName: lastName,
                        middleName: middleName,
                        phoneNum: phoneNum,
                        type: type,
                        size: size,
                        color: color.value,
                        keyHolder: keyHolder,
                        city: city.title,
                        department: department.value,
                        price: price + deliveryPrice
                    })
                        .then(r => console.log(r))
                        .catch(e => console.log(e));
            }
            setSubmitting(0);
        }
    }, [errors, submitting,
        firstName, lastName,
        middleName, phoneNum,
        type, size,
        color.value, keyHolder,
        city.value, department.value,
        price, deliveryPrice]);

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
                               setErrors={setErrors} submitting={submitting}
                    />
                </div>
                <div className={styles.twoColumns}>
                    <InputName name='lastName' placeholder='Прізвище'
                               value={lastName} setValue={setLastName}
                               setErrors={setErrors} submitting={submitting}
                    />
                </div>
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
                <div className={styles.twoColumns}>
                    <InputName name='middleName' placeholder='По батькові'
                               value={middleName} setValue={setMiddleName}
                               setErrors={setErrors} submitting={submitting}
                    />
                </div>
                <div className={styles.twoColumns}>
                    <InputPhoneNum name='num'
                                   value={phoneNum} setValue={setPhoneNum}
                                   setErrors={setErrors} submitting={submitting}
                    />
                </div>
            </div>
            <div className={styles.formRow}>
                <h5>Оберіть вид сумки</h5>
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
                <div className={styles.oneColumn}>
                    <DropdownList name='type' placeholder='Тип cумки'
                                  value={type} editable={false}
                                  options={types} onChange={handleBasicChange(setType)}
                                  setErrors={setErrors} submitting={submitting}
                    />
                </div>
            </div>
            <div className={styles.formRow}>
                <h5>Додаткові параметри</h5>
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
                <div className={styles.twoColumns}>
                    <DropdownList name='fill' placeholder='Колір'
                                  value={color} editable={false}
                                  options={colors} onChange={handleBasicChange(setColor)}
                                  setErrors={setErrors} submitting={submitting}
                    />
                </div>
                <div className={styles.twoColumns}>
                    <DropdownList name='keyholder' placeholder='Ключниця'
                                  value={keyHolder} editable={false}
                                  options={keyHolderStates} onChange={handleBasicChange(setKeyHolder)}
                                  setErrors={setErrors} submitting={submitting}
                    />
                </div>
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
                <DropdownList name='size' placeholder='Розмір'
                              value={size} editable={false}
                              options={sizes} onChange={handleBasicChange(setSize)}
                              setErrors={setErrors} submitting={submitting}
                />
            </div>
            <DeliveryInputs city={city} setCity={setCity}
                            department={department} setDepartment={setDepartment}
                            setPrice={setDeliveryPrice} packagePrice={price}
                            setErrors={setErrors} submitting={submitting}
            />
            <div className={styles.price}>
                <h3>Ціна замовлення: {price}+{deliveryPrice}={price + deliveryPrice}₴</h3>
            </div>
            <button type='submit' onClick={sendData}>Замовити</button>
        </form>
    );
};

export default OrderForm
