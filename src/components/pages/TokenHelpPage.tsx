export function TokenHelpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-[600px] w-full fade-in">
        <h1 className="retro-title text-sm sm:text-lg mb-6 sm:mb-8 animate-glow text-center">
          HOW TO GET YOUR CANVAS TOKEN
        </h1>

        <div className="space-y-4 sm:space-y-6">
          {/* Step 1 */}
          <div className="retro-card">
            <div className="flex items-center gap-3">
              <span className="retro-label text-[10px] sm:text-xs shrink-0">01</span>
              <p className="retro-text text-[9px] sm:text-[11px] leading-relaxed">
                Log in to your <span className="text-[var(--text-gold)]">Canvas</span> account
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="retro-card">
            <div className="flex items-start gap-3 mb-3">
              <span className="retro-label text-[10px] sm:text-xs shrink-0">02</span>
              <p className="retro-text text-[9px] sm:text-[11px] leading-relaxed">
                Click the <span className="text-[var(--text-gold)]">Account</span> menu (your profile icon), then click <span className="text-[var(--text-gold)]">Settings</span>
              </p>
            </div>
            <img 
              src="/step2.png" 
              alt="Click account menu then settings" 
              className="w-full rounded border-2 border-[var(--bg-light)] mt-2"
              style={{ imageRendering: 'auto' }}
            />
          </div>

          {/* Step 3 */}
          <div className="retro-card">
            <div className="flex items-start gap-3 mb-3">
              <span className="retro-label text-[10px] sm:text-xs shrink-0">03</span>
              <p className="retro-text text-[9px] sm:text-[11px] leading-relaxed">
                Scroll down until you see the <span className="text-[var(--text-gold)]">+ New Access Token</span> button
              </p>
            </div>
            <img 
              src="/step3.png" 
              alt="New access token button location" 
              className="w-full rounded border-2 border-[var(--bg-light)] mt-2"
              style={{ imageRendering: 'auto' }}
            />
          </div>

          {/* Step 4 */}
          <div className="retro-card">
            <div className="flex items-start gap-3 mb-3">
              <span className="retro-label text-[10px] sm:text-xs shrink-0">04</span>
              <p className="retro-text text-[9px] sm:text-[11px] leading-relaxed">
                Click the button, fill in the details (purpose can be anything), and click <span className="text-[var(--text-gold)]">Generate Token</span>
              </p>
            </div>
            <img 
              src="/step4.png" 
              alt="Generate token dialog" 
              className="w-full rounded border-2 border-[var(--bg-light)] mt-2"
              style={{ imageRendering: 'auto' }}
            />
          </div>

          {/* Step 5 */}
          <div className="retro-card">
            <div className="flex items-start gap-3">
              <span className="retro-label text-[10px] sm:text-xs shrink-0">05</span>
              <p className="retro-text text-[9px] sm:text-[11px] leading-relaxed">
                Copy the <span className="text-[var(--text-gold)]">token</span> displayed on the screen — that's your token!
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <a
            href="/"
            className="retro-button inline-block mt-6"
          >
            ← BACK
          </a>
        </div>
      </div>
    </div>
  )
}

