// ReviewAnalyzer Pro - Main JavaScript File

// Global variables
let currentAnalysisData = null;

// Initialize the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeAnimations();
        initializeInteractions();
        initializeParallax();
    });
} else {
    // DOM already loaded
    initializeAnimations();
    initializeInteractions();
    initializeParallax();
}

// Initialize animations
function initializeAnimations() {
    // Typed.js for hero text
    const typed = new Typed('#typed-text', {
        strings: [
            'Yorumlarını Analiz Edin',
            'Müşteri Geri Bildirimlerini',
            'Marka İtibarınızı Ölçün',
            'Rekabet Analizi Yapın'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Animate feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutQuart',
                    delay: anime.stagger(200)
                });
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });

    // Animate how-it-works section
    const howItWorksSteps = document.querySelectorAll('#how-it-works .grid > div');
    howItWorksSteps.forEach((step, index) => {
        observer.observe(step);
    });
}

// Initialize interactions
function initializeInteractions() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const urlInput = document.getElementById('url-input');
    const sampleUrls = document.querySelectorAll('.sample-url');

    // Analyze button click
    analyzeBtn.addEventListener('click', handleAnalyze);

    // URL input enter key
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAnalyze();
        }
    });

    // Sample URL clicks
    sampleUrls.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = btn.getAttribute('data-url');
            urlInput.value = url;
            handleAnalyze();
        });
    });

    // URL input validation
    urlInput.addEventListener('input', validateURL);
}

// Handle analyze button click
async function handleAnalyze() {
    const urlInput = document.getElementById('url-input');
    const url = urlInput.value.trim();

    if (!url) {
        showNotification('Lütfen bir URL girin', 'error');
        return;
    }

    if (!isValidURL(url)) {
        showNotification('Lütfen geçerli bir URL girin', 'error');
        return;
    }

    // Show progress
    showProgress();
    
    try {
        // Simulate analysis process
        await simulateAnalysis(url);
        
        // Generate and store analysis data
        currentAnalysisData = generateMockAnalysisData(url);
        
        // Store data in localStorage for the analysis page
        localStorage.setItem('analysisData', JSON.stringify(currentAnalysisData));
        
        // Wait for progress to complete
        setTimeout(() => {
            // Redirect to analysis page
            window.location.href = 'analysis.html';
        }, 2000);
        
    } catch (error) {
        console.error('Analysis error:', error);
        hideProgress();
        showNotification('Analiz sırasında bir hata oluştu', 'error');
    }
}

// Validate URL
function validateURL() {
    const urlInput = document.getElementById('url-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const url = urlInput.value.trim();

    if (isValidURL(url)) {
        urlInput.classList.remove('border-red-500');
        urlInput.classList.add('border-green-500');
        analyzeBtn.disabled = false;
        analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else if (url) {
        urlInput.classList.remove('border-green-500');
        urlInput.classList.add('border-red-500');
        analyzeBtn.disabled = true;
        analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        urlInput.classList.remove('border-red-500', 'border-green-500');
        analyzeBtn.disabled = false;
        analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Check if URL is valid
function isValidURL(string) {
    try {
        new URL(string);
        return string.includes('.');
    } catch (_) {
        return false;
    }
}

// Show progress overlay
function showProgress() {
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progressPercent = document.getElementById('progress-percent');

    // Ensure the element exists before trying to show it
    if (!progressContainer) {
        console.error('Progress container not found');
        return;
    }

    // Show progress container
    progressContainer.style.display = 'flex';
    progressContainer.style.opacity = '1';
    
    // Reset progress bar
    progressBar.style.width = '0%';
    
    // Animate progress bar
    const steps = [
        { percent: 15, text: 'URL kontrol ediliyor...', delay: 800 },
        { percent: 35, text: 'Yorum platformları taranıyor...', delay: 1200 },
        { percent: 55, text: 'Yorumlar analiz ediliyor...', delay: 1500 },
        { percent: 75, text: 'Duygu analizi yapılıyor...', delay: 1000 },
        { percent: 90, text: 'Rapor hazırlanıyor...', delay: 800 },
        { percent: 100, text: 'Analiz tamamlandı!', delay: 600 }
    ];

    let currentStep = 0;
    
    function updateProgress() {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            
            // Use CSS transition for better reliability
            progressBar.style.transition = `width ${step.delay}ms ease-in-out`;
            progressBar.style.width = step.percent + '%';
            
            progressText.textContent = step.text;
            progressPercent.textContent = step.percent + '%';
            
            currentStep++;
            
            if (currentStep < steps.length) {
                setTimeout(updateProgress, step.delay);
            }
        }
    }
    
    updateProgress();
}

// Hide progress overlay
function hideProgress() {
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.style.display = 'none';
        progressContainer.style.opacity = '0';
    }
}

// Simulate analysis process
function simulateAnalysis(url) {
    return new Promise((resolve) => {
        // Simulate API call delay
        setTimeout(() => {
            resolve({ success: true, url: url });
        }, 5000);
    });
}

// Generate mock analysis data
function generateMockAnalysisData(url) {
    const domain = new URL(url).hostname.replace('www.', '');
    
    return {
        url: url,
        domain: domain,
        analysisDate: new Date().toISOString(),
        totalComments: Math.floor(Math.random() * 2000) + 500,
        positiveComments: Math.floor(Math.random() * 1000) + 300,
        neutralComments: Math.floor(Math.random() * 300) + 100,
        negativeComments: Math.floor(Math.random() * 200) + 50,
        suspiciousComments: Math.floor(Math.random() * 50) + 5,
        overallRating: (Math.random() * 2 + 3).toFixed(1),
        keyTopics: [
            { topic: 'Müşteri Hizmetleri', count: 156, sentiment: 'positive' },
            { topic: 'Ürün Kalitesi', count: 134, sentiment: 'positive' },
            { topic: 'Kargo Süresi', count: 89, sentiment: 'negative' },
            { topic: 'Fiyat Performans', count: 67, sentiment: 'neutral' },
            { topic: 'Paketleme', count: 45, sentiment: 'positive' }
        ],
        mostPositiveComment: {
            text: "Harika bir deneyim oldu! Ürün tam olarak tarif edildiği gibiydi ve kargo çok hızlı geldi. Müşteri hizmetleri de çok ilgiliydi. Kesinlikle tekrar alışveriş yapacağım.",
            rating: 5,
            platform: 'Google Reviews',
            date: '2024-01-15'
        },
        mostNegativeComment: {
            text: "Ürün 1 hafta geç geldi ve kutusu ezikti. Müşteri hizmetleriyle iletişim kurmak çok zordu. Bu kadar kötü bir deneyim beklemiyordum.",
            rating: 1,
            platform: 'Trustpilot',
            date: '2024-01-10'
        },
        suspiciousComment: {
            text: "Çok güzel ürün herkese tavsiye ederim süper kalite harika işçilik mükemmel paketleme.",
            reason: 'Aşırı olumlu ifadeler ve tekrarlayan kelimeler',
            confidence: 85
        }
    };
}

// Initialize parallax effect
function initializeParallax() {
    const parallaxLayer = document.getElementById('parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = scrolled * 0.5;
        
        if (parallaxLayer) {
            parallaxLayer.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'error' ? 'bg-red-600 text-white' : 
        type === 'success' ? 'bg-green-600 text-white' : 
        'bg-blue-600 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle mobile menu toggle
const mobileMenuButton = document.querySelector('.md\\:hidden button');
if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        showNotification('Mobil menü özelliği yakında eklenecek!', 'info');
    });
}

// Handle free trial button
document.querySelector('.btn-primary').addEventListener('click', (e) => {
    if (e.target.textContent.includes('Ücretsiz Dene')) {
        e.preventDefault();
        showNotification('Ücretsiz deneme özelliği yakında aktif olacak!', 'info');
    }
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-slate-900/95');
        nav.classList.remove('bg-slate-900/80');
    } else {
        nav.classList.add('bg-slate-900/80');
        nav.classList.remove('bg-slate-900/95');
    }
});

// Export functions for global access
window.ReviewAnalyzer = {
    analyzeURL: handleAnalyze,
  