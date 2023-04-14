import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { artistName, albumName, albumThumb, linkAlbum } = this.props;
    return (
      <Link data-testid={ `link-to-album-${linkAlbum}` } to={ `/album/${linkAlbum}` }>
        <div>
          <img src={ albumThumb } alt={ albumName } />
          <p>{albumName}</p>
          <p>{artistName}</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  albumThumb: PropTypes.string.isRequired,
  linkAlbum: PropTypes.number.isRequired,
};

export default AlbumCard;
