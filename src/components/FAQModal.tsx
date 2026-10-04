import React, { useState } from 'react';
import { HelpCircle, X, ChevronDown, ChevronUp, Search, Send } from 'lucide-react';
import { FAQ_DATA, type FAQItem } from '../data/faqData';
import { sounds } from '../audio/soundEffects';

interface Props {
  onClose: () => void;
  onOpenContact: () => void;
}

export const FAQModal: React.FC<Props> = ({ onClose, onOpenContact }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<'all' | 'agentic_ai' | 'full_stack' | 'collaboration' | 'tech_stack'>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'agentic-vs-standard': true,
    'availability-roles': true
  });

  const toggleItem = (id: string) => {
    sounds.playClick();
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = FAQ_DATA.filter(item => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const matchesSearch = !searchTerm ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel faq-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-modal-title"
      >
        <div className="modal-header">
          <div className="flex-row items-center gap-3">
            <HelpCircle size={20} className="text-cyan" />
            <div>
              <span className="modal-kicker font-mono text-cyan">KNOWLEDGE BASE // FREQUENTLY ASKED QUESTIONS</span>
              <h2 id="faq-modal-title" className="modal-title font-mono">
                ENGINEERING &amp; HIRING FAQ
              </h2>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close FAQ"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="faq-controls-bar">
          <div className="faq-search-wrap">
            <Search size={15} className="faq-search-icon text-muted" />
            <input
              type="text"
              placeholder="Search questions by keyword or technology (e.g. LangGraph, hiring, latency)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="faq-search-input font-mono"
            />
          </div>

          <div className="faq-categories-row font-mono">
            {[
              { id: 'all', label: 'ALL INQUIRIES' },
              { id: 'agentic_ai', label: '🧠 AGENTIC AI' },
              { id: 'tech_stack', label: '⚡ TECH STACK' },
              { id: 'collaboration', label: '💼 HIRING & ROLES' },
              { id: 'full_stack', label: '💻 FULL-STACK' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`faq-cat-btn ${selectedCat === cat.id ? 'active' : ''}`}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCat(cat.id as any);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List Body */}
        <div className="modal-body faq-modal-body">
          {filteredItems.length === 0 ? (
            <div className="faq-empty-state">
              <p className="text-muted font-mono text-sm">
                No matching telemetry entries found for "{searchTerm}".
              </p>
              <button
                type="button"
                className="btn-modal-action btn-secondary mt-3"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCat('all');
                }}
              >
                CLEAR FILTER CRITERIA
              </button>
            </div>
          ) : (
            <div className="faq-accordion-list">
              {filteredItems.map((item: FAQItem) => {
                const isOpen = Boolean(openIds[item.id]);
                return (
                  <div key={item.id} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn font-mono"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className="faq-q-text">{item.question}</span>
                      <span className="faq-toggle-icon">
                        {isOpen ? <ChevronUp size={16} className="text-cyan" /> : <ChevronDown size={16} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div id={`faq-answer-${item.id}`} className="faq-answer-pane">
                        <p className="faq-a-text font-sans">{item.answer}</p>
                        <div className="faq-tags-row font-mono">
                          {item.tags.map((t, idx) => (
                            <span key={idx} className="badge-tag text-xs">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Clear CTA */}
        <div className="modal-footer">
          <div className="footer-left-info">
            <span className="text-xs text-muted font-mono">STILL HAVE UNRESOLVED QUESTIONS?</span>
          </div>

          <button
            type="button"
            className="btn-modal-action btn-accent"
            onClick={() => {
              sounds.playClick();
              onClose();
              onOpenContact();
            }}
          >
            <Send size={14} />
            <span>TRANSMIT DIRECT INQUIRY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
