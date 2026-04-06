import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { supabase } from '../../lib/supabase';
import { GENERATED_IMAGES } from '../../constants/images';
import { Trash2 } from 'lucide-react';

interface Post {
  id: any;
  title: string;
  created_at: string;
  type: 'notices' | 'newsroom' | 'recruitments';
}

export default function AdminWrite() {
  const navigate = useNavigate();
  const [board, setBoard] = useState<'notices' | 'newsroom' | 'recruitments'>('notices');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [recruitmentType, setRecruitmentType] = useState<'경력' | '신입' | '무관'>('경력');
  const [recruitmentUrl, setRecruitmentUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    message: string;
    type: 'alert' | 'confirm';
    onConfirm?: () => void;
  }>({ isOpen: false, message: '', type: 'alert' });

  const showAlert = (message: string) => {
    setModalConfig({ isOpen: true, message, type: 'alert' });
  };

  const showConfirm = (message: string, onConfirm: () => void) => {
    setModalConfig({ isOpen: true, message, type: 'confirm', onConfirm });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const { data: noticeData, error: noticeError } = await supabase
        .from('notices')
        .select('id, title, created_at')
        .order('created_at', { ascending: false });

      const { data: newsData, error: newsError } = await supabase
        .from('newsroom')
        .select('id, title, created_at')
        .order('created_at', { ascending: false });

      if (noticeError && noticeError.code !== '42P01') console.error(noticeError);
      if (newsError && newsError.code !== '42P01') console.error(newsError);

      const combined: Post[] = [
        ...(noticeData || []).filter(p => !p.title.startsWith('[RECRUIT]')).map(p => ({ ...p, type: 'notices' as const })),
        ...(noticeData || []).filter(p => p.title.startsWith('[RECRUIT]')).map(p => ({ ...p, title: p.title.replace('[RECRUIT] ', ''), type: 'recruitments' as const })),
        ...(newsData || []).map(p => ({ ...p, type: 'newsroom' as const }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setPosts(combined);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'Lee5245lee!') {
      setIsAuthenticated(true);
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
        if (board === 'newsroom' && imageUrl.trim()) {
          payload.image_url = imageUrl.trim();
        }
      }

      const { error } = await supabase
        .from(targetTable)
        .insert([payload]);

      if (error) throw error;

      showAlert('게시글이 성공적으로 등록되었습니다.');
      setTitle('');
      setContent('');
      setImageUrl('');
      setRecruitmentUrl('');
      fetchPosts();
    } catch (error) {
      console.error('Error inserting post:', error);
      showAlert('게시글 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: any, type: 'notices' | 'newsroom' | 'recruitments') => {
    showConfirm('정말 삭제하시겠습니까?', async () => {
      try {
        const targetTable = type === 'recruitments' ? 'notices' : type;
        console.log(`Attempting to delete ${type} (table: ${targetTable}) with id:`, id);
        
        const { data, error } = await supabase
          .from(targetTable)
          .delete()
          .eq('id', id)
          .select();

        console.log('Delete response:', { data, error });

        if (error) {
          showAlert(`Supabase 오류: ${error.message}`);
          return;
        }
        
        if (!data || data.length === 0) {
          showAlert(`삭제 실패: ID(${id})인 게시글을 찾을 수 없거나 RLS 권한이 없습니다. (Supabase SQL을 다시 확인해주세요)`);
          return;
        }

        showAlert('삭제되었습니다.');
        await fetchPosts();
      } catch (error: any) {
        console.error('Error deleting post:', error);
        showAlert(`네트워크/실행 오류: ${error.message || '알 수 없는 오류'}`);
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
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
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="ADMINISTRATION"
        subtitle="게시글 관리 및 신규 등록을 위한 관리자 페이지입니다."
      />
      
      <section className="section-padding container-default max-w-5xl fade-in">
        {/* Registration Form */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-black"></div>
            <h2 className="text-h4 tracking-tight uppercase">New Post</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-gray-100 p-10 shadow-sm rounded-xl">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Board</label>
                <select
                  value={board}
                  onChange={(e) => setBoard(e.target.value as 'notices' | 'newsroom' | 'recruitments')}
                  className="w-full border border-gray-200 rounded-md p-4 focus:ring-0 focus:border-black transition-colors text-body-m"
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
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary rounded-md disabled:opacity-50"
              >
                <span className="text-[14px] font-bold tracking-widest uppercase">
                  {isSubmitting ? 'Submitting...' : 'Register Post'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Management Table */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-black"></div>
              <h2 className="text-h4 tracking-tight uppercase">Manage Posts</h2>
            </div>
            <button 
              onClick={fetchPosts}
              className="text-[10px] font-bold text-gray-400 hover:text-black tracking-widest uppercase transition-colors"
            >
              Refresh List
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-24">Type</th>
                  <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Title</th>
                  <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-32">Date</th>
                  <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoadingPosts ? (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-gray-400 text-body-m tracking-widest uppercase">Loading...</td>
                  </tr>
                ) : posts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-gray-400 text-body-m tracking-widest uppercase">No posts found.</td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={`${post.type}-${post.id}`} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-6">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${post.type === 'notices' ? 'text-emerald-500' : post.type === 'recruitments' ? 'text-orange-500' : 'text-blue-500'}`}>
                          {post.type === 'notices' ? '공고' : post.type === 'recruitments' ? '채용공고' : '뉴스룸'}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="text-body-m font-medium text-black group-hover:text-gray-600 transition-colors">{post.title}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-[11px] font-bold text-gray-400 tracking-tighter">{formatDate(post.created_at)}</span>
                      </td>
                      <td className="p-6 text-center">
                        <button 
                          onClick={() => handleDelete(post.id, post.type)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-2"
                          title="Delete Post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
