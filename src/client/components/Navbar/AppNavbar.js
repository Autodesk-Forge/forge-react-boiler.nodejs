
import { LinkContainer } from 'react-router-bootstrap'
import React, { PropTypes } from 'react'
import AboutDlg from 'Dialogs/AboutDlg'
import './AppNavbar.scss'

import {
  DropdownButton,
  NavDropdown,
  MenuItem,
  NavItem,
  Navbar,
  Button,
  Modal,
  Nav
  } from 'react-bootstrap'

export default class AppNavbar extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  state = {
    aboutOpen: false
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  openAboutDlg () {

    this.setState(Object.assign({}, this.state, {
      aboutOpen: true
    }))
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    const { appState } = this.props;

    return (

      <Navbar className="forge-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <NavItem className="forge-brand-item"
              href="https://forge.autodesk.com"
              target="_blank">
              <img height="30" src="/resources/img/forge-logo.png"/>
            </NavItem>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>

          {
            appState.navbar.links.home &&

            <Nav>
              <LinkContainer to={{ pathname: '/', query: { } }}>
                <NavItem eventKey="home">
                  &nbsp; Home
                </NavItem>
              </LinkContainer>
            </Nav>
          }

          <Nav pullRight>

            {
              appState.navbar.links.about &&

              <NavItem eventKey="about" onClick={() => {this.openAboutDlg()}}>
                &nbsp; About ...
              </NavItem>
            }
          </Nav>

        </Navbar.Collapse>

        <AboutDlg
          close={()=>{ this.setState(Object.assign({}, this.state, {
            aboutOpen: false
          }))}}
          open={this.state.aboutOpen}
        />

      </Navbar>
    )
  }
}
