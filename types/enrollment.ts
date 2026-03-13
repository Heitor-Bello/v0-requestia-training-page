// types/enrollment.ts
// Tipos centralizados para o sistema de inscrição de treinamentos

// Nível de treinamento
export type Level = "essentials" | "foundations" | "expert";

// Sessão de treinamento
export interface TrainingSession {
  id: string;
  date: string;
  location: string;
  duration: string;
}

// Participante adicional (usado internamente nos formulários com ID)
export interface AdditionalParticipantWithId {
  id: string;
  addName: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  isPCD: boolean | null;
  pcdDescription: string;
}

// Participante adicional (usado para envio e confirmação)
export interface AdditionalParticipant {
  addName: string;
  role: string;
  email: string;
  phone: string;
  isPCD?: boolean | null;
  pcdDescription?: string;
}

// Dados do formulário base (campos comuns a todos os níveis)
export interface BaseFormData {
  fullName: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  agreePrivacy: boolean;
  additionalParticipants?: AdditionalParticipant[];
}

// Dados do formulário Essentials
export type EssentialsFormData = BaseFormData;

// Dados do formulário Foundations/Expert (com campos adicionais)
export interface AdvancedFormData extends BaseFormData {
  experience?: string;
  department?: string;
  currentSolution?: string;
  goals?: string;
  budget?: string;
  compFinName?: string;
  compFinEmail?: string;
  isPCD?: boolean | null;
  pcdDescription?: string;
}

// Dados de confirmação exibidos na página de confirmação
export interface ConfirmationData {
  level: string;
  levelNumber: string;
  levelName: string;
  levelColor: string;
  date: string;
  location: string;
  duration: string;
  certification: string;
  fullName: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  compFinName?: string;
  compFinEmail?: string;
  isPCD?: boolean | null;
  pcdDescription?: string;
  additionalParticipants?: AdditionalParticipant[];
}

// Props do EnrollModal
export interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: Level;
  session?: TrainingSession | null;
}

// Props do formulário Essentials
export interface EnrollFormEssentialsProps {
  formData: EssentialsFormData;
  onFormDataChange: (data: EssentialsFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

// Props do formulário Foundations
export interface EnrollFormFoundationsProps {
  formData: AdvancedFormData;
  onFormDataChange: (data: AdvancedFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

// Props do formulário Expert
export interface EnrollFormExpertProps {
  formData: AdvancedFormData;
  onFormDataChange: (data: AdvancedFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}
