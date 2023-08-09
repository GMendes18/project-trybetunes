import { SongType } from '../types';

function MusicCard({ trackName, previewUrl }: SongType) {
  return (
    <div>
      <h2>{trackName}</h2>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>Audio</code>
        .
      </audio>
    </div>
  );
}

export default MusicCard;
