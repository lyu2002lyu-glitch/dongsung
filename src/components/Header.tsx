import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      title: '회사소개',
      path: '/company/greeting',
      subItems: [
        { title: '인사말', path: '/company/greeting' },
        { title: '연혁', path: '/company/history' },
        { title: '찾아오시는길', path: '/company/location' },
      ],
    },
    {
      title: '사업소개',
      path: '/business/parent',
      subItems: [
        { title: '모회사', path: '/business/parent' },
        { title: '종속회사', path: '/business/subsidiary' },
        { title: '관계회사', path: '/business/affiliate' },
      ],
    },
    {
      title: '인재경영',
      path: '/careers/recruitment',
      subItems: [
        { title: '채용정보', path: '/careers/recruitment' },
      ],
    },
    {
      title: '공시정보',
      path: '/ir/financial',
      subItems: [
        { title: '재무정보', path: '/ir/financial' },
        { title: '공시정보', path: '/ir/disclosure' },
        { title: '전자공고', path: '/ir/notice' },
      ],
    },
  ];

  const headerBg = 'bg-white shadow-sm text-black';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              {/* 첨부해주신 로고 이미지를 src/assets 폴더로 이동하여 import 방식으로 사용하도록 변경했습니다. (GitHub Pages 경로 문제 해결) */}
              <img src={logoImg} alt="동승 로고" className="h-10 w-auto object-contain" onError={(e) => {
                // 이미지가 없을 경우 텍스트로 대체 표시
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} />
              <span className="font-bold text-2xl tracking-tighter hidden">동승</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  to={item.path}
                  className="text-base font-medium hover:text-gray-500 transition-colors py-8"
                >
                  {item.title}
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-48 bg-white shadow-lg rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100/20 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-black border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.title} className="py-2">
                <div className="px-3 py-2 font-bold text-lg">{item.title}</div>
                <div className="pl-6 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.path}
                      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
