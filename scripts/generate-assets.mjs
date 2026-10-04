import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateAssets() {
  const publicDir = path.resolve('public');
  const faviconSvg = fs.readFileSync(path.join(publicDir, 'favicon.svg'));

  // 1. Generate favicon 32x32
  await sharp(faviconSvg)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Generated favicon-32x32.png');

  // 2. Generate apple-touch-icon 180x180
  await sharp(faviconSvg)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png');

  // 3. Generate OG image (1200x630) as high-res SVG rendered to PNG
  const ogSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#080A0F"/>
        <stop offset="50%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#080A0F"/>
      </linearGradient>
      <linearGradient id="cyanText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#00D2FF"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)"/>

    <!-- Subtle Grid Lines -->
    <g stroke="#1E293B" stroke-width="1" opacity="0.4">
      <line x1="0" y1="105" x2="1200" y2="105"/>
      <line x1="0" y1="210" x2="1200" y2="210"/>
      <line x1="0" y1="315" x2="1200" y2="315"/>
      <line x1="0" y1="420" x2="1200" y2="420"/>
      <line x1="0" y1="525" x2="1200" y2="525"/>
      <line x1="200" y1="0" x2="200" y2="630"/>
      <line x1="400" y1="0" x2="400" y2="630"/>
      <line x1="600" y1="0" x2="600" y2="630"/>
      <line x1="800" y1="0" x2="800" y2="630"/>
      <line x1="1000" y1="0" x2="1000" y2="630"/>
    </g>

    <!-- Outer Frame Accent -->
    <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="#1E293B" stroke-width="2"/>
    <rect x="24" y="24" width="120" height="2" fill="#00D2FF"/>
    <rect x="1056" y="604" width="120" height="2" fill="#00D2FF"/>

    <!-- Top Telemetry Status -->
    <rect x="60" y="60" width="360" height="38" rx="8" fill="#131A26" stroke="#1E293B" stroke-width="1"/>
    <circle cx="82" cy="79" r="5" fill="#10B981" filter="url(#glow)"/>
    <text x="98" y="84" font-family="monospace" font-size="13" font-weight="bold" fill="#00D2FF" letter-spacing="1.5">FACILITY 01 // SYSTEM READY</text>

    <text x="1140" y="84" text-anchor="end" font-family="monospace" font-size="13" fill="#64748B" letter-spacing="1.5">LATENCY: 12ms // ALL ZONES ONLINE</text>

    <!-- Main Title -->
    <text x="60" y="195" font-family="monospace" font-size="64" font-weight="bold" fill="#FFFFFF" letter-spacing="3">AAYUSH KUMAR</text>
    
    <!-- Subtitle Role -->
    <text x="60" y="250" font-family="sans-serif" font-size="28" font-weight="600" fill="url(#cyanText)">
      Agentic AI Developer &amp; Full-Stack Systems Architect
    </text>

    <text x="60" y="295" font-family="sans-serif" font-size="18" fill="#94A3B8">
      Architecting autonomous multi-agent reasoning DAGs, LangGraph workflows, and high-frequency web platforms.
    </text>

    <!-- Tech Skill Badges -->
    <g transform="translate(60, 335)">
      <!-- Badge 1 -->
      <rect x="0" y="0" width="220" height="36" rx="6" fill="#131A26" stroke="#00D2FF" stroke-width="1"/>
      <text x="110" y="23" text-anchor="middle" font-family="monospace" font-size="13" fill="#00D2FF">🧠 LangGraph &amp; Multi-Agent</text>

      <!-- Badge 2 -->
      <rect x="235" y="0" width="230" height="36" rx="6" fill="#131A26" stroke="#1E293B" stroke-width="1"/>
      <text x="350" y="23" text-anchor="middle" font-family="monospace" font-size="13" fill="#F1F5F9">⚡ Zero-Hallucination DAGs</text>

      <!-- Badge 3 -->
      <rect x="480" y="0" width="200" height="36" rx="6" fill="#131A26" stroke="#1E293B" stroke-width="1"/>
      <text x="580" y="23" text-anchor="middle" font-family="monospace" font-size="13" fill="#F1F5F9">💻 React 19 &amp; TypeScript</text>

      <!-- Badge 4 -->
      <rect x="695" y="0" width="210" height="36" rx="6" fill="#131A26" stroke="#1E293B" stroke-width="1"/>
      <text x="800" y="23" text-anchor="middle" font-family="monospace" font-size="13" fill="#F1F5F9">🚀 FastAPI, Redis &amp; Docker</text>
    </g>

    <!-- Stat Metrics Footer Row -->
    <g transform="translate(60, 420)">
      <rect x="0" y="0" width="1080" height="130" rx="12" fill="#0B0F17" stroke="#1E293B" stroke-width="1"/>
      
      <!-- Stat 1 -->
      <text x="50" y="55" font-family="monospace" font-size="34" font-weight="bold" fill="#00D2FF">6+ Systems</text>
      <text x="50" y="90" font-family="monospace" font-size="13" fill="#64748B">PRODUCTION MODELS &amp; AGENTS</text>

      <!-- Separator -->
      <line x1="310" y1="25" x2="310" y2="105" stroke="#1E293B" stroke-width="1"/>

      <!-- Stat 2 -->
      <text x="360" y="55" font-family="monospace" font-size="34" font-weight="bold" fill="#00D2FF">&lt; 25ms</text>
      <text x="360" y="90" font-family="monospace" font-size="13" fill="#64748B">FASTEST API P99 LATENCY</text>

      <!-- Separator -->
      <line x1="620" y1="25" x2="620" y2="105" stroke="#1E293B" stroke-width="1"/>

      <!-- Stat 3 -->
      <text x="670" y="55" font-family="monospace" font-size="34" font-weight="bold" fill="#00D2FF">92.4%</text>
      <text x="670" y="90" font-family="monospace" font-size="13" fill="#64748B">NLP PRECISION BENCHMARK</text>

      <!-- Separator -->
      <line x1="910" y1="25" x2="910" y2="105" stroke="#1E293B" stroke-width="1"/>

      <!-- Stat 4 -->
      <text x="940" y="55" font-family="monospace" font-size="28" font-weight="bold" fill="#10B981">● ACTIVE</text>
      <text x="940" y="90" font-family="monospace" font-size="13" fill="#64748B">READY TO DEPLOY</text>
    </g>

    <!-- Visual Reactor Core Icon on the right side of hero -->
    <g transform="translate(1010, 220)">
      <circle cx="0" cy="0" r="70" fill="none" stroke="#1E293B" stroke-width="2" stroke-dasharray="8 6"/>
      <circle cx="0" cy="0" r="50" fill="none" stroke="#00D2FF" stroke-width="4" filter="url(#glow)"/>
      <circle cx="0" cy="0" r="22" fill="#080A0F" stroke="#00D2FF" stroke-width="3"/>
      <circle cx="0" cy="0" r="10" fill="#00D2FF" filter="url(#glow)"/>
      <circle cx="0" cy="-50" r="6" fill="#00D2FF" filter="url(#glow)"/>
      <circle cx="0" cy="50" r="6" fill="#00D2FF" filter="url(#glow)"/>
      <circle cx="-50" cy="0" r="6" fill="#00D2FF" filter="url(#glow)"/>
      <circle cx="50" cy="0" r="6" fill="#00D2FF" filter="url(#glow)"/>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Generated og-image.png');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
