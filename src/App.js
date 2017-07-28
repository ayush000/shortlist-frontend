import React, { Component } from 'react'
import { BootstrapTable as Table, TableHeaderColumn } from 'react-bootstrap-table'
import JobsModal from './JobModal'
import './App.css'

const baseURL = 'http://localhost:3050/api'

class App extends Component {
  constructor() {
    super()
    this.state = {
      jobsData: [],
      modalVisible: false,
      modalData: {},
    }
  }

  /**
   * Fetch all jobs upon loading of component
   */
  componentDidMount() {
    fetch(`${baseURL}/jobs`)
      .then(response => response.json())
      .then(data => {
        this.setState({ jobsData: data })
      })
  }

  showModal = () => this.setState({ modalVisible: true })

  /**
   * Invoked when hyperlink to a job is clicked.
   * Fetches data for that job Id from backend and then renders a modal
   */
  handleJobClick = id => {
    fetch(`${baseURL}/jobs/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ modalData: data })
        this.showModal()
      })
  }

  /**
   * Table helper function. Formats title as hyperlink using multiple fields in a json
   */
  formatTitle = (cell, row) => (
    <a href="#" onClick={() => this.handleJobClick(row.id)}>
      {`${row.companyName} - ${cell}(${row.experience} ${row.experience > 1 ? 'years' : 'year'})`}
    </a>)

  hideModal = () => this.setState({ modalVisible: false })

  render() {
    return (
      <div>
        <h1>Browse Jobs</h1>
        <JobsModal
          modalVisible={this.state.modalVisible}
          hideModal={this.hideModal}
          data={this.state.modalData}
        />
        <Table data={this.state.jobsData}>
          <TableHeaderColumn dataField="id" isKey>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataFormat={this.formatTitle}>
            Title
          </TableHeaderColumn>
          <TableHeaderColumn dataField="city">
            Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="category">
            Category
          </TableHeaderColumn>
        </Table>
      </div>
    )
  }
}

export default App
