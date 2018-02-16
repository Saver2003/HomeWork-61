import React from 'react';
import './CountryList.css';

const CountryList = props => {
    return (
        <ul className="CountryList">
            {props.countries.map((country) => {
                return (
                    <li key={country.alpha3Code} onClick={() => props.click(country.name)}>{country.name}</li>
                )
            })}
        </ul>
    )
};

export default CountryList;