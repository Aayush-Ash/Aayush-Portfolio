import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../audio/soundEffects';
import { Keyboard, Zap, Volume2, RotateCcw, Trophy, CheckCircle2 } from 'lucide-react';

export const SakuraKeysDemo: React.FC = () => {
  const samplePhrase = "agentic artificial intelligence requires systems that plan, act, reflect, and self-correct with precision.";
  
  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [isFinished, setIsFinished] = useState(false);
  const [switchProfile, setSwitchProfile] = useState<'Cherry MX Blue' | 'Cherry MX Red' | 'Holy Panda'>('Holy Panda');
  const [lastKeyPressed, setLastKeyPressed] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    sounds.playClick();
    setInputVal('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setLastKeyPressed('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSwitchChange = (profile: 'Cherry MX Blue' | 'Cherry MX Red' | 'Holy Panda') => {
    sounds.playKeypress();
    setSwitchProfile(profile);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const now = Date.now();

    // Start timer on first keystroke
    if (!startTime && val.length > 0) {
      setStartTime(now);
    }

    // Play tactile mechanical switch acoustic
    sounds.playKeypress();
    const lastChar = val[val.length - 1] || '';
    setLastKeyPressed(lastChar.toUpperCase() || 'SPACE');

    setInputVal(val);

    // Calculate real-time stats
    if (startTime) {
      const elapsedMinutes = (now - startTime) / 60000;
      if (elapsedMinutes > 0) {
        const wordsTyped = val.trim().split(/\s+/).length;
        const currentWpm = Math.round(wordsTyped / elapsedMinutes);
        setWpm(Math.min(currentWpm, 220));
      }
    }

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === samplePhrase[i]) {
        correctChars++;
      }
    }
    const currentAccuracy = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setAccuracy(currentAccuracy);

    // Check completion
    if (val === samplePhrase) {
      setIsFinished(true);
      sounds.playInteract();
    }
  };

  // Keyboard mock layout keys for visual representation
  const homeRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];

  return (
    <div className="sakura-demo-root">
      {/* Sound & Switch Bar */}
      <div className="sakura-header-bar">
        <div className="sakura-title-col">
          <div className="flex-row items-center gap-2">
            <Keyboard size={16} className="text-pink-400" />
            <span className="font-mono text-pink-400 font-bold text-xs uppercase tracking-wider">
              SAKURAKEYS // SUB-MILLISECOND TYPING TEST ENGINE
            </span>
          </div>
          <span className="text-muted text-xs font-mono">ACOUSTIC SYNTHESIS: ACTIVE</span>
        </div>

        <div className="switch-selector-row">
          <span className="text-xs text-muted font-mono flex-row items-center gap-1">
            <Volume2 size={12} /> SWITCH:
          </span>
          {(['Holy Panda', 'Cherry MX Blue', 'Cherry MX Red'] as const).map(sw => (
            <button
              key={sw}
              type="button"
              className={`switch-badge-btn ${switchProfile === sw ? 'active' : ''}`}
              onClick={() => handleSwitchChange(sw)}
            >
              {sw}
            </button>
          ))}
        </div>
      </div>

      {/* Target Phrase Box */}
      <div className="sakura-phrase-card">
        <div className="sakura-phrase-header">
          <span className="text-xs font-mono text-muted">TARGET PHRASE:</span>
          {lastKeyPressed && (
            <span className="key-indicator-pill">
              KEY: <strong>{lastKeyPressed}</strong>
            </span>
          )}
        </div>
        <div className="sakura-char-stream">
          {samplePhrase.split('').map((char, index) => {
            let status = 'pending';
            if (index < inputVal.length) {
              status = inputVal[index] === char ? 'correct' : 'incorrect';
            }
            const isCursor = index === inputVal.length;
            return (
              <span
                key={index}
                className={`sakura-char ${status} ${isCursor ? 'cursor-char' : ''}`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Input box */}
      <div className="sakura-input-wrap">
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder="Type the phrase above to test keystroke acoustics & WPM..."
          className="sakura-input-field font-mono"
          autoFocus
        />
        <button
          type="button"
          className="sakura-reset-btn"
          onClick={handleReset}
          title="Restart Test"
        >
          <RotateCcw size={14} />
          <span>RESET</span>
        </button>
      </div>

      {/* Real-time Telemetry Stats */}
      <div className="sakura-stats-grid">
        <div className="sakura-stat-box">
          <span className="stat-label">SPEED</span>
          <span className="stat-num text-cyan">{wpm}</span>
          <span className="stat-unit">WORDS / MIN</span>
        </div>
        <div className="sakura-stat-box">
          <span className="stat-label">ACCURACY</span>
          <span className={`stat-num ${accuracy < 90 ? 'text-amber-400' : 'text-emerald'}`}>
            {accuracy}%
          </span>
          <span className="stat-unit">PRECISION</span>
        </div>
        <div className="sakura-stat-box">
          <span className="stat-label">LATENCY</span>
          <span className="stat-num text-pink-400">&lt; 3.8ms</span>
          <span className="stat-unit">INPUT POLLING</span>
        </div>
        <div className="sakura-stat-box">
          <span className="stat-label">ACOUSTICS</span>
          <span className="stat-num text-amber-300">THOCK</span>
          <span className="stat-unit">{switchProfile}</span>
        </div>
      </div>

      {/* Visual Keyboard Matrix simulation */}
      <div className="sakura-key-matrix">
        {homeRowKeys.map(k => {
          const isPressed = lastKeyPressed === k;
          return (
            <div key={k} className={`mini-key-cap ${isPressed ? 'pressed' : ''}`}>
              {k}
            </div>
          );
        })}
      </div>

      {isFinished && (
        <div className="sakura-finish-banner">
          <CheckCircle2 size={16} className="text-emerald" />
          <span>TEST COMPLETED! Final Speed: <strong>{wpm} WPM</strong> with <strong>{accuracy}%</strong> accuracy. Leaderboard rank: Top 5%.</span>
        </div>
      )}
    </div>
  );
};
