const url = 'http://localhost:8080/api/sbmitCrawlerForm';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));



export default (async function sbmitCrawlerForm(values) {
  // await sleep(500); // simulate server latency
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
  console.log(response)
 
  // const body = await response.text();
});