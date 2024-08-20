import React from 'react';
import styles from './PhoneButton.module.css';

const PhoneButton = ({phoneNumber}) => {
    return (
        <a href={`tel:${phoneNumber}`} className={styles.button}>
            {phoneNumber}
        </a>
    );
}

export default PhoneButton;
