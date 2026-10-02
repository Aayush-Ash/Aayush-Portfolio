import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types/chat';
import { QUICK_PROMPTS, queryWorkshopAI } from '../data/knowledgeBase';
import { sounds } from '../audio/soundEffects';
import { Bot, Send, Sparkles, X, Minimize2, Radio, Terminal } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTeleport: (zoneId: string) => void;
  onOpenProject: (projectId: string) => void;
  onOpenAbout: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onSwitchToExecutive: () => void;
}

export const CompanionDroneModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onTeleport,
  onOpenProject,
  onOpenAbout,
  onOpenResume,
  onOpenContact,
  onSwitchToExecutive
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'ai',
      text: `Greetings! I am the **WORKSHOP AI** companion. 

I have direct access to Aayush's portfolio knowledge graph, agentic architectures, and codebase specifications.

How can I assist your tour of the lab today?`,
      timestamp: 'NOW',
      actionButtons: [
        { label: '🧠 SHOW AI PROJECTS', action: 'open_project', payload: 'ai-research-agent' },
        { label: '💻 SHOW FULL-STACK', action: 'open_project', payload: 'sakurakeys' },
        { label: '📊 SHOW DATA CORE', action: 'open_project', payload: 'sentilytics-pro' },
        { label: '⚡ ABOUT AAYUSH', action: 'open_about' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend = inputValue) => {
    if (!textToSend.trim()) return;

    sounds.playClick();
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate agentic retrieval latency
    setTimeout(() => {
      sounds.playInteract();
      const aiReply = queryWorkshopAI(textToSend);
      setMessages(prev => [...prev, aiReply]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action: string, payload?: string) => {
    sounds.playClick();
    switch (action) {
      case 'teleport':
        if (payload) onTeleport(payload);
        onClose();
        break;
      case 'open_project':
        if (payload) onOpenProject(payload);
        onClose();
        break;
      case 'open_about':
        onOpenAbout();
        onClose();
        break;
      case 'open_resume':
        onOpenResume();
        onClose();
        break;
      case 'open_contact':
        onOpenContact();
        onClose();
        break;
      case 'switch_to_executive':
        onSwitchToExecutive();
        onClose();
        break;
      default:
        break;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-panel companion-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Companion Header */}
        <div className="modal-header companion-header">
          <div className="flex-row items-center gap-3">
            <div className="drone-avatar-pulse">
              <Bot size={20} className="text-cyan" />
              <div className="drone-ping-ring" />
            </div>
            <div>
              <div className="flex-row items-center gap-2">
                <h2 className="modal-title font-mono text-cyan">WORKSHOP AI // COMPANION</h2>
                <span className="drone-status-tag">● ONLINE</span>
              </div>
              <span className="text-xs text-muted font-mono">PORTFOLIO KNOWLEDGE RETRIEVER v2.4</span>
            </div>
          </div>

          <div className="flex-row items-center gap-2">
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              title="Close Drone Interface"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Quick Prompts Bar */}
        <div className="companion-quick-bar">
          {QUICK_PROMPTS.map(qp => (
            <button
              key={qp.id}
              type="button"
              className="companion-chip-btn"
              onClick={() => handleSendMessage(qp.prompt)}
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Chat History Messages */}
        <div className="companion-chat-stream">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}>
              <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                <div className="chat-bubble-header">
                  <span className="sender-tag font-mono">{msg.sender === 'user' ? 'GUEST // VISITOR' : 'WORKSHOP AI'}</span>
                  <span className="time-tag font-mono">{msg.timestamp}</span>
                </div>
                <div className="chat-text-body font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>

                {/* Render inline action buttons */}
                {msg.actionButtons && msg.actionButtons.length > 0 && (
                  <div className="chat-actions-container">
                    {msg.actionButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="chat-action-btn"
                        onClick={() => handleActionClick(btn.action, btn.payload)}
                      >
                        <Sparkles size={12} className="text-cyan" />
                        <span>{btn.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message-row ai-row">
              <div className="chat-bubble ai-bubble typing-bubble">
                <span className="typing-dots font-mono text-xs text-cyan">
                  CONSULTING AGENT MEMORY GRAPH...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="companion-input-area">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="companion-form"
          >
            <div className="companion-input-wrap">
              <Terminal size={15} className="text-muted input-term-icon" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything about Aayush's agentic systems, stack, or teleport to a room..."
                className="companion-text-input font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="companion-send-btn"
              title="Send Query"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
