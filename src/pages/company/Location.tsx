import PageHeader from '../../components/PageHeader';
import { MapPin, Phone, Mail, Bus, Train } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';

export default function Location() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="찾아오시는길" 
        subtitle="동승으로 오시는 길을 안내해 드립니다." 
        imageSrc={GENERATED_IMAGES.LOCATION}
      />
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 h-[500px] mb-24 overflow-hidden border border-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.441617412762!2d127.00616871221437!3d37.57053597191942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca32609050905%3A0x68rr2c8cx0!2z7ISc7Jq47Yq567OE7IucIOyihOuhnOq1rCDso7TroZwgMjY2!5e0!3m2!1sko!2skr!4v1710000000000!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dongsung Headquarters Map"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-16">
              <div>
                <h2 className="text-2xl font-bold mb-10 text-black tracking-tight">본사 정보</h2>
                <ul className="space-y-10">
                  <li className="flex items-start gap-8">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-base tracking-tight mb-2">주소</h3>
                      <p className="text-gray-500 text-base font-light">서울특별시 종로구 종로 266 (종로6가)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-8">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-base tracking-tight mb-2">전화번호</h3>
                      <p className="text-gray-500 text-base font-light">02-2262-0114</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-8">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <Mail size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-base tracking-tight mb-2">이메일</h3>
                      <p className="text-gray-500 text-base font-light">contact@dongsungin.com</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-10 text-black tracking-tight">교통편 안내</h2>
              <ul className="space-y-10">
                <li className="flex items-start gap-8">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <Train size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-base tracking-tight mb-2">지하철</h3>
                    <p className="text-gray-500 text-base font-light leading-relaxed">
                      1, 4호선 동대문역 8번, 9번 출구 도보 1분
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-8">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <Bus size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-base tracking-tight mb-2">버스</h3>
                    <p className="text-gray-500 text-base font-light leading-relaxed">
                      동대문역.흥인지문 정류장 하차<br />
                      <span className="text-gray-400 text-xs mt-2 block">
                        간선: 101, 103, 105, 144, 152, 201, 260, 261, 262, 270, 271, 370, 420, 720, 721<br />
                        지선: 2112, 2233, 7025
                      </span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
      </section>
    </div>
  );
}
