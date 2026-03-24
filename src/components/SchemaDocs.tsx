import React from 'react';
import { FileCode, Download, Copy, Check } from 'lucide-react';
import { defaultResume } from '../constants';
import yaml from 'js-yaml';

export const SchemaDocs: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const schemaInfo = {
    version: "1.0.0",
    description: "Power CV Resume Schema for AI Integration",
    structure: {
      dados_pessoais: {
        nome: "String - Full name",
        role: "String - Job title or current role",
        email: "String (Optional) - Contact email",
        telefone: "String (Optional) - Contact phone",
        linkedin: "String (Optional) - LinkedIn profile URL",
        github: "String (Optional) - GitHub profile URL",
        resumo: "String (Optional) - Professional summary"
      },
      experiencia: "Array of Objects { empresa, periodo, role, conquistas: Array of Strings }",
      formacao: "Array of Objects { instituicao, curso, periodo }",
      habilidades: "Array of Strings",
      idiomas: "Array of Strings (Optional)",
      projetos: "Array of Objects (Optional) { nome, descricao, link }"
    },
    formatting_rules: [
      "Use Markdown in 'resumo' and 'conquistas' for better formatting.",
      "Keep achievements concise and result-oriented.",
      "Dates should be strings (e.g., '2022 - Presente')."
    ]
  };

  const fullDoc = {
    schema: schemaInfo,
    example: defaultResume
  };

  const downloadDocs = () => {
    const content = JSON.stringify(fullDoc, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'power_cv_ai_schema.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(fullDoc, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto scrollbar-thin">
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">AI Schema & Docs</h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          Use this schema to feed other AIs with your resume structure or to generate compatible data.
        </p>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={downloadDocs}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 rounded text-[10px] font-bold uppercase tracking-wider transition-colors text-white"
        >
          <Download size={14} /> Download JSON Schema
        </button>
        <button 
          onClick={copyToClipboard}
          className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 transition-colors"
          title="Copy to Clipboard"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-widest">Structure</h3>
          <pre className="p-3 bg-black/40 rounded-lg text-[10px] text-blue-300 font-mono overflow-x-auto border border-gray-800">
            {JSON.stringify(schemaInfo.structure, null, 2)}
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-widest">Formatting Rules</h3>
          <ul className="space-y-1">
            {schemaInfo.formatting_rules.map((rule, i) => (
              <li key={i} className="text-[10px] text-gray-400 flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span> {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-widest">Example (YAML)</h3>
          <pre className="p-3 bg-black/40 rounded-lg text-[10px] text-green-300 font-mono overflow-x-auto border border-gray-800">
            {yaml.dump(defaultResume)}
          </pre>
        </div>
      </div>
    </div>
  );
};
