import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    name: '',
    disableBtn: true,
    loading: false,
  };

  disableBtn = () => {
    const { name } = this.state;
    const maxAtt = 3;
    const val = name.length >= maxAtt;

    this.setState({
      disableBtn: !val,
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.disableBtn);
  };

  handleClick = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    history.push('/search');
  };

  render() {
    const { disableBtn, loginName, loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading />
          : (
            <>
              <input
                value={ loginName }
                data-testid="login-name-input"
                type="text"
                name="name"
                id="name"
                onChange={ this.handleChange }
              />
              <button
                data-testid="login-submit-button"
                disabled={ disableBtn }
                onClick={ this.handleClick }
              >
                Entrar
              </button>

            </>)}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
