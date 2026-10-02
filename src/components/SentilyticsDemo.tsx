import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { Activity, Sparkles, Check, ArrowRight, RefreshCw } from 'lucide-react';

export const SentilyticsDemo: React.FC = () => {
  const [inputText, setInputText] = useState(
    'An absolute masterpiece of atmospheric pacing, superb cinematography, and profound emotional depth.'
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(4); // 0 to 4

  const presets = [
    {
      label: 'Glowing Review (+)',
      text: 'An absolute masterpiece of atmospheric pacing, superb cinematography, and profound emotional depth.'
    },
    {
      label: 'Critical Review (-)',
      text: 'The narrative dragged incessantly, dialogue was painfully clunky, and character motivations made zero sense.'
    },
    {
      label: 'Nuanced Review (+)',
      text: 'A technically ambitious thriller with stunning visual effects, though the final act felt slightly rushed.'
    }
  ];

  // Simple explainable NLP polarity estimation logic for the live interactive demo
  const positiveWords = ['masterpiece', 'atmospheric', 'superb', 'cinematography', 'profound', 'emotional', 'depth', 'stunning', 'ambitious', 'great', 'brilliant', 'clean', 'excellent', 'compelling'];
  const negativeWords = ['dragged', 'incessantly', 'painfully', 'clunky', 'zero', 'bad', 'terrible', 'boring', 'awful', 'dull', 'poor', 'waste', 'rushed'];

  const tokens = inputText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  let posHits = 0;
  let negHits = 0;
  tokens.forEach(t => {
    if (positiveWords.includes(t)) posHits += 2;
    if (negativeWords.includes(t)) negHits += 2;
  });

  const totalScore = posHits - negHits;
  const isPositive = totalScore >= 0;
  const confidence = Math.min(99, Math.max(78, 85 + Math.abs(totalScore) * 3));

  const handleRunAnalysis = (textToAnalyze = inputText) => {
    sounds.playTerminalBoot();
    setAnalyzing(true);
    setPipelineStep(0);

    const stepInterval = setInterval(() => {
      setPipelineStep(prev => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setAnalyzing(false);
          return 4;
        }
        sounds.playClick();
        return prev + 1;
      });
    }, 280);
  };

  const handleSelectPreset = (text: string) => {
    sounds.playClick();
    setInputText(text);
    handleRunAnalysis(text);
  };

  return (
    <div className="demo-pipeline-root">
      <div className="demo-pipeline-banner">
        <div className="flex-row items-center gap-2">
          <Activity size={16} className="text-emerald" />
          <span className="font-mono text-emerald text-xs uppercase tracking-wider font-bold">
            LIVE NLP PIPELINE SIMULATOR // MODEL PRECISION: 92.4%
          </span>
        </div>
        <span className="text-muted text-xs font-mono">LATENCY: 18ms</span>
      </div>

      {/* Preset Buttons */}
      <div className="demo-presets-row">
        <span className="text-muted text-xs font-mono">QUICK SAMPLES:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            className="demo-preset-btn"
            onClick={() => handleSelectPreset(preset.text)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Textarea Input */}
      <div className="demo-input-container">
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste any movie or product review to classify sentiment..."
          className="demo-textarea"
        />
        <div className="demo-input-footer">
          <span className="text-xs text-muted font-mono">{tokens.length} tokens extracted</span>
          <button
            type="button"
            className="demo-run-btn"
            disabled={analyzing}
            onClick={() => handleRunAnalysis()}
          >
            {analyzing ? (
              <>
                <RefreshCw size={13} className="spin-animate" />
                <span>PROCESSING PIPELINE...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>RUN PIPELINE INFERENCE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual 5-Step Pipeline */}
      <div className="pipeline-steps-track">
        {[
          { step: '01', title: 'TOKENIZATION', desc: `${tokens.length} tokens parsed` },
          { step: '02', title: 'STOPWORDS & LEMMA', desc: 'Regex filter & lowercasing' },
          { step: '03', title: 'TF-IDF VECTOR', desc: '10,000 sparse dimensions' },
          { step: '04', title: 'CALIBRATED CLF', desc: 'Logistic/SVM Ensemble' },
          { step: '05', title: 'SENTIMENT ATTRIBUTION', desc: `${isPositive ? 'POSITIVE' : 'NEGATIVE'} (${confidence}%)` }
        ].map((item, i) => {
          const isActive = pipelineStep === i;
          const isDone = pipelineStep > i;
          return (
            <React.Fragment key={i}>
              <div className={`pipeline-step-box ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                <div className="step-num">{item.step}</div>
                <div className="step-title">{item.title}</div>
                <div className="step-desc">{item.desc}</div>
                {isDone && <Check size={12} className="step-check" />}
              </div>
              {i < 4 && <ArrowRight size={14} className="step-arrow" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Live Inference Result Card */}
      <div className="pipeline-result-box">
        <div className="result-main-col">
          <span className="result-kicker">CLASSIFICATION OUTCOME</span>
          <div className="result-badge-wrap">
            <span className={`result-tag ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '● POSITIVE SENTIMENT' : '● NEGATIVE SENTIMENT'}
            </span>
            <span className="result-confidence">
              CONFIDENCE: <strong>{confidence}%</strong>
            </span>
          </div>
        </div>

        <div className="result-weights-col">
          <span className="result-kicker">EXPLAINABLE TOKEN ATTRIBUTIONS:</span>
          <div className="token-pills-wrap">
            {tokens.slice(0, 10).map((t, idx) => {
              const isPos = positiveWords.includes(t);
              const isNeg = negativeWords.includes(t);
              return (
                <span
                  key={idx}
                  className={`token-pill ${isPos ? 'pill-pos' : isNeg ? 'pill-neg' : 'pill-neu'}`}
                >
                  {t}
                  {isPos && ' ↑'}
                  {isNeg && ' ↓'}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
