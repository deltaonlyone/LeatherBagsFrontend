import styles from './Input.module.css';

const FormInput = (props) => {

    return (
        <div className={styles.inputColumn}>
            <div className={`row ${styles.inputWrapper} 
                ${props.error.hasError ? styles.errorWrapper : ''}
                ${props.focused && !props.error.hasError ? styles.focused : ''}`}>
                {props.children}
                <img src='/home/error.svg' alt='error'
                     className={props.error.hasError ? styles.error : 'hidden'}/>
            </div>
            <span className={styles.errorMessage}>{props.error.message}</span>
        </div>
    )
}

export default FormInput;