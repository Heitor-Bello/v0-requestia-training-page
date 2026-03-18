export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Validação de nome (apenas letras, espaços e acentos)
export function validateName(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: "Campo obrigatório" };
  }

  // Regex para aceitar apenas letras (incluindo acentuadas), espços e hífens
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  if (!nameRegex.test(value)) {
    return { isValid: false, error: "Nome deve conter apenas letras" };
  }

  if (value.trim().length < 3) {
    return { isValid: false, error: "Nome deve ter pelo menos 3 caracteres" };
  }

  return { isValid: true };
}

// Validação para e-mail
export function validateEmail(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: "Campo obrigatório" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    return { isValid: false, error: "E-mail inválido" };
  }

  return { isValid: true };
}

// Validação de telefone (aceita formatos brasileiros)
export function validatePhone(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: "Campo obrigatório" };
  }

  // Remove caracteres não numéricos para validação
  const numbersOnly = value.replace(/\D/g, "");

  if (numbersOnly.length < 10 || numbersOnly.length > 11) {
    return { isValid: false, error: "Telefone deve conter 10 ou 11 dígitos" };
  }

  return { isValid: true };
}

// Validação de texto obrigatório (genérico)
export function validateRequired(
  value: string,
  fieldName?: string,
): ValidationResult {
  if (!value.trim()) {
    return {
      isValid: false,
      error: fieldName ? `${fieldName} é obrigatório` : "Campo obrigatório",
    };
  }

  return { isValid: true };
}

// Validação de texto sem números
export function validateTextOnly(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: "Campo obrigatório" };
  }

  if (/\d/.test(value)) {
    return { isValid: false, error: "Este campo não pode conter números" };
  }

  return { isValid: true };
}

// Tipo para regras de validação
export type ValidationType =
  | "name"
  | "email"
  | "phone"
  | "required"
  | "textOnly";

// Função que retorna o validador apropriado
export function getValidator(
  type: ValidationType,
): (value: string) => ValidationResult {
  switch (type) {
    case "name":
      return validateName;
    case "email":
      return validateEmail;
    case "phone":
      return validatePhone;
    case "textOnly":
      return validateTextOnly;
    case "required":
    default:
      return validateRequired;
  }
}

// Formatar telefone enquanto digita
export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 2) {
    return numbers;
  }
  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}
