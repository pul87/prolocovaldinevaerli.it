import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Gallery from '../components/Gallery'

export const RoutePostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  gallery = [],
  helmet,
}) => {
  const PostContent = contentComponent || Content
  const images = gallery.map( g => (
    { 
      original: g.childImageSharp.original.src, 
      thumbnail: g.childImageSharp.thumbnail.src 
    }));
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <Gallery images={images} />
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

RoutePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const RoutePost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <RoutePostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        gallery={post.frontmatter.gallery}
        helmet={
          <Helmet titleTemplate="%s | Sentiero">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta 
              name="keywords" 
              content="sentieri,liguria,outdoor,trekking,erli,comunedierli,comune,valneva,altaviadeimontiliguri,italia,turismo,territorio"
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

RoutePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default RoutePost

export const pageQuery = graphql`
  query RoutePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        gallery {
          childImageSharp {
            thumbnail: fixed(width: 300) {
              src
            }
            original {
              src
            }
          }
        }
      }
    }
  }
`
