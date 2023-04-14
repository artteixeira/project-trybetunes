import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  state = {
    artist: '',
    disableBtn: true,
    albums: [],
    loading: false,
    oldArtist: '',
    verify: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.disableBtn);
  };

  disableBtn = () => {
    const { artist } = this.state;
    const minAtt = 2;
    const val = artist.length >= minAtt;

    this.setState({
      disableBtn: !val,
    });
  };

  albumVerify = () => {
    const { albums } = this.state;
    const val = albums.length > 1;
    this.setState({
      verify: !val,
    });
  };

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
    });
    const albums = await searchAlbumsAPI(artist);
    this.setState({
      albums,
      oldArtist: artist,
      artist: '',
      loading: false,
    }, this.albumVerify);
  };

  render() {
    const { artist, disableBtn, loading, albums, oldArtist, verify } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <section>
            <input
              data-testid="search-artist-input"
              type="text"
              name="artist"
              id="artist"
              value={ artist }
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              disabled={ disableBtn }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </section>)}
        <main>
          <p>{ `Resultado de álbuns de: ${oldArtist}`}</p>
          { verify
            ? <p>Nenhum álbum foi encontrado</p>
            : (albums
              .map((element, index) => (
                <AlbumCard
                  key={ index }
                  artistName={ element.artistName }
                  albumName={ element.collectionName }
                  albumThumb={ element.artworkUrl100 }
                  linkAlbum={ element.collectionId }
                />)))}
        </main>
      </div>
    );
  }
}

export default Search;
