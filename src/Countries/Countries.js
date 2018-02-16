import React, {Component} from 'react';
import CountryList from "./CountryList/CountryList";
import CountryInfo from "./CountryInfo/CountryInfo";

class Countries extends Component {
    
    state = {
        countries: [],
        selectedCountry: null,
        borderCountries: [],
    };
    
    _makeRequest(url) {
        return fetch(url).then(response => {
            return response.json();
        })
    }
    
    componentDidMount() {
        const COUNTRY_URL = 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code';
        
        this._makeRequest(COUNTRY_URL).then(countries => {
            this.setState({countries, name: countries.name})
        }).catch(error => {
            console.log(error);
        })
    }
    
    getCountryInfo = (name) => {
        const ALL_INFO_URL = 'https://restcountries.eu/rest/v2/name/' + name;
        
        this._makeRequest(ALL_INFO_URL).then(selectedCountry => {
            this.setState({selectedCountry: selectedCountry[0]}, () => this.getBorders())
        }).catch(error => {
            console.log(error);
        })
    };
    
    getBorders = () => {
        Promise.all(this.state.selectedCountry.borders.map((border) => {
            return this._makeRequest('https://restcountries.eu/rest/v2/alpha/' + border)
        })).then((borderCountries) => {
            return this.setState({borderCountries})
        }).catch(error => {
            console.log(error);
        })
    };
    
    render() {
        return (
            <div>
                <CountryList countries={this.state.countries} click={this.getCountryInfo}/>
                <CountryInfo
                    selectedCountry={this.state.selectedCountry}
                    borderCountries={this.state.borderCountries}
                    population={this.getPopulation}
                />
            </div>
        )
    }
}

export default Countries;