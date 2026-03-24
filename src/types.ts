export interface PersonalData {
  nome: string;
  role: string;
  email?: string;
  telefone?: string;
  linkedin?: string;
  github?: string;
  site?: string;
  resumo?: string;
}

export interface Experience {
  empresa: string;
  periodo: string;
  role: string;
  conquistas: string[];
}

export interface Education {
  instituicao: string;
  curso: string;
  periodo: string;
}

export interface Project {
  nome: string;
  descricao: string;
  link?: string;
}

export interface ResumeData {
  dados_pessoais: PersonalData;
  experiencia: Experience[];
  formacao: Education[];
  projetos?: Project[];
  habilidades: string[];
  idiomas?: string[];
}

export type ThemeType = 'modern' | 'classic' | 'minimal' | 'technical' | 'elegant' | 'compact' | 'bold';
