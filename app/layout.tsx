import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agenda Cortes | Mais tempo para o que realmente importa",
  description: "Organize os agendamentos da sua barbearia com o Agenda Barber.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
