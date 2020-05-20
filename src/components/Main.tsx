import React, {Component} from "react";
import "./Main.scss";
import { getCountries, ICountry } from "../api";
import DottedSpinner from "./loaders/DottedSpinner";
import SelectCountryModal from "./modals/SelectCountryModal";
import {getCurrentCountry, cleanSession} from "../functions";
import CountryInformation from "./CountryInformation";
interface IState {
    selectedCountry : string;
    countries : ICountry[];
    loading : boolean;
    showCountryModal : boolean;
    actualCountry : ICountry;
    countrySelection: boolean;
    dateSelected : boolean;
    timers : any;
    actualState: string;
}
class Main extends Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            selectedCountry : "all",
            countries: [],
            loading: true,
            showCountryModal: false,
            actualCountry : {
                Country : 'Uruguay',
                Slug : 'uruguay',
                ISO2 : 'UY'
            },
            countrySelection : false,
            dateSelected: false,
            timers: {from: "", to: ""},
            actualState: "confirmed" 
        }
    }
    
    componentDidMount(){
        getCountries()
        .then((res) => {
            let data : ICountry[] = JSON.parse(res as unknown as string);
            data = data.sort((a, b) => {
                if(a.Slug > b.Slug) return 1;
                if(a.Slug < b.Slug) return -1;
                else return 0;
            });
            this.setState({
                countries : data,
                loading: false,
                showCountryModal: true
            });
        })
    }
    
    render(){
        const {countries, 
            showCountryModal, 
            actualCountry, 
            countrySelection, 
            dateSelected, 
            timers,
            actualState} = this.state;
        //clear session when tab is closed
        window.onbeforeunload = () => {
            cleanSession();
        }
        return(
            <div className="main">
                <DottedSpinner loading={countries.length < 0}/>
                {countries.length > 0 && showCountryModal && getCurrentCountry() !== "" &&
                    <SelectCountryModal
                     show={showCountryModal} 
                     countries={countries}
                     setCountrySelected={(country : ICountry)=> {
                        this.setState({
                            actualCountry : country,
                            countrySelection: true
                        })
                     }}
                     onHideModal={() => {
                         this.setState({
                             showCountryModal : false
                         })
                     }}
                     setSelectedTime={
                        (timers : any) => {
                            this.setState({
                                timers
                            });
                        }
                    }
                    setActualState={
                        (value : string) => {
                            this.setState({
                                actualState : value,
                                showCountryModal: false,
                                dateSelected: true

                            });
                        }
                    }
                    />
                }
                { countrySelection && dateSelected &&
                    <CountryInformation 
                        selectedCountry={actualCountry}
                        time={timers}
                        actualState={actualState}
                    />
                }
            </div>
        ); 
    }
}

export default Main;