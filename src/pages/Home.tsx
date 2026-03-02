import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Briefcase, Globe, Shield, Zap, Heart } from 'lucide-react';
import { GENERATED_IMAGES } from '../constants/images';
import { supabase } from '../lib/supabase';

interface IRItem {
  id: any;
  title: string;
  created_at: string;
  type: 'disclosure' | 'notice' | 'financial';
  category: string;
}

export default function Home() {
  const [irItems, setIrItems] = useState<IRItem[]>([]);

  useEffect(() => {
    const fetchIRItems = async () => {
      try {
        const { data: discData } = await supabase
          .from('disclosures')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(3);
        
        const { data: noticeData } = await supabase
          .from('notices')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        const combined: IRItem[] = [
          ...(discData || []).map(item => ({ 
            ...item, 
            type: 'disclosure' as const,
            category: '공시정보'
          })),
          ...(noticeData || []).map(item => ({ 
            ...item, 
            type: 'notice' as const,
            category: '전자공고'
          }))
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
         .slice(0, 3);

        // If no data, use sample data from image
        if (combined.length === 0) {
          setIrItems([
            { id: 1, title: '제54기 정기주주총회 소집공고', category: '전자공고', type: 'notice', created_at: '2024-03-15T00:00:00Z' },
            { id: 'financial', title: '2023년 결산 재무제표 공시', category: '재무정보', type: 'financial', created_at: '2024-02-28T00:00:00Z' },
            { id: 1, title: '신규 임원 선임 안내', category: '공시정보', type: 'disclosure', created_at: '2023-11-10T00:00:00Z' },
          ] as any);
        } else {
          setIrItems(combined);
        }
      } catch (error) {
        console.error('Error fetching IR items:', error);
      }
    };

    fetchIRItems();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const getLink = (item: IRItem) => {
    if (item.type === 'disclosure') return `/ir/disclosure/${item.id}`;
    if (item.type === 'notice') return `/ir/notice/${item.id}`;
    if (item.type === 'financial') return `/ir/financial`;
    return '#';
  };
  const coreValues = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "신뢰경영",
      desc: "반세기의 역사가 증명하는 정직과 신뢰를 바탕으로 고객과 함께합니다."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "혁신도전",
      desc: "변화하는 환경에 발맞추어 끊임없는 혁신으로 새로운 가치를 창출합니다."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "상생가치",
      desc: "사회적 책임을 다하며 지역사회와 함께 지속가능한 성장을 추구합니다."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white py-20">
        <div className="absolute inset-0 z-0">
          <img
            src={GENERATED_IMAGES.HOME_HERO}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-10 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          {/* Sophisticated Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
              <div className="h-[1px] w-8 md:w-12 bg-black/10"></div>
              <span className="text-gray-400 text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase">
                Established 1969
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-black/10"></div>
            </div>

            <h1 className="text-4xl md:text-8xl font-light text-black mb-8 md:mb-12 tracking-tighter leading-[0.85] uppercase">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.2, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="font-thin block"
              >
                Dongsung
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="font-black tracking-[-0.07em] block"
              >
                Heritage
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-base md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-12 md:mb-20 tracking-[0.1em] md:tracking-[0.15em] leading-relaxed"
            >
              <span className="font-extralight">전통의 깊이 위에</span> <span className="font-bold text-black px-2">혁신의 가치</span><span className="font-extralight">를 더하다</span><br />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.6em] text-gray-300 uppercase mt-8 md:mt-12 block border-t border-gray-100 pt-8 md:pt-12 w-fit mx-auto">
                Premium Corporate Identity
              </span>
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
              <Link to="/company/greeting" className="w-full sm:w-auto group relative px-10 md:px-16 py-4 md:py-6 bg-black text-white font-bold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <span className="relative z-10 tracking-[0.3em] text-[9px] md:text-[10px]">DISCOVER MORE</span>
                <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
              <Link to="/business/parent" className="w-full sm:w-auto group px-10 md:px-16 py-4 md:py-6 border border-black/10 text-black font-bold rounded-full hover:bg-black hover:text-white transition-all duration-500">
                <span className="tracking-[0.3em] text-[9px] md:text-[10px]">BUSINESS PORTFOLIO</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Minimalist Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
          <div className="w-[1px] h-24 bg-gradient-to-b from-black/20 via-black/5 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 96] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-black/20 to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Vision 2030 Infographic */}
      <section className="py-32 bg-white text-black overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Vision 2030</h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight leading-tight">
                미래를 향한<br />
                <span className="text-gray-300">새로운 도약</span>
              </h3>
              <p className="text-gray-500 text-lg font-light leading-relaxed mb-16 max-w-xl">
                동승은 2030년을 향한 새로운 비전을 통해 지속가능한 성장과 사회적 가치 실현을 목표로 합니다.
              </p>
              
              <div className="space-y-10">
                {[
                  { label: "Digital Transformation", percent: 85, color: "bg-black" },
                  { label: "Sustainable Growth", percent: 92, color: "bg-black/60" },
                  { label: "Global Expansion", percent: 78, color: "bg-black/30" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase text-gray-400">
                      <span>{item.label}</span>
                      <span className="text-black">{item.percent}%</span>
                    </div>
                    <div className="h-[1px] w-full bg-gray-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="h-48 bg-gray-50 flex items-center justify-center border border-gray-100">
                    <div className="text-center">
                      <div className="text-4xl font-light mb-2">01</div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Innovation</div>
                    </div>
                  </div>
                  <div className="h-64 bg-gray-50 flex items-center justify-center border border-gray-100">
                    <div className="text-center">
                      <div className="text-4xl font-light mb-2">02</div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Trust</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="h-64 bg-black flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">03</div>
                      <div className="text-[10px] font-bold tracking-widest uppercase opacity-60">Value</div>
                    </div>
                  </div>
                  <div className="h-48 bg-gray-50 flex items-center justify-center border border-gray-100">
                    <div className="text-center">
                      <div className="text-4xl font-light mb-2">04</div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Global</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-6">Core Values</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black tracking-tight">동승의 핵심가치</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {coreValues.map((value, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-12 border border-gray-100 text-center transition-all duration-300 hover:border-black"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-10">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-6 tracking-tight">{value.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Assets Section */}
      <section className="py-32 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-6">Core Assets</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black tracking-tight">핵심 자산</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative h-[600px] overflow-hidden"
            >
              <img 
                src={GENERATED_IMAGES.MARKET} 
                alt="동대문종합시장" 
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-12">
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">동대문종합시장</h4>
                <p className="text-white/80 text-sm font-light leading-relaxed max-w-md">
                  대한민국 패션의 중심, 반세기를 이어온 전통의 가치
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative h-[600px] overflow-hidden"
            >
              <img 
                src={GENERATED_IMAGES.HOTEL} 
                alt="JW메리어트 동대문 스퀘어 서울" 
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-12">
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">JW메리어트 동대문 스퀘어 서울</h4>
                <p className="text-white/80 text-sm font-light leading-relaxed max-w-md">
                  럭셔리의 새로운 기준, 동대문의 랜드마크
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-32 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold text-black mb-6 tracking-tight">주요 사업영역</h2>
            <p className="text-gray-400 text-base font-light">다양한 분야에서 최고의 가치를 제공합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100">
            {/* Parent Company */}
            <Link to="/business/parent" className="group block border-r border-gray-100 last:border-r-0">
              <div className="p-16 h-full transition-all duration-500 hover:bg-gray-50">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Building2 size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-black mb-6 tracking-tight">모회사</h3>
                <p className="text-gray-500 mb-10 text-sm font-light leading-relaxed">
                  동대문종합시장, JW메리어트 동대문 스퀘어 서울 등 그룹의 핵심 사업을 이끌어갑니다.
                </p>
                <div className="flex items-center text-black font-bold">
                  <span className="text-[10px] tracking-[0.2em] uppercase">자세히 보기</span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Subsidiary */}
            <Link to="/business/subsidiary" className="group block border-r border-gray-100 last:border-r-0">
              <div className="p-16 h-full transition-all duration-500 hover:bg-gray-50">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Globe size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-black mb-6 tracking-tight">종속회사</h3>
                <p className="text-gray-500 mb-10 text-sm font-light leading-relaxed">
                  코트야드 바이 메리어트 평택, (주)동승 파크앤리조트 등 글로벌 확장을 주도합니다.
                </p>
                <div className="flex items-center text-black font-bold">
                  <span className="text-[10px] tracking-[0.2em] uppercase">자세히 보기</span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Affiliate */}
            <Link to="/business/affiliate" className="group block">
              <div className="p-16 h-full transition-all duration-500 hover:bg-gray-50">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Briefcase size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-black mb-6 tracking-tight">관계회사</h3>
                <p className="text-gray-500 mb-10 text-sm font-light leading-relaxed">
                  (주)동승 골프앤리조트, (주)동승 레저 등 레저 및 라이프스타일 산업을 선도합니다.
                </p>
                <div className="flex items-center text-black font-bold">
                  <span className="text-[10px] tracking-[0.2em] uppercase">자세히 보기</span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicator / History Highlight */}
      <section className="bg-white text-black py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight tracking-tight">
                반세기의 신뢰,<br />
                <span className="text-gray-300">100년을 향한 도약</span>
              </h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed mb-16">
                1970년 동대문종합시장 설립 이래, 동승은 끊임없는 도전과 혁신으로 대한민국 유통 및 호스피탈리티 산업의 발전을 이끌어왔습니다. 앞으로도 변함없는 신뢰를 바탕으로 더 큰 미래를 열어가겠습니다.
              </p>
              <Link to="/company/history" className="group inline-flex items-center bg-black text-white px-10 py-5 transition-all duration-300 hover:bg-gray-800">
                <span className="text-[11px] font-bold tracking-widest uppercase">연혁 보기</span>
                <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="border-t border-gray-100 pt-10">
                <div className="text-5xl font-light mb-4">1970</div>
                <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">창립 연도</div>
              </div>
              <div className="border-t border-gray-100 pt-10">
                <div className="text-5xl font-light mb-4">8+</div>
                <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">주요 계열사</div>
              </div>
              <div className="border-t border-gray-100 pt-10">
                <div className="text-5xl font-light mb-4">No.1</div>
                <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">업계 위상</div>
              </div>
              <div className="border-t border-gray-100 pt-10">
                <div className="text-5xl font-light mb-4">Global</div>
                <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">사업 영역</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice & IR */}
      <section className="py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20 border-b border-black pb-10">
          <div>
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.6em] mb-4">Notice & IR</h2>
            <h3 className="text-3xl font-bold text-black tracking-tight">공시 및 공고</h3>
          </div>
          <Link to="/ir/disclosure" className="text-gray-400 hover:text-black flex items-center transition-colors group">
            <span className="text-[11px] font-bold tracking-widest uppercase">View All</span>
            <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="divide-y divide-gray-100">
          {irItems.map((item, idx) => (
            <Link key={idx} to={getLink(item)} className="group flex flex-col sm:flex-row sm:items-center py-12 hover:bg-gray-50 transition-all duration-300 px-10 -mx-10">
              <div className="flex items-center mb-6 sm:mb-0 sm:w-80 shrink-0">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em] w-32">{item.category}</span>
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">{formatDate(item.created_at)}</span>
              </div>
              <h3 className="text-xl font-medium text-black group-hover:text-gray-500 transition-colors tracking-tight">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
