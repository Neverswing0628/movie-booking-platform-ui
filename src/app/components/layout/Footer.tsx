import { Film } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white mb-4">
              <Film className="w-6 h-6 text-red-600" />
              <span className="text-lg font-bold">MovieBox</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              대한민국 최고의 영화 예매 플랫폼<br />
              편리하고 빠른 영화 예매 서비스를 제공합니다.
            </p>
            <p className="text-gray-500 text-xs">
              (주)무비박스 | 대표이사: 홍길동<br />
              사업자등록번호: 123-45-67890<br />
              통신판매업신고번호: 제2026-서울강남-0001호
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">고객센터</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">공지사항</a></li>
              <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-white transition-colors">1:1 문의</a></li>
              <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">고객센터</h3>
            <p className="text-2xl font-bold text-white mb-2">1544-0000</p>
            <p className="text-sm text-gray-400">
              평일: 09:00 ~ 18:00<br />
              주말/공휴일: 휴무
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 MovieBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
