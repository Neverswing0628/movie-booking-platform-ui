import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, MapPin, Users, Ticket, XCircle } from 'lucide-react';
import { mockBookings } from '../../data/mockData';

type FilterStatus = 'all' | 'confirmed' | 'cancelled';

export function MyTickets() {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const filteredBookings = mockBookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const handleCancelBooking = (bookingId: string) => {
    const confirmed = window.confirm('정말 예매를 취소하시겠습니까?');
    if (confirmed) {
      alert('예매가 취소되었습니다.');
      // In a real app, this would update the booking status
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">예매 내역</h1>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          <button
            onClick={() => setFilter('all')}
            className={`pb-4 px-4 font-semibold transition-colors relative ${
              filter === 'all' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            전체
            {filter === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`pb-4 px-4 font-semibold transition-colors relative ${
              filter === 'confirmed' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            예매 확정
            {filter === 'confirmed' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`pb-4 px-4 font-semibold transition-colors relative ${
              filter === 'cancelled' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            취소 내역
            {filter === 'cancelled' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>
        </div>

        {/* Booking List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20">
            <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">예매 내역이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <div
                key={booking.id}
                className={`bg-[#1a1a1a] rounded-lg overflow-hidden ${
                  booking.status === 'cancelled' ? 'opacity-60' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">
                          {booking.movieTitle}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            booking.status === 'confirmed'
                              ? 'bg-green-600/20 text-green-400'
                              : 'bg-red-600/20 text-red-400'
                          }`}
                        >
                          {booking.status === 'confirmed' ? '예매 확정' : '취소됨'}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-3 text-gray-300">
                          <MapPin className="w-5 h-5 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-400">극장</div>
                            <div>{booking.theaterName} {booking.screenNumber}관</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                          <Calendar className="w-5 h-5 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-400">일시</div>
                            <div>{booking.date} {booking.time}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                          <Users className="w-5 h-5 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-400">좌석</div>
                            <div>{booking.seats.join(', ')}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                          <Ticket className="w-5 h-5 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-400">결제 금액</div>
                            <div className="font-semibold">{booking.totalPrice.toLocaleString()}원</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500">
                        예매일: {booking.bookingDate}
                      </div>
                    </div>

                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => setSelectedTicket(selectedTicket === booking.id ? null : booking.id)}
                        className="ml-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        {selectedTicket === booking.id ? 'QR 닫기' : 'QR 보기'}
                      </button>
                    )}
                  </div>

                  {/* QR Code Section */}
                  {selectedTicket === booking.id && booking.status === 'confirmed' && (
                    <div className="border-t border-gray-800 pt-6 mt-4">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-white p-6 rounded-lg">
                          <QRCodeSVG
                            value={`BOOKING-${booking.id}`}
                            size={200}
                            level="H"
                            includeMargin={true}
                          />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-white font-semibold text-lg mb-2">
                            입장 시 QR 코드를 제시해주세요
                          </h4>
                          <p className="text-gray-400 text-sm mb-4">
                            극장 입구에서 QR 코드를 스캔하시면 입장하실 수 있습니다.
                          </p>
                          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3">
                            <p className="text-yellow-400 text-sm">
                              • 상영 시작 20분 전까지 취소 가능합니다<br />
                              • QR 코드는 타인에게 양도할 수 없습니다
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {booking.status === 'confirmed' && (
                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-800">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>예매 취소</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
