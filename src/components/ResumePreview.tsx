import React from 'react';
import { ResumeData, ThemeType } from '../types';
import { cn } from '../lib/utils';
import { Mail, Phone, Linkedin, Github, Globe, MapPin } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  theme: ThemeType;
}

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, theme }, ref) => {
  const { dados_pessoais, experiencia, formacao, habilidades, idiomas, projetos } = data;

  const renderHeader = () => {
    switch (theme) {
      case 'modern':
        return (
          <header className="border-b-4 border-blue-600 pb-6 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-tight">{dados_pessoais.nome}</h1>
            <p className="text-xl text-blue-600 font-medium mt-1">{dados_pessoais.role}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              {dados_pessoais.email && <span className="flex items-center gap-1"><Mail size={14} /> {dados_pessoais.email}</span>}
              {dados_pessoais.telefone && <span className="flex items-center gap-1"><Phone size={14} /> {dados_pessoais.telefone}</span>}
              {dados_pessoais.linkedin && <span className="flex items-center gap-1"><Linkedin size={14} /> {dados_pessoais.linkedin}</span>}
              {dados_pessoais.github && <span className="flex items-center gap-1"><Github size={14} /> {dados_pessoais.github}</span>}
            </div>
          </header>
        );
      case 'minimal':
        return (
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-light text-gray-800 tracking-widest uppercase">{dados_pessoais.nome}</h1>
            <p className="text-gray-500 mt-2 tracking-wide uppercase text-xs">{dados_pessoais.role}</p>
            <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-4 text-[10px] text-gray-400 uppercase tracking-widest">
              {dados_pessoais.email && <span>{dados_pessoais.email}</span>}
              {dados_pessoais.telefone && <span>{dados_pessoais.telefone}</span>}
              {dados_pessoais.linkedin && <span>{dados_pessoais.linkedin}</span>}
            </div>
          </header>
        );
      case 'technical':
        return (
          <header className="mb-8 font-mono">
            <h1 className="text-2xl font-bold text-gray-900">{`> ${dados_pessoais.nome}`}</h1>
            <p className="text-gray-600 mt-1">{`// ${dados_pessoais.role}`}</p>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {dados_pessoais.email && <span><span className="text-blue-600">email:</span> {dados_pessoais.email}</span>}
              {dados_pessoais.telefone && <span><span className="text-blue-600">phone:</span> {dados_pessoais.telefone}</span>}
              {dados_pessoais.linkedin && <span><span className="text-blue-600">linkedin:</span> {dados_pessoais.linkedin}</span>}
              {dados_pessoais.github && <span><span className="text-blue-600">github:</span> {dados_pessoais.github}</span>}
            </div>
          </header>
        );
      case 'elegant':
        return (
          <header className="text-center mb-12 font-serif">
            <h1 className="text-4xl font-light text-gray-900 tracking-[0.2em] uppercase mb-2">{dados_pessoais.nome}</h1>
            <div className="h-px w-24 bg-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 italic tracking-widest uppercase text-xs">{dados_pessoais.role}</p>
            <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 mt-6 text-[10px] text-gray-500 uppercase tracking-widest border-t border-b border-gray-100 py-3">
              {dados_pessoais.email && <span>{dados_pessoais.email}</span>}
              {dados_pessoais.telefone && <span>{dados_pessoais.telefone}</span>}
              {dados_pessoais.linkedin && <span>{dados_pessoais.linkedin}</span>}
            </div>
          </header>
        );
      case 'compact':
        return (
          <header className="mb-4 flex justify-between items-end border-b border-gray-200 pb-2">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{dados_pessoais.nome}</h1>
              <p className="text-xs text-gray-600">{dados_pessoais.role}</p>
            </div>
            <div className="text-[10px] text-right text-gray-500 space-y-0.5">
              {dados_pessoais.email && <div>{dados_pessoais.email}</div>}
              {dados_pessoais.telefone && <div>{dados_pessoais.telefone}</div>}
              {dados_pessoais.linkedin && <div>{dados_pessoais.linkedin}</div>}
            </div>
          </header>
        );
      case 'bold':
        return (
          <header className="mb-8 bg-black text-white p-8 -mx-12 -mt-12">
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">{dados_pessoais.nome}</h1>
            <p className="text-xl font-bold mt-2 text-yellow-400 uppercase tracking-widest">{dados_pessoais.role}</p>
            <div className="flex flex-wrap gap-6 mt-6 text-xs font-bold uppercase tracking-widest">
              {dados_pessoais.email && <span className="flex items-center gap-2"><Mail size={14} /> {dados_pessoais.email}</span>}
              {dados_pessoais.telefone && <span className="flex items-center gap-2"><Phone size={14} /> {dados_pessoais.telefone}</span>}
              {dados_pessoais.linkedin && <span className="flex items-center gap-2"><Linkedin size={14} /> {dados_pessoais.linkedin}</span>}
            </div>
          </header>
        );
      default: // classic
        return (
          <header className="text-center mb-8 border-b border-gray-300 pb-6">
            <h1 className="text-3xl font-serif font-bold text-gray-900">{dados_pessoais.nome}</h1>
            <p className="text-lg text-gray-700 font-serif italic">{dados_pessoais.role}</p>
            <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
              {dados_pessoais.email && <span>{dados_pessoais.email}</span>}
              {dados_pessoais.telefone && <span>{dados_pessoais.telefone}</span>}
            </div>
            <div className="flex justify-center gap-4 mt-1 text-sm text-gray-600">
              {dados_pessoais.linkedin && <span>{dados_pessoais.linkedin}</span>}
              {dados_pessoais.github && <span>{dados_pessoais.github}</span>}
            </div>
          </header>
        );
    }
  };

  const sectionTitleClass = cn(
    "text-lg font-bold mb-4 uppercase tracking-wider",
    theme === 'modern' && "text-blue-600 border-b border-blue-100 pb-1",
    theme === 'minimal' && "text-gray-800 border-b border-gray-100 pb-1 font-light",
    theme === 'technical' && "text-gray-900 font-mono before:content-['#_']",
    theme === 'classic' && "text-gray-900 font-serif border-b-2 border-gray-800 pb-1",
    theme === 'elegant' && "text-gray-900 font-serif italic border-b border-gray-200 pb-1 text-center",
    theme === 'compact' && "text-xs font-black text-gray-900 border-l-2 border-gray-900 pl-2 mb-2",
    theme === 'bold' && "text-2xl font-black text-black border-b-4 border-yellow-400 pb-1 mb-6"
  );

  return (
    <div 
      ref={ref}
      className={cn(
        "bg-white p-12 shadow-2xl mx-auto min-h-[29.7cm] w-[21cm] text-gray-800 print:shadow-none print:p-8",
        theme === 'minimal' && "font-sans",
        theme === 'technical' && "font-mono text-sm",
        theme === 'classic' && "font-serif",
        theme === 'modern' && "font-sans",
        theme === 'elegant' && "font-serif",
        theme === 'compact' && "font-sans p-8 min-h-[auto]",
        theme === 'bold' && "font-sans"
      )}
    >
      {renderHeader()}

      {dados_pessoais.resumo && (
        <section className="mb-8">
          <h2 className={sectionTitleClass}>Resumo</h2>
          <p className="text-sm leading-relaxed text-gray-700">{dados_pessoais.resumo}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className={sectionTitleClass}>Experiência</h2>
        <div className="space-y-6">
          {experiencia.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-gray-900">{exp.role}</h3>
                <span className="text-xs text-gray-500 font-medium">{exp.periodo}</span>
              </div>
              <p className={cn("text-sm mb-2", theme === 'modern' ? "text-blue-600 font-medium" : "text-gray-700 italic")}>
                {exp.empresa}
              </p>
              <ul className="list-disc list-outside ml-4 space-y-1">
                {exp.conquistas.map((conquista, j) => (
                  <li key={j} className="text-sm text-gray-600 leading-snug">{conquista}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h2 className={sectionTitleClass}>Formação</h2>
          <div className="space-y-4">
            {formacao.map((edu, i) => (
              <div key={i}>
                <h3 className="font-bold text-sm text-gray-900">{edu.curso}</h3>
                <p className="text-xs text-gray-600">{edu.instituicao}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{edu.periodo}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={sectionTitleClass}>Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {habilidades.map((skill, i) => (
              <span 
                key={i} 
                className={cn(
                  "px-2 py-1 text-[10px] rounded",
                  theme === 'modern' && "bg-blue-50 text-blue-700 border border-blue-100",
                  theme === 'minimal' && "bg-gray-50 text-gray-600 border border-gray-100",
                  theme === 'technical' && "bg-gray-100 text-gray-800 font-mono",
                  theme === 'classic' && "border border-gray-300 text-gray-700"
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {idiomas && idiomas.length > 0 && (
        <section className="mt-8">
          <h2 className={sectionTitleClass}>Idiomas</h2>
          <div className="flex gap-4">
            {idiomas.map((idioma, i) => (
              <span key={i} className="text-xs text-gray-600">{idioma}</span>
            ))}
          </div>
        </section>
      )}

      {projetos && projetos.length > 0 && (
        <section className="mt-8">
          <h2 className={sectionTitleClass}>Projetos</h2>
          <div className="space-y-4">
            {projetos.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm text-gray-900">{proj.nome}</h3>
                  {proj.link && <span className="text-[10px] text-blue-500 underline">{proj.link}</span>}
                </div>
                <p className="text-xs text-gray-600 mt-1">{proj.descricao}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
