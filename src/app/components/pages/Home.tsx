import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Star, Clock, Calendar } from 'lucide-react';
import { movies } from '../../data/mockData';

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroMovies = movies.filter(m => m.status === 'now-playing').slice(0, 3);
  const nowPlayingMovies = movies.filter(m => m.status === 'now-playing');
  const comingSoonMovies = movies.filter(m => m.status === 'coming-soon');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroMovies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
  };

  return (
    <div className="bg-black">
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {heroMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
            <img
              src={movie.poster}
              alt={movie.titleKr}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm rounded-full mb-4">
                    현재 상영중
                  </span>
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
                    {movie.titleKr}
                  </h1>
                  <p className="text-lg text-gray-300 mb-6 line-clamp-3">
                    {movie.synopsis}
                  </p>
                  <div className="flex items-center gap-6 mb-8 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{movie.runtime}분</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{movie.releaseDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      to="/booking"
                      className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      예매하기
                    </Link>
                    <Link
                      to={`/movie/${movie.id}`}
                      className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                    >
                      상세정보
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-red-600 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Now Playing Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-white">현재 상영작</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nowPlayingMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="group"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                <img
                  src={movie.poster}
                  alt={movie.titleKr}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white text-sm font-semibold">{movie.rating}</span>
                </div>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-red-600 transition-colors">
                {movie.titleKr}
              </h3>
              <p className="text-sm text-gray-400">
                {movie.genre} · {movie.ageRating}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-[#0f0f0f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">개봉 예정작</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comingSoonMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                  <img
                    src={movie.poster}
                    alt={movie.titleKr}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white font-semibold">{movie.releaseDate} 개봉</span>
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-red-600 transition-colors">
                  {movie.titleKr}
                </h3>
                <p className="text-sm text-gray-400">
                  {movie.genre} · {movie.ageRating}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
