import { ResumeData } from "./types";

export const defaultResume: ResumeData = {
  dados_pessoais: {
    nome: "Seu Nome Completo",
    role: "Sua Profissão / Cargo Atual",
    email: "seu.email@exemplo.com",
    telefone: "(11) 99999-9999",
    linkedin: "linkedin.com/in/seu-perfil",
    github: "github.com/seu-usuario",
    resumo: "Um breve resumo sobre sua carreira e objetivos profissionais."
  },
  experiencia: [
    {
      empresa: "Empresa Atual ou Anterior",
      periodo: "2022 - Presente",
      role: "Seu Cargo",
      conquistas: [
        "Otimizei a performance do sistema em 30% através de refatoração de código.",
        "Liderei uma equipe de 4 desenvolvedores em um projeto crítico.",
        "Implementei novas funcionalidades que aumentaram a retenção de usuários em 15%."
      ]
    }
  ],
  formacao: [
    {
      instituicao: "Universidade Exemplo",
      curso: "Ciência da Computação",
      periodo: "2018 - 2022"
    }
  ],
  habilidades: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Git"
  ],
  idiomas: [
    "Português (Nativo)",
    "Inglês (Avançado)"
  ]
};
