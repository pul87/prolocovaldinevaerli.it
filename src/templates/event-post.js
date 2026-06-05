import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import EventPostTemplate from '../components/templates/EventPostTemplate'
import Seo from '../components/Seo'

const EventPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <EventPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

EventPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default EventPost

export const Head = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Seo
      title={post.frontmatter.title}
      titleSuffix="Eventi"
      description={post.frontmatter.description}
    />
  )
}

export const pageQuery = graphql`
  query EventPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
