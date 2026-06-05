import React from 'react'

import Layout from '../../components/Layout'
import RouteRoll from '../../components/RouteRoll'
import Seo from '../../components/Seo'

export const Head = () => (
  <Seo
    title="Sentieri"
    description="Outdoor e trekking a Erli"
    keywords="sentieri,liguria,outdoor,trekking,erli,comunedierli,comune,valneva,altaviadeimontiliguri,italia,turismo,territorio"
  />
)

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/sentiero_anello_erli_praetto_s_vert_001.jpg')`,
          }}
        >
          <h2
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #F99808, -0.5rem 0 0 #F99808',
              backgroundColor: '#F99808',
              color: 'white',
              padding: '0.6rem',
            }}
          >
            I sentieri 
            <small style={{
              display: "block",
              fontSize: "0.9rem"
            }}>Outdoor e trekking a Erli</small>
          </h2>
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
