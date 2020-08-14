import { FormGroup, FormControl, Form, Button } from 'react-bootstrap'
import React from "react";
// import io from "socket.io-client";
// const ENDPOINT = "http://localhost:8080/";


class CrawlerFormComponent extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      url:null,
      maxDepth:null,
      maxPages:null
    }
    this.setURL = this.setURL.bind(this)
    this.setmaxDepth = this.setmaxDepth.bind(this)
    this.setmaxPages = this.setmaxPages.bind(this)
    // this.socket = io(ENDPOINT)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {

    return (
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup>
            <div>
              <h4>URL :</h4>{' '}
              <FormControl
                id="url"
                type="text"
                label="url"
                placeholder="URL"
                onChange={this.setURL}
                autoComplete="off"
              />
            </div>

            <div>
              <h4>Max Depth</h4>{' '}
              <FormControl
                id="maxDepth"
                type="number"
                label="maxDepth"
                placeholder="Max Depth"
                onChange={this.setmaxDepth}
                autoComplete="off"
              />
            </div>

            <div>
              <h4>Max Pages</h4>{' '}
              <FormControl
                id="maxPages"
                type="number"
                label="maxPages"
                placeholder="Max Pages"
                onChange={this.setmaxPages}
                autoComplete="off"
              />
            </div>

          </FormGroup>
          <p><Button type="submit">Scan</Button></p>
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
        url:this.state.url,
        maxDepth:this.state.maxDepth,
        maxPages:this.state.maxPages
    })
    // this.socket.emit("sbmitCrawlerParameters", {
    //   url:this.state.url,
    //   maxDepth:this.state.maxDepth,
    //   maxPages:this.state.maxPages
    // })
  }
}
export default CrawlerFormComponent