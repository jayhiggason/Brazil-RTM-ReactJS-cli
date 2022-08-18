/**
 *
 * Footer
 *
 */

import React, {memo} from "react";
import Wrapper from './Wrapper';
import history from "../../utils/history";
import packageJSON from '../../../package.json';

import './style.css';

/** Footer function is used to render the footer in each page */

function Footer() {
    const show = history.location.pathname !== "/";
    if (show) {
        return (
            <Wrapper className='footer'>
                <section>
                    &copy; MARS Copyright {new Date().getFullYear()}. All Rights Reserved.
                </section>
                <section>version : {packageJSON.version}</section>
            </Wrapper>
        );
    }
}

Footer.propTypes = {};

export default memo(Footer);
