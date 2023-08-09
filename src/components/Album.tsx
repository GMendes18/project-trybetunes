import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import LoadingText from './Loading';

function Album() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [albumInfo, setAlbumInfo] = useState<AlbumType>();
  const [songs, setSongs] = useState<SongType[]>([]);

  useEffect(() => {
    const getSongs = async () => {
      if (typeof id === 'string' && id.length > 0) {
        const [album, ...songsData] = await getMusics(id);
        console.log(getMusics('1484688048'));
        setAlbumInfo(album);
        setSongs(songsData);
        setLoading(false);
      }
    };
    getSongs();
  }, [id]);

  return (
    <div>
      {loading ? (
        <LoadingText />
      ) : (
        <>
          <h2 data-testid="artist-name">{albumInfo?.artistName}</h2>
          <h3 data-testid="album-name">{albumInfo?.collectionName}</h3>
          {songs.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackId={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Album;
