import { FormGroup, Form } from 'react-bootstrap'
import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class CrawlerFormComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: null,
      url: null,
      maxDepth: null,
      maxPages: null,
    }
    this.setURL = this.setURL.bind(this)
    this.setmaxDepth = this.setmaxDepth.bind(this)
    this.setmaxPages = this.setmaxPages.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  render() {
    const windowStyle = { minWidth: "350px" };
    const fieldStyle = { minWidth: "250px" };
    return (
      <Form inline style={windowStyle} onSubmit={this.handleSubmit}>
        <FormGroup align="center" >
          <div >
            <h1 style={{ color: "navy" }}>Create New Job:</h1>
            <TextField align="center" style={fieldStyle}
              id="url"
              type="url"
              pattern="https?://.+"
              required
              label="url"
              // helperText="Enter a valid url address"
              onChange={this.setURL}
              autoComplete="off"
            />
          </div>

          <div>
            <TextField align="center" style={fieldStyle}
              id="maxDepth"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              required
              label="maxDepth"
              placeholder="Max Depth"
              onChange={this.setmaxDepth}
              autoComplete="off"
            />
          </div>

          <div>
            <TextField align="center" style={fieldStyle}
              id="maxPages"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              required
              label="maxPages"
              placeholder="Max Pages"
              onChange={this.setmaxPages}
              autoComplete="off"
            />
          </div>
          <p><Button style={{ marginLeft: "0%" }} variant="outlined" color="primary" type="submit">Scan</Button></p>
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
    this.props.onRequest({
      command: "NewScanJob",
      args: {
        startUrl: this.state.url,
        maxDepth: this.state.maxDepth,
        maxTotalPages: this.state.maxPages
      }
    })
  }
}
export default CrawlerFormComponent