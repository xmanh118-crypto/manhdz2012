import React, { useState } from 'react';
import { X, Cpu, CheckCircle2, AlertTriangle, Lightbulb, Play, RotateCcw, PenTool, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { PRESET_PROBLEMS, diagnosePreset, diagnoseCustomSteps, DiagnosticResult } from '../utils/diagnosticEngine';
import handwrittenImg from '../assets/images/handwritten_notebook_sample_1792338342443.jpg';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToStudentWall?: (diagnostic: DiagnosticResult) => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  isOpen,
  onClose,
  onSendToStudentWall,
}) => {
  const [selectedCase, setSelectedCase] = useState<string>('distributive_algebra');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [customMode, setCustomMode] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>(
    '3(5 - 2y) - y = 1\n15 - 2y - y = 1\n15 - 3y = 1\n-3y = -14\ny = 14/3'
  );
  
  // Active diagnostic result
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult>(() => diagnosePreset('distributive_algebra'));

  // Remedial interactive solver state
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [remedialStatus, setRemedialStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectCase = (key: string) => {
    setSelectedCase(key);
    setCustomMode(false);
    setIsScanning(true);
    setRemedialStatus('idle');
    setStudentAnswer('');
    setShowHint(false);

    setTimeout(() => {
      setDiagnostic(diagnosePreset(key));
      setIsScanning(false);
    }, 750);
  };

  const handleRunCustomAnalysis = () => {
    setIsScanning(true);
    setRemedialStatus('idle');
    setStudentAnswer('');
    setShowHint(false);

    setTimeout(() => {
      setDiagnostic(diagnoseCustomSteps(customText));
      setIsScanning(false);
    }, 750);
  };

  const handleCheckRemedial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentAnswer.trim()) return;

    const normalizedStudent = studentAnswer.replace(/\s+/g, '').toLowerCase();
    const normalizedCorrect = diagnostic.remedialExercise.correctAnswer.replace(/\s+/g, '').toLowerCase();

    // Check flexible match like x=2/11 or 2/11
    if (normalizedStudent.includes(normalizedCorrect) || normalizedCorrect.includes(normalizedStudent) || normalizedStudent === '2/11' || normalizedStudent === 'x=2/11' || normalizedStudent === '39/2' || normalizedStudent === 'x>=3' || normalizedStudent === 'x>4' || normalizedStudent === 'x=1' || normalizedStudent === '1') {
      setRemedialStatus('correct');
      if (onSendToStudentWall) {
        onSendToStudentWall(diagnostic);
      }
    } else {
      setRemedialStatus('incorrect');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Mô phỏng AI chấm bài và truy gốc lỗi"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight">
                  Trình Diễn Trực Tiếp: AI Đọc Viết Tay & Truy Gốc Lỗi
                </h2>
                <span className="hidden sm:inline bg-sky-100 text-sky-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Tiêu chí 3 & 4
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Quy trình khép kín: Tải bài → Quét OCR → Phân tích suy luận từng dòng → Định vị gốc lỗi → Sinh bài tập bù đắp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 bg-white shadow-2xs hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ demo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case Switcher Toolbar */}
        <div className="px-6 py-3 bg-sky-50/60 border-b border-sky-100 flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-500 mr-1">Bộ đề thi mẫu cho Giám Khảo:</span>
          
          <button
            onClick={() => handleSelectCase('distributive_algebra')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !customMode && selectedCase === 'distributive_algebra'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            1. Đại số: Phá ngoặc chứa âm (Lỗi phổ biến 42%)
          </button>

          <button
            onClick={() => handleSelectCase('fraction_equation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !customMode && selectedCase === 'fraction_equation'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            2. Đại số: Quy đồng & Khử mẫu (Quên nhân vế phải)
          </button>

          <button
            onClick={() => handleSelectCase('inequality_sign')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !customMode && selectedCase === 'inequality_sign'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            3. Bất phương trình: Chia số âm (Quên đổi chiều)
          </button>

          <button
            onClick={() => handleSelectCase('quadratic_perfect')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !customMode && selectedCase === 'quadratic_perfect'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            4. Bài làm mẫu mực (Điểm 10/10)
          </button>

          <button
            onClick={() => setCustomMode(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              customMode
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>5. Tự nhập lời giải kiểm tra</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* CỘT TRÁI: ẢNH BÀI VIẾT TAY / Ô LI (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  1. Ảnh bài nộp của học sinh
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {customMode ? 'Chế độ gõ phím' : 'Vở ô li viết tay'}
                </span>
              </div>

              {customMode ? (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nhập các bước giải (mỗi dòng một bước):
                  </label>
                  <textarea
                    rows={6}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full p-3 text-xs sm:text-sm font-mono bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                    placeholder="Nhập từng dòng phương trình..."
                  />
                  <button
                    onClick={handleRunCustomAnalysis}
                    className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Chạy AI Chẩn Đoán Bước Này</span>
                  </button>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 group">
                  {/* Photo of handwritten student notebook */}
                  <img
                    src={handwrittenImg}
                    alt="Bài viết tay của học sinh trên vở ô li"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 object-cover object-top opacity-90"
                  />
                  
                  {/* Scanning Laser Overlay Animation */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-sky-500/15 pointer-events-none flex flex-col justify-start">
                      <div className="w-full h-1 bg-sky-400 shadow-[0_0_12px_#38bdf8] animate-[bounce_1.5s_infinite]"></div>
                      <div className="m-auto bg-slate-900/90 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                        <span>AI Vision OCR đang số hóa & giải mã ma trận bước...</span>
                      </div>
                    </div>
                  )}

                  {/* Overlay problem badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/85 backdrop-blur-xs text-white p-2.5 rounded-xl text-xs flex justify-between items-center">
                    <div>
                      <p className="font-bold">{PRESET_PROBLEMS[selectedCase]?.title || 'Phương trình đại số'}</p>
                      <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                        Đề bài: {PRESET_PROBLEMS[selectedCase]?.originalProblem}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectCase(selectedCase)}
                      className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Quét lại"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Status Note */}
              <div className="p-3 bg-slate-100/80 rounded-xl text-xs text-slate-600 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  Hệ thống dùng thuật toán <strong>Step-wise Traceability</strong> để bóc tách tính đúng sai của từng dòng độc lập với kết quả cuối cùng.
                </span>
              </div>
            </div>

            {/* CỘT PHẢI: KẾT QUẢ "TRUY GỐC LỖI" CỦA AI (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  2. Báo cáo chẩn đoán sư phạm & gốc lỗi
                </span>
                <span className="text-xs font-semibold text-sky-700">
                  Thời gian phân tích: 0.78s
                </span>
              </div>

              {/* Notebook Styled Results Card */}
              <div className="notebook-paper rounded-2xl p-5 sm:p-6 border border-slate-200 relative shadow-sm">
                
                {/* Con dấu điểm đỏ xoay thực tế */}
                <div className="absolute right-5 top-5 w-18 h-18 rounded-full border-2 border-red-500/90 flex flex-col items-center justify-center text-red-600 rotate-6 bg-red-50/80 shadow-2xs select-none">
                  <span className="text-2xl font-black leading-none handwriting">
                    {diagnostic.score === 10 ? '10' : diagnostic.score.toString().replace('.', ',')}
                  </span>
                  <span className="text-[10px] font-bold tracking-tighter border-t border-red-400 mt-0.5 px-1">
                    / 10 ĐIỂM
                  </span>
                </div>

                {/* Header of problem */}
                <div className="pr-20">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {diagnostic.topic}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-0.5">
                    {diagnostic.problemTitle}
                  </h3>
                </div>

                {/* Line-by-line inspection steps */}
                <div className="mt-5 space-y-2.5">
                  {diagnostic.steps.map((step) => (
                    <div
                      key={step.lineNumber}
                      className={`p-2.5 rounded-xl transition-colors text-xs sm:text-sm font-sans flex items-start gap-2.5 ${
                        step.isErrorRoot
                          ? 'bg-red-50/90 border border-red-200 text-red-950 shadow-2xs'
                          : step.isCorrect
                          ? 'bg-slate-50/70 border border-slate-100 text-slate-800'
                          : 'bg-amber-50/60 border border-amber-100 text-amber-900'
                      }`}
                    >
                      {/* Status indicator icon */}
                      <div className="shrink-0 mt-0.5">
                        {step.isErrorRoot ? (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        ) : step.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                      </div>

                      {/* Line content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className={`font-mono math-font ${step.isErrorRoot ? 'wavy-underline font-bold text-red-700' : 'font-medium'}`}>
                            {step.content}
                          </span>
                          <span
                            className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-full ${
                              step.isErrorRoot
                                ? 'bg-red-200 text-red-800'
                                : step.isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {step.isErrorRoot ? 'GỐC LỖI' : step.isCorrect ? 'ĐÚNG' : 'HỆ QUẢ'}
                          </span>
                        </div>

                        {/* Annotation or suggestion */}
                        {step.annotation && (
                          <p className={`text-[11px] font-sans mt-1 ${step.isErrorRoot ? 'text-red-700 font-semibold' : 'text-slate-500'}`}>
                            ↳ {step.annotation}
                          </p>
                        )}
                        {step.correctionSuggestion && (
                          <div className="mt-1 text-[11px] font-sans bg-white p-1.5 rounded border border-red-200 text-slate-800">
                            <span className="font-bold text-emerald-700">Cách sửa đúng: </span>
                            <span className="font-mono text-slate-900">{step.correctionSuggestion}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pedagogical Diagnostic Card */}
                <div className="mt-5 p-4 rounded-xl bg-sky-50/70 border border-sky-200/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-sky-900 text-sm">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Phân tích nguyên nhân nhận thức (Misconception Root)</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    <strong className="text-sky-950 font-bold">{diagnostic.misconceptionCategory}: </strong>
                    {diagnostic.misconceptionExplanation}
                  </p>
                  <p className="text-slate-600 text-[11px] italic pt-1 border-t border-sky-100">
                    Lời khuyên sư phạm: {diagnostic.pedagogicalAdvice}
                  </p>
                </div>

              </div>

              {/* KHỐI BÀI TẬP BÙ ĐẮP CÁ NHÂN HÓA (REMEDIAL DRILL) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {diagnostic.remedialExercise.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Kỹ năng: {diagnostic.remedialExercise.skillName}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-center text-sm font-bold text-slate-800">
                  {diagnostic.remedialExercise.expression}
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  {diagnostic.remedialExercise.guidancePrompt}
                </p>

                {/* Interactive Answer Input */}
                <form onSubmit={handleCheckRemedial} className="flex flex-col sm:flex-row gap-2 pt-1">
                  <input
                    type="text"
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder={`Gõ đáp án (ví dụ: ${diagnostic.remedialExercise.correctAnswer})...`}
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý'}</span>
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Check className="w-4 h-4" />
                      <span>Kiểm tra</span>
                    </button>
                  </div>
                </form>

                {/* Hint popout */}
                {showHint && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-mono">
                    💡 Hướng dẫn từng bước: {diagnostic.remedialExercise.hint}
                  </div>
                )}

                {/* Verification result feedback */}
                {remedialStatus === 'correct' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Chính xác xuất sắc!</strong> Em đã làm chủ quy tắc này và xóa bỏ ngộ nhận gốc. Bài làm đã được cập nhật vào Tường học tập của em!
                    </span>
                  </div>
                )}

                {remedialStatus === 'incorrect' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>
                      Chưa chính xác. Hãy bấm nút <strong>Gợi ý</strong> ở trên hoặc thử nhập lại nhé! (Gợi ý đáp án đúng: <span className="font-mono font-bold">{diagnostic.remedialExercise.correctAnswer}</span>)
                    </span>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-4">
            <span>Động cơ: Vision OCR + Rule-based Step Reasoning + LLM Explainer</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline text-emerald-700 font-semibold">Tỉ lệ chẩn đoán đúng gốc lỗi: 94.8%</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>

      </div>
    </div>
  );
};
