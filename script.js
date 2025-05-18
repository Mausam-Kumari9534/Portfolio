
        const header = document.querySelector('header');
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-links a');
        const progressCircles = document.querySelectorAll('.progress-circle');

        // Toggle mobile navigation
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Skills progress animation
        function animateProgressCircles() {
            progressCircles.forEach(circle => {
                const value = circle.getAttribute('data-value');
                const radius = 70;
                const circumference = 2 * Math.PI * radius;
                
                // Calculate stroke-dasharray and stroke-dashoffset
                const strokeDasharray = circumference;
                const strokeDashoffset = circumference - (value / 100) * circumference;
                
                // Create SVG structure
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'progress-svg');
                svg.setAttribute('width', '150');
                svg.setAttribute('height', '150');
                svg.setAttribute('viewBox', '0 0 150 150');
                
                // Create circle element
                const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circleElement.setAttribute('cx', '75');
                circleElement.setAttribute('cy', '75');
                circleElement.setAttribute('r', radius);
                circleElement.setAttribute('fill', 'none');
                circleElement.setAttribute('stroke', '#e9ecef');
                circleElement.setAttribute('stroke-width', '10');
                
                // Create progress circle element
                const progressElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                progressElement.setAttribute('cx', '75');
                progressElement.setAttribute('cy', '75');
                progressElement.setAttribute('r', radius);
                progressElement.setAttribute('fill', 'none');
                progressElement.setAttribute('stroke', value >= 70 ? '#2a2a72' : value >= 40 ? '#009ffd' : '#f9c80e');
                progressElement.setAttribute('stroke-width', '10');
                progressElement.setAttribute('stroke-dasharray', strokeDasharray);
                progressElement.setAttribute('stroke-dashoffset', strokeDasharray);
                progressElement.setAttribute('transform', 'rotate(-90 75 75)');
                progressElement.style.transition = 'stroke-dashoffset 2s ease';
                
                // Append circles to SVG
                svg.appendChild(circleElement);
                svg.appendChild(progressElement);
                
                // Append SVG to progress circle
                circle.appendChild(svg);
            });
            
            // Trigger animation when in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressSVG = entry.target.querySelector('.progress-svg');
                        const progressElement = progressSVG.querySelector('circle:nth-child(2)');
                        const value = entry.target.getAttribute('data-value');
                        const radius = 10;
                        const circumference = 2 * Math.PI * radius;
                        const strokeDashoffset = circumference - (value / 100) * circumference;
                        
                        setTimeout(() => {
                            progressElement.style.strokeDashoffset = strokeDashoffset;
                        }, 200);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            progressCircles.forEach(circle => {
                observer.observe(circle);
            });
        }

        // Form handling
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });

        // Initialize animations when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            animateProgressCircles();
        });