import styles from "./ModalOrderForm.module.css";
import OrderForm from "../OrderForm";
import ModalAnimatedDialog from "../../../elements/modalDialog/ModalAnimatedDialog";
import {useEffect} from "react";

const ModalOrderForm = ({isOpen, setOpen, formValues, result, setResult}) => {
    useEffect(() => {
        setOpen(false);
    }, [result]);

    return (
        <ModalAnimatedDialog isOpen={isOpen} setOpen={setOpen} closeOnClick={false}>
            <div className={styles.content}>
                <OrderForm pType={formValues.type}
                           pSize={formValues.size}
                           pColor={formValues.color}
                           pKeyHolder={formValues.keyHolder}
                           setResult={setResult}
                />
                <img src='/home/close.png' alt='close'
                     className={styles.close}
                     onClick={() => setOpen(false)}/>
            </div>
        </ModalAnimatedDialog>
    )
}

export default ModalOrderForm;