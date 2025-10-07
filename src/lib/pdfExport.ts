import jsPDF from "jspdf";
import { Message } from "@/components/ChatMessage";

export const exportChatToPDF = (messages: Message[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Titre
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Historique de discussion avec l'IA", margin, yPosition);
  yPosition += 15;

  // Date d'export
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(128, 128, 128);
  doc.text(
    `Exporté le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}`,
    margin,
    yPosition
  );
  yPosition += 15;

  // Messages
  messages.forEach((message, index) => {
    // Vérifier si on a besoin d'une nouvelle page
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = margin;
    }

    // En-tête du message
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    
    const author = message.role === "user" ? "Utilisateur" : "IA";
    const time = message.timestamp.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    doc.text(`${author} - ${time}`, margin, yPosition);
    yPosition += 7;

    // Contenu du message
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);

    const lines = doc.splitTextToSize(message.content, maxWidth);
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 6;
    });

    yPosition += 10; // Espacement entre les messages

    // Ligne de séparation
    if (index < messages.length - 1) {
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;
    }
  });

  // Télécharger le PDF
  const fileName = `conversation_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
};
