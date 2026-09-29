import { Link, useLocation } from 'react-router';
import { Film, Calendar, Ticket, User } from 'lucide-react';

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white">
            <Film className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold">MovieBox</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              홈
            </Link>
            <Link 
              to="/booking" 
              className={`transition-colors ${isActive('/booking') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              예매하기
            </Link>
            <Link 
              to="/schedule" 
              className={`transition-colors ${isActive('/schedule') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              상영시간표
            </Link>
            <Link 
              to="/my-tickets" 
              className={`transition-colors ${isActive('/my-tickets') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              예매내역
            </Link>
            <Link 
              to="/inquiry" 
              className={`transition-colors ${isActive('/inquiry') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              고객센터
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>로그인</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-800">
        <div className="flex justify-around py-2">
          <Link to="/" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/') ? 'text-white' : 'text-gray-400'}`}>
            <Film className="w-5 h-5" />
            <span className="text-xs">홈</span>
          </Link>
          <Link to="/booking" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/booking') ? 'text-white' : 'text-gray-400'}`}>
            <Ticket className="w-5 h-5" />
            <span className="text-xs">예매</span>
          </Link>
          <Link to="/schedule" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/schedule') ? 'text-white' : 'text-gray-400'}`}>
            <Calendar className="w-5 h-5" />
            <span className="text-xs">시간표</span>
          </Link>
          <Link to="/my-tickets" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/my-tickets') ? 'text-white' : 'text-gray-400'}`}>
            <User className="w-5 h-5" />
            <span className="text-xs">내역</span>
          </Link>
        </div>
      </div>
    </header>
  );
}