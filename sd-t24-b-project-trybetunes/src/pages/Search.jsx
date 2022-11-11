import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isDisabled: true,
    search: '',
    loading: false,
    result: false,
    title: '',
    found: true,
    albunsArray: [],
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
    const minNumber = 2;
    if (value.length >= minNumber) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  clickButton = async (music) => {
    const { search } = this.state;
    this.setState({
      loading: true,
      title: search,
      search: '',
    });
    const albuns = await searchAlbumsAPI(music);
    this.setState({
      loading: false,
      result: true,
      albunsArray: [...albuns],
    });
    if (!albuns.length) {
      this.setState({
        found: false,
        result: true,
      });
    }
  };

  render() {
    const { isDisabled,
      search,
      loading,
      result,
      title,
      albunsArray,
      found,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading
          ? <Loading />
          : (
            <form className="form__login">
              Pesquise um autor
              <input
                type="text"
                name="search"
                value={ search }
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isDisabled }
                onClick={ () => this.clickButton(search) }
              >
                Pesquisar
              </button>
            </form>)}
        {!result
          ? ''
          : (
            <div>
              <p>
                Resultado de álbuns de:
                {` ${title}`}
              </p>
              <ol>
                {albunsArray.map((music) => (
                  <li key={ music.collectionId } className="albuns__list">
                    <p className="background__green">
                      {music.artistId}
                    </p>
                    <h1 className="background__green">
                      {music.artistName}
                    </h1>
                    <Link
                      to={ `/album/${music.collectionId}` }
                      className="album__links"
                      data-testid={ `link-to-album-${music.collectionId}` }
                    >
                      <p className="background__green">
                        {music.collectionId}
                      </p>
                    </Link>
                    <p className="background__green">
                      {music.collectionName}
                    </p>
                    <h3 className="background__green">
                      {music.collectionPrice}
                    </h3>
                    <img src={ music.artworkUrl100 } alt={ music.artworkUrl100 } />
                    <p className="background__green">
                      {music.releaseDate}
                    </p>
                    <h2 className="background__green">
                      {music.trackCount}
                    </h2>
                  </li>
                ))}
              </ol>
            </div>
          )}
        {found
          ? ''
          : (
            <div>
              <p>
                Resultado de álbuns de:
                {` ${title}`}
              </p>
              <h1>Nenhum álbum foi encontrado</h1>
            </div>
          )}
      </div>
    );
  }
}

export default Search;
