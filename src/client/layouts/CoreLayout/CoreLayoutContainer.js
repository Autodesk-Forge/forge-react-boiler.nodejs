import { connect } from 'react-redux'
import CoreLayout from './CoreLayout'
import {
  saveAppState,
  setUser
  } from '../../store/app'

const mapDispatchToProps = {
  saveAppState,
  setUser
}

const mapStateToProps = (state) => ({
  appState: state.app
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(CoreLayout)
