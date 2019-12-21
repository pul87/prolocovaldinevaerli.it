import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'

class InstaRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allInstaNode

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-4" key={post.id}>
                <Img fluid={post.localFile.childImageSharp.fluid} />
                <p>
                  {post.caption}
                </p>
            </div>
          ))}
      </div>
    )
  }
}

InstaRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query InstaRoll {
        allInstaNode(sort: {fields: timestamp, order: DESC}, limit: 3) {
            edges {
              node {
                id
                caption
                comments
                likes
                type
                timestamp
                username
                localFile {
                  childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
        }
      }
    `}
    render={(data, count) => <InstaRoll data={data} count={count} />}
  />
)