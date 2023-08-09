import { useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

function MusicCard({ trackName, previewUrl, trackId }: SongType) {
  const [favorite, setFavorite] = useState(false);
  const checkFavorite = () => {
    setFavorite(!favorite);
  };
  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          id={ `checkbox-music-${trackId}` }
          checked={ favorite }
          onChange={ checkFavorite }
        />
        {favorite ? (
          <img
            src={ checkedHeart }
            alt="favorite"
          />
        ) : (
          <img
            src={ emptyHeart }
            alt="favorite"
          />
        )}
      </label>
    </div>
  );
}

export default MusicCard;
