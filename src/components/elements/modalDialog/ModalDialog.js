import styles from './ModalDialog.module.css';
import {useEffect} from "react";

const ModalDialog = ({isOpen, setOpen, children}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');

        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalMask}>
            <div className={styles.modalWrapper}
                 onClick={(e) => {
                     e.stopPropagation()
                     setOpen(false);
                 }}>
                <div className={styles.modalContent}
                     onClick={(e) =>
                         e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalDialog;