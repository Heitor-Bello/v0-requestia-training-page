/**
 * Constantes centralizadas do projeto
 * Facilita manutenção e garante consistência em toda a aplicação
 */

// Tipos de níveis de curso
export type CourseLevel = "essentials" | "foundations" | "expert";

// Configuração dos níveis de curso
export const COURSE_LEVELS = {
  essentials: {
    id: "essentials",
    name: "Essentials",
    number: "01",
    title: "Treinamento Requestia Essentials",
    description: "Ideal para quem está começando",
  },
  foundations: {
    id: "foundations",
    name: "Foundations",
    number: "02",
    title: "Treinamento Requestia Foundations",
    description: "Para quem já conhece o básico",
  },
  expert: {
    id: "expert",
    name: "Expert",
    number: "03",
    title: "Treinamento Requestia Expert",
    description: "Nível avançado para especialistas",
  },
} as const;

// Cores da marca
export const BRAND_COLORS = {
  primary: "#0D5B9C",
  primaryDark: "#004680",
  accent: "#F5A623",
  text: {
    dark: "#212121",
    medium: "#666666",
    light: "#9E9E9E",
  },
  background: {
    light: "#FFFFFF",
    subtle: "#F5F5F5",
  },
  error: "#EF4444",
  success: "#22C55E",
} as const;

// Blacklist de domínios de e-mail (não institucionais)
export const EMAIL_DOMAIN_BLACKLIST = [
  "gmail.com",
  "yahoo.com",
  "ymail.com",
  "yahoo.com.br",
  "google.com",
  "mailsphere.xyz",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "bol.com",
  "uol.com",
  "terra.com",
  "ig.com",
  "icloud.com",
  "deskmanager.com",
  "qualitor.com",
] as const;

// Mensagens de validação
export const VALIDATION_MESSAGES = {
  required: "Campo obrigatório",
  invalidEmail: "E-mail inválido",
  corporateEmailRequired: "Por favor, utilize um e-mail corporativo",
  invalidPhone: "Telefone inválido. Use o formato (XX) XXXXX-XXXX",
  invalidName: "Nome inválido. Use apenas letras e espaços",
  textOnly: "Use apenas letras e espaços",
  pcdRequired: "Por favor, selecione uma opção de PCD",
} as const;

// Textos de política de privacidade
export const PRIVACY_POLICY = {
  agreementText:
    "Ao enviar este formulário, concordo com a utilização de todos dados informados para o recebimento de contato comercial. Confirmo que li e concordo com a",
  linkText: "Política de Privacidade",
  linkUrl: "#",
} as const;

// Configurações de API
export const API_ENDPOINTS = {
  enrollment: "/api/enrollment",
  contact: "/api/contact",
} as const;

// Configurações de formatação
export const FORMAT_CONFIG = {
  phone: {
    mask: "(XX) XXXXX-XXXX",
    maxLength: 15,
  },
} as const;
