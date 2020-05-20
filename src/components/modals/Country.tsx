import React, {useState} from "react";
import "./Country.scss";
import {saveCurrentCountry, saveCurrentCountryInfo} from "../../functions";
const Country = (props : any) => {
    const [selected, setSelected] = useState(false);
    return (
        <div className={`country ${selected ? "selected" : ""}`}
            onClick={() => {
                saveCurrentCountry(props.country.ISO2);
                saveCurrentCountryInfo(props.country);
                setSelected(true);
                props.setCountrySelected(props.country);
                props.changeView();
                //props.closeModal();
            }}
        >
            <img alt={`${props.country.ISO2.toLowerCase()}`} src={`https://www.countryFlags.io/${props.country.ISO2.toLowerCase()}/shiny/64.png`}/>
            <span>{props.country.Country}</span>
        </div>
    );
}

export default Country;