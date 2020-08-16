import { FormGroup, Form } from 'react-bootstrap'
import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class CrawlerFormComponent extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      url:null,
      maxDepth:null,
      maxPages:null,
    }
    this.setURL = this.setURL.bind(this)
    this.setmaxDepth = this.setmaxDepth.bind(this)
    this.setmaxPages = this.setmaxPages.bind(this)
    // this.socket = io(ENDPOINT)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  render() {
    const windowStyle = {minWidth:"350px"};
    const fildStyle = {minWidth:"200px"};
    return (
        <Form inline style={windowStyle} onSubmit={this.handleSubmit}>
          <FormGroup align="center" style={fildStyle}>
            <div >
              <h1 style={{color: "navy"}}>Create New Job:</h1>
              <TextField 
                id="url"
                type="text"
                label="url"
                placeholder="URL"
                onChange={this.setURL}
                autoComplete="off"
              />
            </div>

            <div>
              <TextField
                id="maxDepth"
                type="number"
                label="maxDepth"
                placeholder="Max Depth"
                onChange={this.setmaxDepth}
                autoComplete="off"
              />
            </div>

            <div>
              <TextField
                id="maxPages"
                type="number"
                label="maxPages"
                placeholder="Max Pages"
                onChange={this.setmaxPages}
                autoComplete="off"
              />
            </div>
            <p><Button style={{marginLeft: "0%"}} variant="outlined" color="primary" type="submit">Scan</Button></p>
          </FormGroup>
          
        </Form>
    )
  }
  setURL(event) {
    this.setState({
      url: event.target.value
    })
  }

  setmaxDepth(event) {
    this.setState({
      maxDepth: event.target.value
    })
  }

  setmaxPages(event) {
    this.setState({
      maxPages: event.target.value
    })
  }


  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
    this.props.onRequest({
        command: "NewScanJob",
        args : {
          startUrl: this.state.url,
          maxDepth: this.state.maxDepth,
          maxTotalPages: this.state.maxPages
        }
    })
  }
}
export default CrawlerFormComponent