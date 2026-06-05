import React from 'react'
import PropTypes from 'prop-types'
import EventPostTemplate from '../../components/templates/EventPostTemplate'

const EventPostPreview = ({ entry, widgetFor }) => (
  <EventPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

EventPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default EventPostPreview
