import React from "react"
import {CrawlerFormDialog} from"./CrawlerFormDialogComponent"
import {ActualJobs} from "./ActualJobs"

export class Control extends React.Component {
    render() {
        return (
            <div>
                <CrawlerFormDialog/>
                <h2>Actual Jobs:</h2>
                <ActualJobs />
            </div>
        );
    }
}