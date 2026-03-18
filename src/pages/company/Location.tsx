import PageHeader from '../../components/PageHeader';
import { MapPin, Phone, Mail, Bus, Train, ExternalLink } from 'lucide-react';
import { GENERATED_IMAGES } from '../../constants/images';

export default function Location() {
  const address = "서울특별시 종로구 종로 266 (종로6가)";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  // Use a simpler and more reliable Google Maps embed URL format
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white">
      <PageHeader 
        title="찾아오시는길" 
        subtitle="동승으로 오시는 길을 안내해 드립니다." 
        imageSrc={GENERATED_IMAGES.LOCATION}
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      <section className="section-padding container-default max-w-5xl">
          <div className="bg-gray-50 h-[500px] mb-24 overflow-hidden border border-gray-100 rounded-xl relative">
            <iframe 
              src={mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-16">
              <div>
                <h2 className="text-h4 mb-10 text-black tracking-tight">본사 정보</h2>
                <ul className="space-y-10">
                  <li className="flex items-start gap-8">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 rounded-md">
                      <MapPin size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-h5 text-black tracking-tight mb-2">주소</h3>
                      <p className="text-gray-500 text-body-m mb-4">{address}</p>
                      <a 
                        href={googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-body-s font-semibold text-black border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
                      >
                        지도에서 위치 보기 <ExternalLink size={14} />
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-8">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 rounded-md">
                      <Phone size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-h5 text-black tracking-tight mb-2">전화번호</h3>
                      <p className="text-gray-500 text-body-m">02-2262-0114</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-8">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 rounded-md">
                      <Mail size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-h5 text-black tracking-tight mb-2">이메일</h3>
                      <p className="text-gray-500 text-body-m">contact@dongsungin.com</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-h4 mb-10 text-black tracking-tight">교통편 안내</h2>
              <ul className="space-y-10">
                <li className="flex items-start gap-8">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 rounded-md">
                    <Train size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-h5 text-black tracking-tight mb-2">지하철</h3>
                    <p className="text-gray-500 text-body-m">
                      1, 4호선 동대문역 8번, 9번 출구 도보 1분
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-8">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 rounded-md">
                    <Bus size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-h5 text-black tracking-tight mb-2">버스</h3>
                    <p className="text-gray-500 text-body-m">
                      동대문역.흥인지문 정류장 하차<br />
                      <span className="text-gray-400 text-body-s mt-2 block">
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
