import { IndexLink, Link } from 'react-router'
import React from 'react'
import './HomeView.scss'

class HomeView extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor() {

    super()

    this.state = {
      models: [
        {
          path: 'resources/models/seat/seat.svf',
          thumbnailClass: 'seat-thumbnail',
          name: 'Seat'
        }
      ]
    }
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    return (
      <div className="home">
        <img className='logo-hero'/>
        <div className="models">
          <div className="title">
            Choose Model
          </div>
          <div className="content responsive-grid">
            {
              this.state.models.map((model, idx) => {
                return (
                  <Link key={idx} to={`/viewer?path=${model.path}`}>
                    <figure>
                      <figcaption>
                        {model.name}
                      </figcaption>
                      <img className={model.thumbnailClass || 'default-thumbnail'}
                        src={model.thumbnail || ''}/>
                    </figure>
                  </Link>)
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
























































