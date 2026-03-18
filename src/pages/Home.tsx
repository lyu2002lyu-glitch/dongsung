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
  const [irItems, setIrItems] = useState<IRItem[]>([
    { id: 'financial', title: '2024년 결산 재무제표 공시', category: '재무정보', type: 'financial', created_at: '2025-02-28T00:00:00Z' },
    { id: 1, title: '제54기 정기주주총회 소집공고', category: '공고/IR', type: 'notice', created_at: '2024-03-15T00:00:00Z' },
    { id: 'disclosure', title: 'DART 공시정보 바로가기', category: '공시정보', type: 'disclosure', created_at: '2023-11-10T00:00:00Z' },
  ]);

  useEffect(() => {
    const fetchIRItems = async () => {
      try {
        const { data: noticeData, error } = await supabase
          .from('notices')
          .select('id, title, created_at')
          .not('title', 'ilike', '[RECRUIT]%')
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        const noticeItem = noticeData && noticeData.length > 0 ? {
          ...noticeData[0],
          type: 'notice' as const,
          category: '공고/IR'
        } : {
          id: 1, title: '제54기 정기주주총회 소집공고', category: '공고/IR', type: 'notice' as const, created_at: '2024-03-15T00:00:00Z'
        };

        const combined: IRItem[] = [
          { id: 'financial', title: '2024년 결산 재무제표 공시', category: '재무정보', type: 'financial', created_at: '2025-02-28T00:00:00Z' },
          noticeItem,
          { id: 'disclosure', title: 'DART 공시정보 바로가기', category: '공시정보', type: 'disclosure', created_at: '2023-11-10T00:00:00Z' },
        ];

        setIrItems(prev => {
          if (JSON.stringify(prev) === JSON.stringify(combined)) return prev;
          return combined;
        });
      } catch (error) {
        console.error('Error fetching IR items:', error);
        // Do nothing on error since we already have defaults
      }
    };

    fetchIRItems();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '-';
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    } catch (e) {
      return '-';
    }
  };

  const getLink = (item: IRItem) => {
    if (item.type === 'disclosure') return `/ir/disclosure`;
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
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pb-20 pt-20">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full absolute inset-0"
            dangerouslySetInnerHTML={{
              __html: `
                <video
                  autoplay
                  loop
                  muted
                  playsinline
                  class="w-full h-full object-cover opacity-60"
                >
                  <source src="/movie_ver03.mp4" type="video/mp4" />
                </video>
              `
            }}
          />
          {/* Sophisticated Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
              <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
              <span className="text-gray-300 text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase">
                Established 1969
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-white/30"></div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 md:mb-8 tracking-tighter leading-[0.9] uppercase">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="font-black tracking-widest block"
              >
                Dongsung
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="font-black tracking-widest block text-white/50"
              >
                Heritage
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-sm md:text-xl text-gray-300 font-light max-w-3xl mx-auto mb-10 md:mb-16 tracking-[0.1em] md:tracking-[0.15em] leading-relaxed"
            >
              <span className="font-extralight">전통의 깊이 위에</span> <span className="font-bold text-white px-2">혁신의 가치</span><span className="font-extralight">를 더하다</span><br />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.6em] text-gray-400 uppercase mt-6 md:mt-8 block border-t border-white/10 pt-6 md:pt-8 w-fit mx-auto">
                Premium Corporate Identity
              </span>
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 relative">
              <Link to="/company/greeting" className="w-full sm:w-[280px] text-center group relative px-10 py-4 md:py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                <span className="relative z-10 tracking-[0.3em] text-[9px] md:text-[10px]">DISCOVER MORE</span>
                <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
              
              {/* Vertical line separator */}
              <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/20"></div>

              <Link to="/business/parent" className="w-full sm:w-[280px] text-center group px-10 py-4 md:py-5 border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-500 bg-transparent">
                <span className="tracking-[0.3em] text-[9px] md:text-[10px]">BUSINESS PORTFOLIO</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision 2030 Infographic */}
      <section className="section-padding bg-white text-black overflow-hidden border-b border-gray-100">
        <div className="container-default">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <h2 className="text-body-s font-bold text-gray-400 uppercase tracking-[0.6em] mb-8">Vision 2030</h2>
              <h3 className="text-h1 mb-10 tracking-tight">
                <span className="text-gray-500">미래를 향한</span> 새로운 도약
              </h3>
              <p className="text-gray-500 text-body-l mb-16 max-w-xl">
                동승은 2030년을 향한 새로운 비전을 통해 지속가능한 성장과 사회적 가치 실현을 목표로 합니다.
              </p>
              
              <div className="space-y-10">
                {[
                  { label: "Digital Transformation", percent: 85, color: "bg-black" },
                  { label: "Sustainable Growth", percent: 92, color: "bg-black/60" },
                  { label: "Global Expansion", percent: 78, color: "bg-black/30" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex justify-between text-body-s font-bold tracking-widest uppercase text-gray-400">
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
                      <div className="text-body-s font-bold tracking-widest uppercase text-gray-400">Innovation</div>
                    </div>
                  </div>
                  <div className="h-64 bg-gray-50 flex items-center justify-center border border-gray-100">
                    <div className="text-center">
                      <div className="text-4xl font-light mb-2">02</div>
                      <div className="text-body-s font-bold tracking-widest uppercase text-gray-400">Trust</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="h-64 bg-black flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">03</div>
                      <div className="text-body-s font-bold tracking-widest uppercase opacity-60">Value</div>
                    </div>
                  </div>
                  <div className="h-48 bg-gray-50 flex items-center justify-center border border-gray-100">
                    <div className="text-center">
                      <div className="text-4xl font-light mb-2">04</div>
                      <div className="text-body-s font-bold tracking-widest uppercase text-gray-400">Global</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-white">
        <div className="container-default">
          <div className="text-center mb-24">
            <h2 className="text-body-s font-bold text-gray-400 uppercase tracking-[0.6em] mb-6">Core Values</h2>
            <h3 className="text-h2 text-black tracking-tight">핵심 가치</h3>
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
                <h4 className="text-h4 mb-6 tracking-tight">{value.title}</h4>
                <p className="text-gray-500 text-body-m">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Assets Section */}
      <section className="section-padding bg-white overflow-hidden border-b border-gray-100">
        <div className="container-default">
          <div className="text-center mb-24">
            <h2 className="text-body-s font-bold text-gray-400 uppercase tracking-[0.6em] mb-6">Core Assets</h2>
            <h3 className="text-h2 text-black tracking-tight">핵심 자산</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative h-[400px] overflow-hidden rounded-xl bg-gray-100"
            >
              <Link to="/business/parent#company-0" className="block w-full h-full">
                <img 
                  src={GENERATED_IMAGES.MARKET} 
                  alt="동대문종합시장" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                  <h4 className="text-h4 text-white mb-4 tracking-tight">동대문종합시장</h4>
                  <p className="text-white/80 text-body-m max-w-md">
                    대한민국 패션의 중심, 반세기를 이어온 전통의 가치
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative h-[400px] overflow-hidden rounded-xl bg-gray-100"
            >
              <Link to="/business/parent#company-1" className="block w-full h-full">
                <img 
                  src={GENERATED_IMAGES.HOTEL} 
                  alt="JW메리어트 동대문 스퀘어 서울" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                  <h4 className="text-h4 text-white mb-4 tracking-tight">JW메리어트 동대문 스퀘어 서울</h4>
                  <p className="text-white/80 text-body-m max-w-md">
                    럭셔리의 새로운 기준, 동대문의 랜드마크
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="section-padding bg-white border-b border-gray-100">
        <div className="container-default">
          <div className="text-center mb-24">
            <h2 className="text-h2 text-black mb-6 tracking-tight">사업 영역</h2>
            <p className="text-gray-500 text-body-l">다양한 분야에서 최고의 가치를 제공합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 rounded-xl overflow-hidden">
            {/* Parent Company */}
            <Link to="/business/parent" className="group block border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0">
              <div className="p-12 md:p-16 h-full transition-all duration-500 hover:bg-gray-50">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 group-hover:scale-105 transition-transform rounded-md">
                  <Building2 size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-h4 text-black mb-6 tracking-tight">동승</h3>
                <p className="text-gray-500 mb-10 text-body-m">
                  동대문종합시장, JW메리어트 동대문 스퀘어 서울 등 그룹의 핵심 사업을 이끌어갑니다.
                </p>
                <div className="flex items-center text-black font-bold">
                  <span className="text-[12px] tracking-[0.1em] uppercase">자세히 보기</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Subsidiary */}
            <Link to="/business/subsidiary" className="group block border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0">
              <div className="p-12 md:p-16 h-full transition-all duration-500 hover:bg-gray-50">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 group-hover:scale-105 transition-transform rounded-md">
                  <Globe size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-h4 text-black mb-6 tracking-tight">종속회사</h3>
                <p className="text-gray-500 mb-10 text-body-m">
                  코트야드 바이 메리어트 평택, (주)동승파크앤리조트 등 글로벌 확장을 주도합니다.
                </p>
                <div className="flex items-center text-black font-bold">
                  <span className="text-[12px] tracking-[0.1em] uppercase">자세히 보기</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Affiliate */}
            <Link to="/business/affiliate" className="group block">
              <div className="p-12 md:p-16 h-full transition-all duration-500 hover:bg-gray-50">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 group-hover:scale-105 transition-transform rounded-md">
                  <Briefcase size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-h4 text-black mb-6 tracking-tight">특수관계회사</h3>
                <p className="text-gray-500 mb-10 text-body-m">
                  (주)동승골프앤리조트, (주)동승레저 등 레저 및 라이프스타일 산업을 선도합니다.
                </p>
                <div className="flex items-center text-black font-bold">
                  <span className="text-[12px] tracking-[0.1em] uppercase">자세히 보기</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicator / History Highlight */}
      <section className="bg-gray-50 text-black section-padding border-b border-gray-100">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-h2 mb-10 tracking-tight whitespace-nowrap text-gray-500">
                산업을 연결하고, <span className="text-black">가치를 확장하는 플랫폼</span>
              </h2>
              <p className="text-gray-500 text-body-l mb-16">
                1969년 동대문종합시장에서 시작된 동승은, 이제 단순한 공간을 넘어 사람·상품·비즈니스를 유기적으로 연결하는 플랫폼으로 진화하고 있습니다.  신뢰를 기반으로 더 빠르고, 더 효율적인 산업 생태계를 만들어갑니다.
              </p>
              <Link to="/company/history" className="btn-primary rounded-md">
                <span className="text-[14px] font-bold tracking-widest uppercase">연혁 보기</span>
                <ArrowRight size={16} className="ml-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="border-t border-gray-100 pt-10">
                <div className="text-h1 mb-4">1969</div>
                <div className="text-gray-500 text-body-s">창립 연도</div>
              </div>
              <div className="border-t border-gray-100 pt-10">
                <div className="text-h1 mb-4">200+</div>
                <div className="text-gray-500 text-body-s">임직원 수</div>
              </div>
              <div className="border-t border-gray-100 pt-10">
                <div className="text-h1 mb-4">No.1</div>
                <div className="text-gray-500 text-body-s">업계 위상</div>
              </div>
              <div className="border-t border-gray-100 pt-10">
                <div className="text-h1 mb-4">Global</div>
                <div className="text-gray-500 text-body-s">사업 영역</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice & IR */}
      <section className="section-padding container-default">
        <div className="flex justify-between items-end mb-16 border-b border-black pb-8">
          <div>
            <h2 className="text-body-s font-bold text-gray-400 uppercase tracking-[0.6em] mb-4">Notice & IR</h2>
            <h3 className="text-h2 text-black tracking-tight">투자정보</h3>
          </div>
          <Link to="/ir/disclosure" className="btn-tertiary group">
            <span className="text-[14px] font-bold tracking-widest uppercase">View All</span>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="divide-y divide-gray-100">
          {irItems.map((item) => (
            <Link key={`${item.type}-${item.id}`} to={getLink(item)} className="group flex flex-col sm:flex-row sm:items-center py-8 hover:bg-gray-50 transition-all duration-300 px-6 -mx-6 rounded-lg">
              <div className="flex items-center mb-4 sm:mb-0 sm:w-80 shrink-0">
                <span className="text-body-s font-bold text-gray-500 w-32">{item.category}</span>
                <span className="text-gray-400 text-body-s">{formatDate(item.created_at)}</span>
              </div>
              <h3 className="text-h5 text-black group-hover:text-gray-600 transition-colors tracking-tight">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
