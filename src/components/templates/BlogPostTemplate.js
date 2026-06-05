import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import Content from '../Content'
import Gallery from '../Gallery'

const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  gallery = [],
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
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />

            {images && images.length > 0 ? (
              <div className="columns">
                <div className="column is-12">
                  <Gallery images={images} />
                </div>
              </div>
            ) : null}
            
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

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
}

export default BlogPostTemplate
