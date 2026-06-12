document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // Sticky Header
    // ==========================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // ==========================================
    // Intersection Observer for Scroll Animations
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a counter, trigger count up
                if (entry.target.querySelector('.count-up')) {
                    startCounter(entry.target.querySelector('.count-up'));
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.staggered-reveal').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // Number Count Up Animation
    // ==========================================
    function startCounter(element) {
        if(element.classList.contains('counted')) return;
        element.classList.add('counted');
        
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        
        const timer = setInterval(() => {
            current += 1;
            element.innerText = current;
            if (current >= target) {
                clearInterval(timer);
                element.innerText = target;
            }
        }, stepTime);
    }

    // ==========================================
    // Portfolio Filtering
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // FAQ Accordion
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open if it wasn't open
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });



    // ==========================================
    // Before/After Slider Logic
    // ==========================================
    const baSliderInputs = document.querySelectorAll('.ba-slider-input');
    
    baSliderInputs.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const container = e.target.parentElement;
            const beforeImg = container.querySelector('.ba-before');
            const handle = container.querySelector('.ba-slider-handle');
            
            const value = e.target.value;
            beforeImg.style.width = `${value}%`;
            handle.style.left = `${value}%`;
        });
    });
    // ==========================================
    // Premium Before/After Slider Logic (Physics-based)
    // ==========================================
    const premiumSliders = document.querySelectorAll('.premium-ba-slider');
    
    premiumSliders.forEach(slider => {
        const input = slider.querySelector('.ba-slider-range');
        let targetPos = 50;
        let currentPos = 50;
        let isAnimating = false;
        
        input.addEventListener('input', (e) => {
            targetPos = parseFloat(e.target.value);
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(renderLoop);
            }
        });

        // Easing function for smooth physics
        const renderLoop = () => {
            currentPos += (targetPos - currentPos) * 0.15; // Smooth easing coefficient
            slider.style.setProperty('--pos', `${currentPos}%`);
            
            // Continue loop if not settled
            if (Math.abs(targetPos - currentPos) > 0.05) {
                requestAnimationFrame(renderLoop);
            } else {
                currentPos = targetPos;
                slider.style.setProperty('--pos', `${currentPos}%`);
                isAnimating = false;
            }
        };
    });
});
