import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Gallery from '../components/Gallery'
import Breadcrumb from '../components/Breadcrumb';

export const RoutePostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  gallery = [],
  gpx,
  duration,
  difficulty,
  slug,
  helmet,
}) => {

  const PostContent = contentComponent || Content
  const images = gallery.map( g => {
    return ({ 
      original: g.childImageSharp.original.src, 
      thumbnail: g.childImageSharp.thumbnail.src 
    })});
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">

              <Breadcrumb paths={[
                { name: "Home", href:"/", active: false },
                { name: "Sentieri", href:"/sentieri", active: false }
              ]} />

            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {title}
            </h2>
            <p><small>{description} - <a href={`${gpx}`}>Scarica il tracciato GPX</a> </small></p> 
            <div className="table-container">
            <table className="table is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>Difficoltà</th>
                  <th>Durata</th>
                  <th>Bambini</th>
                  <th>Tracciato</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{difficulty}</td>
                  <td>{duration}</td>
                  <td>sì</td>
                  <td><a href={gpx}>GPX</a></td>
                </tr>
              </tbody>

            </table>
            </div>
            <PostContent content={content} />

              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <Gallery images={images} />
                </div>
              </div>

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
        gpx={post.frontmatter.gpx}
        duration={post.frontmatter.duration}
        difficulty={post.frontmatter.difficulty}
        slug={post.fields.slug}
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
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        gpx
        duration
        difficulty
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
