import React, {Component} from "react";
import "./CountryInformation";
import {getCurrentCountry, getCurrentCountryInfo} from "../functions";
import { ICountry, getByCountry } from "../api";
import DottedSpinner from "./loaders/DottedSpinner";
import {LineChart, XAxis, Tooltip, CartesianGrid, Line } from "recharts";
import { ResponsiveLine } from '@nivo/line';
interface ICountryResponse{
    Country : string;
    CountryCode : string;
    Province: string;
    City: string;
    CityCode: string;
    Lat: number;
    Lon: number;
    Cases: number;
    Status: string;
    Date: string;
}

interface IState{
    currentCountryInfo : any;
    currentCountry : string;
    countryStats : ICountryResponse[];
    isLoading: boolean;
    dataStats: {x: string, y: number}[];
}

interface IProps{
    selectedCountry : ICountry;
    time: any;
    actualState: string;
}

class CountryInformation extends Component<IProps, IState> {
    constructor(props : IProps){
        super(props);
        this.state = {
            currentCountry : "",
            currentCountryInfo: {},
            countryStats: [],
            isLoading: true,
            dataStats: []
        }
    }
    
    componentDidMount(){
        const { selectedCountry, time, actualState } = this.props;
        getByCountry(selectedCountry.Slug, 
                    time.from ? time.from : undefined, 
                    time.to ? time.to : undefined, 
                    actualState !== "" || actualState ? actualState : undefined)
        .then((res) => {
            console.log("res", res);
            const dataStats : {x: string, y: number}[] = [];
            res.forEach((country : any) => {
                console.log(country);
                const a = parseInt(country.Cases);
                dataStats.push(
                    {
                        x: country.Date,
                        y: a ? a : 0
                    }
                );
            });
            console.log(dataStats);
            this.setState({
                currentCountry : getCurrentCountry(),
                currentCountryInfo: getCurrentCountryInfo(),
                countryStats: res,
                dataStats : dataStats,
                isLoading: false
            });
        });
    }
    

    render(){
        const {isLoading, dataStats} = this.state;
        const {selectedCountry} = this.props;

        return(
            <React.Fragment>
                {!isLoading && 
                    <div className="countryInfo">
                        <div className="header">
                            <img alt={`${selectedCountry.ISO2.toLowerCase()}`} src={`https://www.countryFlags.io/${selectedCountry.ISO2.toLowerCase()}/shiny/64.png`}/>
                        </div>
                        <div className="body">
                            {/*<LineChart
                                data={dataStats}
                            >
                                <XAxis dataKey="date"/>
                                <Tooltip/>
                                <CartesianGrid stroke="#f5f5f5" />
                                <Line type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
                                <Line type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
                            </LineChart>*/}
                            <ResponsiveLine
                                data={[{
                                    id: "chart",
                                    color: "hsl(326, 70%, 50%)",
                                    data: dataStats
                                }]}
                                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                                xScale={{ type: 'point' }}
                                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    orient: 'bottom',
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'transportation',
                                    legendOffset: 36,
                                    legendPosition: 'middle'
                                }}
                                axisLeft={{
                                    orient: 'left',
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'count',
                                    legendOffset: -40,
                                    legendPosition: 'middle'
                                }}
                                colors={{ scheme: 'nivo' }}
                                pointSize={10}
                                pointColor={{ theme: 'background' }}
                                pointBorderWidth={2}
                                pointBorderColor={{ from: 'serieColor' }}
                                pointLabel="y"
                                pointLabelYOffset={-12}
                                useMesh={true}
                                legends={[
                                    {
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 100,
                                        translateY: 0,
                                        itemsSpacing: 0,
                                        itemDirection: 'left-to-right',
                                        itemWidth: 80,
                                        itemHeight: 20,
                                        itemOpacity: 0.75,
                                        symbolSize: 12,
                                        symbolShape: 'circle',
                                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                                    itemOpacity: 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </div>
                    </div>
                }
                {isLoading && <DottedSpinner loading={isLoading}/>}
        </React.Fragment>
        );
    }
    
}

export default CountryInformation;