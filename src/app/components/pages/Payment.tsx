import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { CreditCard, Wallet, Building, Ticket } from 'lucide-react';
import { movies, theaters, showtimes } from '../../data/mockData';

type PaymentMethod = 'card' | 'kakaopay' | 'bank';

export function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieId, theaterId, showtimeId, seats, totalPrice } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [couponCode, setCouponCode] = useState('');

  const movie = movies.find(m => m.id === movieId);
  const theater = theaters.find(t => t.id === theaterId);
  const showtime = showtimes.find(s => s.id === showtimeId);

  const availablePoints = 5000;
  const finalPrice = totalPrice - discountAmount - pointsToUse;

  const applyCoupon = () => {
    if (couponCode === 'WELCOME') {
      setDiscountAmount(3000);
      alert('3,000원 할인 쿠폰이 적용되었습니다!');
    } else if (couponCode) {
      alert('유효하지 않은 쿠폰 코드입니다.');
    }
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('결제 수단을 선택해주세요.');
      return;
    }

    // Simulate payment processing
    alert('결제가 완료되었습니다!');
    navigate('/my-tickets');
  };

  if (!movie || !theater || !showtime || !seats) {
    navigate('/booking');
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">결제</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">결제 수단</h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-red-600 bg-red-600/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
                    paymentMethod === 'card' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <div className={`text-sm text-center ${
                    paymentMethod === 'card' ? 'text-white' : 'text-gray-400'
                  }`}>
                    신용카드
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('kakaopay')}
                  className={`p-4 rounded-lg border transition-colors ${
                    paymentMethod === 'kakaopay'
                      ? 'border-red-600 bg-red-600/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Wallet className={`w-8 h-8 mx-auto mb-2 ${
                    paymentMethod === 'kakaopay' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <div className={`text-sm text-center ${
                    paymentMethod === 'kakaopay' ? 'text-white' : 'text-gray-400'
                  }`}>
                    카카오페이
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-lg border transition-colors ${
                    paymentMethod === 'bank'
                      ? 'border-red-600 bg-red-600/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Building className={`w-8 h-8 mx-auto mb-2 ${
                    paymentMethod === 'bank' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                  <div className={`text-sm text-center ${
                    paymentMethod === 'bank' ? 'text-white' : 'text-gray-400'
                  }`}>
                    계좌이체
                  </div>
                </button>
              </div>
            </div>

            {/* Discount Options */}
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">할인/쿠폰</h3>
              
              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2">쿠폰 코드</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="쿠폰 코드 입력 (예: WELCOME)"
                    className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    적용
                  </button>
                </div>
                {discountAmount > 0 && (
                  <div className="mt-2 text-green-400 text-sm">
                    ✓ {discountAmount.toLocaleString()}원 할인이 적용되었습니다
                  </div>
                )}
              </div>

              {/* Points */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  포인트 사용 (보유: {availablePoints.toLocaleString()}P)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={pointsToUse}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      if (value <= availablePoints && value >= 0) {
                        setPointsToUse(value);
                      }
                    }}
                    max={availablePoints}
                    min={0}
                    placeholder="사용할 포인트"
                    className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                  />
                  <button
                    onClick={() => setPointsToUse(Math.min(availablePoints, totalPrice - discountAmount))}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    전액 사용
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Info Notice */}
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
              <div className="text-yellow-400 text-sm space-y-1">
                <p>• 예매 취소는 상영 시작 20분 전까지 가능합니다.</p>
                <p>• 결제 후 예매 내역에서 QR 티켓을 확인하실 수 있습니다.</p>
                <p>• 미성년자는 청소년 관람불가 영화를 관람하실 수 없습니다.</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Ticket className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-white">예매 정보</h3>
              </div>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-800">
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">좌석</span>
                  <span className="text-white">{seats.join(', ')}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">티켓 금액</span>
                  <span className="text-white">{totalPrice.toLocaleString()}원</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">쿠폰 할인</span>
                    <span className="text-green-400">-{discountAmount.toLocaleString()}원</span>
                  </div>
                )}
                {pointsToUse > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">포인트 사용</span>
                    <span className="text-green-400">-{pointsToUse.toLocaleString()}원</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-semibold text-lg">최종 결제 금액</span>
                <span className="text-red-600 font-bold text-2xl">{finalPrice.toLocaleString()}원</span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                {finalPrice.toLocaleString()}원 결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
