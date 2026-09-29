import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Check } from 'lucide-react';
import { movies, theaters, showtimes } from '../../data/mockData';

type Step = 'movie' | 'theater' | 'datetime';

export function Booking() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('movie');
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  const nowPlayingMovies = movies.filter(m => m.status === 'now-playing');
  
  const availableShowtimes = showtimes.filter(
    s => s.movieId === selectedMovie && s.theaterId === selectedTheater
  );

  const handleMovieSelect = (movieId: string) => {
    setSelectedMovie(movieId);
    setCurrentStep('theater');
  };

  const handleTheaterSelect = (theaterId: string) => {
    setSelectedTheater(theaterId);
    setCurrentStep('datetime');
  };

  const handleShowtimeSelect = (showtimeId: string) => {
    setSelectedShowtime(showtimeId);
  };

  const handleNext = () => {
    if (selectedShowtime) {
      navigate('/seat-selection', { 
        state: { 
          movieId: selectedMovie, 
          theaterId: selectedTheater,
          showtimeId: selectedShowtime 
        } 
      });
    }
  };

  const selectedMovieData = movies.find(m => m.id === selectedMovie);
  const selectedTheaterData = theaters.find(t => t.id === selectedTheater);
  const selectedShowtimeData = showtimes.find(s => s.id === selectedShowtime);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">빠른 예매</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                currentStep === 'movie' || selectedMovie ? 'bg-red-600' : 'bg-gray-700'
              }`}>
                {selectedMovie ? <Check className="w-6 h-6 text-white" /> : <span className="text-white font-semibold">1</span>}
              </div>
              <span className={`text-sm ${currentStep === 'movie' ? 'text-white' : 'text-gray-400'}`}>영화 선택</span>
            </div>

            <ChevronRight className="w-6 h-6 text-gray-600 mb-6" />

            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                currentStep === 'theater' || selectedTheater ? 'bg-red-600' : 'bg-gray-700'
              }`}>
                {selectedTheater ? <Check className="w-6 h-6 text-white" /> : <span className="text-white font-semibold">2</span>}
              </div>
              <span className={`text-sm ${currentStep === 'theater' ? 'text-white' : 'text-gray-400'}`}>극장 선택</span>
            </div>

            <ChevronRight className="w-6 h-6 text-gray-600 mb-6" />

            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                currentStep === 'datetime' || selectedShowtime ? 'bg-red-600' : 'bg-gray-700'
              }`}>
                {selectedShowtime ? <Check className="w-6 h-6 text-white" /> : <span className="text-white font-semibold">3</span>}
              </div>
              <span className={`text-sm ${currentStep === 'datetime' ? 'text-white' : 'text-gray-400'}`}>시간 선택</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Movie Selection */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">영화</h3>
              <div className="space-y-2">
                {nowPlayingMovies.map((movie) => (
                  <button
                    key={movie.id}
                    onClick={() => handleMovieSelect(movie.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedMovie === movie.id
                        ? 'bg-red-600 text-white'
                        : 'bg-black/50 text-gray-300 hover:bg-black'
                    }`}
                  >
                    <div className="font-semibold mb-1">{movie.titleKr}</div>
                    <div className="text-xs opacity-70">{movie.ageRating}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Theater Selection */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">극장</h3>
              <div className="space-y-2">
                {theaters.map((theater) => (
                  <button
                    key={theater.id}
                    onClick={() => handleTheaterSelect(theater.id)}
                    disabled={!selectedMovie}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      !selectedMovie
                        ? 'bg-black/30 text-gray-600 cursor-not-allowed'
                        : selectedTheater === theater.id
                        ? 'bg-red-600 text-white'
                        : 'bg-black/50 text-gray-300 hover:bg-black'
                    }`}
                  >
                    <div className="font-semibold mb-1">{theater.name}</div>
                    <div className="text-xs opacity-70">{theater.location}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">상영 시간</h3>
              
              {!selectedTheater ? (
                <div className="text-center py-12 text-gray-400">
                  영화와 극장을 먼저 선택해주세요
                </div>
              ) : availableShowtimes.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  선택하신 극장에 상영 일정이 없습니다
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-3">2026년 2월 15일 (토)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableShowtimes.map((showtime) => (
                        <button
                          key={showtime.id}
                          onClick={() => handleShowtimeSelect(showtime.id)}
                          className={`p-4 rounded-lg border transition-colors ${
                            selectedShowtime === showtime.id
                              ? 'border-red-600 bg-red-600/10'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className={`text-xl font-semibold mb-2 ${
                            selectedShowtime === showtime.id ? 'text-red-600' : 'text-white'
                          }`}>
                            {showtime.startTime}
                          </div>
                          <div className="text-sm text-gray-400 mb-1">
                            {showtime.screenNumber}관
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className={showtime.availableSeats < 30 ? 'text-red-400' : 'text-green-400'}>
                              {showtime.availableSeats}석
                            </span>
                            <span className="text-gray-500">
                              {showtime.price.toLocaleString()}원
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selection Summary & Next Button */}
        {selectedShowtime && (
          <div className="mt-8 bg-[#1a1a1a] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-sm text-gray-400 mb-1">영화</div>
                  <div className="text-white font-semibold">{selectedMovieData?.titleKr}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">극장</div>
                  <div className="text-white font-semibold">{selectedTheaterData?.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">일시</div>
                  <div className="text-white font-semibold">
                    2월 15일 {selectedShowtimeData?.startTime}
                  </div>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                좌석 선택
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
