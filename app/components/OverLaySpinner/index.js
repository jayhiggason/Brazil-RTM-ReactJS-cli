/**
 *
 * OverLaySpinner
 *
 */

import React, {memo} from "react";
import LoadingOverlay from 'react-loading-overlay'
import {ClipLoader} from "react-spinners";
import './overlay.css';

/** OverLaySpinner function  is reused to render the spinner  in all the components when the data is loading in the tool */

function OverLaySpinner({active, children}) {
    return (
        <LoadingOverlay
            active={active}
            spinner={<ClipLoader size={40} margin={2} color={'rgb(255,255,255)'} loading={true}/>}
            styles={{
                overlay: (base) => ({
                    ...base,
                    background: 'rgba(0, 0, 20, 0.5)'
                })
            }}>
            {children}
        </LoadingOverlay>
    );
}


export default memo(OverLaySpinner);
