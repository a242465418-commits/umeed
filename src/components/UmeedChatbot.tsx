import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check,
  Copy,
  Eraser,
  Maximize2,
  MessageSquare,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  SendHorizontal,
  Trash2,
  X,
} from 'lucide-react';
import { SUGGESTED_CHAT_PROMPTS } from '../data/umeedAiKnowledge';
import {
  createNewConversation,
  deriveConversationTitle,
  fetchChatBackendStatus,
  generateChatId,
  loadStoredConversations,
  saveStoredConversations,
  sendUmeedChatTurn,
} from '../services/chatService';
import { ChatConversation, ChatEngineMode, ChatMessage } from '../types/chat';
import { UmeedMarkdown } from './UmeedMarkdown';

interface UmeedChatbotProps {
  onNavigateSection?: (sectionId: string) => void;
  externalOpenFullscreen?: boolean;
  onCloseExternalFullscreen?: () => void;
}

export const UmeedChatbot: React.FC<UmeedChatbotProps> = ({
  onNavigateSection,
  externalOpenFullscreen = false,
  onCloseExternalFullscreen,
}) => {
  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    const saved = loadStoredConversations();
    return saved.length > 0 ? saved : [createNewConversation()];
  });

  const [activeConversationId, setActiveConversationId] = useState<string>(() => {
    const saved = loadStoredConversations();
    return saved.length > 0 ? saved[0].id : '';
  });

  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [engineMode, setEngineMode] = useState<ChatEngineMode>('checking');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const messagesViewportRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Sync external fullscreen trigger (e.g., from floating launcher)
  useEffect(() => {
    if (externalOpenFullscreen) {
      setIsFullscreen(true);
    }
  }, [externalOpenFullscreen]);

  // Ensure valid activeConversationId
  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    if (activeConversation && activeConversation.id !== activeConversationId) {
      setActiveConversationId(activeConversation.id);
    }
  }, [activeConversation, activeConversationId]);

  // Persist conversations locally in browser
  useEffect(() => {
    saveStoredConversations(conversations);
  }, [conversations]);

  // Check Gemini backend availability on mount
  useEffect(() => {
    let mounted = true;
    fetchChatBackendStatus().then((status) => {
      if (mounted) {
        setEngineMode(status.mode);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Auto-scroll chat container to latest message or typing indicator
  useEffect(() => {
    const viewport = messagesViewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: 'smooth',
    });
  }, [activeConversation?.messages.length, isGenerating]);

  // Escape closes fullscreen mode cleanly
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        onCloseExternalFullscreen?.();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen, onCloseExternalFullscreen]);

  // Auto-resize textarea smoothly
  const syncTextareaHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  }, []);

  useEffect(() => {
    syncTextareaHeight();
  }, [inputValue, syncTextareaHeight]);

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => {
      const next = !prev;
      if (!next) {
        onCloseExternalFullscreen?.();
      }
      return next;
    });
  };

  const handleNavigateFromMarkdown = useCallback(
    (sectionId: string) => {
      if (isFullscreen) {
        setIsFullscreen(false);
        onCloseExternalFullscreen?.();
      }
      onNavigateSection?.(sectionId);
    },
    [isFullscreen, onCloseExternalFullscreen, onNavigateSection]
  );

  const handleStartNewChat = () => {
    // Reuse current conversation if already empty
    if (activeConversation && activeConversation.messages.length === 0) {
      setMobileSidebarOpen(false);
      textareaRef.current?.focus();
      return;
    }
    const fresh = createNewConversation();
    setConversations((prev) => [fresh, ...prev]);
    setActiveConversationId(fresh.id);
    setInputValue('');
    setStatusNotice(null);
    setMobileSidebarOpen(false);
    setTimeout(() => textareaRef.current?.focus(), 40);
  };

  const handleClearCurrentChat = () => {
    if (!activeConversation) return;
    const now = new Date().toISOString();
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation.id
          ? { ...conv, title: 'New Conversation', messages: [], updatedAt: now }
          : conv
      )
    );
    setStatusNotice(null);
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => {
      const remaining = prev.filter((c) => c.id !== id);
      if (remaining.length === 0) {
        const fresh = createNewConversation();
        setActiveConversationId(fresh.id);
        return [fresh];
      }
      if (activeConversationId === id) {
        setActiveConversationId(remaining[0].id);
      }
      return remaining;
    });
  };

  const handleClearAllHistory = () => {
    const fresh = createNewConversation();
    setConversations([fresh]);
    setActiveConversationId(fresh.id);
    setInputValue('');
    setStatusNotice(null);
    setMobileSidebarOpen(false);
  };

  const handleCopyMessage = async (msg: ChatMessage) => {
    try {
      await navigator.clipboard.writeText(msg.content);
      setCopiedMessageId(msg.id);
      setTimeout(() => {
        setCopiedMessageId((prev) => (prev === msg.id ? null : prev));
      }, 1800);
    } catch {
      // Clipboard restricted fallback
    }
  };

  const submitPrompt = async (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || isGenerating || !activeConversation) return;

    const now = new Date().toISOString();
    const userMessage: ChatMessage = {
      id: generateChatId('msg'),
      role: 'user',
      content: trimmed,
      createdAt: now,
    };

    const updatedMessages = [...activeConversation.messages, userMessage];
    const nextTitle =
      activeConversation.messages.length === 0
        ? deriveConversationTitle(trimmed)
        : activeConversation.title;

    const targetConvId = activeConversation.id;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === targetConvId
          ? { ...c, title: nextTitle, messages: updatedMessages, updatedAt: now }
          : c
      )
    );
    setInputValue('');
    setIsGenerating(true);

    const response = await sendUmeedChatTurn(updatedMessages);

    const aiMessage: ChatMessage = {
      id: generateChatId('msg'),
      role: 'model',
      content: response.reply,
      createdAt: new Date().toISOString(),
      mode: response.mode,
    };

    setEngineMode(response.mode);
    if (response.notice) {
      setStatusNotice(response.notice);
    }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === targetConvId
          ? {
              ...c,
              messages: [...updatedMessages, aiMessage],
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );
    setIsGenerating(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitPrompt(inputValue);
    }
  };

  const hasMessages = Boolean(activeConversation && activeConversation.messages.length > 0);

  const renderSidebarContent = () => (
    <div className="h-full flex flex-col bg-[#F5F1E8] border-r border-[#E7E0D2]">
      {/* New Chat Header */}
      <div className="p-4 border-b border-[#E7E0D2] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleStartNewChat}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#FBF9F5] bg-[#113826] rounded-lg hover:bg-[#14532D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>New Chat</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close conversation history"
          className="lg:hidden p-2 text-[#57534E] hover:text-[#113826] rounded-md cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Stored Conversation Threads */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <p className="px-2.5 py-1.5 text-[11px] font-semibold text-[#57534E]">
          Recent Conversations ({conversations.length})
        </p>

        {conversations.map((conv) => {
          const isSelected = conv.id === activeConversation?.id;
          return (
            <div
              key={conv.id}
              onClick={() => {
                setActiveConversationId(conv.id);
                setMobileSidebarOpen(false);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveConversationId(conv.id);
                  setMobileSidebarOpen(false);
                }
              }}
              className={`group flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-left transition-colors duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-white text-[#113826] shadow-2xs border border-[#E7E0D2]'
                  : 'text-[#44403C] hover:bg-[#EFEAE0]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MessageSquare
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isSelected ? 'text-[#14532D]' : 'text-[#78716C]'
                  }`}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{conv.title}</p>
                  <p className="text-[10px] text-[#78716C] tabular-nums">
                    {conv.messages.length}{' '}
                    {conv.messages.length === 1 ? 'message' : 'messages'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => handleDeleteConversation(conv.id, e)}
                aria-label={`Delete conversation ${conv.title}`}
                className="opacity-70 group-hover:opacity-100 p-1 text-[#78716C] hover:text-[#991B1B] rounded transition-opacity shrink-0 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer: Clear All Stored History */}
      <div className="p-3 border-t border-[#E7E0D2] flex items-center justify-between gap-2 text-xs">
        <span className="text-[11px] text-[#57534E] truncate">Saved in browser</span>
        <button
          type="button"
          onClick={handleClearAllHistory}
          className="text-[11px] font-medium text-[#57534E] hover:text-[#991B1B] underline underline-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          Clear History
        </button>
      </div>
    </div>
  );

  const chatInterfaceBody = (
    <div
      className={`relative bg-[#FBF9F5] border border-[#E7E0D2] overflow-hidden flex ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none border-0 h-screen w-screen'
          : 'rounded-xl h-[680px] sm:h-[720px] shadow-xs'
      }`}
    >
      {/* Desktop Collapsible Conversation History Sidebar */}
      {desktopSidebarOpen && (
        <aside aria-label="Conversation history" className="hidden lg:block w-72 shrink-0 h-full">
          {renderSidebarContent()}
        </aside>
      )}

      {/* Mobile Slide-Over Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden absolute inset-0 z-30 flex">
          <aside aria-label="Mobile conversation history" className="w-72 max-w-[82%] h-full shadow-lg">
            {renderSidebarContent()}
          </aside>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Main Conversational Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full bg-[#FBF9F5]">
        {/* Top Utility Toolbar */}
        <div className="px-4 sm:px-6 h-14 bg-white border-b border-[#E7E0D2] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Sidebar Button */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open conversation history"
              className="lg:hidden p-2 text-[#113826] hover:bg-[#F5F1E8] rounded-md cursor-pointer"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              type="button"
              onClick={() => setDesktopSidebarOpen((prev) => !prev)}
              aria-label={
                desktopSidebarOpen ? 'Collapse conversation sidebar' : 'Expand conversation sidebar'
              }
              className="hidden lg:inline-flex p-2 text-[#57534E] hover:text-[#113826] hover:bg-[#F5F1E8] rounded-md cursor-pointer"
            >
              {desktopSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4" />
              )}
            </button>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs min-w-0">
              <span className="font-serif text-base font-semibold text-[#113826] whitespace-nowrap">
                UMEED AI
              </span>
              <span aria-hidden="true" className="text-[#A8A29E] hidden sm:inline">
                ·
              </span>
              <span className="text-[#57534E] truncate hidden sm:inline">
                English & हिन्दी
              </span>
              <span aria-hidden="true" className="text-[#A8A29E]">
                ·
              </span>
              <span className="font-medium text-[#14532D] truncate">
                {engineMode === 'gemini'
                  ? 'Gemini Connected'
                  : engineMode === 'demo'
                  ? 'Demo Mode (Predefined Responses)'
                  : 'Ready'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {hasMessages && (
              <button
                type="button"
                onClick={handleClearCurrentChat}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#57534E] hover:text-[#113826] hover:bg-[#F5F1E8] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Eraser className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Clear Chat</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleStartNewChat}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#113826] hover:bg-[#F5F1E8] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">New Chat</span>
            </button>

            <button
              type="button"
              onClick={handleToggleFullscreen}
              aria-label={isFullscreen ? 'Exit full-screen chat' : 'Expand chat to full screen'}
              className="p-2 text-[#57534E] hover:text-[#113826] hover:bg-[#F5F1E8] rounded-md transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Demo Mode / Notice Banner (Clearly Labeled When No API Is Configured) */}
        {engineMode === 'demo' && (
          <div className="px-4 sm:px-6 py-2 bg-[#F5F1E8] border-b border-[#E7E0D2] text-[11px] text-[#57534E] flex flex-wrap items-center justify-between gap-2 shrink-0">
            <span>
              <strong className="font-semibold text-[#113826]">Demo Mode Active:</strong> Responding
              with predefined verified UMEED answers in English & हिन्दी (no Gemini API key
              configured).
            </span>
            {statusNotice && <span className="text-[#14532D]">{statusNotice}</span>}
          </div>
        )}

        {/* Scrollable Conversational Viewport */}
        <div
          ref={messagesViewportRef}
          className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-10"
        >
          {!hasMessages ? (
            /* Gemini-Inspired Empty Welcome Canvas */
            <div className="max-w-3xl mx-auto h-full flex flex-col justify-center py-4">
              <div className="text-center sm:text-left">
                <p className="text-xs font-medium text-[#14532D] mb-2">
                  UMEED Conversational Guide · English & हिन्दी
                </p>
                <h3
                  className="font-serif font-semibold text-[#113826] tracking-tight leading-[1.15]"
                  style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)' }}
                >
                  Hello! How can UMEED help you today?
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#57534E] leading-relaxed max-w-2xl">
                  Ask about our mission, six humanitarian causes, volunteering roles, or verified
                  open-book transparency—in English or हिन्दी.
                </p>
              </div>

              {/* Suggested Starter Prompt Cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SUGGESTED_CHAT_PROMPTS.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => submitPrompt(card.prompt)}
                    className="group text-left p-4 sm:p-5 bg-white border border-[#E7E0D2] hover:border-[#113826]/60 rounded-xl transition-colors duration-150 flex flex-col justify-between gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#14532D]"
                  >
                    <div>
                      <p className="text-[11px] font-medium text-[#14532D]">
                        {card.languageLabel}
                      </p>
                      <p className="mt-1 font-serif text-base font-semibold text-[#113826]">
                        {card.title}
                      </p>
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2">
                      “{card.prompt}”
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Active Multi-Turn Message Thread */
            <div className="max-w-3xl mx-auto space-y-6">
              {activeConversation?.messages.map((msg) => {
                const isUser = msg.role === 'user';
                const isCopied = copiedMessageId === msg.id;

                if (isUser) {
                  return (
                    <div key={msg.id} className="flex justify-end">
                      <div className="max-w-[85%] sm:max-w-[75%] bg-[#113826] text-[#FBF9F5] px-4 sm:px-5 py-3.5 rounded-2xl rounded-br-sm">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="flex items-start gap-3 sm:gap-4">
                    {/* Friendly UMEED Monogram Avatar */}
                    <div
                      aria-hidden="true"
                      className="w-8 h-8 rounded-full bg-[#113826] text-[#FBF9F5] font-serif text-sm font-semibold flex items-center justify-center shrink-0 mt-0.5"
                    >
                      U
                    </div>

                    <div className="flex-1 min-w-0 bg-white border border-[#E7E0D2] rounded-2xl rounded-tl-sm px-5 py-4">
                      <UmeedMarkdown
                        content={msg.content}
                        onNavigateSection={handleNavigateFromMarkdown}
                      />

                      <div className="mt-3 pt-2.5 border-t border-[#F5F1E8] flex items-center justify-between gap-3 text-[11px] text-[#78716C]">
                        <span>
                          UMEED AI ·{' '}
                          {msg.mode === 'gemini' ? 'Verified Knowledge' : 'Demo Response'}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg)}
                          aria-label="Copy AI response"
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#57534E] hover:text-[#113826] hover:bg-[#FBF9F5] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#14532D]" aria-hidden="true" />
                              <span className="text-[#14532D]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing / Loading Indicator */}
              {isGenerating && (
                <div role="status" aria-live="polite" className="flex items-start gap-3 sm:gap-4">
                  <div
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full bg-[#113826] text-[#FBF9F5] font-serif text-sm font-semibold flex items-center justify-center shrink-0 mt-0.5"
                  >
                    U
                  </div>
                  <div className="bg-white border border-[#E7E0D2] rounded-2xl rounded-tl-sm px-5 py-4 inline-flex items-center gap-3">
                    <div className="flex items-center gap-1" aria-hidden="true">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#113826]/70 animate-bounce [animation-delay:-0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#113826]/70 animate-bounce [animation-delay:-0.1s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#113826]/70 animate-bounce" />
                    </div>
                    <span className="text-xs font-medium text-[#57534E]">
                      UMEED AI is thinking…
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Centered Prompt Input Box at the Bottom */}
        <div className="px-4 sm:px-8 pb-4 pt-3 bg-[#FBF9F5] border-t border-[#E7E0D2]/70 shrink-0">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitPrompt(inputValue);
              }}
              className="bg-white border border-[#D6CEBE] focus-within:border-[#113826] rounded-2xl px-4 py-2.5 flex items-end gap-3 transition-colors shadow-2xs"
            >
              <label htmlFor="umeed-ai-prompt" className="sr-only">
                Ask UMEED AI a question in English or Hindi
              </label>
              <textarea
                id="umeed-ai-prompt"
                ref={textareaRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask UMEED AI in English or हिन्दी…"
                className="flex-1 resize-none bg-transparent text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-none py-1.5 max-h-[150px] leading-relaxed"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isGenerating}
                aria-label="Send message"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#113826] text-[#FBF9F5] hover:bg-[#14532D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 shrink-0 cursor-pointer"
              >
                <SendHorizontal className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#78716C] px-1">
              <span>
                Verified founding info only · Donation collection is not active yet · Do not share
                sensitive personal details.
              </span>
              <span className="hidden sm:inline whitespace-nowrap">
                Enter to send · Shift+Enter for new line
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return chatInterfaceBody;
};
