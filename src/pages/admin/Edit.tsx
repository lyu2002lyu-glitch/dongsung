import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';

export default function AdminEdit() {
  const navigate = useNavigate();
  const { type, id } = useParams<{ type: string; id: string }>();
  
  const [board, setBoard] = useState<'notices' | 'newsroom' | 'recruitments'>(
    (type as 'notices' | 'newsroom' | 'recruitments') || 'notices'
  );
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [recruitmentType, setRecruitmentType] = useState<'경력' | '신입' | '무관'>('경력');
  const [recruitmentUrl, setRecruitmentUrl] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('isAdminAuthorized') === 'true');
  
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    message: string;
    type: 'alert' | 'confirm';
    onConfirm?: () => void;
  }>({ isOpen: false, message: '', type: 'alert' });

  const showAlert = (message: string) => {
    setModalConfig({ isOpen: true, message, type: 'alert' });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  useEffect(() => {
    if (isAuthenticated && id && type) {
      fetchPost();
    }
  }, [isAuthenticated, id, type]);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const targetTable = type === 'recruitments' ? 'notices' : type;
      
      const { data, error } = await supabase
        .from(targetTable!)
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        if (type === 'recruitments') {
          setTitle(data.title.replace('[RECRUIT] ', ''));
          try {
            const parsedContent = JSON.parse(data.content);
            setRecruitmentType(parsedContent.type || '경력');
            setRecruitmentUrl(parsedContent.url || '');
          } catch (e) {
            console.error('Failed to parse recruitment content', e);
          }
        } else {
          setTitle(data.title);
          setContent(data.content || '');
          if (type === 'newsroom') {
            setImageUrl(data.image_url || '');
          }
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      showAlert('게시글을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'Lee5245lee!') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthorized', 'true');
    } else {
      showAlert('비밀번호가 틀렸습니다.');
      setPassword('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    
    if (board !== 'recruitments' && (!title.trim() || !content.trim())) {
      showAlert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    if (board === 'recruitments' && (!title.trim() || !recruitmentUrl.trim())) {
      showAlert('채용 제목과 URL을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      let payload: any = {};
      let targetTable = board;

      if (board === 'recruitments') {
        targetTable = 'notices';
        payload = {
          title: `[RECRUIT] ${title}`,
          content: JSON.stringify({ type: recruitmentType, url: recruitmentUrl })
        };
      } else {
        payload = { title, content };
        if (board === 'newsroom') {
          payload.image_url = imageUrl.trim();
        }
      }

      const { error } = await supabase
        .from(targetTable)
        .update(payload)
        .eq('id', id);

      if (error) throw error;

      showAlert('게시글이 성공적으로 수정되었습니다.');
      setTimeout(() => {
        navigate('/admin/write');
      }, 1500);
    } catch (error) {
      console.error('Error updating post:', error);
      showAlert('게시글 수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md border border-gray-200 p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">관리자 인증</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-black focus:border-black"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              확인
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
          </form>
        </div>
        {/* Custom Modal for unauthenticated state */}
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
              <h3 className="text-lg font-bold mb-4">알림</h3>
              <p className="text-gray-600 mb-6">{modalConfig.message}</p>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="EDIT POST"
        subtitle="등록된 게시글을 수정합니다."
      />
      
      <section className="section-padding container-default max-w-5xl fade-in">
        <div className="mb-32">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-black"></div>
              <h2 className="text-h4 tracking-tight uppercase">Edit Post</h2>
            </div>
            <button 
              onClick={() => navigate('/admin/write')}
              className="text-[10px] font-bold text-gray-400 hover:text-black tracking-widest uppercase transition-colors"
            >
              목록으로 돌아가기
            </button>
          </div>
          
          {isLoading ? (
            <div className="py-20 text-center text-gray-400">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-gray-100 p-10 shadow-sm rounded-xl">
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Board</label>
                  <select
                    value={board}
                    disabled
                    className="w-full border border-gray-100 bg-gray-50 text-gray-500 rounded-md p-4 focus:ring-0 focus:border-black transition-colors text-body-m"
                  >
                    <option value="notices">공고/IR</option>
                    <option value="newsroom">뉴스룸</option>
                    <option value="recruitments">채용공고</option>
                  </select>
                </div>

                {board === 'recruitments' && (
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Recruitment Type</label>
                    <select
                      value={recruitmentType}
                      onChange={(e) => setRecruitmentType(e.target.value as '경력' | '신입' | '무관')}
                      className="w-full border border-gray-200 rounded-md p-4 focus:ring-0 focus:border-black transition-colors text-body-m"
                    >
                      <option value="경력">경력</option>
                      <option value="신입">신입</option>
                      <option value="무관">무관</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-200 rounded-md p-4 focus:ring-0 focus:border-black transition-colors text-body-m"
                    placeholder={board === 'recruitments' ? "채용공고 제목을 입력하세요" : "게시글 제목을 입력하세요"}
                    required
                  />
                </div>

                {board === 'recruitments' && (
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">URL</label>
                    <input
                      type="url"
                      value={recruitmentUrl}
                      onChange={(e) => setRecruitmentUrl(e.target.value)}
                      className="w-full border border-gray-200 rounded-md p-4 focus:ring-0 focus:border-black transition-colors text-body-m"
                      placeholder="공고 확인 URL을 입력하세요"
                      required
                    />
                  </div>
                )}

                {board === 'newsroom' && (
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Image URL (Optional)</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full border border-gray-200 rounded-md p-4 focus:ring-0 focus:border-black transition-colors text-body-m"
                      placeholder="이미지 URL을 입력하세요 (예: https://example.com/image.jpg)"
                    />
                  </div>
                )}
              </div>
              
              {board !== 'recruitments' && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    className="w-full border border-gray-200 rounded-md p-4 focus:ring-0 focus:border-black transition-colors text-body-m resize-none"
                    placeholder="상세 내용을 입력하세요"
                    required
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/write')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-bold tracking-widest uppercase rounded-md hover:bg-gray-50 transition-colors text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary rounded-md disabled:opacity-50"
                >
                  <span className="text-[14px] font-bold tracking-widest uppercase">
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Custom Modal */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold mb-4">
              {modalConfig.type === 'confirm' ? '확인' : '알림'}
            </h3>
            <p className="text-gray-600 mb-6">{modalConfig.message}</p>
            <div className="flex justify-end gap-3">
              {modalConfig.type === 'confirm' && (
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
              )}
              <button
                onClick={() => {
                  if (modalConfig.type === 'confirm' && modalConfig.onConfirm) {
                    modalConfig.onConfirm();
                  }
                  closeModal();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
