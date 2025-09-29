// Disaster Response Translation App - JavaScript
class DisasterTranslationApp {
    constructor() {
        // App data based on provided JSON
        this.phraseData = {
            greeting: {
                amis: "ina, mamaan kita?",
                pronunciation: "ee-na, ma-ma-an KEE-ta",
                mandarin: "阿姨，我們哪裡不舒服呢？",
                english: "Auntie, where are we feeling unwell?",
                context: "接近可能身體不適的長者時的尊重問候。無論他們是否說中文都要使用 - 展現文化尊重與溫暖。"
            },
            farewell: {
                amis: "Naonen han to. Pinaon to rakat.",
                pronunciation: "na-OH-nen han to. pee-NA-on to RA-kat",
                mandarin: "慢走，路上小心～",
                english: "Take care, be careful on the road",
                context: "當長者離開諮詢或庇護所時的溫暖告別。展現關懷與文化尊重。"
            }
        };

        this.emergencyVocabulary = {
            masakit: {
                amis: "masakit",
                pronunciation: "ma-sa-KEET",
                mandarin: "痛",
                english: "pain/hurt"
            },
            tabaki: {
                amis: "tabaki ko",
                pronunciation: "ta-BA-ki ko",
                mandarin: "幫助我",
                english: "help me"
            },
            fangcalay: {
                amis: "fangcalay",
                pronunciation: "fang-cha-LAI",
                mandarin: "醫生",
                english: "doctor"
            }
        };

        // Settings
        this.settings = {
            textSize: 'medium',
            contrastMode: 'standard',
            soundEnabled: true
        };

        // Audio context for sound effects
        this.audioContext = null;
        this.initAudio();

        // Speech synthesis
        this.speechSynthesis = window.speechSynthesis;
        this.voices = [];

        // Initialize the app
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.loadVoices();
        this.showScreen('mode-selection');
    }

    // Initialize Web Audio API for sound effects
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    // Generate soft chime sound effect
    playChimeSound(frequency = 800, duration = 0.2) {
        if (!this.settings.soundEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.log('Error playing sound:', e);
        }
    }

    // Add haptic feedback
    addHapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    // Load text-to-speech voices
    loadVoices() {
        const loadVoicesWhenAvailable = () => {
            this.voices = this.speechSynthesis.getVoices();
            if (this.voices.length > 0) {
                console.log('Voices loaded:', this.voices.length);
            }
        };

        loadVoicesWhenAvailable();
        if (this.speechSynthesis.onvoiceschanged !== undefined) {
            this.speechSynthesis.onvoiceschanged = loadVoicesWhenAvailable;
        }
    }

    // Text-to-speech function
    speakText(text, lang = 'zh-TW') {
        if (!this.settings.soundEnabled) return;

        // Cancel any ongoing speech
        this.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.8;
        utterance.pitch = 1.0;

        // Find appropriate voice
        const voice = this.voices.find(v => v.lang.includes(lang.split('-')[0]));
        if (voice) {
            utterance.voice = voice;
        }

        this.speechSynthesis.speak(utterance);
    }

    // Setup all event listeners
    setupEventListeners() {
        // Mode selection buttons
        document.getElementById('volunteer-mode-btn').addEventListener('click', () => {
            this.playChimeSound(900);
            this.addHapticFeedback();
            this.showScreen('volunteer-mode');
        });

        document.getElementById('elder-mode-btn').addEventListener('click', () => {
            this.playChimeSound(700);
            this.addHapticFeedback();
            this.showScreen('elder-mode');
        });

        document.getElementById('emergency-contacts-btn').addEventListener('click', () => {
            this.playChimeSound(1000);
            this.addHapticFeedback();
            this.showScreen('emergency-contacts');
        });

        // Back buttons
        document.getElementById('back-from-volunteer').addEventListener('click', () => {
            this.playChimeSound(600);
            this.showScreen('mode-selection');
        });

        document.getElementById('back-from-elder').addEventListener('click', () => {
            this.playChimeSound(600);
            this.showScreen('mode-selection');
        });

        document.getElementById('back-from-emergency').addEventListener('click', () => {
            this.playChimeSound(600);
            this.showScreen('mode-selection');
        });

        // Audio buttons for phrases
        document.querySelectorAll('.audio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playChimeSound(800);
                this.addHapticFeedback();
                const phraseKey = e.target.dataset.phrase;
                if (phraseKey && this.phraseData[phraseKey]) {
                    this.speakText(this.phraseData[phraseKey].amis, 'zh-TW');
                }
            });
        });

        // Emergency vocabulary buttons
        document.querySelectorAll('.emergency-word-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playChimeSound(900);
                this.addHapticFeedback();
                const word = e.target.dataset.word;
                if (word && this.emergencyVocabulary[word]) {
                    this.speakText(this.emergencyVocabulary[word].amis, 'zh-TW');
                    this.showTooltip(e.target, `${this.emergencyVocabulary[word].pronunciation}`);
                }
            });
        });

        // Elder mode functionality
        this.setupElderModeListeners();

        // Emergency contacts
        this.setupEmergencyContactListeners();

        // Settings
        this.setupSettingsListeners();

        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    // Setup elder mode specific listeners
    setupElderModeListeners() {
        const micBtn = document.getElementById('mic-btn');
        const voiceFeedback = document.getElementById('voice-feedback');
        const amisInput = document.getElementById('amis-input');
        const translateBtn = document.getElementById('translate-btn');
        const translationOutput = document.getElementById('translation-output');

        // Microphone button (simulated)
        micBtn.addEventListener('click', () => {
            this.playChimeSound(1000);
            this.addHapticFeedback();
            this.simulateVoiceInput(voiceFeedback);
        });

        // Translate button
        translateBtn.addEventListener('click', () => {
            this.playChimeSound(800);
            this.addHapticFeedback();
            const text = amisInput.value.trim();
            if (text) {
                this.translateText(text, translationOutput);
            }
        });

        // Quick phrase buttons
        document.querySelectorAll('.phrase-quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playChimeSound(750);
                this.addHapticFeedback();
                const amis = e.target.dataset.amis;
                const mandarin = e.target.dataset.mandarin;
                if (amis && mandarin) {
                    this.displayTranslation(amis, mandarin, translationOutput);
                    this.speakText(mandarin, 'zh-TW');
                }
            });
        });

        // Play translation audio
        document.getElementById('play-translation').addEventListener('click', () => {
            this.playChimeSound(800);
            const translatedText = document.querySelector('.translated-text').textContent;
            if (translatedText) {
                this.speakText(translatedText, 'zh-TW');
            }
        });
    }

    // Setup emergency contact listeners
    setupEmergencyContactListeners() {
        document.querySelectorAll('.call-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playChimeSound(1200);
                this.addHapticFeedback();
                const number = e.target.dataset.number;
                this.makeEmergencyCall(number);
            });
        });
    }

    // Setup settings modal listeners
    setupSettingsListeners() {
        const settingsBtn = document.getElementById('settings-btn');
        const settingsModal = document.getElementById('settings-modal');
        const modalClose = document.querySelector('.modal-close');
        const textSizeSelect = document.getElementById('text-size');
        const contrastSelect = document.getElementById('contrast-mode');
        const soundToggle = document.getElementById('sound-toggle');

        settingsBtn.addEventListener('click', () => {
            this.playChimeSound(700);
            this.showModal(settingsModal);
        });

        modalClose.addEventListener('click', () => {
            this.playChimeSound(600);
            this.hideModal(settingsModal);
        });

        // Close modal on backdrop click
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                this.playChimeSound(600);
                this.hideModal(settingsModal);
            }
        });

        // Settings changes
        textSizeSelect.addEventListener('change', (e) => {
            this.playChimeSound(800);
            this.changeTextSize(e.target.value);
        });

        contrastSelect.addEventListener('change', (e) => {
            this.playChimeSound(800);
            this.changeContrastMode(e.target.value);
        });

        soundToggle.addEventListener('change', (e) => {
            const enabled = e.target.value === 'on';
            this.settings.soundEnabled = enabled;
            this.saveSettings();
            if (enabled) {
                this.playChimeSound(800);
            }
        });
    }

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes modals
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal:not(.hidden)');
                if (modal) {
                    this.hideModal(modal);
                }
            }

            // Enter key activates focused button
            if (e.key === 'Enter') {
                const focused = document.activeElement;
                if (focused && (focused.tagName === 'BUTTON' || focused.getAttribute('role') === 'button')) {
                    focused.click();
                }
            }
        });
    }

    // Screen navigation
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    // Modal functions
    showModal(modal) {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        // Focus first focusable element
        const firstFocusable = modal.querySelector('button, input, select, textarea');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }

    hideModal(modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
    }

    // Simulate voice input (since real speech recognition requires server setup)
    simulateVoiceInput(feedbackElement) {
        feedbackElement.classList.remove('hidden');
        feedbackElement.innerHTML = '<p>正在聆聽... Listening...</p>';

        // Simulate listening for 3 seconds
        setTimeout(() => {
            const samplePhrases = [
                { amis: "masakit", mandarin: "我很痛" },
                { amis: "tabaki ko", mandarin: "請幫助我" },
                { amis: "mafana' ako", mandarin: "我餓了" }
            ];
            
            const randomPhrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
            
            feedbackElement.innerHTML = `
                <p style="color: var(--color-success)">聽到: "${randomPhrase.amis}"</p>
                <p>翻譯: "${randomPhrase.mandarin}"</p>
            `;

            // Show translation
            const translationOutput = document.getElementById('translation-output');
            this.displayTranslation(randomPhrase.amis, randomPhrase.mandarin, translationOutput);
            this.speakText(randomPhrase.mandarin, 'zh-TW');

            // Hide feedback after 3 more seconds
            setTimeout(() => {
                feedbackElement.classList.add('hidden');
            }, 3000);
        }, 2000);
    }

    // Translate text (simplified simulation)
    translateText(amisText, outputElement) {
        // Simple translation mapping
        const translations = {
            "masakit": "我很痛",
            "tabaki ko": "請幫助我",
            "fangcalay": "醫生",
            "mafana' ako": "我餓了",
            "matektek": "我口渴",
            "ina": "阿姨/媽媽",
            "mama": "爸爸",
            "kita": "我們"
        };

        let translatedText = translations[amisText.toLowerCase()] || `"${amisText}" 的翻譯`;
        
        // Check for partial matches
        for (const [amis, mandarin] of Object.entries(translations)) {
            if (amisText.toLowerCase().includes(amis)) {
                translatedText = mandarin;
                break;
            }
        }

        this.displayTranslation(amisText, translatedText, outputElement);
        this.speakText(translatedText, 'zh-TW');
    }

    // Display translation result
    displayTranslation(original, translated, outputElement) {
        outputElement.classList.remove('hidden');
        const translatedTextEl = outputElement.querySelector('.translated-text');
        translatedTextEl.innerHTML = `
            <div style="margin-bottom: var(--space-8); color: var(--color-text-secondary); font-size: var(--font-size-base);">
                原文: "${original}"
            </div>
            <div style="color: var(--color-text); font-weight: var(--font-weight-semibold);">
                ${translated}
            </div>
        `;
    }

    // Emergency call simulation
    makeEmergencyCall(number) {
        if (confirm(`確定要撥打 ${number} 嗎？\nAre you sure you want to call ${number}?`)) {
            // In a real app, this would use tel: protocol
            // For demo, we'll show a message
            this.showTooltip(event.target, `正在撥打 ${number}...`, 2000);
            
            // Simulate call attempt
            setTimeout(() => {
                alert(`已嘗試撥打 ${number}\nCall attempt to ${number} completed`);
            }, 1000);
        }
    }

    // Show tooltip
    showTooltip(element, text, duration = 1500) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--color-slate-900);
            color: var(--color-white);
            padding: var(--space-8) var(--space-12);
            border-radius: var(--radius-base);
            font-size: var(--font-size-sm);
            white-space: nowrap;
            z-index: 1001;
            pointer-events: none;
            opacity: 0;
            transition: opacity var(--duration-fast) var(--ease-standard);
        `;

        document.body.appendChild(tooltip);

        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.transform = 'translateX(-50%)';

        // Show tooltip
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);

        // Hide and remove tooltip
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 150);
        }, duration);
    }

    // Settings functions
    changeTextSize(size) {
        document.body.className = document.body.className.replace(/text-\w+/g, '');
        document.body.classList.add(`text-${size}`);
        this.settings.textSize = size;
        this.saveSettings();
    }

    changeContrastMode(mode) {
        if (mode === 'high-contrast') {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
        this.settings.contrastMode = mode;
        this.saveSettings();
    }

    // Settings persistence (using sessionStorage as alternative to localStorage)
    saveSettings() {
        try {
            sessionStorage.setItem('disaster-app-settings', JSON.stringify(this.settings));
        } catch (e) {
            console.log('Could not save settings');
        }
    }

    loadSettings() {
        try {
            const saved = sessionStorage.getItem('disaster-app-settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
                this.applySettings();
            }
        } catch (e) {
            console.log('Could not load settings');
        }
    }

    applySettings() {
        // Apply text size
        this.changeTextSize(this.settings.textSize);
        
        // Apply contrast mode
        this.changeContrastMode(this.settings.contrastMode);
        
        // Update form values
        document.getElementById('text-size').value = this.settings.textSize;
        document.getElementById('contrast-mode').value = this.settings.contrastMode;
        document.getElementById('sound-toggle').value = this.settings.soundEnabled ? 'on' : 'off';
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.disasterApp = new DisasterTranslationApp();
});

// Service worker registration for offline capability (basic implementation)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Create a simple service worker inline for basic caching
        const swCode = `
            const CACHE_NAME = 'disaster-translation-v1';
            const urlsToCache = [
                '/',
                '/index.html',
                '/style.css',
                '/app.js'
            ];

            self.addEventListener('install', (event) => {
                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then((cache) => cache.addAll(urlsToCache))
                );
            });

            self.addEventListener('fetch', (event) => {
                event.respondWith(
                    caches.match(event.request)
                        .then((response) => {
                            return response || fetch(event.request);
                        })
                );
            });
        `;

        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
            .then(() => console.log('Service Worker registered'))
            .catch((error) => console.log('Service Worker registration failed:', error));
    });
}

// Additional utility functions for better UX
window.addEventListener('beforeunload', (e) => {
    // Save any pending data before page unload
    if (window.disasterApp) {
        window.disasterApp.saveSettings();
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    console.log('App is online');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    console.log('App is offline');
});

// Prevent zoom on double tap for better mobile UX
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);