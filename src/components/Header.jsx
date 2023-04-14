import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    loading: true,
    result: '',
  };

  componentDidMount() {
    this.recoveryUser();
  }

  recoveryUser = async () => {
    const result = await getUser();
    this.setState({
      loading: false,
      result,
    });
  };

  render() {
    const { loading, result } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : <p data-testid="header-user-name">{ result.name}</p> }
        <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
