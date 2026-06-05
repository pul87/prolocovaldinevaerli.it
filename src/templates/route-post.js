import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Gallery from '../components/Gallery'
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo'

const RoutePostTemplate = ({
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
}) => {

  const PostContent = contentComponent || Content
  const images = (gallery || [])
    .map(g => ({
      original: g.publicURL,
      thumbnail: getSrc(g) || g.publicURL,
    }))
    .filter(image => image.original)
  return (
    <section className="section">
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

export const Head = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Seo
      title={post.frontmatter.title}
      titleSuffix="Sentiero"
      description={post.frontmatter.description}
      keywords="sentieri,liguria,outdoor,trekking,erli,comunedierli,comune,valneva,altaviadeimontiliguri,italia,turismo,territorio"
    />
  )
}

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
          publicURL
          childImageSharp {
            gatsbyImageData(width: 300, quality: 80, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`
