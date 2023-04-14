import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    album: [],
    loading: true,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.getMusic();
    const FAVORITE_SONGS_KEY = 'favorite_songs';
    if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY))) {
      localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
    }
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

  addFavoriteSong = async (param) => {
    this.setState({
      loading: true,
    });
    await addSong(param);
    this.setState({
      loading: false,
    }, this.getFavoriteSongs);
  };

  getFavoriteSongs = async () => {
    const favoriteSong = await getFavoriteSongs();
    this.setState({
      favoriteSongs: [...favoriteSong],
    });
  };

  render() {
    const { album, loading, favoriteSongs } = this.state;
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
              <section>
                { album.filter((_element, index) => index !== 0).map((element, index) => {
                  const { trackName, previewUrl, trackId } = element;
                  return (
                    <MusicCard
                      trackName={ trackName }
                      previewUrl={ previewUrl }
                      key={ index }
                      trackId={ trackId }
                      onChange={ async () => {
                        await this.addFavoriteSong(element);
                      } }
                      checked={ favoriteSongs
                        .some((song) => song.trackId === trackId) }
                    />
                  );
                })}
              </section>
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
