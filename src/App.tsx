import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import yaml from 'js-yaml';
import { ResumeData, ThemeType } from './types';
import { defaultResume } from './constants';
import { Editor } from './components/Editor';
import { ResumePreview } from './components/ResumePreview';
import { SchemaDocs } from './components/SchemaDocs';
import { 
  Download, 
  Layout, 
  Zap, 
  FileText, 
  Settings, 
  Github, 
  Monitor, 
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Printer,
  Save,
  FileJson,
  FileCode,
  Type,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'power_cv_data';

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultResume;
  });
  const [theme, setTheme] = useState<ThemeType>('modern');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'editor' | 'docs'>('editor');
  const resumeRef = useRef<HTMLDivElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `Resume_${resumeData.dados_pessoais.nome.replace(/\s+/g, '_')}`,
  });

  const exportData = (format: 'json' | 'yaml') => {
    const content = format === 'json' 
      ? JSON.stringify(resumeData, null, 2) 
      : yaml.dump(resumeData);
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const themes: { id: ThemeType; label: string; icon: any }[] = [
    { id: 'modern', label: 'Moderno', icon: Zap },
    { id: 'classic', label: 'Clássico', icon: FileText },
    { id: 'minimal', label: 'Minimalista', icon: Layout },
    { id: 'technical', label: 'Técnico', icon: Monitor },
    { id: 'elegant', label: 'Elegante', icon: Type },
    { id: 'compact', label: 'Compacto', icon: Smartphone },
    { id: 'bold', label: 'Negrito', icon: Zap },
  ];

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-gray-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 400 : 0 }}
        className="relative flex flex-col border-r border-gray-800 bg-[#121212] z-20"
      >
        <div className="flex h-full flex-col overflow-hidden">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic">P</div>
              <h1 className="font-bold tracking-tight text-lg">Power CV</h1>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => setActiveTab('editor')}
                className={`p-2 rounded-md transition-colors ${activeTab === 'editor' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                title="Editor"
              >
                <Settings size={18} />
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={`p-2 rounded-md transition-colors ${activeTab === 'docs' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                title="Schema Docs"
              >
                <BookOpen size={18} />
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'editor' && (
                <motion.div 
                  key="editor"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex-1 overflow-hidden">
                    <Editor data={resumeData} onDataChange={setResumeData} />
                  </div>
                  <div className="p-4 bg-[#1a1a1a] border-t border-gray-800 flex gap-2">
                    <button 
                      onClick={() => exportData('json')}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-800 hover:bg-gray-700 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      <FileJson size={14} /> Export JSON
                    </button>
                    <button 
                      onClick={() => exportData('yaml')}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-800 hover:bg-gray-700 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      <FileCode size={14} /> Export YAML
                    </button>
                  </div>
                </motion.div>
              )}
              {activeTab === 'docs' && (
                <motion.div 
                  key="docs"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full"
                >
                  <SchemaDocs />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-800 bg-[#161616]">
            <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">
              <span>Themes</span>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto scrollbar-thin pr-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                    theme === t.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <t.icon size={14} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-30"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </motion.aside>

      {/* Main Content (Preview) */}
      <main className="flex-1 flex flex-col relative bg-[#0a0a0a] overflow-hidden">
        {/* Toolbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-gray-800 bg-[#0f0f0f] z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Preview
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handlePrint()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
            >
              <Printer size={16} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto p-8 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          <div className="flex justify-center min-w-max">
            <div className="transform scale-[0.85] origin-top md:scale-100 transition-transform">
              <ResumePreview data={resumeData} theme={theme} ref={resumeRef} />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-2 bg-gray-900/80 backdrop-blur border border-gray-800 rounded-full text-[10px] text-gray-500 font-medium tracking-wide">
          <span className="flex items-center gap-1"><Monitor size={12} /> Desktop Optimized</span>
          <span className="flex items-center gap-1"><Smartphone size={12} /> Mobile Responsive</span>
        </div>
      </main>
    </div>
  );
}
