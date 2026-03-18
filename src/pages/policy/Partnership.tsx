import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { GENERATED_IMAGES } from '../../constants/images';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Partnership() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consent, setConsent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="bg-white">
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-20 h-20 bg-gray-100 text-black rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-h3 mb-4">제출이 완료 되었습니다.</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                문의해 주신 내용은 담당 부서에서 신속하게 확인 후<br />
                답변 드리도록 하겠습니다. 감사합니다.
              </p>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="btn-primary w-full py-4 text-lg"
              >
                확인
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PageHeader 
        title="업무 제휴 문의" 
        subtitle="동승과 함께 새로운 미래를 만들어갈 파트너를 모십니다." 
        imageSrc="https://img.freepik.com/free-photo/motivated-business-people-put-hands-together-loyalty-engagement-concept-closeup_1163-4718.jpg"
        paddingTop="pt-[100px] md:pt-0"
        paddingBottom="pb-[20px] md:pb-0"
        pcVerticalAlignment="bottom"
      />
      <section className="section-padding container-default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-h2 mb-6 tracking-tight">제휴 문의 접수</h2>
            <p className="text-body-l text-gray-600">
              아래 양식에 맞춰 내용을 입력해 주시면 담당자가 확인 후 연락 드리겠습니다.
            </p>
          </div>
          
          <div className="border-t-2 border-black"></div>
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              setErrorMessage('');
              
              if (consent !== 'agree') {
                setErrorMessage('개인정보 수집 및 이용에 동의해 주셔야 상담이 가능합니다.');
                return;
              }
              
              setIsSubmitting(true);
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData.entries());
              
              try {
                const { error: dbError } = await supabase
                  .from('partnership_inquiries')
                  .insert([{
                    company_name: data.company_name,
                    person_name: data.person_name,
                    phone: `${data.phone_prefix}-${data.phone_middle}-${data.phone_last}`,
                    email: data.email,
                    content: data.content,
                    status: 'pending'
                  }]);
                
                if (dbError) {
                  console.error('Supabase error:', dbError);
                  throw new Error('데이터베이스 저장 중 오류가 발생했습니다.');
                }

                // Send email notification
                try {
                  await fetch('/api/partnership-inquiry', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                  });
                } catch (emailError) {
                  console.error('Failed to send email:', emailError);
                  // Don't fail the whole process if only email fails
                }
                
                setIsModalOpen(true);
                (e.target as HTMLFormElement).reset();
                setConsent('');
              } catch (error) {
                console.error('Error submitting inquiry:', error);
                setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="text-left border-b border-gray-200"
          >
            {/* 회사명 */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-t border-gray-100">
              <div className="bg-gray-50/50 px-8 py-6 flex items-center font-semibold text-gray-900">
                회사명
              </div>
              <div className="px-8 py-6 flex flex-wrap items-center gap-4">
                <input 
                  type="text" 
                  name="company_name"
                  required
                  placeholder="회사명을 입력하세요"
                  className="border border-gray-200 px-4 py-3 w-full max-w-[300px] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
                <span className="text-error text-sm font-medium">* 필수입력 항목입니다.</span>
              </div>
            </div>

            {/* 성함 */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-t border-gray-100">
              <div className="bg-gray-50/50 px-8 py-6 flex items-center font-semibold text-gray-900">
                성함
              </div>
              <div className="px-8 py-6 flex flex-wrap items-center gap-4">
                <input 
                  type="text" 
                  name="person_name"
                  required
                  placeholder="담당자 성함을 입력하세요"
                  className="border border-gray-200 px-4 py-3 w-full max-w-[300px] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
                <span className="text-error text-sm font-medium">* 필수입력 항목입니다.</span>
              </div>
            </div>

            {/* 연락처 */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-t border-gray-100">
              <div className="bg-gray-50/50 px-8 py-6 flex items-center font-semibold text-gray-900">
                연락처
              </div>
              <div className="px-8 py-6 flex items-center gap-3">
                <select name="phone_prefix" className="border border-gray-200 px-4 py-3 w-28 focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white">
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>
                <span className="text-gray-300">/</span>
                <input type="text" name="phone_middle" className="border border-gray-200 px-4 py-3 w-24 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" maxLength={4} />
                <span className="text-gray-300">/</span>
                <input type="text" name="phone_last" className="border border-gray-200 px-4 py-3 w-24 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" maxLength={4} />
              </div>
            </div>

            {/* 이메일 */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-t border-gray-100">
              <div className="bg-gray-50/50 px-8 py-6 flex items-center font-semibold text-gray-900">
                이메일
              </div>
              <div className="px-8 py-6">
                <input 
                  type="email" 
                  name="email"
                  placeholder="example@domain.com"
                  className="border border-gray-200 px-4 py-3 w-full max-w-[400px] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            {/* 문의 내용 */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-t border-gray-100">
              <div className="bg-gray-50/50 px-8 py-6 flex items-start pt-8 font-semibold text-gray-900">
                문의 내용
              </div>
              <div className="px-8 py-6">
                <textarea 
                  name="content"
                  rows={8}
                  placeholder="제휴 문의 내용을 상세히 입력해 주세요."
                  className="border border-gray-200 px-4 py-3 w-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none transition-all leading-relaxed"
                ></textarea>
              </div>
            </div>

            {/* 개인정보 수집 및 이용동의 */}
            <div className="mt-16 mb-8">
              <h3 className="text-h4 mb-6 font-bold">개인정보 수집 및 이용동의</h3>
              
              <div className="border-t border-gray-200 pt-8">
                <p className="text-gray-600 mb-6">
                  동승(주)에서는 개인정보 보호를 위하여 개인정보 보호지침을 마련하고 이를 준수하고 있습니다.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">1. 개인 정보의 수집·이용 목적</h4>
                    <p className="text-gray-600 pl-4">동승 상담 및 자료 발송</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">2. 수집하는 개인정보의 항목</h4>
                    <p className="text-gray-600 pl-4">회사명, 성함, 연락처, 이메일</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">3. 개인정보의 보유·이용 기간</h4>
                    <p className="text-gray-600 pl-4">수집일로부터 5년</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  위의 개인정보 수집 동의를 거부할 수 있으나, 거부 시 동승 상담 및 자료 발송을 받을 수 없습니다. 더 자세한 내용은 <Link to="/privacy" className="text-blue-600 hover:underline">개인정보 처리방침</Link>을 확인해 주세요.
                </p>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-4">개인정보 수집 및 이용동의 (필수) <span className="text-error">*</span></h4>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="privacy_consent" 
                        value="agree"
                        checked={consent === 'agree'}
                        onChange={(e) => setConsent(e.target.value)}
                        className="w-5 h-5 text-black focus:ring-black border-gray-300"
                      />
                      <span className="text-gray-700">동의합니다</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="privacy_consent" 
                        value="disagree"
                        checked={consent === 'disagree'}
                        onChange={(e) => setConsent(e.target.value)}
                        className="w-5 h-5 text-black focus:ring-black border-gray-300"
                      />
                      <span className="text-gray-700">동의하지 않습니다</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="py-12 flex flex-col items-center gap-4 border-t border-gray-200">
              {errorMessage && (
                <div className="text-error font-medium mb-4 bg-red-50 px-6 py-3 rounded-lg w-full max-w-md text-center">
                  {errorMessage}
                </div>
              )}
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-black text-white font-bold rounded-md min-w-[200px] text-lg py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '제출 중...' : '제출하기'}
                </button>
                <button 
                  type="reset" 
                  disabled={isSubmitting}
                  onClick={() => setErrorMessage('')}
                  className="bg-white text-black font-bold border border-black rounded-md min-w-[200px] text-lg py-4 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  취소하기
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
