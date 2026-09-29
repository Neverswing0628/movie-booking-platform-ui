import { useState } from 'react';
import { MessageCircle, Send, Phone, Mail, Clock } from 'lucide-react';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    category: '예매/결제',
    question: '예매를 취소하고 싶어요',
    answer: '예매 취소는 상영 시작 20분 전까지 가능합니다. "예매내역" 페이지에서 해당 예매 건을 선택하여 취소하실 수 있습니다. 취소 시 결제하신 수단으로 자동 환불됩니다.',
  },
  {
    id: 2,
    category: '예매/결제',
    question: '결제 후 예매 확인은 어떻게 하나요?',
    answer: '"예매내역" 페이지에서 확인하실 수 있습니다. 예매 완료 후 등록하신 이메일로도 예매 확인 메일이 발송됩니다.',
  },
  {
    id: 3,
    category: '예매/결제',
    question: '할인 쿠폰은 어떻게 사용하나요?',
    answer: '결제 페이지에서 쿠폰 코드를 입력하시면 자동으로 할인이 적용됩니다. 쿠폰은 중복 사용이 불가하며, 유효기간이 있을 수 있습니다.',
  },
  {
    id: 4,
    category: '이용안내',
    question: '좌석은 어떻게 선택하나요?',
    answer: '영화, 극장, 시간을 선택하신 후 좌석 선택 화면에서 원하시는 좌석을 클릭하여 선택하실 수 있습니다. 이미 예매된 좌석은 선택이 불가능합니다.',
  },
  {
    id: 5,
    category: '이용안내',
    question: '관람 연령 제한이 있나요?',
    answer: '영화별로 관람 등급이 있습니다. 청소년 관람불가 영화의 경우 만 19세 미만은 관람하실 수 없으며, 극장 입장 시 신분증 확인이 있을 수 있습니다.',
  },
  {
    id: 6,
    category: '회원/포인트',
    question: '포인트는 어떻게 적립되나요?',
    answer: '영화 예매 시 결제 금액의 5%가 자동으로 포인트로 적립됩니다. 적립된 포인트는 다음 예매 시 사용하실 수 있습니다.',
  },
  {
    id: 7,
    category: '회원/포인트',
    question: '회원 탈퇴는 어떻게 하나요?',
    answer: '마이페이지 > 설정 > 회원탈퇴에서 진행하실 수 있습니다. 단, 예매 내역이 남아있거나 사용 가능한 포인트가 있는 경우 탈퇴가 제한될 수 있습니다.',
  },
  {
    id: 8,
    category: '극장안내',
    question: '주차는 가능한가요?',
    answer: '대부분의 극장에서 주차가 가능합니다. 영화 관람 시 주차 할인 혜택을 받으실 수 있으며, 극장별로 할인 시간이 다를 수 있습니다.',
  },
];

const categories = ['전체', '예매/결제', '이용안내', '회원/포인트', '극장안내'];

export function Inquiry() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '예매/결제',
    subject: '',
    message: '',
  });

  const filteredFaqs = faqs.filter(
    faq => selectedCategory === '전체' || faq.category === selectedCategory
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      category: '예매/결제',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">고객센터</h1>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
            <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">전화 문의</h3>
            <p className="text-2xl font-bold text-white mb-2">1544-0000</p>
            <p className="text-sm text-gray-400">평일 09:00 ~ 18:00</p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
            <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">이메일 문의</h3>
            <p className="text-lg text-white mb-2">support@moviebox.com</p>
            <p className="text-sm text-gray-400">24시간 접수 가능</p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
            <Clock className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">운영 시간</h3>
            <p className="text-lg text-white mb-2">평일 09:00 ~ 18:00</p>
            <p className="text-sm text-gray-400">주말/공휴일 휴무</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white">자주 묻는 질문</h2>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFaqs.map(faq => (
                <div key={faq.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left hover:bg-black/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="inline-block px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded mb-2">
                          {faq.category}
                        </div>
                        <h3 className="text-white font-semibold">{faq.question}</h3>
                      </div>
                      <div className={`text-gray-400 transition-transform ${
                        expandedFaq === faq.id ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </div>
                    </div>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-4 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 1:1 Inquiry Form */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Send className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white">1:1 문의하기</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-lg p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">이름 *</label>
                <input
                  type="text"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  placeholder="이름을 입력하세요"
                  required
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">이메일 *</label>
                <input
                  type="email"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  placeholder="example@email.com"
                  required
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">연락처</label>
                <input
                  type="tel"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  placeholder="010-0000-0000"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">문의 유형 *</label>
                <select
                  value={inquiryForm.category}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, category: e.target.value })}
                  required
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600"
                >
                  <option value="예매/결제">예매/결제</option>
                  <option value="이용안내">이용안내</option>
                  <option value="회원/포인트">회원/포인트</option>
                  <option value="극장안내">극장안내</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">제목 *</label>
                <input
                  type="text"
                  value={inquiryForm.subject}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, subject: e.target.value })}
                  placeholder="문의 제목을 입력하세요"
                  required
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">문의 내용 *</label>
                <textarea
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  placeholder="문의 내용을 상세히 입력해주세요"
                  required
                  rows={6}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>문의하기</span>
              </button>

              <p className="text-gray-500 text-sm text-center">
                문의 접수 후 1-2 영업일 내에 답변 드립니다
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
