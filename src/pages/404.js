import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

const NotFoundPage = () => (
  <Layout>
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
)

export const Head = () => <Seo title="Pagina non trovata" />

export default NotFoundPage
