import React from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: false,
    logged: '',
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const person = await (getUser());
    this.setState({
      loading: false,
      logged: person.name,
    });
  }

  render() {
    const { loading,
      logged } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <p data-testid="header-user-name" id="user">{logged}</p>}
        <NavLink to="/search" data-testid="link-to-search" />
        <NavLink to="/favorites" data-testid="link-to-favorites" />
        <NavLink to="/profile" data-testid="link-to-profile" />
      </header>
    );
  }
}

export default Header;
