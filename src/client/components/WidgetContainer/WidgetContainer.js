
import ReactDOM from 'react-dom'
import './WidgetContainer.scss'
import React from 'react'

class WidgetContainer extends React.Component {

  constructor () {

    super()

    this.state = {
      style: {}
    }
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  renderChildren() {

    if (this.props.dimensions) {

      return React.Children.map(this.props.children, (child) => {

        const newProps = Object.assign({},
          child.props, {
            dimensions: this.props.dimensions
          })

        return React.cloneElement(child, newProps)
      })
    }

    return this.props.children
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  render() {

    return (
      <div className="widget-container">
        <div className="title">
          <label>
          {this.props.title}
          </label>
        </div>
        <div className="content">
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

export default WidgetContainer
