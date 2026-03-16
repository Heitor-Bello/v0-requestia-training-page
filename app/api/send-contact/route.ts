import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

import { loadPublicTemplate, renderTemplate } from "@/lib/email/template-engine";

const contactSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  email: z.string().email("E-mail inválido"),
  message: z.string().min(1, "Mensagem é obrigatória"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Dados inválidos",
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Load and render the contact email template
    const template = await loadPublicTemplate("duvida-formstreinamento.html");
    const html = renderTemplate(template, {
      fullName: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    const internalRecipients = (process.env.MAIL_TO_INTERNAL ?? "")
      .split(/[;,]/)
      .map((email) => email.trim())
      .filter(Boolean);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: Number(process.env.SMTP_PORT) === 465,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: internalRecipients,
      subject: `[Treinamento] Nova dúvida de ${data.name}`,
      html: html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail de contato:", error);
    return NextResponse.json(
      { ok: false, error: "Falha no envio" },
      { status: 500 },
    );
  }
}
