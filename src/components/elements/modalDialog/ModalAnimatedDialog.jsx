import ModalDialog from "./ModalDialog";
import styles from "./ModalDialog.module.css";

const ModalAnimatedDialog = ({isOpen, setOpen, closeOnClick, children}) => {
    return (
        <ModalDialog isOpen={isOpen} setOpen={setOpen} closeOnClick={closeOnClick}>
            <div className={styles.popUp}>
                {children}
            </div>
        </ModalDialog>
    )
}

export default ModalAnimatedDialog;