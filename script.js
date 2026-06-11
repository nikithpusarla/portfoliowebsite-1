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
    // Leaflet Map Initialization
    // ==========================================
    // Ensure Leaflet is loaded
    if (typeof L !== 'undefined') {
        // Knoxville coordinates
        const knoxvilleCoords = [35.9606, -83.9207];
        
        const map = L.map('map', {
            zoomControl: false,
            scrollWheelZoom: false
        }).setView(knoxvilleCoords, 10);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);

        // Custom icon for the marker
        const customIcon = L.divIcon({
            className: 'custom-map-marker',
            html: '<i class="fa-solid fa-location-dot" style="color: #D4AF37; font-size: 2.5rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));"></i>',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        // Add main marker
        L.marker(knoxvilleCoords, { icon: customIcon })
            .addTo(map)
            .bindPopup('<b>Alpha Concepts Roofing</b><br>Serving Knoxville & Surrounding Areas')
            .openPopup();
            
        // Draw a circle to show service area (approx 30 miles)
        L.circle(knoxvilleCoords, {
            color: '#0F172A',
            fillColor: '#D4AF37',
            fillOpacity: 0.1,
            radius: 48000 // meters (~30 miles)
        }).addTo(map);
    }
});
