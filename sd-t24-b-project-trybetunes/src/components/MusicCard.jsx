import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  favoriteMusic = async (event) => {
    this.setState({
      loading: true,
    });
    console.log(event.target.checked);
    await addSong(event.target.id);
    this.setState({
      loading: false,
    });
    // console.log(loading);
  };

  render() {
    const { musics } = this.props;
    const { loading } = this.state;
    return (
      <div>
        {loading ? <Loading /> : ''}
        <ol>
          {musics.map((music) => (
            <li key={ music.trackName } className="album__musics">
              <p className="background__green__two">{music.trackName}</p>
              <audio
                className="background__green"
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
              </audio>
              <div>
                <label htmlFor={ music.trackId }>
                  Favorita
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    id={ music.trackId }
                    onChange={ this.favoriteMusic }
                  />
                </label>

              </div>
            </li>))}
        </ol>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
