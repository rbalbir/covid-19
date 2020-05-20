import React from "react";
import "./CountryList.scss";
import Country from "./Country";

const CountryList = (props : any) => {
    return (
        <div className="countryList">
            {
            props.countries.map((country : any, idx : number) => { 
                return (
                    <Country 
                        setCountrySelected={props.setCountrySelected}
                        closeModal={props.closeModal}
                        key={idx}
                        country={country}
                        changeView={props.changeView}
                    />
                );
            })
            }
        </div>
    );
} 

export default CountryList;