import ModalDialog from "../../elements/modalDialog/ModalDialog";
import OkDialog from "./OkDialog";
import ErrorDialog from "./ErrorDialog";
import styles from "./ResultDialog.module.css";

const ResultDialogs = ({result, setResult}) => {
    return (
        <ModalDialog isOpen={result} setOpen={() => setResult('')}
                     closeOnClick={result === 'loading'}>
            <div className='non-draggable'>
                {result === 'ok' ?
                    <OkDialog close={() => setResult('')}/> : ''
                }
                {result === 'error' ?
                    <ErrorDialog close={() => setResult('')}/> : ''
                }
                {result === 'loading' ?
                    <img src='/home/loading.png' alt='loading'
                         className={styles.loading}/> : ''
                }
            </div>
        </ModalDialog>
    )
}

export default ResultDialogs;