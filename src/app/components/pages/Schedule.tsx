import { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Clock } from 'lucide-react';
import { movies, theaters, showtimes } from '../../data/mockData';

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState('2026-02-15');
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);

  const nowPlayingMovies = movies.filter(m => m.status === 'now-playing');
  
  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date('2026-02-15');
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return {
      full: date.toISOString().split('T')[0],
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayOfWeek: days[date.getDay()],
    };
  };

  const getShowtimesForMovie = (movieId: string, theaterId: string | null) => {
    return showtimes.filter(s => 
      s.movieId === movieId && 
      (!theaterId || s.theaterId === theaterId)
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">상영시간표</h1>

        {/* Date Selection */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">날짜 선택</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dates.map(date => {
              const formatted = formatDate(date);
              const isSelected = formatted.full === selectedDate;
              const isToday = formatted.full === '2026-02-15';
              
              return (
                <button
                  key={formatted.full}
                  onClick={() => setSelectedDate(formatted.full)}
                  className={`flex-shrink-0 px-6 py-4 rounded-lg border transition-colors ${
                    isSelected
                      ? 'border-red-600 bg-red-600/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-sm mb-1 ${isSelected ? 'text-red-600' : 'text-gray-400'}`}>
                      {formatted.month}.{formatted.day}
                    </div>
                    <div className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {formatted.dayOfWeek}
                    </div>
                    {isToday && (
                      <div className="text-xs text-red-600 mt-1">오늘</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Theater Filter */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">극장 선택</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedTheater(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedTheater
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              전체
            </button>
            {theaters.map(theater => (
              <button
                key={theater.id}
                onClick={() => setSelectedTheater(theater.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTheater === theater.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {theater.name}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Schedule List */}
        <div className="space-y-6">
          {nowPlayingMovies.map(movie => {
            const movieShowtimes = getShowtimesForMovie(movie.id, selectedTheater);
            
            if (movieShowtimes.length === 0) return null;

            // Group showtimes by theater
            const showtimesByTheater = movieShowtimes.reduce((acc, showtime) => {
              if (!acc[showtime.theaterId]) {
                acc[showtime.theaterId] = [];
              }
              acc[showtime.theaterId].push(showtime);
              return acc;
            }, {} as Record<string, typeof showtimes>);

            return (
              <div key={movie.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <div className="flex gap-6 p-6 border-b border-gray-800">
                  {/* Movie Poster */}
                  <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
                    <img
                      src={movie.poster}
                      alt={movie.titleKr}
                      className="w-32 rounded-lg hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Movie Info */}
                  <div className="flex-1">
                    <Link to={`/movie/${movie.id}`}>
                      <h3 className="text-2xl font-bold text-white mb-2 hover:text-red-600 transition-colors">
                        {movie.titleKr}
                      </h3>
                    </Link>
                    <p className="text-gray-400 mb-4">{movie.genre} · {movie.ageRating} · {movie.runtime}분</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white font-semibold">{movie.rating}</span>
                      </div>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-400">감독: {movie.director}</span>
                    </div>
                  </div>
                </div>

                {/* Showtimes by Theater */}
                <div className="p-6">
                  {Object.entries(showtimesByTheater).map(([theaterId, times]) => {
                    const theater = theaters.find(t => t.id === theaterId);
                    if (!theater) return null;

                    return (
                      <div key={theaterId} className="mb-6 last:mb-0">
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <h4 className="text-white font-semibold">{theater.name}</h4>
                          <span className="text-gray-500 text-sm">{theater.location}</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {times.map(showtime => (
                            <Link
                              key={showtime.id}
                              to="/booking"
                              state={{ preselected: { movieId: movie.id, theaterId, showtimeId: showtime.id } }}
                              className="block p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-red-600 transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-white font-semibold">{showtime.startTime}</span>
                              </div>
                              <div className="text-xs text-gray-400 mb-1">
                                {showtime.screenNumber}관
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className={showtime.availableSeats < 30 ? 'text-red-400' : 'text-green-400'}>
                                  {showtime.availableSeats}석
                                </span>
                                <span className="text-gray-500">
                                  {(showtime.price / 1000).toFixed(0)}천원
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
