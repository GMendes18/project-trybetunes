import { useState } from 'react';
import searchAlbums from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import LoadingText from './Loading';
import { Link } from 'react-router-dom';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [artist, setArtist] = useState('');

  const handleChange = (event:
    React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setArtistName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (artistName.length >= 2) {
      setLoading(true);
      try {
        const response = await searchAlbums(artistName);
        setAlbums(response);
        setArtist(artistName);
        setLoading(false);
        setArtistName('');
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="artistName"
          value={artistName}
          data-testid="search-artist-input"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={artistName.length < 2}
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>

      {loading && <LoadingText />}

      {albums.length > 0 && (
        <div>
          <p>
            Resultado de álbuns de:
            {' '}
            {artist}
          </p>
          <ul>
            {albums.map((album) => (
              <li key={album.collectionId}>
                <Link
                  to={`/album/${album.collectionId}`}
                  data-testid={`link-to-album-${album.collectionId}`}
                >
                  {album.collectionName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {albums.length === 0 && <p>Nenhum álbum foi encontrado</p>}
    </div>
  );
}

export default Search;
