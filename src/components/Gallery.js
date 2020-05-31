import React from 'react';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';
import 'react-image-gallery/styles/css/image-gallery.css';


const Gallery = ({ images = []}) => {
    return (
        <div>
            <h4>Immagini</h4>
            <ImageGallery   items={images} />
        </div>
    );
}

Gallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            original: PropTypes.string,
            thimbnail: PropTypes.string
        })
    )
}

export default Gallery;