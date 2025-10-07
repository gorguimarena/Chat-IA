import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat";
import { exportChatToPDF } from "@/lib/pdfExport";
import { Download, Trash2, Moon, Sun } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

const Index = () => {
  const { messages, isTyping, sendMessage, clearMessages } = useChat();
  const { theme, setTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleExportPDF = () => {
    if (messages.length === 0) {
      toast({
        title: "Aucune conversation",
        description: "Il n'y a aucun message à exporter.",
        variant: "destructive",
      });
      return;
    }

    try {
      exportChatToPDF(messages);
      toast({
        title: "Export réussi",
        description: "La conversation a été exportée en PDF.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'exporter la conversation.",
        variant: "destructive",
      });
    }
  };

  const handleClearChat = () => {
    if (messages.length === 0) return;

    clearMessages();
    toast({
      title: "Conversation effacée",
      description: "Tous les messages ont été supprimés.",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex h-screen flex-col bg-chat-background">
      {/* Header */}
      <header className="border-b border-border bg-background shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Chat IA</h1>
            <p className="text-sm text-muted-foreground">
              Assistant intelligent à votre service
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              title="Changer de thème"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearChat}
              disabled={messages.length === 0}
              title="Effacer la conversation"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleExportPDF}
              disabled={messages.length === 0}
              title="Télécharger en PDF"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages container */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="max-w-md space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Bienvenue ! 👋
                </h2>
                <p className="text-lg text-muted-foreground">
                  Commencez une conversation avec l'IA en posant votre première
                  question ci-dessous.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input area */}
      <footer className="border-t border-border bg-background shadow-lg">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
        </div>
      </footer>
    </div>
  );
};

export default Index;
