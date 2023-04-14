import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    album: [],
    loading: true,
  };

  componentDidMount() {
    this.getMusic();
  }

  getMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const album = await getMusics(`${id}`);
    this.setState({
      album,
      loading: false,
    });
  };

  render() {
    const { album, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading />
          : (
            <main>
              { album.filter((_element, index) => index === 0).map((element, index) => {
                const { artistName, collectionName, artworkUrl100 } = element;
                return (
                  <section key={ index }>
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <h3 data-testid="album-name">{collectionName}</h3>
                    <h4 data-testid="artist-name">{artistName}</h4>
                  </section>
                );
              }) }
              { album.filter((element, index) => index !== 0).map((element, index) => {
                const { trackName, previewUrl } = element;
                return (
                  <section key={ index }>
                    <div>
                      <span>{trackName}</span>
                      <audio data-testid="audio-component" src={ previewUrl } controls>
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
                        {' '}
                        {' '}
                        <code>audio</code>
                        .
                      </audio>
                    </div>
                  </section>
                );
              })}

            </main>) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
