import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Monitor, X } from 'lucide-react';
import { movies, theaters, showtimes } from '../../data/mockData';

type SeatStatus = 'available' | 'selected' | 'occupied';

interface Seat {
  row: string;
  number: number;
  status: SeatStatus;
}

export function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieId, theaterId, showtimeId } = location.state || {};

  const [seats, setSeats] = useState<Seat[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const movie = movies.find(m => m.id === movieId);
  const theater = theaters.find(t => t.id === theaterId);
  const showtime = showtimes.find(s => s.id === showtimeId);

  useEffect(() => {
    if (!movieId || !theaterId || !showtimeId) {
      navigate('/booking');
      return;
    }

    // Initialize seats (10 rows x 15 seats)
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const initialSeats: Seat[] = [];
    
    rows.forEach(row => {
      for (let num = 1; num <= 15; num++) {
        // Randomly mark some seats as occupied for demo
        const isOccupied = Math.random() > 0.7;
        initialSeats.push({
          row,
          number: num,
          status: isOccupied ? 'occupied' : 'available',
        });
      }
    });
    
    setSeats(initialSeats);
  }, [movieId, theaterId, showtimeId, navigate]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('예매 시간이 만료되었습니다.');
          navigate('/booking');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleSeatClick = (index: number) => {
    setSeats(prev => prev.map((seat, i) => {
      if (i === index && seat.status !== 'occupied') {
        return {
          ...seat,
          status: seat.status === 'selected' ? 'available' : 'selected',
        };
      }
      return seat;
    }));
  };

  const selectedSeats = seats.filter(s => s.status === 'selected');
  const totalPrice = selectedSeats.length * (showtime?.price || 0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert('좌석을 선택해주세요.');
      return;
    }
    navigate('/payment', {
      state: {
        movieId,
        theaterId,
        showtimeId,
        seats: selectedSeats.map(s => `${s.row}${s.number}`),
        totalPrice,
      },
    });
  };

  if (!movie || !theater || !showtime) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">좌석 선택</h1>
          <div className="flex items-center gap-4">
            <div className="bg-red-600 px-6 py-3 rounded-lg">
              <div className="text-white text-center">
                <div className="text-sm">남은 시간</div>
                <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1a] rounded-lg p-8">
              {/* Screen */}
              <div className="mb-12">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-sm">SCREEN</span>
                </div>
                <div className="h-2 bg-gradient-to-b from-gray-300 to-transparent rounded-t-full" />
              </div>

              {/* Seats Grid */}
              <div className="space-y-3">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(row => (
                  <div key={row} className="flex items-center gap-2">
                    <span className="w-6 text-gray-400 text-sm font-semibold">{row}</span>
                    <div className="flex gap-2 flex-1 justify-center">
                      {seats
                        .filter(seat => seat.row === row)
                        .map((seat, index) => (
                          <button
                            key={`${seat.row}${seat.number}`}
                            onClick={() => handleSeatClick(seats.indexOf(seat))}
                            disabled={seat.status === 'occupied'}
                            className={`w-8 h-8 rounded-t-lg text-xs font-semibold transition-all ${
                              seat.status === 'selected'
                                ? 'bg-red-600 text-white scale-110'
                                : seat.status === 'occupied'
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-600 text-white hover:bg-gray-500'
                            }`}
                          >
                            {seat.number}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-600 rounded-t-lg" />
                  <span className="text-gray-400 text-sm">선택 가능</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-600 rounded-t-lg" />
                  <span className="text-gray-400 text-sm">선택됨</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-700 rounded-t-lg" />
                  <span className="text-gray-400 text-sm">예매완료</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-6">예매 정보</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">영화</span>
                  <span className="text-white font-semibold">{movie.titleKr}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">극장</span>
                  <span className="text-white">{theater.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">상영관</span>
                  <span className="text-white">{showtime.screenNumber}관</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">일시</span>
                  <span className="text-white">2월 15일 {showtime.startTime}</span>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6 mb-6">
                <h4 className="text-white font-semibold mb-4">선택한 좌석</h4>
                {selectedSeats.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    좌석을 선택해주세요
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedSeats.map(seat => (
                      <div
                        key={`${seat.row}${seat.number}`}
                        className="flex items-center justify-between bg-black/50 px-4 py-2 rounded-lg"
                      >
                        <span className="text-white font-semibold">
                          {seat.row}{seat.number}
                        </span>
                        <button
                          onClick={() => handleSeatClick(seats.indexOf(seat))}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-800 pt-6 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">좌석 수</span>
                  <span className="text-white">{selectedSeats.length}석</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">좌석당 가격</span>
                  <span className="text-white">{showtime.price.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-white font-semibold">총 금액</span>
                  <span className="text-red-600 font-bold">{totalPrice.toLocaleString()}원</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={selectedSeats.length === 0}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
