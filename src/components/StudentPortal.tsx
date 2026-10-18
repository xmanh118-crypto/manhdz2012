import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Upload, 
  PenTool, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Trophy, 
  Flame, 
  RotateCcw, 
  Check, 
  HelpCircle, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { StudentSubmission } from '../types';
import { PRESET_PROBLEMS, diagnosePreset, diagnoseCustomSteps, DiagnosticResult } from '../utils/diagnosticEngine';
import handwrittenImg from '../assets/images/handwritten_notebook_sample_1792338342443.jpg';

interface StudentPortalProps {
  initialClassCode?: string;
  onBackToHome: () => void;
  onOpenLiveDemo: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  initialClassCode = 'TOAN8A1',
  onBackToHome,
  onOpenLiveDemo,
}) => {
  const [classCode] = useState<string>(initialClassCode);
  const [activeTab, setActiveTab] = useState<'submit' | 'history' | 'remedial'>('submit');
  const [submissionMethod, setSubmissionMethod] = useState<'photo' | 'draw' | 'type'>('photo');

  // Interactive typewriter state
  const [typedSteps, setTypedSteps] = useState<string>(
    '3(5 - 2y) - y = 1\n15 - 2y - y = 1\n15 - 3y = 1\n-3y = -14\ny = 14/3'
  );

  // Digital handwriting canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Active submission diagnosis
  const [currentResult, setCurrentResult] = useState<DiagnosticResult | null>(null);
  const [isGrading, setIsGrading] = useState<boolean>(false);

  // Student history & progress
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([
    {
      id: 'sub_1',
      studentName: 'Nguyễn Hoàng Nam',
      avatarSeed: 'nam',
      timestamp: 'Hôm nay, 08:30',
      problemTitle: 'Giải phương trình: Phá ngoặc chứa dấu trừ',
      score: 7.5,
      status: 'graded',
      diagnostic: diagnosePreset('distributive_algebra'),
      remedialSolved: false,
    },
    {
      id: 'sub_2',
      studentName: 'Nguyễn Hoàng Nam',
      avatarSeed: 'nam',
      timestamp: 'Hôm qua, 19:45',
      problemTitle: 'Quy đồng mẫu và rút gọn biểu thức',
      score: 10,
      status: 'remediated',
      diagnostic: diagnosePreset('quadratic_perfect'),
      remedialSolved: true,
    }
  ]);

  // Remedial practice state
  const [remedialInput, setRemedialInput] = useState<string>('');
  const [remedialFeedback, setRemedialFeedback] = useState<'idle' | 'success' | 'fail'>('idle');
  const [showRemedialHint, setShowRemedialHint] = useState<boolean>(false);

  // Canvas drawing setup
  useEffect(() => {
    if (submissionMethod === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1e3a8a'; // classic blue ink
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [submissionMethod]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleGradeSubmission = () => {
    setIsGrading(true);
    setTimeout(() => {
      let diag: DiagnosticResult;
      if (submissionMethod === 'type') {
        diag = diagnoseCustomSteps(typedSteps);
      } else {
        // default to distributive algebra case for demonstration
        diag = diagnosePreset('distributive_algebra');
      }

      setCurrentResult(diag);
      setIsGrading(false);

      // Add to student submissions wall
      const newSub: StudentSubmission = {
        id: `sub_${Date.now()}`,
        studentName: 'Nguyễn Hoàng Nam',
        avatarSeed: 'nam',
        timestamp: 'Vừa xong',
        problemTitle: diag.problemTitle,
        score: diag.score,
        status: diag.score === 10 ? 'remediated' : 'needs_remediation',
        diagnostic: diag,
        remedialSolved: false,
      };
      setSubmissions([newSub, ...submissions]);
    }, 850);
  };

  const handleSolveRemedial = (e: React.FormEvent, targetSub: StudentSubmission) => {
    e.preventDefault();
    if (!remedialInput.trim()) return;

    const cleanInput = remedialInput.replace(/\s+/g, '').toLowerCase();
    const cleanAnswer = targetSub.diagnostic.remedialExercise.correctAnswer.replace(/\s+/g, '').toLowerCase();

    if (cleanInput.includes(cleanAnswer) || cleanAnswer.includes(cleanInput) || cleanInput === '2/11' || cleanInput === 'x=2/11') {
      setRemedialFeedback('success');
      // Mark as remediated in state
      setSubmissions(submissions.map(s => s.id === targetSub.id ? { ...s, remedialSolved: true, status: 'remediated' } : s));
    } else {
      setRemedialFeedback('fail');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Top Banner: Student Info & Class Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Quay lại Trang chủ"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 font-extrabold text-lg shrink-0">
            HN
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Nguyễn Hoàng Nam</h2>
              <span className="bg-sky-100 text-sky-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                Lớp 8A1 · {classCode}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              GV phụ trách: Cô Nguyễn Thu Hà · Tường học tập tự học & khắc phục lỗi
            </p>
          </div>
        </div>

        {/* Gamification / Progress chips */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Chuỗi 5 ngày làm bài</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-bold">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>Đã xóa 8 gốc lỗi</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('submit')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'submit' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Nộp bài làm mới
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'history' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Tường bài làm của em</span>
          <span className="text-xs bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded-full">
            {submissions.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('remedial')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'remedial' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Luyện tập bù đắp lỗ hổng</span>
          <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
            {submissions.filter(s => !s.remedialSolved).length} bài cần chữa
          </span>
        </button>
      </div>

      {/* TAB 1: NỘP BÀI LÀM MỚI */}
      {activeTab === 'submit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CỘT TRÁI: FORM NỘP BÀI (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Chọn hình thức nộp bài</h3>
                <p className="text-xs text-slate-500 mt-0.5">AI hỗ trợ nhận diện cả chữ viết tay ô li và công thức gõ phím</p>
              </div>

              {/* Mode segmented control */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSubmissionMethod('photo')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    submissionMethod === 'photo' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Chụp ảnh
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionMethod('draw')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    submissionMethod === 'draw' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Vẽ viết tay
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionMethod('type')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    submissionMethod === 'type' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Gõ phím
                </button>
              </div>
            </div>

            {/* Render submission workspace depending on method */}
            {submissionMethod === 'photo' && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                  <img
                    src={handwrittenImg}
                    alt="Bài viết tay học sinh"
                    referrerPolicy="no-referrer"
                    className="w-full h-72 object-cover object-top opacity-95"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-xs font-semibold text-sky-400">Ảnh chụp từ vở ô li học sinh</span>
                    <p className="text-sm font-bold">Bài tập 1: Giải phương trình 3(5 - 2y) - y = 1</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-sky-50 rounded-2xl border border-sky-100 text-xs">
                  <span className="text-slate-700">Có thể dùng ảnh mẫu sẵn hoặc tải ảnh chụp từ máy điện thoại:</span>
                  <label className="px-3 py-1.5 bg-white text-sky-700 font-bold border border-sky-300 rounded-xl cursor-pointer hover:bg-sky-100 transition-colors flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Tải ảnh khác lên</span>
                    <input type="file" accept="image/*" className="hidden" onChange={() => alert('Đã nhận diện ảnh chụp bài mới!')} />
                  </label>
                </div>
              </div>
            )}

            {submissionMethod === 'draw' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Dùng chuột hoặc bút cảm ứng vẽ trực tiếp lên giấy ô li:</span>
                  <button
                    onClick={clearCanvas}
                    className="flex items-center gap-1 text-slate-600 hover:text-red-600 font-semibold cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Xóa bảng vẽ</span>
                  </button>
                </div>

                <div className="notebook-paper rounded-2xl border border-slate-200 overflow-hidden relative shadow-inner">
                  <canvas
                    ref={canvasRef}
                    width={560}
                    height={280}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-70 cursor-crosshair touch-none"
                  />
                  {!hasDrawn && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs handwriting text-lg">
                      Đặt bút viết lời giải phương trình vào đây...
                    </div>
                  )}
                </div>
              </div>
            )}

            {submissionMethod === 'type' && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Gõ các bước biến đổi phương trình (mỗi dòng một bước):
                </label>
                <textarea
                  rows={6}
                  value={typedSteps}
                  onChange={(e) => setTypedSteps(e.target.value)}
                  className="w-full p-4 font-mono text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>
            )}

            {/* Submit Action */}
            <button
              onClick={handleGradeSubmission}
              disabled={isGrading}
              className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-linear-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isGrading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>AI đang đọc từng dòng & truy tìm gốc lỗi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Nộp bài & Yêu cầu AI Chấm Ngay</span>
                </>
              )}
            </button>

          </div>

          {/* CỘT PHẢI: KẾT QUẢ PHẢN HỒI TỨC THÌ (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Kết quả phản hồi của AI
            </span>

            {currentResult ? (
              <div className="notebook-paper rounded-2xl p-5 border border-slate-200 relative shadow-sm space-y-4">
                
                {/* Score badge */}
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {currentResult.topic}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                      {currentResult.problemTitle}
                    </h4>
                  </div>
                  
                  <div className="w-14 h-14 rounded-full border-2 border-red-500 flex flex-col items-center justify-center text-red-600 rotate-6 bg-red-50 shrink-0">
                    <span className="text-lg font-black leading-none handwriting">
                      {currentResult.score.toString().replace('.', ',')}
                    </span>
                    <span className="text-[9px] font-bold tracking-tighter border-t border-red-400 mt-0.5">
                      / 10
                    </span>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-2 text-xs font-mono">
                  {currentResult.steps.map((st) => (
                    <div
                      key={st.lineNumber}
                      className={`p-2 rounded-lg ${
                        st.isErrorRoot
                          ? 'bg-red-50 text-red-900 border border-red-200'
                          : st.isCorrect
                          ? 'bg-slate-50 text-slate-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={st.isErrorRoot ? 'wavy-underline font-bold text-red-700' : ''}>
                          {st.content}
                        </span>
                        <span className="text-[10px] font-sans font-bold">
                          {st.isErrorRoot ? 'GỐC LỖI' : st.isCorrect ? 'ĐÚNG' : 'HỆ QUẢ'}
                        </span>
                      </div>
                      {st.annotation && (
                        <p className="text-[10px] font-sans text-slate-500 mt-1">
                          ↳ {st.annotation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs space-y-1">
                  <p className="font-bold text-sky-950">Giải thích gốc lỗi:</p>
                  <p className="text-slate-700">{currentResult.misconceptionExplanation}</p>
                </div>

                {/* Remedial drill prompt */}
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('remedial')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Làm ngay bài tập bù đắp để xóa lỗi này</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3 shadow-2xs">
                <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Chưa có bài nộp trong phiên này</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Hãy bấm nút <strong>"Nộp bài & Yêu cầu AI Chấm Ngay"</strong> ở cột bên trái hoặc trải nghiệm nhanh trong Live Demo.
                </p>
                <button
                  onClick={onOpenLiveDemo}
                  className="text-xs font-bold text-sky-700 hover:underline cursor-pointer"
                >
                  Mở Trình Diễn AI Chấm Bài mẫu →
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: TƯỜNG BÀI LÀM CỦA EM */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Lịch sử bài làm & Đánh giá quá trình</h3>
            <span className="text-xs text-slate-500">Mỗi bài đều lưu vết gốc lỗi để học sinh ôn tập trước kỳ thi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="notebook-paper rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold">{sub.timestamp}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{sub.problemTitle}</h4>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full border-2 border-red-500 flex flex-col items-center justify-center text-red-600 rotate-6 bg-red-50 shrink-0">
                    <span className="text-base font-black leading-none handwriting">
                      {sub.score.toString().replace('.', ',')}
                    </span>
                    <span className="text-[8px] font-bold tracking-tighter">/ 10</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-slate-800">Chẩn đoán: </span>
                  <span className="text-slate-600">{sub.diagnostic.misconceptionCategory}</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                  {sub.remedialSolved ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đã hoàn thành bài tập bù đắp</span>
                    </span>
                  ) : (
                    <span className="text-amber-700 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Cần làm bài tập bù đắp</span>
                    </span>
                  )}

                  <button
                    onClick={() => setActiveTab('remedial')}
                    className="text-sky-700 font-bold hover:underline cursor-pointer"
                  >
                    Xem chi tiết →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LUYỆN TẬP BÙ ĐẮP LỖ HỔNG */}
      {activeTab === 'remedial' && (
        <div className="space-y-6">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs text-sky-900 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Cơ chế tự chữa lành lỗ hổng kiến thức</p>
              <p className="text-sky-800 mt-0.5">
                Khi giải đúng bài tập bù đắp, AI sẽ ghi nhận em đã hiểu bản chất và nâng điểm tích lũy học tập lên hệ thống của thầy cô.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className={`bg-white rounded-3xl p-6 border shadow-xs space-y-4 ${
                  sub.remedialSolved ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Kỹ năng: {sub.diagnostic.remedialExercise.skillName}
                  </span>
                  {sub.remedialSolved ? (
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Đã xóa gốc lỗi
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                      Chưa hoàn thành
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-slate-900 text-sm">
                  {sub.diagnostic.remedialExercise.title}
                </h4>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center font-mono font-bold text-sm text-slate-800">
                  {sub.diagnostic.remedialExercise.expression}
                </div>

                <p className="text-xs text-slate-600">
                  {sub.diagnostic.remedialExercise.guidancePrompt}
                </p>

                {sub.remedialSolved ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Em đã giải đúng bài tập này và nhận được 1 Huy hiệu Tiến bộ!</span>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleSolveRemedial(e, sub)} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={remedialInput}
                        onChange={(e) => setRemedialInput(e.target.value)}
                        placeholder={`Nhập đáp án (ví dụ: ${sub.diagnostic.remedialExercise.correctAnswer})...`}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
                      >
                        Nộp lời giải
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => setShowRemedialHint(!showRemedialHint)}
                        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{showRemedialHint ? 'Ẩn gợi ý' : 'Xem gợi ý từng bước'}</span>
                      </button>
                      <span className="text-[11px] text-slate-400">Đáp án mẫu: {sub.diagnostic.remedialExercise.correctAnswer}</span>
                    </div>

                    {showRemedialHint && (
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-mono">
                        💡 {sub.diagnostic.remedialExercise.hint}
                      </div>
                    )}

                    {remedialFeedback === 'success' && (
                      <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Chính xác! Lỗ hổng kiến thức đã được bù đắp thành công!</span>
                      </div>
                    )}

                    {remedialFeedback === 'fail' && (
                      <div className="p-2.5 bg-red-50 rounded-xl border border-red-200 text-xs text-red-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>Chưa đúng. Em hãy xem gợi ý và thử lại nhé.</span>
                      </div>
                    )}
                  </form>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
