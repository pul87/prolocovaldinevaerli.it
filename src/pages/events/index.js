import React from 'react'

import Layout from '../../components/Layout'
import EventRoll from '../../components/EventRoll'
import Seo from '../../components/Seo'

export const Head = () => (
  <Seo
    title="Eventi"
    description="Tutti gli eventi della Pro Loco Erli"
  />
)

export default class EventsIndexPage extends React.Component {
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
            Eventi
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <EventRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
