import styles from "./ModalOrderForm.module.css";
import OrderForm from "../OrderForm";
import ModalDialog from "../../../elements/modalDialog/ModalDialog";

const ModalOrderForm = ({isOpen, setOpen, formValues}) => {

    return (
        <ModalDialog isOpen={isOpen} setOpen={setOpen}>
            <div className={styles.content}>
                <OrderForm pType={formValues.type}
                           pSize={formValues.size}
                           pColor={formValues.color}
                           pKeyHolder={formValues.keyHolder}
                />
                <img src='/home/close.png' alt='close'
                     className={styles.close}
                     onClick={() => setOpen(false)}/>
            </div>
        </ModalDialog>
    )
}

export default ModalOrderForm;