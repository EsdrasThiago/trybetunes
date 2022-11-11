import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    name: '',
    album: '',
    favoriteMusics: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musicInfo = await (getMusics(id));
    const favorite = await getFavoriteSongs();
    this.setState({
      musics: [...musicInfo],
      name: musicInfo[0].artistName,
      album: musicInfo[0].collectionName,
      favoriteMusics: [favorite],
    });
  }

  render() {
    const { name, album, musics, favoriteMusics } = this.state;
    musics.shift();
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album__names">
          <h1 data-testid="artist-name">{name}</h1>
          <h2 data-testid="album-name">{album}</h2>
        </div>
        <MusicCard musics={ musics } favoriteMusics={ favoriteMusics } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
