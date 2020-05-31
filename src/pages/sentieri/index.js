import React from 'react'

import Layout from '../../components/Layout'
import RouteRoll from '../../components/RouteRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/vista-erli-pale-eoliche.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #F99808, -0.5rem 0 0 #F99808',
              backgroundColor: '#F99808',
              color: 'white',
              padding: '1rem',
            }}
          >
            Tutti i sentieri
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <RouteRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
