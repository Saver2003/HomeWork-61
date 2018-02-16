import React from 'react';
import './CountryInfo.css';

const CountryInfo = props => {
    return (
        <div className="CountryInfo">
            {
                props.selectedCountry ?
                    <div>
                        <p className="Capital">{props.selectedCountry.capital}</p>
                        <span>Borders with:</span>
                        <div>{props.borderCountries.map((borderCountry, index) => {
                            return (
                                <p key={index} className="Borders">{borderCountry.name}</p>
                            )
                        })}</div>
                    </div>
                    : null
            }
        </div>
    )
};

export default CountryInfo;