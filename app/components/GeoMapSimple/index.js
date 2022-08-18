/**
 *
 * GeoMapSimple
 *
 */

import React, {memo} from "react";
import "./Styles.css";
import MapChart from "./MapChart";


/** GeoMapSimple function  is used to render the "Top and bottom stores' performance Geo Map " component that is used in the Store view */

function GeoMapSimple({markers}) {
    return (
        <div
            style={{
                boxSizing: 'border-box',
                width: '35vw',
                padding: "0 2vmin 2vmin 2vmin",
                border: "1px solid #d7d7dd"
            }}
        >
            <MapChart markers={markers}/>
        </div>
    );
}

GeoMapSimple.propTypes = {};

export default memo(GeoMapSimple);
