import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Building2, Briefcase, Users, TrendingUp, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      title: '회사소개',
      path: '/company/greeting',
      icon: <Building2 size={20} />,
      subItems: [
        { title: '인사말', path: '/company/greeting' },
        { title: '연혁', path: '/company/history' },
        { title: '뉴스룸', path: '/company/newsroom' },
        { title: '찾아오시는길', path: '/company/location' },
      ],
    },
    {
      title: '사업소개',
      path: '/business/parent',
      icon: <Briefcase size={20} />,
      subItems: [
        { title: '동승', path: '/business/parent' },
        { title: '종속회사', path: '/business/subsidiary' },
        { title: '특수관계회사', path: '/business/affiliate' },
      ],
    },
    {
      title: '인재경영',
      path: '/careers/recruitment',
      icon: <Users size={20} />,
      subItems: [
        { title: '채용정보', path: '/careers/recruitment' },
      ],
    },
    {
      title: '투자정보',
      path: '/ir/financial',
      icon: <TrendingUp size={20} />,
      subItems: [
        { title: '재무정보', path: '/ir/financial' },
        { title: '공고/IR', path: '/ir/notice' },
        { title: '공시정보', path: '/ir/disclosure' },
      ],
    },
    {
      title: '윤리경영',
      path: '/ethics/internal-info',
      icon: <ShieldCheck size={20} />,
      subItems: [
        { title: '내부정보관리규정', path: '/ethics/internal-info' },
        { title: '윤리헌장 및 강령', path: '/ethics/charter' },
        { title: '윤리경영위반 신고', path: '/ethics/report' },
      ],
    },
  ];

  const headerBg = 'bg-white shadow-sm text-black';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container-default">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={location.pathname.startsWith('/en') ? "/logo_02.png" : "/logo_01.png"} 
                alt="동승 로고" 
                className="h-10 w-auto object-contain" 
                referrerPolicy="no-referrer" 
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-12">
            {navItems.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  to={item.path}
                  className="text-h5 font-black text-black hover:text-gray-400 transition-colors py-8 tracking-[0.1em] uppercase"
                >
                  {item.title}
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.path}
                        className="block px-6 py-4 text-body-m font-bold text-gray-600 hover:bg-gray-50 hover:text-black transition-all"
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
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-40 flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-1 overflow-hidden">
            {/* Main Categories (Left Sidebar) */}
            <div className="w-[100px] border-r border-gray-100 bg-gray-50/50 overflow-y-auto">
              {navItems.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setActiveMobileTab(index)}
                  className={`w-full flex flex-col items-center justify-center py-6 px-2 transition-all relative ${
                    activeMobileTab === index 
                      ? 'bg-white text-black' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {activeMobileTab === index && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-black" />
                  )}
                  <div className={`mb-2 ${activeMobileTab === index ? 'text-black' : 'text-gray-300'}`}>
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-black text-center leading-tight">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Sub Items (Right Content) */}
            <div className="flex-1 bg-white overflow-y-auto">
              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-black mb-1">
                    {navItems[activeMobileTab].title}
                  </h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Navigation Menu
                  </p>
                </div>
                
                <div className="grid gap-3">
                  {navItems[activeMobileTab].subItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.path}
                      className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-base font-bold text-gray-800 group-hover:text-black">
                        {subItem.title}
                      </span>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Quick Actions */}
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-tighter">
              <span>© DONGSUNG CO., LTD.</span>
              <div className="flex gap-4">
                <Link to="/company/location" className="hover:text-black">Contact</Link>
                <Link to="/ethics/report" className="hover:text-black">Report</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
