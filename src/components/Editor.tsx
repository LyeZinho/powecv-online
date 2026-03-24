import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { ResumeData } from '../types';
import { defaultResume } from '../constants';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface EditorProps {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
}

export const Editor: React.FC<EditorProps> = ({ data, onDataChange }) => {
  const [code, setCode] = useState<string>(yaml.dump(data));
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState<'yaml' | 'json'>('yaml');

  // Update code when external data changes (e.g. from AI)
  useEffect(() => {
    try {
      const currentParsed = format === 'yaml' ? yaml.load(code) : JSON.parse(code);
      if (JSON.stringify(currentParsed) !== JSON.stringify(data)) {
        setCode(format === 'yaml' ? yaml.dump(data) : JSON.stringify(data, null, 2));
      }
    } catch (e) {
      // If current code is invalid, we still want to overwrite it with valid data from outside
      setCode(format === 'yaml' ? yaml.dump(data) : JSON.stringify(data, null, 2));
    }
  }, [data]);

  useEffect(() => {
    try {
      const parsed = format === 'yaml' ? yaml.load(code) : JSON.parse(code);
      if (parsed && typeof parsed === 'object') {
        onDataChange(parsed as ResumeData);
        setError(null);
      }
    } catch (e: any) {
      setError(e.message);
    }
  }, [code, format, onDataChange]);

  const handleFormatToggle = () => {
    try {
      const currentData = format === 'yaml' ? yaml.load(code) : JSON.parse(code);
      const newFormat = format === 'yaml' ? 'json' : 'yaml';
      const newCode = newFormat === 'yaml' 
        ? yaml.dump(currentData) 
        : JSON.stringify(currentData, null, 2);
      
      setFormat(newFormat);
      setCode(newCode);
    } catch (e: any) {
      setError("Não é possível converter o formato com erros de sintaxe.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Editor</span>
          <button 
            onClick={handleFormatToggle}
            className="px-2 py-1 bg-[#333] hover:bg-[#444] rounded text-[10px] uppercase tracking-wider transition-colors"
          >
            Switch to {format === 'yaml' ? 'JSON' : 'YAML'}
          </button>
        </div>
        <div className="flex items-center gap-2">
          {error ? (
            <span className="flex items-center gap-1 text-red-400 text-[10px]">
              <AlertCircle size={12} /> Syntax Error
            </span>
          ) : (
            <span className="flex items-center gap-1 text-green-400 text-[10px]">
              <CheckCircle2 size={12} /> Valid {format.toUpperCase()}
            </span>
          )}
        </div>
      </div>
      
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 p-4 bg-transparent outline-none resize-none scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        spellCheck={false}
      />
      
      {error && (
        <div className="p-2 bg-red-900/30 border-t border-red-900/50 text-red-300 text-[10px] whitespace-pre-wrap font-sans">
          {error}
        </div>
      )}
    </div>
  );
};
