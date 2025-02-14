document.addEventListener('DOMContentLoaded', () => {
    // Topic Navigation
    const tabs = document.querySelectorAll('.topic-tab');
    const progressBar = document.querySelector('.progress-bar');
    const indicators = document.querySelectorAll('.indicator');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            indicators.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            indicators[index].classList.add('active');
            
            // Update progress bar
            progressBar.style.width = `${((index + 1) / tabs.length) * 100}%`;
            
            // Scroll to section
            const targetId = tab.dataset.target;
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Progress Circle Animation
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        const progress = circle.dataset.progress;
        circle.style.background = `conic-gradient(var(--primary-color) ${progress}%, var(--bg-darker) 0)`;
    });

    // Smooth Scroll with Progress Update
    const updateProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        document.querySelector('.progress-bar').style.width = `${progress}%`;
        
        // Update active section in nav
        const sections = document.querySelectorAll('article');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                document.querySelectorAll('.topic-tab').forEach(tab => tab.classList.remove('active'));
                document.querySelectorAll('.topic-tab')[index].classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateProgress);

    // Search Functionality
    const searchInput = document.getElementById('topicSearch');
    const filterResults = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const articles = document.querySelectorAll('article');
        
        articles.forEach(article => {
            const text = article.textContent.toLowerCase();
            const matches = text.includes(searchTerm);
            
            article.style.display = matches ? 'block' : 'none';
            if (matches) {
                highlightText(article, searchTerm);
            }
        });
    };

    const highlightText = (element, term) => {
        const regex = new RegExp(`(${term})`, 'gi');
        element.querySelectorAll('p, li').forEach(textElement => {
            const originalText = textElement.textContent;
            if (originalText.toLowerCase().includes(term)) {
                textElement.innerHTML = originalText.replace(
                    regex, 
                    '<span class="highlight">$1</span>'
                );
            }
        });
    };

    searchInput.addEventListener('input', filterResults);

    // Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Course header click handlers
    document.querySelectorAll('.course-header').forEach(header => {
        header.addEventListener('click', () => {
            const chapters = header.nextElementSibling;
            const icon = header.querySelector('.toggle-icon');
            
            // Toggle active states
            header.classList.toggle('active');
            chapters.classList.toggle('active');
            
            // Update icon
            if (chapters.classList.contains('active')) {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-right');
            }
        });
    });

    // Chapter header click handlers
    document.querySelectorAll('.chapter-header').forEach(header => {
        header.addEventListener('click', () => {
            const pages = header.nextElementSibling;
            
            // Toggle active states
            header.classList.toggle('active');
            pages.classList.toggle('active');
        });
    });

    // Page link click handlers
    document.querySelectorAll('.page').forEach(page => {
        page.addEventListener('click', (e) => {
            // Remove active class from all pages
            document.querySelectorAll('.page').forEach(p => {
                p.classList.remove('active');
            });
            
            // Add active class to clicked page
            page.classList.add('active');
        });
    });

    // Initially expand first course
    const firstCourse = document.querySelector('.course-header');
    if (firstCourse) {
        firstCourse.click();
    }
});
