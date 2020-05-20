import React, {Component} from "react";
import "./SelectCountryModal.scss";
import Modal from "react-bootstrap/Modal";
import CountryList from "./CountryList";
import { ICountry } from "../../api";
import {FaGlobeAmericas} from "react-icons/fa";
import Select from 'react-select';

interface IState {
    countryFilteredList : ICountry[];
    loading : boolean;
    selectTimeView: boolean;
    selectCountryView: boolean;
    errorMessage: string;
    fromDate: string;
    fromHour: string;
    toDate: string;
    toHour: string;
    stateToSearch: string;
}
interface IProps {
    show : boolean;
    countries : ICountry[];
    onHideModal : () => void;
    setCountrySelected: (country : ICountry) => void;
    setSelectedTime: (timer: any) => void;
    setActualState: (value : string) => void;
}


class SelectCountryModal extends Component<IProps, IState>{
    state: { 
        countryFilteredList: ICountry[]; 
        errorMessage: string; 
        loading: boolean; 
        selectCountryView: boolean; 
        selectTimeView: boolean;
        fromDate: string;
        fromHour: string;
        toDate: string;
        toHour: string;
        stateToSearch: string;
    };
    constructor(props : IProps){
        super(props);
        this.state={
            countryFilteredList : props.countries,
            loading : true,
            selectTimeView: false,
            selectCountryView: true,
            errorMessage: "",
            fromDate: "",
            fromHour: "",
            toDate: "",
            toHour: "",
            stateToSearch: "confirmed"
        }
    }

    handleCountryClick = (e : any) => {

    }

    isValid = (f : string, b : number, t : number) : boolean => {
        const a = parseInt(f);
        return a >= b && a <= t;
    }

    validateDate = (str : string) : {ok: boolean; errorMessage: string} => {
        const r = str.split("-");
        return (r.length === 3 && this.isValid(r[0],2019,2020) && this.isValid(r[1],1,12) && this.isValid(r[2],1,31)) ? 
                {ok : true, errorMessage: ""} : {ok: false, errorMessage: "Error in date format"};
    }

    validateHour = (str : string) : {ok: boolean; errorMessage: string} => {
        const r = str.split(":");
        return (r.length === 3 && this.isValid(r[0],0,24) && this.isValid(r[1],0,59) && this.isValid(r[2],0,59)) ? 
                {ok : true, errorMessage: ""} : {ok: false, errorMessage: "Error in hour format"};
    }

    setFromDate = (e : any) => {
        const ret = this.validateDate(e.target.value);
        ret.ok ? this.setState({fromDate: e.target.value}) : 
                 this.setState({errorMessage: ret.errorMessage});
    }

    setToDate = (e : any) => {
        const ret = this.validateDate(e.target.value);
        ret.ok ? this.setState({toDate: e.target.value}) : 
                 this.setState({errorMessage: ret.errorMessage});
    }

    setFromHours = (e : any) => {
        const ret = this.validateHour(e.target.value);
        ret.ok ? this.setState({fromHour: e.target.value}) : 
                 this.setState({errorMessage: ret.errorMessage});
    }

    setToHours = (e : any) => {
        const ret = this.validateHour(e.target.value);
        ret.ok ? this.setState({toHour: e.target.value}) : 
                 this.setState({errorMessage: ret.errorMessage});
    }

    filterCountry = (e : any) => {
        const {countries} = this.props;
        if(e.target.value === ""){
            this.setState({countryFilteredList : countries});
        } else {
            let {countryFilteredList} = this.state;
            countryFilteredList = countries.filter(
                (country : ICountry) => {
                    return country.Country.toLowerCase()
                            .includes(e.target.value.toLowerCase()) ||
                            country.ISO2.toLowerCase()
                            .includes(e.target.value.toLowerCase());
                }
            );
            this.setState({countryFilteredList});
        }
    }

    componentDidMount(){
        const { countries } = this.props;
        this.setState({countryFilteredList : countries});
    }

    componentWillReceiveProps(){
        const { countries } = this.props;
        this.setState({countryFilteredList : countries});
    }

    render(){
        const {show, 
            onHideModal, 
            setCountrySelected, 
            setSelectedTime,
            setActualState} = this.props;
        const {countryFilteredList, 
            selectCountryView, 
            selectTimeView, 
            errorMessage,
            fromDate,
            fromHour,
            toDate,
            toHour,
            stateToSearch} = this.state;
        const stateOptions = [
            {value: "confirmed", label: "Confirmed"},
            {value: "recovered", label: "Recovered"},
            {value: "deaths", label: "Deaths"}
        ];
        return(
            <Modal
            show={show}
            onHide={onHideModal} 
            animation
            backdrop
            centered
            >
                <Modal.Header closeButton>
                    <div className="header">
                        <FaGlobeAmericas style={{fill: "#8c8c8c"}}/>
                        <span>Countries</span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    { selectCountryView && !selectTimeView &&
                        <div className="title">
                            <span>Please select a country</span>
                            <input 
                                type="text" 
                                placeholder="Type a country name"
                                className="searchCountry"
                                onChange={this.filterCountry} 
                            />
                        </div>
                    }
                    { selectCountryView && !selectTimeView &&
                        <CountryList 
                            setCountrySelected={setCountrySelected}
                            closeModal={onHideModal}
                            countries={countryFilteredList}
                            changeView={
                                () =>{ this.setState({ selectCountryView: false,  selectTimeView: true});}
                            }
                        />
                    }
                    { selectTimeView && !selectCountryView && 
                        <div className="timeSelection">
                            <div className="fromTo">
                                <span>From</span>
                                <input 
                                    type="text" 
                                    placeholder="Please type the desire date in the format: YEAR-MONTH-DAY"
                                    className="searchCountry"
                                    onBlur={this.setFromDate}
                                    onChange={() => {this.setState({errorMessage: ""});}} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Please type the desire hour in the format: HOURS:MINUTES:SECONDS"
                                    className="searchCountry"
                                    onBlur={this.setFromHours}
                                    onChange={() => {this.setState({errorMessage: ""});}} 
                                />
                            </div>
                            <div className="fromTo">
                                <span className="padding">To</span>
                                <input 
                                    type="text" 
                                    placeholder="Please type the desire date in the format: YEAR-MONTH-DAY"
                                    className="searchCountry"
                                    onBlur={this.setToDate}
                                    onChange={() => {this.setState({errorMessage: ""});}}  
                                />
                                <input 
                                    type="text" 
                                    placeholder="Please type the desire hour in the format: HOURS:MINUTES:SECONDS"
                                    className="searchCountry"
                                    onBlur={this.setToHours}
                                    onChange={() => {this.setState({errorMessage: ""});}}  
                                />
                            </div>
                            <div className="state">
                                <span>Select state to search</span>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={stateOptions[0]}
                                    name="State"
                                    options={stateOptions}
                                    onChange={(e :any) => {
                                        this.setState({stateToSearch: e.value});
                                    }}
                                />
                            </div>
                            {errorMessage !== "" && 
                                <span className="errorMessage">
                                    {errorMessage}
                                </span>
                            }
                            <button onClick={() => {
                                setSelectedTime(
                                    {
                                        from: `${fromDate}T${fromHour}Z`,
                                        to:  `${toDate}T${toHour}Z`
                                    }
                                );
                                setActualState(stateToSearch);
                            }}>
                                Get Information
                            </button>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        ); 
    }
}

export default SelectCountryModal;