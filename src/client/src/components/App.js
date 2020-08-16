// import React from "react";
import React, { useState } from "react";
import socketIOClient from "socket.io-client";
import SimpleTable from "./actualJobsTableComponent"
import {CrawlerFormDialog} from"../components/CrawlerFormDialogComponent"
import JobSelectedDialog from "./JobSelectedComponent"
const ENDPOINT = "http://localhost:8080/";

const socket = socketIOClient(ENDPOINT);

let conected = false;
let isJobSelected;
let selectedJob;

const App = () => {
  const [jobs, setJobs] = useState({}); 
  const localstoragejobs = localStorage.getItem('jobs')? JSON.parse(localStorage.getItem('jobs')): [];
  
  if(!conected){
    console.log('socket listen');
    socket.on("FromAPI", event => {
      console.log('Get event from Server');
      console.log(event);
      switch (event.command) {
        case "JobUpdate":
          const job = event.args;
          
          if(!localstoragejobs.includes(job.id)){
            localstoragejobs.push(job.id);
          }
          localStorage.setItem('jobs', JSON.stringify(localstoragejobs));
          setJobs( prevJobs => {
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
    const connectionMsg = {command: 'getJobs', args: localstoragejobs}
    socket.emit('FromClient', connectionMsg)
    conected = true;
  }

  const sendToServer = (event) => {
    console.log(`event:`, event);
    console.log('try send to server');
    socket.emit('FromClient', event);
  }

  isJobSelected = true
  selectedJob = jobs['sjvRtnC7X']?JSON.parse(jobs['sjvRtnC7X'])['result']:null;
  let flow = []
  const onJobSelect = (jobId) => {
    isJobSelected= true;
    selectedJob=jobs[jobId]?JSON.parse(jobs[jobId])['result']:null;
    flow.push(selectedJob)
    console.log('isJobSelected:' + isJobSelected, selectedJob["url"]);
    console.log('flow ' + flow);
  }
  const childSelected = (child) => {
    isJobSelected= true;
    selectedJob=child;
    flow.push(selectedJob);
    console.log('isJobSelected:' + isJobSelected, selectedJob["url"]);
    console.log('flow ' + flow);
  }
  const JobSelectedClose = () => {
    isJobSelected= false;
    flow.pop();
    if(flow.length)childSelected(flow.pop());
    else console.log('isJobSelected: ' + isJobSelected);
    // console.log('flow ' + flow);
  }

  const jobsTable = [];
  if (jobs) {
    for (let key of Object.keys(jobs)) {
      // console.log("jobs[key]",jobs[key])
      const j = JSON.parse(jobs[key]);
      // console.log('key ', j);
      jobsTable.push(<div key={j.id}>{j.id} | {j.startUrl} | {j.maxDepth} | {j.maxTotalPages} | {j.scanedPagesNumber} | {j.currentDepth} | {j.status} | {j.CreationTime} </div>)
    }
  }


  const jobsList = Object.values(jobs).map(item => {
    return {
      ...JSON.parse(item),
      result: null
    }
  });
  console.log('jobsList:',jobsList);

  return (
    <div>
      <CrawlerFormDialog onRequest={sendToServer}/>
      <h2 style={{color: "Navy"}}>Actual Jobs:</h2>
      <SimpleTable rows={jobs ? jobsList : []} onJobSelect={onJobSelect}/>
      <JobSelectedDialog open={isJobSelected} selectedValue={selectedJob} childSelected={childSelected} handleClose={JobSelectedClose} /> 
      
    </div> 
  );
}
  

export default App;
