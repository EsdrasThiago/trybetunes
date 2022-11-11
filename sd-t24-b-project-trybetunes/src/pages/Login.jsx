import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    isDisabled: true,
    loginName: '',
    loading: false,
    logged: false,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      loginName: value,
    });
    const minNumber = 3;
    if (value.length >= minNumber) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  userCreate = async () => {
    this.setState({
      loading: true,
    });
    const { loginName } = this.state;
    await (createUser({ name: loginName }));
    this.setState({
      loading: false,
      logged: true,
    });
  };

  render() {
    const { loginName,
      isDisabled,
      loading,
      logged } = this.state;
    return (
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <form className="form__login">
              Digite seu nome:
              <input
                type="text"
                data-testid="login-name-input"
                name="loginName"
                value={ loginName }
                onChange={ this.onInputChange }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ isDisabled }
                onClick={ this.userCreate }
              >
                Entrar
              </button>
            </form>)}
        {logged ? <Redirect to="/search" /> : ''}
      </div>
    );
  }
}

export default Login;
