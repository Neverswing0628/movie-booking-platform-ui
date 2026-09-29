import { useParams, Link } from 'react-router';
import { useState } from 'react';
import { Star, Clock, Calendar, User, Film as FilmIcon, ThumbsUp, Edit3 } from 'lucide-react';
import { movies } from '../../data/mockData';

const tabs = ['줄거리', '출연진', '관람평'] as const;

export function MovieDetail() {
  const { id } = useParams();
  const movie = movies.find(m => m.id === id);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('줄거리');

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">영화를 찾을 수 없습니다</h2>
          <Link to="/" className="text-red-600 hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const mockReviews = [
    { id: 1, author: '김영화', rating: 9.5, comment: '올해 최고의 영화! 강력 추천합니다.', date: '2026-02-14', likes: 124 },
    { id: 2, author: '이시네마', rating: 8.8, comment: '스토리 전개가 탄탄하고 연기력이 훌륭해요.', date: '2026-02-13', likes: 89 },
    { id: 3, author: '박무비', rating: 9.2, comment: 'CG가 정말 대단하고 몰입감이 최고입니다.', date: '2026-02-12', likes: 156 },
    { id: 4, author: '최관람', rating: 7.5, comment: '기대했던 것보다는 조금 아쉽지만 볼만합니다.', date: '2026-02-11', likes: 45 },
    { id: 5, author: '정영화', rating: 9.8, comment: '인생 영화 추가했습니다. 반드시 보세요!', date: '2026-02-10', likes: 234 },
  ];

  const [userReview, setUserReview] = useState({ rating: 0, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = () => {
    if (userReview.rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    if (!userReview.comment.trim()) {
      alert('관람평을 작성해주세요.');
      return;
    }
    alert('관람평이 등록되었습니다!');
    setUserReview({ rating: 0, comment: '' });
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <img
          src={movie.poster}
          alt={movie.titleKr}
          className="w-full h-full object-cover opacity-50"
        />
        
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex gap-8 items-start">
              {/* Poster */}
              <div className="hidden md:block">
                <img
                  src={movie.poster}
                  alt={movie.titleKr}
                  className="w-64 rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-red-600 text-white text-sm rounded-full mb-4">
                  {movie.status === 'now-playing' ? '현재 상영중' : '개봉 예정'}
                </div>
                <h1 className="text-5xl font-bold text-white mb-2">{movie.titleKr}</h1>
                <p className="text-2xl text-gray-300 mb-6">{movie.title}</p>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-white text-2xl font-bold">{movie.rating}</span>
                    <span className="text-gray-400">/10</span>
                  </div>
                  <div className="h-6 w-px bg-gray-600" />
                  <span className="text-gray-300">{movie.ageRating}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <FilmIcon className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="text-sm text-gray-400">장르</div>
                      <div>{movie.genre}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="text-sm text-gray-400">러닝타임</div>
                      <div>{movie.runtime}분</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="text-sm text-gray-400">개봉일</div>
                      <div>{movie.releaseDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <User className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="text-sm text-gray-400">감독</div>
                      <div>{movie.director}</div>
                    </div>
                  </div>
                </div>

                {movie.status === 'now-playing' && (
                  <div className="flex gap-4">
                    <Link
                      to="/booking"
                      className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      예매하기
                    </Link>
                    <Link
                      to="/schedule"
                      className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors font-semibold"
                    >
                      상영시간표
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-gray-800 mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="text-white">
          {activeTab === '줄거리' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">줄거리</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.synopsis}
              </p>
            </div>
          )}

          {activeTab === '출연진' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">주요 출연진</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="text-center">
                    <div className="w-full aspect-square bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-600" />
                    </div>
                    <div className="font-semibold">{actor}</div>
                    <div className="text-sm text-gray-400">배우</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === '관람평' && (
            <div>
              {/* Review Summary */}
              <div className="bg-[#1a1a1a] rounded-lg p-8 mb-8">
                <div className="flex items-center gap-12">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">{movie.rating}</div>
                    <div className="flex items-center gap-1 justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= Math.floor(movie.rating / 2)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-gray-400 text-sm">총 {mockReviews.length}개의 평가</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[10, 8, 6, 4, 2].map((rating) => {
                        const count = mockReviews.filter(r => r.rating >= rating && r.rating < rating + 2).length;
                        const percentage = (count / mockReviews.length) * 100;
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-white text-sm">{rating}</span>
                            </div>
                            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className="text-gray-400 text-sm w-12 text-right">{count}개</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Write Review Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  <Edit3 className="w-5 h-5" />
                  <span>관람평 작성</span>
                </button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="bg-[#1a1a1a] rounded-lg p-6 mb-8">
                  <h4 className="text-white font-semibold mb-4">관람평 작성하기</h4>
                  
                  {/* Star Rating Input */}
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-2">별점</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setUserReview({ ...userReview, rating })}
                          className={`w-12 h-12 rounded-lg border-2 transition-all ${
                            userReview.rating >= rating
                              ? 'border-yellow-400 bg-yellow-400/20'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <span className={`font-semibold ${
                            userReview.rating >= rating ? 'text-yellow-400' : 'text-gray-500'
                          }`}>
                            {rating}
                          </span>
                        </button>
                      ))}
                    </div>
                    {userReview.rating > 0 && (
                      <div className="mt-2 text-yellow-400 text-sm">
                        선택한 별점: {userReview.rating}점
                      </div>
                    )}
                  </div>

                  {/* Comment Input */}
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-2">관람평</label>
                    <textarea
                      value={userReview.comment}
                      onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                      placeholder="영화에 대한 솔직한 평가를 남겨주세요..."
                      rows={4}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 resize-none"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmitReview}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      등록하기
                    </button>
                    <button
                      onClick={() => {
                        setShowReviewForm(false);
                        setUserReview({ rating: 0, comment: '' });
                      }}
                      className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {mockReviews.map(review => (
                  <div key={review.id} className="bg-[#1a1a1a] rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{review.author}</div>
                          <div className="text-sm text-gray-400">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded-lg">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-white text-lg">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">{review.comment}</p>
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-800">
                      <button className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">도움됨 {review.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}