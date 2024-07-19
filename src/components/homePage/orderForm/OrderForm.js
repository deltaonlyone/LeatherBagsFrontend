import styles from './OrderForm.module.css'
import {useState} from "react";
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
                    <input type='text' name='city' placeholder='Місто'/>
                    <input type='text' name='department' placeholder='Відділення нової пошти'/>
                </div>
            </div>
            <button type='submit' onClick={sendData} disabled={hasError}>Замовити</button>
        </form>
    )
}

export default OrderForm
