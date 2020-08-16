// import React from "react";
import CrawlerFormComponent from "./CrawlerFormComponent"
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { ScanesJobPage } from "../pages/ScanesJobPage";
import SimpleTable from "./actualJobsTableComponent"
import { ActualJobs } from "./ActualJobs";
const ENDPOINT = "http://localhost:8080/";

const socket = socketIOClient(ENDPOINT);

const mockJob = {
  id: 'fff2',
  startUrl: 'https://www.mako.co.il',
  CreationTime: null,
  WorkStartTime: null,
  WorkCompletionTime: null,
  maxDepth: 3,
  percentageDephCompletion: null,
  // currentDepth: null,
  maxTotalPages: 5,
  // scanedPagesNumber: null,
  percentagePageCompletion: null,
  status: 'NEW',
  
}

let conected = false;

const App = () => {
  const [response, setResponse] = useState("");
  const [query_result, setquery_result] = useState("");
  const [jobs, setJobs] = useState({}); //[mockJob.id]: mockJob
  const localstoragejobs = localStorage.getItem('jobs')? JSON.parse(localStorage.getItem('jobs')): [];
  
  // useEffect(() => {
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
              if(prevJobs){
                console.log(`number of jobs: ${Object.keys(prevJobs).length} ${job.id} ${job.scanedPagesNumber}`);
              }
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
      // setResponse(event);
    // });
    // socket.on("query_result", data => {
    //   console.log(data);
    //   setquery_result(data);
    // });
    
    // CLEAN UP THE EFFECT
  //   return () => socket.disconnect();
  // }, []);

  const sendToServer = (event) => {
    console.log(`event:`, event);
    console.log('try send to server');
    socket.emit('FromClient', event);
  }

  const onJobSelect = (jobId) => {
    console.log('selected job id: ' + jobId, jobs[jobId]);
  }

  const jobsTable = [];
  if (jobs) {
    for (let key of Object.keys(jobs)) {
      const j = JSON.parse(jobs[key]);
      console.log('key ', key, j[key]);
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
      <ScanesJobPage onRequest={sendToServer}/>
      {/* {jobsTable} */}
      <SimpleTable rows={jobs ? jobsList : []} onJobSelect={onJobSelect}/>
      {/* <button onClick={sendToServer}>send</button>
      <div style={{ padding: 15 }}>
        <h2>Crawler Arguments</h2>
        <CrawlerFormComponent onRequest={sendToServer}/>
        <p>It's <time dateTime={response}>{response}</time></p>
        <p>{query_result}</p> 
      </div>*/}
    </div> 
  );
}
  

export default App;
