import React from "react"
import {CrawlerFormDialog} from"../components/CrawlerFormDialogComponent"
import {ActualJobs} from "../components/ActualJobs"

export class ScanesJobPage extends React.Component {
    render = () => {
        return (
            <div>
                <CrawlerFormDialog onRequest={this.props.onRequest}/>
                <h2 style={{color: "Navy"}}>Actual Jobs:</h2>
                {/* <ActualJobs /> */}
            </div>
        );
    }
}