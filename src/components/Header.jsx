import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    loading: true,
    result: '',
  };

  recoveryUser = async () => {
    const result = await getUser();
    this.setState({
      loading: false,
      result,
    });
  };

  render() {
    this.recoveryUser();
    const { loading, result } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : <p data-testid="header-user-name">{ result.name}</p> }
      </header>
    );
  }
}

export default Header;
