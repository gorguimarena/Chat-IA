import { useState, useCallback, useRef } from "react";
import { Message } from "@/components/ChatMessage";
import { toast } from "@/hooks/use-toast";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    abortControllerRef.current = new AbortController();

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

      if (!apiKey) {
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: generateSimulatedResponse(content),
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const response = await fetch(VITE_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer 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`,
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [
              ...messages.map(m => ({ role: m.role, content: m.content })),
              { role: "user", content }
            ],
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la communication avec l'IA");
        }

        const data = await response.json();
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.choices[0].message.content,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      }
      
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Requête annulée");
        return;
      }

      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Impossible de communiquer avec l'IA. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
  };
};

const generateSimulatedResponse = (userMessage: string): string => {
  const responses = [
    "Je comprends votre question. Laissez-moi vous aider avec ça.",
    "C'est une excellente question ! Voici ce que je peux vous dire à ce sujet...",
    "Intéressant ! Permettez-moi de vous expliquer en détail.",
    "Je vois ce que vous voulez dire. Voici mon analyse de la situation.",
    "Merci pour votre message. Je suis là pour vous aider !",
  ];

  return responses[Math.floor(Math.random() * responses.length)] +
    "\n\nNote : Ceci est une réponse simulée. Pour utiliser une vraie IA, configurez votre clé API OpenRouter via Lovable Cloud.";
};
