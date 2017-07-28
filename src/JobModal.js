import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

class JobModal extends Component {
  render() {
    const { data } = this.props
    return (
      <Modal
        isOpen={this.props.modalVisible}
        contentLabel="Modal"
        onRequestClose={this.props.hideModal}
      >
        <h2>{data.title}</h2>
        <ul>
          <li><b>Category: </b>{data.category}</li>
          {data.company ? (<li><b>Company</b>
            <ul>
              <li><b>Name: </b>{data.company.name}</li>
              <li><b>About: </b>{data.company.about}</li>
            </ul>
          </li>) : null}
          <li><b>Experience: </b>{data.experience} {data.experience > 1 ? 'years' : 'year'}</li>
          <li><b>Job description: </b>{data.details}</li>
          <li><b>Location: </b>{data.location && data.location.city}</li>
        </ul>
        <button onClick={this.props.hideModal}>Close</button>
      </Modal>
    )
  }
}

JobModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

export default JobModal
