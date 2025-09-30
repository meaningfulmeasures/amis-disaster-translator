// Emergency Resource App JavaScript

class EmergencyResourceApp {
    constructor() {
        this.audioContext = null;
        this.data = {
            emergencyContacts: {
                taiwan_national: [
                    {
                        service: "火警/救護車 Fire/Ambulance",
                        number: "119",
                        icon: "🚨",
                        description: "緊急醫療、火災、救護車 Emergency medical, fire, ambulance"
                    },
                    {
                        service: "警察 Police", 
                        number: "110",
                        icon: "👮",
                        description: "警察、治安、交通事故 Police, security, traffic accidents"
                    },
                    {
                        service: "災害應變 Disaster Response",
                        number: "1991", 
                        icon: "🌊",
                        description: "天然災害通報專線 Natural disaster reporting hotline"
                    },
                    {
                        service: "海巡署 Coast Guard",
                        number: "118",
                        icon: "⛵",
                        description: "海上救援、海巡 Marine rescue, coast guard"
                    }
                ],
                hualien_local: [
                    {
                        service: "花蓮縣消防局 Hualien Fire Department",
                        number: "03-8227171",
                        icon: "🚒",
                        description: "花蓮縣消防局總機"
                    },
                    {
                        service: "花蓮醫院 Hualien Hospital",
                        number: "03-8358141", 
                        icon: "🏥",
                        description: "花蓮醫院總機"
                    },
                    {
                        service: "光復鄉公所 Guangfu Township Office",
                        number: "03-8704058",
                        icon: "🏛️", 
                        description: "光復鄉公所"
                    },
                    {
                        service: "花蓮縣政府 Hualien County Government",
                        number: "03-8227171",
                        icon: "🏛️",
                        description: "花蓮縣政府災害應變中心"
                    }
                ]
            },
            communityResources: [
                {
                    title: "amisitokay 阿美語音檔",
                    description: "都市美族生活日常創建的災難應變阿美語音檔",
                    url: "https://portaly.cc/amisitokay/pages/fataan",
                    type: "audio_resources",
                    icon: "🎵",
                    note: "專業阿美語母語者製作的音檔資源"
                },
                {
                    title: "原住民族語言研究發展中心",
                    description: "官方原住民族語言資源",
                    url: "https://www.ilrdf.org.tw/",
                    type: "official_resources", 
                    icon: "🏛️",
                    note: "政府官方語言資源和認證翻譯"
                },
                {
                    title: "阿美語詞典",
                    description: "線上阿美語詞典查詢",
                    url: "https://e-dictionary.ilrdf.org.tw/singleSearch?tribeId=e68273b9-1f2b-4c42-8d95-f52189ab24b7&tribeName=%E9%98%BF%E7%BE%8E%E8%AA%9E",
                    type: "dictionary",
                    icon: "📚",
                    note: "官方認證的阿美語詞典"
                }
            ],
            contributors: [
                {
                    name: "都市美族生活日常｜amisitokay",
                    contribution: "創建災難應變阿美語音檔資源",
                    platform: "Instagram/Portaly"
                },
                {
                    name: "花蓮阿美族社群工作者",
                    contribution: "提供在地災難應變經驗和語言支援",
                    platform: "在地社群"
                }
            ]
        };

        this.init();
    }

    async init() {
        // Initialize audio context for sound effects
        await this.initAudioContext();
        
        // Populate dynamic content
        this.populateContacts();
        this.populateResources();
        this.populateContributors();
        
        // Add event listeners
        this.addEventListeners();
        
        // Add accessibility enhancements
        this.enhanceAccessibility();
        
        console.log('Emergency Resource App initialized');
    }

    async initAudioContext() {
        try {
            // Create audio context for sound effects
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume audio context on first user interaction
            document.addEventListener('click', () => {
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume();
                }
            }, { once: true });
            
        } catch (error) {
            console.log('Audio context not supported:', error);
        }
    }

    populateContacts() {
        // Populate national emergency contacts
        const nationalContainer = document.getElementById('national-contacts');
        if (nationalContainer) {
            this.data.emergencyContacts.taiwan_national.forEach(contact => {
                const contactElement = this.createContactElement(contact);
                nationalContainer.appendChild(contactElement);
            });
        }

        // Populate local emergency contacts
        const localContainer = document.getElementById('local-contacts');
        if (localContainer) {
            this.data.emergencyContacts.hualien_local.forEach(contact => {
                const contactElement = this.createContactElement(contact);
                localContainer.appendChild(contactElement);
            });
        }
    }

    createContactElement(contact) {
        const element = document.createElement('a');
        element.className = 'contact';
        element.href = `tel:${contact.number}`;
        element.setAttribute('aria-label', `撥打 ${contact.service} ${contact.number}`);
        element.setAttribute('role', 'button');
        
        element.innerHTML = `
            <div class="contact__icon" aria-hidden="true">${contact.icon}</div>
            <div class="contact__info">
                <div class="contact__service">${contact.service}</div>
                <div class="contact__number">${contact.number}</div>
                <p class="contact__description">${contact.description}</p>
            </div>
        `;

        // Add click handler for sound and vibration
        element.addEventListener('click', (e) => {
            this.handleContactClick(e, contact);
        });

        return element;
    }

    populateResources() {
        const container = document.getElementById('community-resources');
        if (!container) return;

        this.data.communityResources.forEach(resource => {
            const element = this.createResourceElement(resource);
            container.appendChild(element);
        });
    }

    createResourceElement(resource) {
        const element = document.createElement('a');
        element.className = 'resource';
        element.href = resource.url;
        element.target = '_blank';
        element.rel = 'noopener noreferrer';
        element.setAttribute('aria-label', `前往 ${resource.title}`);
        
        element.innerHTML = `
            <div class="resource__header">
                <div class="resource__icon" aria-hidden="true">${resource.icon}</div>
                <h3 class="resource__title">${resource.title}</h3>
            </div>
            <p class="resource__description">${resource.description}</p>
            <p class="resource__note">${resource.note}</p>
        `;

        // Add click handler for sound and vibration
        element.addEventListener('click', (e) => {
            this.handleResourceClick(e, resource);
        });

        return element;
    }

    populateContributors() {
        const container = document.getElementById('contributors-list');
        if (!container) return;

        this.data.contributors.forEach(contributor => {
            const element = this.createContributorElement(contributor);
            container.appendChild(element);
        });
    }

    createContributorElement(contributor) {
        const element = document.createElement('div');
        element.className = 'contributor';
        
        element.innerHTML = `
            <div class="contributor__name">${contributor.name}</div>
            <div class="contributor__contribution">${contributor.contribution}</div>
            <div class="contributor__platform">${contributor.platform}</div>
        `;

        return element;
    }

    addEventListeners() {
        // Add event listeners for emergency buttons
        const emergency119 = document.getElementById('emergency-119');
        const emergency110 = document.getElementById('emergency-110');
        
        if (emergency119) {
            emergency119.addEventListener('click', (e) => {
                this.handleEmergencyCall(e, '119', '火警/救護車');
            });
        }
        
        if (emergency110) {
            emergency110.addEventListener('click', (e) => {
                this.handleEmergencyCall(e, '110', '警察');
            });
        }

        // Add keyboard navigation for emergency buttons
        [emergency119, emergency110].forEach(btn => {
            if (btn) {
                btn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        btn.click();
                    }
                });
            }
        });
    }

    handleContactClick(event, contact) {
        // Play sound effect
        this.playClickSound();
        
        // Trigger vibration
        this.triggerVibration([100, 50, 100]);
        
        // Add visual feedback
        this.addVisualFeedback(event.currentTarget);
        
        // Log for debugging
        console.log(`Calling ${contact.service}: ${contact.number}`);
        
        // Allow default tel: link behavior
        return true;
    }

    handleResourceClick(event, resource) {
        // Play sound effect
        this.playClickSound();
        
        // Trigger vibration
        this.triggerVibration([50]);
        
        // Add visual feedback
        this.addVisualFeedback(event.currentTarget);
        
        // Log for debugging
        console.log(`Opening resource: ${resource.title}`);
        
        // Allow default link behavior
        return true;
    }

    handleEmergencyCall(event, number, service) {
        // Play emergency sound effect
        this.playEmergencySound();
        
        // Trigger strong vibration
        this.triggerVibration([200, 100, 200, 100, 200]);
        
        // Add visual feedback
        this.addVisualFeedback(event.currentTarget);
        
        // Log for debugging
        console.log(`Emergency call to ${service}: ${number}`);
        
        // Allow default tel: link behavior
        return true;
    }

    playClickSound() {
        if (!this.audioContext) return;
        
        try {
            // Create a gentle click sound
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (error) {
            console.log('Sound playback failed:', error);
        }
    }

    playEmergencySound() {
        if (!this.audioContext) return;
        
        try {
            // Create a more prominent emergency sound
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        } catch (error) {
            console.log('Emergency sound playback failed:', error);
        }
    }

    triggerVibration(pattern) {
        if ('vibrate' in navigator) {
            try {
                navigator.vibrate(pattern);
            } catch (error) {
                console.log('Vibration failed:', error);
            }
        }
    }

    addVisualFeedback(element) {
        element.classList.add('loading');
        setTimeout(() => {
            element.classList.remove('loading');
        }, 300);
    }

    enhanceAccessibility() {
        // Add skip link for keyboard navigation
        this.addSkipLink();
        
        // Enhance focus management
        this.enhanceFocusManagement();
        
        // Add ARIA live regions for dynamic content
        this.addAriaLiveRegions();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = '跳到主要內容 Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: var(--color-white);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceFocusManagement() {
        // Add focus trapping for modal-like sections
        const contacts = document.querySelectorAll('.contact, .resource, .btn--emergency');
        
        contacts.forEach((element, index) => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' && contacts[index + 1]) {
                    e.preventDefault();
                    contacts[index + 1].focus();
                } else if (e.key === 'ArrowUp' && contacts[index - 1]) {
                    e.preventDefault();
                    contacts[index - 1].focus();
                }
            });
        });
    }

    addAriaLiveRegions() {
        // Add live region for status announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'status-announcements';
        document.body.appendChild(liveRegion);
        
        // Announce when emergency numbers are accessed
        document.querySelectorAll('a[href^="tel:"]').forEach(telLink => {
            telLink.addEventListener('focus', () => {
                const number = telLink.href.replace('tel:', '');
                const service = telLink.querySelector('.contact__service')?.textContent || '';
                this.announceStatus(`準備撥打 ${service} ${number}`);
            });
        });
    }

    announceStatus(message) {
        const liveRegion = document.getElementById('status-announcements');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Utility method for handling offline scenarios
    handleOfflineState() {
        const isOnline = navigator.onLine;
        
        if (!isOnline) {
            this.announceStatus('目前離線，緊急聯絡功能仍可使用');
        }
        
        window.addEventListener('online', () => {
            this.announceStatus('網路連線已恢復');
        });
        
        window.addEventListener('offline', () => {
            this.announceStatus('網路連線中斷，緊急聯絡功能仍可使用');
        });
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new EmergencyResourceApp();
    
    // Handle offline state
    app.handleOfflineState();
    
    // Make app instance available globally for debugging
    window.EmergencyApp = app;
});

// Service worker registration for offline functionality (basic implementation)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Basic service worker for caching static assets
        const swContent = `
            const CACHE_NAME = 'emergency-resources-v1';
            const urlsToCache = [
                '/',
                '/style.css',
                '/app.js'
            ];

            self.addEventListener('install', event => {
                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then(cache => cache.addAll(urlsToCache))
                );
            });

            self.addEventListener('fetch', event => {
                event.respondWith(
                    caches.match(event.request)
                        .then(response => {
                            if (response) {
                                return response;
                            }
                            return fetch(event.request);
                        })
                );
            });
        `;
        
        const blob = new Blob([swContent], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
