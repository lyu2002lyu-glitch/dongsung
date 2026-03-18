import PageHeader from '../../components/PageHeader';
import { GENERATED_IMAGES } from '../../constants/images';

export default function CCTV() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="영상정보처리기기 운영·관리 방침" 
        subtitle="동승은 본 영상정보처리기기 운영·관리 방침을 통해 처리하는 영상정보가 어떠한 용도와 방식으로 이용·관리되고 있는지 알려 드립니다." 
        imageSrc={GENERATED_IMAGES.NOTICE}
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      <section className="section-padding container-default max-w-4xl">
        <div className="prose prose-gray max-w-none text-gray-600 text-body-m">
          
          <h2 className="text-h4 text-black mb-8 tracking-tight">1. 설치 근거 및 목적</h2>
          <p className="mb-6 font-bold text-black">o 동승은 개인정보보호법 제 25 조 제 1 항, 주차장법시행규칙 제 6 조 제 1 항에 따라 아래 목적으로 영상정보처리기기를 설치·운영 합니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>시설안전 및 화재예방</li>
            <li>고객안전 및 범죄예방</li>
            <li>차량도난 및 파손방지</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">2. 설치 대수, 설치 위치 및 촬영범위</h2>
          <div className="overflow-x-auto mb-12 border-t-2 border-black">
            <table className="w-full border-collapse text-[11px] uppercase tracking-widest">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-center font-bold text-black">구분</th>
                  <th className="p-4 text-center font-bold text-black">설치 대수</th>
                  <th className="p-4 text-center font-bold text-black">설치 위치 및 촬영 범위</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 text-center font-bold text-black" rowSpan={2}>영상정보처리기기 (CCTV)</td>
                  <td className="p-4 text-center text-gray-500">888</td>
                  <td className="p-4 text-center text-gray-500">건물 내·외부</td>
                </tr>
                <tr>
                  <td className="p-4 text-center text-gray-500">29</td>
                  <td className="p-4 text-center text-gray-500">주차장 내 주요지역</td>
                </tr>
                <tr>
                  <td className="p-4 text-center font-bold text-black">차량번호 인식 카메라</td>
                  <td className="p-4 text-center text-gray-500">5</td>
                  <td className="p-4 text-center text-gray-500">주차장 입·출구 및 주요지역</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-h4 text-black mb-8 tracking-tight">3. 관리책임자</h2>
          <div className="overflow-x-auto mb-12 border-t-2 border-black">
            <table className="w-full border-collapse text-[11px] uppercase tracking-widest">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-center font-bold text-black">구분</th>
                  <th className="p-4 text-center font-bold text-black">이름</th>
                  <th className="p-4 text-center font-bold text-black">직책</th>
                  <th className="p-4 text-center font-bold text-black">소속</th>
                  <th className="p-4 text-center font-bold text-black">연락처</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 text-center font-bold text-black">관리책임자</td>
                  <td className="p-4 text-center text-gray-500">주상용</td>
                  <td className="p-4 text-center text-gray-500">과장</td>
                  <td className="p-4 text-center text-gray-500">안전관리실</td>
                  <td className="p-4 text-center text-gray-500">02-2262-0119</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-h4 text-black mb-8 tracking-tight">4. 영상정보 처리 및 관리</h2>
          <p className="mb-6 font-bold text-black">o 동승은 영상정보를 아래와 같이 처리 및 관리하고 있습니다.</p>
          <div className="overflow-x-auto mb-4 border-t-2 border-black">
            <table className="w-full border-collapse text-[11px] uppercase tracking-widest">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-center font-bold text-black">촬영시간</th>
                  <th className="p-4 text-center font-bold text-black">보관기간</th>
                  <th className="p-4 text-center font-bold text-black">보관장소</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 text-center text-gray-500">24 시간</td>
                  <td className="p-4">
                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                      <li>건물 내·외부 : 30 일 이내</li>
                      <li>주차장 및 차량번호 인식 : 30 일 이내</li>
                      <li>영상정보 열람 청구서 : 1 년</li>
                    </ul>
                  </td>
                  <td className="p-4 text-center text-gray-500">안전관리실</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-12 font-bold text-black">o 제 3 자 제공, 파기, 열람, 등에 관한 사항은 기록·관리됩니다.</p>

          <h2 className="text-h4 text-black mb-8 tracking-tight">5. 영상정보 위탁</h2>
          <p className="mb-6 font-bold text-black">o 동승은 주차 서비스 향상을 위해 주차 정산 및 관리와 관련된 영상정보를 아래와 같이 위탁하여 처리하고 있습니다.</p>
          <div className="overflow-x-auto mb-12 border-t-2 border-black">
            <table className="w-full border-collapse text-[11px] uppercase tracking-widest">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-center font-bold text-black">업체</th>
                  <th className="p-4 text-center font-bold text-black">제공 내용</th>
                  <th className="p-4 text-center font-bold text-black">연락처</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 text-center font-bold text-black">두잉피플</td>
                  <td className="p-4 text-center text-gray-500">주차 정산 및 관리</td>
                  <td className="p-4 text-center text-gray-500">02-2262-0265</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-h4 text-black mb-8 tracking-tight">6. 영상정보의 파기</h2>
          <p className="mb-6 font-bold text-black">o 동승은 영상정보를 아래와 같이 재생이 불가능한 방법으로 파기하고 있습니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>전자적 파일 형태의 경우 복구 및 재생되지 않도록 기술적인 포맷으로 삭제</li>
            <li>출력물 등은 분쇄하거나 소각하는 방식으로 파기</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">7. 영상정보의 확인 방법</h2>
          <p className="mb-6 font-bold text-black">o 영상정보는 아래와 같은 방법으로 확인이 가능합니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>확인 방법 : 관리책임자에게 미리 연락하고 방문 후 『열람청구서』 작성 시 확인 가능</li>
            <li>확인 장소 : 안전관리실</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">8. 영상정보 열람 등 요구에 대한 조치</h2>
          <p className="mb-6 font-bold text-black">o 관리책임자는 아래와 같은 경우에만 영상정보의 열람, 확인 및 삭제 요청에 응할 수 있습니다.</p>
          <ul className="list-disc pl-5 mb-4 space-y-3">
            <li>촬영된 정보주체 당사자의 개인영상정보</li>
            <li>정보주체의 급박한 생명, 신체, 재산의 이익을 위해 명백히 필요한 경우</li>
          </ul>
          <p className="mb-12 font-bold text-black">o 동승은 요청받은 영상정보와 관련하여 필요한 조치를 하겠습니다.</p>

          <h2 className="text-h4 text-black mb-8 tracking-tight">9. 영상정보 안정성을 위한 노력</h2>
          <p className="mb-6 font-bold text-black">o 동승은 영상정보가 분실·도난·유출·변조 또는 훼손되지 않도록 개인정보보호법에서 요구하는 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3">
            <li>관리적 조치 : 내부계획 수립 및 시행, 위조·변조 방지</li>
            <li>기술적 조치 : 접근 권한 제한</li>
            <li>물리적 조치 : 저장소 접근통제 및 잠금 장치</li>
          </ul>

          <h2 className="text-h4 text-black mb-8 tracking-tight">10. 영상정보 처리방침 변경</h2>
          <p className="mb-6 font-bold text-black">o 본 영상정보 처리방침은 아래와 같이 시행 되었음을 알려 드립니다.</p>
          <ul className="list-disc pl-5 mb-12 space-y-3 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
            <li>공고일자 : 2025. 2. 14</li>
            <li>시행일자 : 2025. 2. 21</li>
          </ul>

        </div>
      </section>
    </div>
  );
}
