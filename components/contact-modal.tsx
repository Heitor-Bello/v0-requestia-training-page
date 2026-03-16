"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, MessageSquareWarning, Loader2 } from "lucide-react";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await fetch("/api/send-email-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar mensagem");
      }

      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setIsSuccess(false);
    setIsError(false);
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
      {/* Contact Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2 text-[#004680] border-[#004680] hover:bg-[#004680]/5"
      >
        <MessageSquareWarning />
        Dúvidas
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 min-h-screen">
          {/* Modal */}
          <div className="bg-white rounded-3xl shadow-2xl w-[500px] min-h-[450px] p-8 relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="cursor-pointer absolute top-6 right-6 p-1 hover:bg-gray-100 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Fechar"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {isSuccess ? (
              /* Success State */
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                {/* Envelope Icon with Checkmark */}
                <div className="relative mb-8">
                  <svg
                    width="120"
                    height="100"
                    viewBox="0 0 120 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Envelope Body */}
                    <path
                      d="M10 30L60 60L110 30V85C110 90 105 95 100 95H20C15 95 10 90 10 85V30Z"
                      fill="#7BA3C9"
                    />
                    {/* Envelope Flap */}
                    <path d="M10 30L60 60L110 30L60 5L10 30Z" fill="#5B8AB8" />
                    {/* Paper */}
                    <rect
                      x="25"
                      y="15"
                      width="70"
                      height="50"
                      rx="3"
                      fill="white"
                    />
                    <rect
                      x="35"
                      y="28"
                      width="50"
                      height="4"
                      rx="2"
                      fill="#C5D5E5"
                    />
                    <rect
                      x="35"
                      y="38"
                      width="40"
                      height="4"
                      rx="2"
                      fill="#C5D5E5"
                    />
                    <rect
                      x="35"
                      y="48"
                      width="30"
                      height="4"
                      rx="2"
                      fill="#C5D5E5"
                    />
                  </svg>
                  {/* Checkmark Circle */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10L8.5 13.5L15 7"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[#003765] mb-4">
                  Agradecemos o seu contato!
                </h2>
                <p className="text-[#5F7990] text-base max-w-[300px]">
                  Recebemos a sua mensagem. Fique tranquilo, logo entraremos em
                  contato com você.
                </p>
              </div>
            ) : isError ? (
              /* Error State */
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                {/* Error Icon - Stacked papers with X marks and warning triangle */}
                <div className="relative mb-8">
                  <svg
                    width="120"
                    height="110"
                    viewBox="0 0 120 110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Back paper */}
                    <rect
                      x="25"
                      y="5"
                      width="70"
                      height="85"
                      rx="4"
                      fill="#E8EEF3"
                      transform="rotate(5 25 5)"
                    />
                    {/* Middle paper */}
                    <rect
                      x="20"
                      y="10"
                      width="70"
                      height="85"
                      rx="4"
                      fill="#F0F4F7"
                      transform="rotate(-3 20 10)"
                    />
                    {/* Front paper */}
                    <rect x="22" y="12" width="70" height="85" rx="4" fill="white" stroke="#E0E7ED" strokeWidth="1"/>
                    {/* X marks and lines */}
                    <rect x="32" y="28" width="12" height="12" rx="2" fill="#FDEAEA"/>
                    <path d="M35 31L41 37M41 31L35 37" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="50" y="31" width="35" height="4" rx="2" fill="#5B8AB8"/>
                    
                    <rect x="32" y="48" width="12" height="12" rx="2" fill="#FDEAEA"/>
                    <path d="M35 51L41 57M41 51L35 57" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="50" y="51" width="30" height="4" rx="2" fill="#5B8AB8"/>
                    
                    <rect x="32" y="68" width="12" height="12" rx="2" fill="#FDEAEA"/>
                    <path d="M35 71L41 77M41 71L35 77" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="50" y="71" width="25" height="4" rx="2" fill="#5B8AB8"/>
                  </svg>
                  {/* Warning Triangle */}
                  <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2">
                    <svg
                      width="40"
                      height="36"
                      viewBox="0 0 40 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 4L36 32H4L20 4Z"
                        fill="#FFC107"
                        stroke="#E65100"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <circle cx="20" cy="26" r="2" fill="#E65100"/>
                      <rect x="18" y="14" width="4" height="8" rx="2" fill="#E65100"/>
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[#003765] mb-4">
                  Algo deu errado
                </h2>
                <p className="text-[#5F7990] text-base max-w-[300px]">
                  Não foi possível concluir a solicitação. Tente novamente em alguns instantes.
                </p>
              </div>
            ) : (
              /* Form State */
              <>
                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Entre em contato
                </h2>

                {/* Description */}
                <p className="text-sm text-[#5F7990] mb-4 shrink-0">
                  Tem dúvidas sobre o treinamento? Envie sua mensagem e nossa
                  equipe retornará em breve.
                </p>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 w-full flex flex-col flex-1"
                >
                  {/* Full Name Input */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome Completo *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#206EB0] focus:border-transparent transition"
                  />

                  {/* Phone Input */}
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#206EB0] focus:border-transparent transition"
                  />

                  {/* Email Input */}
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#206EB0] focus:border-transparent transition"
                  />

                  {/* Message Textarea */}
                  <textarea
                    name="message"
                    placeholder="Mensagem *"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#206EB0] focus:border-transparent transition resize-none flex-1 min-h-0"
                  />

                  {/* Buttons */}
                  <div className="flex gap-3 justify-end pt-2 shrink-0">
                    <Button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      variant="outline"
                      className="cursor-pointer px-6 py-2 border-2 border-[#206EB0] text-[#206EB0] hover:text-[#206EB0] hover:bg-[#206EB0]/5 font-semibold rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="cursor-pointer px-6 py-2 bg-[#206EB0] text-white hover:bg-[#1a5a8f] font-semibold rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar mensagem"
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
