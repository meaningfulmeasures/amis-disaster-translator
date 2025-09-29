// Enhanced Disaster Response Translation App - JavaScript
class DisasterTranslationApp {
    constructor() {
        // Enhanced app data based on provided JSON and community resources
        this.phraseData = {
            greeting: {
                amis: "ina, mamaan kita?",
                pronunciation: "ee-na, ma-ma-an KEE-ta",
                mandarin: "阿姨，我們哪裡不舒服呢？",
                english: "Auntie, where are we feeling unwell?",
                context: "接近可能身體不適的長者時的尊重問候。無論他們是否說中文都要使用 - 展現文化尊重與溫暖。",
                usage: "醫療檢查、初次接觸長者時",
                culturalNote: "使用'ina'(阿姨/媽媽)對阿美族長者女性表示尊重，無論血緣關係"
            },
            farewell: {
                amis: "Naonen han to. Pinaon to rakat.",
                pronunciation: "na-OH-nen han to. pee-NA-on to RA-kat",
                mandarin: "慢走，路上小心～",
                english: "Take care, be careful on the road",
                context: "當長者離開諮詢或庇護所時的溫暖告別。展現關懷與文化尊重。",
                usage: "醫療諮詢後、長者離開時",
                culturalNote: "適當的告別在阿美文化中很重要 - 匆忙離開可能顯得無禮"
            }
        };

        this.emergencyVocabulary = {
            masakit: {
                amis: "masakit",
                pronunciation: "ma-sa-KEET",
                mandarin: "痛",
                english: "pain/hurt",
                context: "描述疼痛或不適的基本詞彙",
                usage: "醫療評估時"
            },
            tabaki: {
                amis: "tabaki ko",
                pronunciation: "ta-BA-ki ko",
                mandarin: "幫助我",
                english: "help me",
                context: "請求協助",
                usage: "緊急求助時"
            },
            fangcalay: {
                amis: "fangcalay",
                pronunciation: "fang-cha-LAI",
                mandarin: "醫生",
                english: "doctor",
                context: "醫療專業人員",
                usage: "尋求醫療協助時"
            }
        };

        this.disasterVocabulary = {
            ranom: {
                amis: "ranom",
                pronunciation: "ra-NOM",
                mandarin: "水",
                english: "water",
                context: "災難中的水/洪水相關",
                usage: "描述水災情況"
            },
            ayaw: {
                amis: "ayaw kiso sakolayay",
                pronunciation: "ah-YAW kee-so sa-ko-LAI-ai",
                mandarin: "你要小心",
                english: "you be careful",
                context: "安全提醒",
                usage: "提醒安全注意事項"
            },
            kafana: {
                amis: "kafana'",
                pronunciation: "ka-fa-NA",
                mandarin: "食物",
                english: "food",
                context: "食物需求",
                usage: "提供或詢問食物"
            },
            fafoy: {
                amis: "fafoy",
                pronunciation: "fa-FOI",
                mandarin: "房子/住所",
                english: "house/shelter",
                context: "住所或庇護所",
                usage: "安排住宿時"
            }
        };

        // Enhanced translation dictionary
        this.translationDictionary = {
            "masakit": "我很痛",
            "tabaki ko": "請幫助我",
            "fangcalay": "醫生",
            "mafana' ako": "我餓了",
            "matektek ako": "我口渴",
            "ina": "阿姨/媽媽",
            "mama": "爸爸",
            "kita": "我們",
            "ranom": "水",
            "kafana'": "食物",
            "fafoy": "房子/住所",
            "ayaw kiso sakolayay": "你要小心",
            "nga'ay ho": "你好",
            "naonen han to": "慢走",
            "pinaon to rakat": "路上小心",
            "mamaan": "怎麼了"
        };

        // Community resources data
        this.communityResources = {
            contributors: [
                {
                    name: "都市美族生活日常｜amisitokay",
                    description: "創建了災難應變阿美語音檔，專為花蓮光復災情設計",
                    resource: "https://portaly.cc/amisitokay/pages/fataan",
                    type: "audio_recordings"
                },
                {
                    name: "langodlin",
                    description: "提供了額外的阿美語災難應變資源",
                    type: "additional_materials"
                }
            ],
            disasterContext: {
                event: "2025年9月花蓮光復溪水氾濫",
                affected_areas: ["花蓮光復", "馬太鞍溪", "Fata'an部落"],
                purpose: "協助志工與阿美族長者溝通"
            }
        };

        // Emergency contacts data
        this.emergencyContacts = {
            taiwan_emergency: {
                fire_medical: "119",
                police: "110", 
                disaster_hotline: "1991",
                coastal_guard: "118"
            },
            hualien_local: {
                hualien_fire_dept: "03-8227171",
                hualien_hospital: "03-8358141",
                guangfu_township: "03-8704058"
            }
        };

        // Cultural guidelines
        this.culturalGuidelines = [
            {
                title: "尊重的稱呼",
                content: "使用'ina'（阿姨/媽媽）對阿美族長者女性表示尊重，無論血緣關係"
            },
            {
                title: "包容性語言",
                content: "'kita'這個詞創造了即時的聯繫，顯示你關心這個人作為你社區的一部分"
            },
            {
                title: "溫暖的告別",
                content: "在阿美文化中，花時間適當告別很重要 - 匆忙離開可能顯得無禮"
            },
            {
                title: "災難應變溝通",
                content: "即使在緊急情況下，保持文化敏感性和尊重是建立信任的關鍵"
            }
        ];

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
        console.log('🚀 Initializing Disaster Response Translation App...');
        this.loadSettings();
        this.setupEventListeners();
        this.loadVoices();
        this.showScreen('mode-selection');
        console.log('✅ App initialization complete');
    }

    // Initialize Web Audio API for sound effects
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🔊 Audio context initialized');
        } catch (e) {
            console.log('❌ Web Audio API not supported');
        }
    }

    // Generate enhanced chime sound effects
    playChimeSound(frequency = 800, duration = 0.2, type = 'sine') {
        if (!this.settings.soundEnabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.log('Error playing sound:', e);
        }
    }

    // Play different sound patterns for different actions
    playWelcomeChime() {
        this.playChimeSound(600, 0.15);
        setTimeout(() => this.playChimeSound(800, 0.15), 150);
        setTimeout(() => this.playChimeSound(1000, 0.2), 300);
    }

    playSuccessChime() {
        this.playChimeSound(800, 0.1);
        setTimeout(() => this.playChimeSound(1000, 0.15), 100);
    }

    playErrorChime() {
        this.playChimeSound(400, 0.2, 'sawtooth');
    }

    // Add haptic feedback
    addHapticFeedback(pattern = [50]) {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    }

    // Load text-to-speech voices
    loadVoices() {
        const loadVoicesWhenAvailable = () => {
            this.voices = this.speechSynthesis.getVoices();
            if (this.voices.length > 0) {
                console.log('🎤 Voices loaded:', this.voices.length);
            }
        };

        loadVoicesWhenAvailable();
        if (this.speechSynthesis.onvoiceschanged !== undefined) {
            this.speechSynthesis.onvoiceschanged = loadVoicesWhenAvailable;
        }
    }

    // Enhanced text-to-speech function
    speakText(text, lang = 'zh-TW', rate = 0.8, pitch = 1.0) {
        if (!this.settings.soundEnabled) return;

        // Cancel any ongoing speech
        this.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = pitch;

        // Find appropriate voice
        const voice = this.voices.find(v => v.lang.includes(lang.split('-')[0]));
        if (voice) {
            utterance.voice = voice;
        }

        // Add event listeners for better UX
        utterance.onstart = () => {
            console.log('🗣️ Speech started:', text);
        };
        
        utterance.onend = () => {
            console.log('✅ Speech ended');
        };

        utterance.onerror = (event) => {
            console.log('❌ Speech error:', event.error);
        };

        this.speechSynthesis.speak(utterance);
    }

    // Setup all event listeners
    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');

        // Mode selection buttons
        const volunteerBtn = document.getElementById('volunteer-mode-btn');
        const elderBtn = document.getElementById('elder-mode-btn');
        const emergencyBtn = document.getElementById('emergency-contacts-btn');
        const culturalBtn = document.getElementById('cultural-guide-btn');

        if (volunteerBtn) {
            volunteerBtn.addEventListener('click', () => {
                console.log('📋 Volunteer mode selected');
                this.playChimeSound(900, 0.2, 'triangle');
                this.addHapticFeedback();
                this.showScreen('volunteer-mode');
            });
        }

        if (elderBtn) {
            elderBtn.addEventListener('click', () => {
                console.log('👵 Elder mode selected');
                this.playChimeSound(700, 0.2, 'sine');
                this.addHapticFeedback();
                this.showScreen('elder-mode');
            });
        }

        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', () => {
                console.log('🚨 Emergency contacts selected');
                this.playChimeSound(1000, 0.25, 'square');
                this.addHapticFeedback([100, 50, 100]);
                this.showScreen('emergency-contacts');
            });
        } else {
            console.error('❌ Emergency contacts button not found!');
        }

        if (culturalBtn) {
            culturalBtn.addEventListener('click', () => {
                console.log('🤝 Cultural guide selected');
                this.playChimeSound(850, 0.2, 'triangle');
                this.addHapticFeedback();
                this.showScreen('cultural-guide');
            });
        }

        // Back buttons
        this.setupBackButtons();

        // Audio buttons for phrases
        this.setupAudioButtons();

        // Elder mode functionality
        this.setupElderModeListeners();

        // Emergency contacts
        this.setupEmergencyContactListeners();

        // Settings
        this.setupSettingsListeners();

        // Keyboard navigation
        this.setupKeyboardNavigation();

        // Play welcome sound after everything is set up
        setTimeout(() => this.playWelcomeChime(), 500);
        console.log('✅ Event listeners setup complete');
    }

    // Setup back button listeners
    setupBackButtons() {
        const backButtons = [
            { id: 'back-from-volunteer', target: 'mode-selection' },
            { id: 'back-from-elder', target: 'mode-selection' },
            { id: 'back-from-emergency', target: 'mode-selection' },
            { id: 'back-from-cultural', target: 'mode-selection' }
        ];

        backButtons.forEach(({ id, target }) => {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', () => {
                    console.log(`🔙 Navigating back from ${id} to ${target}`);
                    this.playChimeSound(600, 0.15);
                    this.showScreen(target);
                });
            } else {
                console.warn(`⚠️ Back button ${id} not found`);
            }
        });
    }

    // Setup audio button listeners
    setupAudioButtons() {
        // Main phrase audio buttons
        document.querySelectorAll('.audio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playChimeSound(800, 0.15);
                this.addHapticFeedback();
                const phraseKey = e.target.dataset.phrase;
                if (phraseKey && this.phraseData[phraseKey]) {
                    console.log(`🔊 Playing phrase: ${phraseKey}`);
                    this.speakText(this.phraseData[phraseKey].amis, 'zh-TW', 0.6, 1.1);
                    this.showTooltip(e.target, `發音: ${this.phraseData[phraseKey].pronunciation}`, 3000);
                }
            });
        });

        // Mini audio buttons for disaster phrases
        document.querySelectorAll('.mini-audio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playChimeSound(750, 0.15);
                this.addHapticFeedback();
                const word = e.target.dataset.word;
                if (word && this.disasterVocabulary[word]) {
                    console.log(`🔊 Playing disaster vocab: ${word}`);
                    this.speakText(this.disasterVocabulary[word].amis, 'zh-TW', 0.7);
                    this.showTooltip(e.target, `${this.disasterVocabulary[word].pronunciation}`, 2000);
                }
            });
        });

        // Emergency vocabulary buttons
        document.querySelectorAll('.emergency-word-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playChimeSound(900, 0.2);
                this.addHapticFeedback([100, 30, 100]);
                const word = e.target.dataset.word;
                if (word && this.emergencyVocabulary[word]) {
                    console.log(`🚨 Playing emergency vocab: ${word}`);
                    this.speakText(this.emergencyVocabulary[word].amis, 'zh-TW', 0.7);
                    this.showTooltip(e.target, `發音: ${this.emergencyVocabulary[word].pronunciation}`, 2500);
                }
            });
        });
    }

    // Setup elder mode specific listeners
    setupElderModeListeners() {
        const micBtn = document.getElementById('mic-btn');
        const voiceFeedback = document.getElementById('voice-feedback');
        const amisInput = document.getElementById('amis-input');
        const translateBtn = document.getElementById('translate-btn');
        const translationOutput = document.getElementById('translation-output');

        if (micBtn && voiceFeedback) {
            micBtn.addEventListener('click', () => {
                console.log('🎤 Voice input activated');
                this.playChimeSound(1000, 0.3, 'triangle');
                this.addHapticFeedback([50, 50, 50]);
                this.simulateVoiceInput(voiceFeedback);
            });
        }

        if (translateBtn && amisInput && translationOutput) {
            translateBtn.addEventListener('click', () => {
                const text = amisInput.value.trim();
                if (text) {
                    console.log('🔄 Translating text:', text);
                    this.playChimeSound(800, 0.2);
                    this.addHapticFeedback();
                    this.translateText(text, translationOutput);
                } else {
                    this.playErrorChime();
                    this.showTooltip(translateBtn, '請先輸入文字 Please enter text first', 2000);
                }
            });

            // Enter key on textarea
            amisInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    translateBtn.click();
                }
            });
        }

        // Quick phrase buttons
        document.querySelectorAll('.phrase-quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playChimeSound(750, 0.15);
                this.addHapticFeedback();
                const amis = e.target.dataset.amis;
                const mandarin = e.target.dataset.mandarin;
                if (amis && mandarin && translationOutput) {
                    console.log('💬 Quick phrase selected:', amis);
                    this.displayTranslation(amis, mandarin, translationOutput);
                    this.speakText(mandarin, 'zh-TW');
                    this.playSuccessChime();
                }
            });
        });

        // Play translation audio
        const playTranslationBtn = document.getElementById('play-translation');
        if (playTranslationBtn) {
            playTranslationBtn.addEventListener('click', () => {
                this.playChimeSound(800, 0.15);
                const translatedTextEl = document.querySelector('.translated-text');
                if (translatedTextEl) {
                    const translatedText = translatedTextEl.textContent;
                    if (translatedText) {
                        const translation = translatedText.split('：').pop() || translatedText;
                        this.speakText(translation.trim(), 'zh-TW');
                    }
                }
            });
        }
    }

    // Setup emergency contact listeners
    setupEmergencyContactListeners() {
        console.log('🚨 Setting up emergency contact listeners...');
        document.querySelectorAll('.call-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('📞 Emergency call button clicked');
                this.playChimeSound(1200, 0.3, 'square');
                this.addHapticFeedback([200, 100, 200]);
                const number = e.target.dataset.number;
                if (number) {
                    this.makeEmergencyCall(number);
                }
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

        if (settingsBtn && settingsModal) {
            settingsBtn.addEventListener('click', () => {
                this.playChimeSound(700, 0.15);
                this.showModal(settingsModal);
            });
        }

        if (modalClose && settingsModal) {
            modalClose.addEventListener('click', () => {
                this.playChimeSound(600, 0.1);
                this.hideModal(settingsModal);
            });

            // Close modal on backdrop click
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    this.playChimeSound(600, 0.1);
                    this.hideModal(settingsModal);
                }
            });
        }

        // Settings changes
        if (textSizeSelect) {
            textSizeSelect.addEventListener('change', (e) => {
                this.playChimeSound(800, 0.1);
                this.changeTextSize(e.target.value);
            });
        }

        if (contrastSelect) {
            contrastSelect.addEventListener('change', (e) => {
                this.playChimeSound(800, 0.1);
                this.changeContrastMode(e.target.value);
            });
        }

        if (soundToggle) {
            soundToggle.addEventListener('change', (e) => {
                const enabled = e.target.value === 'on';
                this.settings.soundEnabled = enabled;
                this.saveSettings();
                if (enabled) {
                    this.playChimeSound(800, 0.15);
                }
            });
        }
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

            // Space key also activates buttons (accessibility)
            if (e.key === ' ') {
                const focused = document.activeElement;
                if (focused && focused.tagName === 'BUTTON') {
                    e.preventDefault();
                    focused.click();
                }
            }
        });
    }

    // Screen navigation
    showScreen(screenId) {
        console.log(`📱 Showing screen: ${screenId}`);
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            
            // Announce screen change for screen readers
            this.announceScreenChange(screenId);
            
            console.log(`✅ Screen ${screenId} is now active`);
        } else {
            console.error(`❌ Screen ${screenId} not found!`);
        }
    }

    // Announce screen changes for accessibility
    announceScreenChange(screenId) {
        const announcements = {
            'mode-selection': '主選單',
            'volunteer-mode': '志工模式',
            'elder-mode': '長者模式',
            'emergency-contacts': '緊急聯絡',
            'cultural-guide': '文化指導'
        };
        
        const announcement = announcements[screenId];
        if (announcement) {
            // Create temporary announcement for screen readers
            const announcer = document.createElement('div');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            announcer.textContent = `已切換至${announcement}畫面`;
            document.body.appendChild(announcer);
            
            setTimeout(() => {
                if (document.body.contains(announcer)) {
                    document.body.removeChild(announcer);
                }
            }, 1000);
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

    // Enhanced voice input simulation
    simulateVoiceInput(feedbackElement) {
        feedbackElement.classList.remove('hidden');
        feedbackElement.innerHTML = '<p style="color: var(--color-primary);">🎤 正在聆聽... Listening...</p>';

        // Simulate listening animation
        let dots = 0;
        const listeningInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            const dotString = '.'.repeat(dots);
            feedbackElement.innerHTML = `<p style="color: var(--color-primary);">🎤 正在聆聽${dotString} Listening${dotString}</p>`;
        }, 500);

        // Simulate listening for 3 seconds
        setTimeout(() => {
            clearInterval(listeningInterval);
            
            const samplePhrases = [
                { amis: "masakit", mandarin: "我很痛", context: "expressing pain" },
                { amis: "tabaki ko", mandarin: "請幫助我", context: "asking for help" },
                { amis: "mafana' ako", mandarin: "我餓了", context: "feeling hungry" },
                { amis: "matektek ako", mandarin: "我口渴", context: "feeling thirsty" },
                { amis: "fangcalay", mandarin: "醫生", context: "need doctor" }
            ];
            
            const randomPhrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
            
            feedbackElement.innerHTML = `
                <div style="color: var(--color-success); margin-bottom: var(--space-8);">
                    ✅ 聽到: "${randomPhrase.amis}"
                </div>
                <div style="color: var(--color-text); font-size: var(--font-size-base);">
                    翻譯: "${randomPhrase.mandarin}"
                </div>
                <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-top: var(--space-4);">
                    情境: ${randomPhrase.context}
                </div>
            `;

            // Show translation
            const translationOutput = document.getElementById('translation-output');
            if (translationOutput) {
                this.displayTranslation(randomPhrase.amis, randomPhrase.mandarin, translationOutput);
                this.speakText(randomPhrase.mandarin, 'zh-TW');
                this.playSuccessChime();
            }

            // Hide feedback after 4 seconds
            setTimeout(() => {
                feedbackElement.classList.add('hidden');
            }, 4000);
        }, 3000);
    }

    // Enhanced translation function
    translateText(amisText, outputElement) {
        const inputText = amisText.toLowerCase().trim();
        let translatedText = "";
        let confidence = 0;

        console.log(`🔄 Translating: "${inputText}"`);

        // Check for exact matches first
        if (this.translationDictionary[inputText]) {
            translatedText = this.translationDictionary[inputText];
            confidence = 100;
        } else {
            // Check for partial matches
            let bestMatch = "";
            let bestScore = 0;
            
            for (const [amis, mandarin] of Object.entries(this.translationDictionary)) {
                if (inputText.includes(amis) || amis.includes(inputText)) {
                    const score = this.calculateSimilarity(inputText, amis);
                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = mandarin;
                    }
                }
            }
            
            if (bestMatch) {
                translatedText = bestMatch;
                confidence = Math.round(bestScore * 100);
            } else {
                translatedText = `抱歉，無法翻譯 "${amisText}"。請嘗試其他詞彙或聯絡志工協助。`;
                confidence = 0;
            }
        }

        console.log(`✅ Translation result: "${translatedText}" (confidence: ${confidence}%)`);
        
        this.displayTranslation(amisText, translatedText, outputElement, confidence);
        
        if (confidence > 0) {
            this.speakText(translatedText, 'zh-TW');
            this.playSuccessChime();
        } else {
            this.playErrorChime();
        }
    }

    // Calculate text similarity for partial matches
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    // Levenshtein distance calculation
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    // Enhanced translation display
    displayTranslation(original, translated, outputElement, confidence = 100) {
        outputElement.classList.remove('hidden');
        const translatedTextEl = outputElement.querySelector('.translated-text');
        
        let confidenceIndicator = "";
        if (confidence < 100 && confidence > 0) {
            confidenceIndicator = `<div style="color: var(--color-warning); font-size: var(--font-size-sm); margin-top: var(--space-8);">
                信心度: ${confidence}% | Confidence: ${confidence}%
            </div>`;
        }
        
        translatedTextEl.innerHTML = `
            <div style="margin-bottom: var(--space-12); color: var(--color-text-secondary); font-size: var(--font-size-base); border-left: 3px solid var(--color-primary); padding-left: var(--space-12);">
                阿美語原文: "${original}"
            </div>
            <div style="color: var(--color-text); font-weight: var(--font-weight-semibold); font-size: var(--font-size-xl);">
                中文翻譯：${translated}
            </div>
            ${confidenceIndicator}
        `;
    }

    // Enhanced emergency call simulation
    makeEmergencyCall(number) {
        console.log(`📞 Emergency call requested for: ${number}`);
        
        // First confirmation
        const confirmMessage = `⚠️ 緊急通話確認 Emergency Call Confirmation\n\n確定要撥打 ${number} 嗎？\nAre you sure you want to call ${number}?\n\n這將嘗試撥打緊急電話。\nThis will attempt to make an emergency call.`;
        
        if (confirm(confirmMessage)) {
            // Show calling status
            this.showTooltip(event.target, `📞 正在撥打 ${number}...`, 3000);
            
            // Simulate dialing sounds
            this.playChimeSound(800, 0.1);
            setTimeout(() => this.playChimeSound(600, 0.1), 200);
            setTimeout(() => this.playChimeSound(800, 0.1), 400);
            
            // In a real app, this would use the tel: protocol
            setTimeout(() => {
                if (window.location.protocol === 'https:' || window.location.hostname === 'localhost') {
                    // Attempt to open tel: link
                    const telLink = document.createElement('a');
                    telLink.href = `tel:${number}`;
                    telLink.click();
                }
                
                // Show completion message
                alert(`📱 通話嘗試完成 Call Attempt Complete\n\n已嘗試撥打 ${number}\nCall attempt to ${number} completed\n\n如果無法撥通，請使用其他裝置撥打\nIf unable to connect, please use another device`);
                console.log(`✅ Emergency call attempt completed for ${number}`);
            }, 2000);
        }
    }

    // Enhanced tooltip system
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
            max-width: 300px;
            white-space: normal;
            line-height: 1.3;
        `;

        document.body.appendChild(tooltip);

        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        let top = rect.top - tooltipRect.height - 10;
        
        // Adjust if tooltip goes off screen
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }
        
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;

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
        
        console.log(`📝 Text size changed to: ${size}`);
        this.showTooltip(document.getElementById('text-size'), `文字大小已更改為: ${size}`, 1500);
    }

    changeContrastMode(mode) {
        if (mode === 'high-contrast') {
            document.body.classList.add('high-contrast');
            this.showTooltip(document.getElementById('contrast-mode'), '已啟用高對比模式', 1500);
            console.log('🎨 High contrast mode enabled');
        } else {
            document.body.classList.remove('high-contrast');
            this.showTooltip(document.getElementById('contrast-mode'), '已啟用標準對比模式', 1500);
            console.log('🎨 Standard contrast mode enabled');
        }
        this.settings.contrastMode = mode;
        this.saveSettings();
    }

    // Settings persistence (using sessionStorage as alternative to localStorage)
    saveSettings() {
        try {
            sessionStorage.setItem('disaster-app-settings', JSON.stringify(this.settings));
            console.log('💾 Settings saved');
        } catch (e) {
            console.log('❌ Could not save settings:', e);
        }
    }

    loadSettings() {
        try {
            const saved = sessionStorage.getItem('disaster-app-settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
                this.applySettings();
                console.log('📂 Settings loaded');
            }
        } catch (e) {
            console.log('❌ Could not load settings:', e);
        }
    }

    applySettings() {
        // Apply text size
        this.changeTextSize(this.settings.textSize);
        
        // Apply contrast mode
        this.changeContrastMode(this.settings.contrastMode);
        
        // Update form values
        const textSizeSelect = document.getElementById('text-size');
        const contrastSelect = document.getElementById('contrast-mode');
        const soundToggle = document.getElementById('sound-toggle');
        
        if (textSizeSelect) textSizeSelect.value = this.settings.textSize;
        if (contrastSelect) contrastSelect.value = this.settings.contrastMode;
        if (soundToggle) soundToggle.value = this.settings.soundEnabled ? 'on' : 'off';
    }

    // Community resources integration
    getCommunityResources() {
        return this.communityResources;
    }

    getCulturalGuidelines() {
        return this.culturalGuidelines;
    }

    getEmergencyContacts() {
        return this.emergencyContacts;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 災難應變翻譯助手載入中... Loading Disaster Response Translation App...');
    console.log('📅 Build date:', new Date().toISOString());
    window.disasterApp = new DisasterTranslationApp();
    console.log('✅ 應用程式已準備就緒 App ready to serve the community! 🤝');
});

// Service worker registration for offline capability
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swCode = `
            const CACHE_NAME = 'disaster-translation-v2';
            const urlsToCache = [
                '/',
                '/index.html',
                '/style.css',
                '/app.js'
            ];

            self.addEventListener('install', (event) => {
                console.log('Service Worker: Install');
                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            console.log('Service Worker: Caching files');
                            return cache.addAll(urlsToCache);
                        })
                );
            });

            self.addEventListener('fetch', (event) => {
                event.respondWith(
                    caches.match(event.request)
                        .then((response) => {
                            if (response) {
                                return response;
                            }
                            return fetch(event.request);
                        })
                );
            });
        `;

        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
            .then(() => console.log('✅ Service Worker registered for offline support'))
            .catch((error) => console.log('❌ Service Worker registration failed:', error));
    });
}

// Additional utility functions for enhanced UX
window.addEventListener('beforeunload', (e) => {
    if (window.disasterApp) {
        window.disasterApp.saveSettings();
    }
});

// Handle online/offline status with visual feedback
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    console.log('🌐 App is online');
    
    if (window.disasterApp && window.disasterApp.settings.soundEnabled) {
        window.disasterApp.playSuccessChime();
    }
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    console.log('📴 App is offline - using cached resources');
    
    if (window.disasterApp && window.disasterApp.settings.soundEnabled) {
        window.disasterApp.playErrorChime();
    }
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

// Add visual feedback for touch interactions
document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
        e.target.style.transform = 'scale(0.98)';
        e.target.style.opacity = '0.9';
    }
});

document.addEventListener('touchend', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
        setTimeout(() => {
            e.target.style.transform = '';
            e.target.style.opacity = '';
        }, 150);
    }
});

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('❌ App error:', e.error);
    if (window.disasterApp && window.disasterApp.settings.soundEnabled) {
        window.disasterApp.playErrorChime();
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ App loaded in ${Math.round(loadTime)}ms`);
});

console.log('📱 災難應變翻譯助手 Disaster Response Translation App v2.1 - Enhanced with debugging and improved Emergency Contacts! 🚨🤝');