import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artist: '',
    disableBtn: true,
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

  render() {
    const { artist, disableBtn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <main>
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
          >
            Pesquisar
          </button>
        </main>
      </div>
    );
  }
}

export default Search;
