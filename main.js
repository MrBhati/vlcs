document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mobileNav.classList.toggle('open');
        });
    }

    // Close mobile nav when clicking on nav link
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });

    // 2. Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(5, 5, 5, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // 3. Highlight Active Navigation Links based on Current URL
    const currentPath = window.location.pathname;
    const allLinks = document.querySelectorAll('.nav-link');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Match home or subpage paths
        if (currentPath === href || 
            (href !== '/' && currentPath.includes(href)) || 
            (currentPath === '/' && href === '/') || 
            (currentPath.endsWith('index.html') && href === '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. Modal System for Equipment Enquiries
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal-title');
    const closeBtn = document.querySelector('.close-modal');
    const enquireBtns = document.querySelectorAll('.card-link, .enquire-btn');
    const enquiryFormInput = document.getElementById('enquiry-subject');

    if (modal && closeBtn) {
        enquireBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // If it's a page navigation button in the fleet, let it navigate
                if (btn.classList.contains('fleet-page-nav')) return;
                
                e.preventDefault();
                const card = btn.closest('.fleet-card') || btn.closest('.fleet-item-detailed') || btn.closest('.service-card');
                let machineName = "Heavy Lift Machinery";
                
                if (card) {
                    const titleEl = card.querySelector('.card-title') || card.querySelector('h3');
                    if (titleEl) {
                        machineName = titleEl.textContent.trim();
                    }
                }
                
                if (modalTitle) {
                    modalTitle.textContent = `Enquiry for ${machineName}`;
                }
                
                if (enquiryFormInput) {
                    enquiryFormInput.value = `Enquiry: ${machineName}`;
                }
                
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        });

        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 5. Contact & Inquiry Form Submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Data
            const formData = new FormData(form);
            const name = formData.get('name') || formData.get('your-name') || 'Valued Customer';
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            
            // Simple Success Message
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Sending...
                `;
            }
            
            setTimeout(() => {
                alert(`Thank you, ${name}! Your enquiry has been received. Our team will contact you shortly via phone or email.`);
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                
                form.reset();
                if (modal) {
                    modal.classList.remove('open');
                    document.body.style.overflow = 'auto';
                }
            }, 1200);
        });
    });
});
