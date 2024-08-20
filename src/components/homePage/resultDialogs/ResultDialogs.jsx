import ModalDialog from "../../elements/modalDialog/ModalDialog";
import OkDialog from "./OkDialog";
import ErrorDialog from "./ErrorDialog";
import {TailSpin} from "react-loader-spinner";

const ResultDialogs = ({result, setResult}) => {
    return (
        <ModalDialog isOpen={result} setOpen={() => setResult('')}
                     closeOnClick={result === 'loading'}>
            <div className='not-draggable'>
                {result === 'ok' ?
                    <OkDialog close={() => setResult('')}/> : ''
                }
                {result === 'error' ?
                    <ErrorDialog close={() => setResult('')}/> : ''
                }
                {result === 'loading' ?
                    <TailSpin
                        height='20vmin'
                        width='20vmin'
                        color='aliceblue'
                        secondaryColor='aliceblue'
                    /> : ''
                }
            </div>
        </ModalDialog>
    )
}

export default ResultDialogs;