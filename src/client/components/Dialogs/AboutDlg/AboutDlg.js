import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import './AboutDlg.scss'

export default class AboutDlg extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor() {

    super()

  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  close () {

    this.props.close()
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    const style = {
      overlay: {
        backgroundColor: 'rgba(201, 201, 201, 0.50)'
      }
    }

    return (
      <div>
        <Modal className="dialog about"
          contentLabel=""
          style={style}
          isOpen={this.props.open}
          onRequestClose={() => {this.close()}}>

          <div className="title">
            <img/>
            <b>About Forge React Boiler ...</b>
          </div>

          <div className="content">
             <div>
               Written by Philippe Leefsma
               <br/>
               <a href="https://twitter.com/F3lipek" target="_blank">
               @F3lipek
               </a>
               &nbsp;- February 2017
               <br/>
               <br/>
               Source on github:
               <br/>
               <a href="https://github.com/Autodesk-Forge/forge-react-boiler.nodejs" target="_blank">
               Forge React Boiler
               </a>
             </div>
          </div>
        </Modal>
      </div>
    )
  }
}
