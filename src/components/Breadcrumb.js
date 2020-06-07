import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = ({paths = []}) => {
    return (
        <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
            {
                paths.map((path, idx) => {
                    return <li key={idx} className={path.active ? "is-active" : ""}><a href={path.href}>{path.name}</a></li>
                })
            }
        </ul>
        </nav>
    );
}

Breadcrumb.propTypes = {
    paths: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            href: PropTypes.string,
            active: PropTypes.bool
        })
    )
}

export default Breadcrumb;