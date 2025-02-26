import React, { useState, useEffect } from 'react';
import './MoviesAZ.css';
import MovieCard from '../../components/MovieCard/MovieCard';

interface ContentItem {
  id: number;
  title: string;
  posterUrl: string;
  rating?: number;
  type: 'movie' | 'series';
  genres?: string;
}

const MoviesAZ: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('Fetching movies and series...');
        const moviesResponse = await fetch('http://localhost:3000/movie');
        const seriesResponse = await fetch('http://localhost:3000/series');

        console.log('Movies response:', moviesResponse.status);
        console.log('Series response:', seriesResponse.status);

        const moviesData = await moviesResponse.json();
        const seriesData = await seriesResponse.json();

        console.log('Movies data:', moviesData);
        console.log('Series data:', seriesData);

        // Combine and sort all content
        const allContent = [
          ...(moviesData.data || []).map((movie: any) => ({
            id: movie.movie_id,
            title: movie.title,
            posterUrl: movie.poster_url,
            rating: parseFloat(movie.rating),
            type: 'movie'
          })),
          ...(seriesData.data || []).map((series: any) => ({
            id: series.series_id,
            title: series.title,
            posterUrl: series.poster_url,
            rating: parseFloat(series.rating),
            type: 'series'
          }))
        ].sort((a, b) => 
          a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' })
        );

        console.log('Processed content:', allContent);
        
        setContent(allContent);
        setFilteredContent(allContent);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    
    fetchContent();
  }, []);
  
  useEffect(() => {
    if (selectedLetter) {
      const filtered = content.filter(item => 
        item.title.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove accents
          .charAt(0)
          .toUpperCase() === selectedLetter
      );
      setFilteredContent(filtered);
    } else {
      setFilteredContent(content);
    }
  }, [selectedLetter, content]);

  return (
    <div className="movies-az">
      <h1>Films de A à Z</h1>
      
      <div className="alphabet-filter">
        <button
          className={`letter-button ${selectedLetter === '' ? 'active' : ''}`}
          onClick={() => setSelectedLetter('')}
        >
          Tous
        </button>
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`letter-button ${selectedLetter === letter ? 'active' : ''}`}
            onClick={() => setSelectedLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="content-grid">
        {filteredContent.map((item) => (
          <MovieCard
            key={`${item.type}-${item.id}`}
            id={item.id}
            title={item.title}
            imageUrl={item.posterUrl}
            rating={item.rating}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesAZ;
