export const TypingIndicator = () => {
  return (
    <div className="flex w-full justify-start animate-slide-up">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-ai-message px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-ai-message-foreground animate-typing" style={{ animationDelay: "0ms" }} />
          <div className="h-2 w-2 rounded-full bg-ai-message-foreground animate-typing" style={{ animationDelay: "200ms" }} />
          <div className="h-2 w-2 rounded-full bg-ai-message-foreground animate-typing" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  );
};
