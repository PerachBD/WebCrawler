// import React from "react";
import React, { useState } from "react";
import socketIOClient from "socket.io-client";
import SimpleTable from "./actualJobsTableComponent";
import { CrawlerFormDialog } from "../components/CrawlerFormDialogComponent";
import JobSelectedDialog from "./JobSelectedComponent";
import {JobsContext} from "../jobs-context"

const ENDPOINT = "http://localhost:8080/";

const socket = socketIOClient(ENDPOINT);
let flow = []

let conected = false;

const App = () => {
  const [jobs, setJobs] = useState({});
  const [isJobSelected, setIsJobSelected] = useState(false);
  const [selectedJob, setSlectedJob] = useState(null);
  const localstoragejobs = localStorage.getItem('jobs') ? JSON.parse(localStorage.getItem('jobs')) : [];

  if (!conected) {
    console.log('socket listen');
    socket.on("FromServer", event => {
      console.log('Get event from Server', event);
      switch (event.command) {
        case "JobUpdate":
          const job = event.args;

          if (!localstoragejobs.includes(job.id)) {
            localstoragejobs.push(job.id);
          }
          localStorage.setItem('jobs', JSON.stringify(localstoragejobs));
          setJobs(prevJobs => {
            return {
              ...(prevJobs ? prevJobs : {}),
              [job.id]: JSON.stringify(job)
            }
          })
          break;

        default:
          break;
      }
    })
    const connectionMsg = { command: 'getJobs', args: localstoragejobs }
    socket.emit('FromClient', connectionMsg)
    conected = true;
  }

  const sendToServer = (event) => {
    socket.emit('FromClient', event);
  }

  const onJobSelect = (jobId) => {
    console.log(`table clicked`)
    setIsJobSelected(true);
    let getJob = jobs[jobId] ? JSON.parse(jobs[jobId])['result'] : null
    setSlectedJob(getJob);
    flow.push(getJob)
  }
  const childSelected = (child) => {
    if (child) {
      setIsJobSelected(true);
      setSlectedJob(child);
      flow.push(child);
    }
  }
  const JobSelectedBack = () => {
    flow.pop();
    if (flow.length) childSelected(flow.pop());
    else setIsJobSelected(false);
  }

  const JobSelectedclose = () => {
    flow = []
    setIsJobSelected(false);
  }

  // const jobsTable = [];
  // if (jobs) {
  //   for (let key of Object.keys(jobs)) {
  //     const j = JSON.parse(jobs[key]);
  //     jobsTable.push(<div key={j.id}>{j.id} | {j.startUrl} | {j.maxDepth} | {j.maxTotalPages} | {j.scanedPagesNumber} | {j.currentDepth} | {j.status} | {j.CreationTime} </div>)
  //   }
  // }

  return (
    <div>
      <JobsContext.Provider value = {[jobs, setJobs]}>
      <CrawlerFormDialog onRequest={sendToServer} />
      <h2 style={{ color: "Navy" }}>Actual Jobs:</h2>
      <SimpleTable onJobSelect={onJobSelect} sendToServer={sendToServer}/>
      <JobSelectedDialog open={isJobSelected} handleClose={JobSelectedclose} handleBack={JobSelectedBack} selectedValue={selectedJob} childSelected={childSelected} />
      </JobsContext.Provider>
    </div>
  );
}


export default App;
