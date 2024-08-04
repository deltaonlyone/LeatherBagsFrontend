import styles from './OrderForm.module.css'
import React, {useEffect, useState} from 'react';
import InputPhoneNum from "./inputs/InputPhoneNum";
import InputName from "./inputs/InputName";
import DropdownList from "./inputs/DropdownList";
import DeliveryInputs from "./DeliveryInputs";
import {colorOptions, keyHolderOptions, sizeOptions, typeOptions} from "../bagsInfo/BagsOptions";
import {bagPrice} from "../bagsInfo/BagsPrices";
import handleBasicChange from "./inputs/HandleChanges";

const OrderForm = ({pType, pSize, pColor, pKeyHolder}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phoneNum, setPhoneNum] = useState('+380');


    const [types, setTypes] = useState(typeOptions());
    const [type, setType] = useState(pType ? pType : types[0]);

    const [sizes, setSizes] = useState(sizeOptions(type.value));
    const [size, setSize] = useState(pSize ? pSize : sizes[0]);

    const [colors, setColors] = useState(colorOptions(type.value, size.value));
    const [color, setColor] = useState(pColor ? pColor : colors[0]);

    const [keyHolderStates, setKeyHoldersStates] = useState( keyHolderOptions());
    const [keyHolder, setKeyHolder] = useState(pKeyHolder ? pKeyHolder : keyHolderStates[0]);

    useEffect(() => {
        const sizes = sizeOptions(type.value);
        setSizes(sizes);
        setSize(sizes[0]);
    }, [type])

    useEffect(() => {
        const colors = colorOptions(type.value, size.value);
        setColors(colors);
        setColor(colors[0]);
    }, [type, size]);

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

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const sendData = (event) => {
        event.preventDefault();
        // console.log({
        //     firstName: firstName,
        //     lastName: lastName,
        //     middleName: middleName,
        //     phoneNum: phoneNum,
        //     type: type,
        //     size: size,
        //     color: color.value,
        //     keyHolder: keyHolder,
        //     city: city.title,
        //     department: department.value,
        //     price: price + deliveryPrice
        // });
        setSubmitting(true);
    };

    useEffect(() => {
        console.log(errors)
    }, [errors, submitting]);

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
                               errors={errors} setErrors={setErrors}
                               submitting={submitting}
                    />
                </div>
                <div className={styles.twoColumns}>
                    <InputName name='lastName' placeholder='Прізвище'
                               value={lastName} setValue={setLastName}
                               errors={errors} setErrors={setErrors}
                               submitting={submitting}
                    />
                </div>
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
                <div className={styles.twoColumns}>
                    <InputName name='middleName' placeholder='По батькові'
                               value={middleName} setValue={setMiddleName}
                               errors={errors} setErrors={setErrors}
                               submitting={submitting}
                    />
                </div>
                <div className={styles.twoColumns}>
                    <InputPhoneNum name='num'
                                   value={phoneNum} setValue={setPhoneNum}
                                   errors={errors} setErrors={setErrors}
                                   submitting={submitting}
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
                                  errors={errors} setErrors={setErrors}
                                  submitting={errors}
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
                                  errors={errors} setErrors={setErrors}
                                  submitting={errors}
                    />
                </div>
                <div className={styles.twoColumns}>
                    <DropdownList name='keyholder' placeholder='Ключниця'
                                  value={keyHolder} editable={false}
                                  options={keyHolderStates} onChange={handleBasicChange(setKeyHolder)}
                                  errors={errors} setErrors={setErrors}
                                  submitting={errors}
                    />
                </div>
            </div>
            <div className={`${styles.formRow} ${styles.inputRow}`}>
                <DropdownList name='size' placeholder='Розмір'
                              value={size} editable={false}
                              options={sizes} onChange={handleBasicChange(setSize)}
                              errors={errors} setErrors={setErrors}
                              submitting={errors}
                />
            </div>
            <DeliveryInputs city={city} setCity={setCity}
                            department={department} setDepartment={setDepartment}
                            setPrice={setDeliveryPrice}
                            errors={errors} setErrors={setErrors}
                            submitting={submitting}
            />
            <div className={styles.price}>
                <h3>Ціна замовлення: {price}+{deliveryPrice}={price + deliveryPrice}₴</h3>
            </div>
            <button type='submit' onClick={sendData}>Замовити</button>
        </form>
    );
};

export default OrderForm
