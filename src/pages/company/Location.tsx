import PageHeader from '../../components/PageHeader';
import { MapPin, Phone, Mail, Bus, Train } from 'lucide-react';

export default function Location() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="찾아오시는길" 
        subtitle="동승으로 오시는 길을 안내해 드립니다." 
        imageSrc="https://picsum.photos/seed/location/1920/400?grayscale"
      />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto fade-in">
        <div className="bg-gray-100 h-[400px] rounded-2xl mb-12 flex items-center justify-center">
          <p className="text-gray-500 text-lg">지도 API 영역 (Google Maps 또는 Kakao Maps)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-4">본사 정보</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-gray-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-black">주소</h3>
                  <p className="text-gray-600 mt-1">서울특별시 종로구 종로 266 (종로6가) 동대문종합시장</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="text-gray-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-black">전화번호</h3>
                  <p className="text-gray-600 mt-1">02-2262-0114</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="text-gray-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-black">이메일</h3>
                  <p className="text-gray-600 mt-1">info@dongseung.com</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-4">교통편 안내</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Train className="text-gray-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-black">지하철</h3>
                  <p className="text-gray-600 mt-1">
                    1, 4호선 동대문역 8번, 9번 출구 도보 1분
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Bus className="text-gray-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-black">버스</h3>
                  <p className="text-gray-600 mt-1">
                    동대문역.흥인지문 정류장 하차<br />
                    간선: 101, 103, 105, 144, 152, 201, 260, 261, 262, 270, 271, 370, 420, 720, 721<br />
                    지선: 2112, 2233, 7025
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
