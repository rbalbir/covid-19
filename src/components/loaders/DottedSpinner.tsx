import React from "react";
import "./DottedSpinner";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

interface IProps {
    loading : boolean;
}
const DottedSpinner = (props : IProps) => {
    return (
        <div className="dottedSpinner">
            <ClimbingBoxLoader size={20} loading={props.loading} color={"#6ea5ff"} css={"margin-top: 20rem"}/>
        </div>
    )
}

export default DottedSpinner;