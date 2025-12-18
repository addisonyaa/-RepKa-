document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 0. ЛОГИКА БУРГЕР-МЕНЮ
    // =========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('is-open');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // =========================================
    // 1. АНИМАЦИЯ ПРИ СКРОЛЛЕ
    // =========================================
    const animateElements = document.querySelectorAll(
        '.animate-on-scroll, .animate-image, .animate-scale-in, .animate-slide-right, .animate-slide-left, .animate-fade-in'
    );
    
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // =========================================
    // ФУНКЦИЯ ДЛЯ ВАЛИДАЦИИ (общее использование)
    // =========================================
    function validateInput(inputElement, errorId) {
        const errorElement = document.getElementById(errorId);
        
        if (inputElement && errorElement) {
            if (inputElement.value.trim() === '') {
                errorElement.style.display = 'block';
                inputElement.classList.add('input-error');
                inputElement.style.border = '2px solid #4D0011';
                return false;
            } else {
                errorElement.style.display = 'none';
                inputElement.classList.remove('input-error');
                inputElement.style.border = 'none';
                return true;
            }
        }
        return true;
    }


    // =========================================
    // 2. ЛОГИКА ФОРМЫ (для страницы sign_up.html)
    // =========================================
    const signupForm = document.getElementById('trialForm');
    
    if (signupForm) {
        const signupNameInput = document.getElementById('user-name');
        const signupContactInput = document.getElementById('user-contact');
        const signupSuccessMessage = document.querySelector('.success-message');
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const isNameValid = validateInput(signupNameInput, 'error-name');const isContactValid = validateInput(signupContactInput, 'error-contact');
            
            if (isNameValid && isContactValid) {
                console.log('Форма sign_up.html успешно отправлена!');
                signupForm.style.display = 'none';
                if (signupSuccessMessage) {
                    signupSuccessMessage.style.display = 'block';
                }
            }
        });

        if (signupNameInput) signupNameInput.addEventListener('blur', () => validateInput(signupNameInput, 'error-name'));
        if (signupContactInput) signupContactInput.addEventListener('blur', () => validateInput(signupContactInput, 'error-contact'));
    }
    
    
    // =========================================
    // 3. УНИВЕРСАЛЬНАЯ ЛОГИКА МОДАЛЬНОГО ОКНА
    // =========================================
    
    const modalOpenButtons = document.querySelectorAll('#openModalBtn, #openModalBtnReviews'); 
    
    const modal = document.getElementById("registrationModal");
    const span = document.getElementsByClassName("close-button")[0]; 
    
    const modalForm = document.getElementById('trialFormModal');
    const modalSuccess = document.getElementById('modalSuccessMessage');
    const modalNameInput = document.getElementById('modal-user-name');
    const modalContactInput = document.getElementById('modal-user-contact');

    // --- ФУНКЦИЯ ОТКРЫТИЯ ---
    function openModal() {
        if (modal) {
            modal.style.display = "flex"; 
            
            if (modalForm) {
                modalForm.style.display = 'flex';
                modalForm.reset(); 
                if (modalNameInput) modalNameInput.style.border = 'none'; 
                if (modalContactInput) modalContactInput.style.border = 'none';
            }
            if (modalSuccess) {
                modalSuccess.style.display = 'none';
            }
        }
    }
    
    // --- НАЗНАЧЕНИЕ ОБРАБОТЧИКОВ КНОПОК ---
    if (modal && modalOpenButtons.length > 0) {
        modalOpenButtons.forEach(btn => {
            btn.onclick = openModal;
        });
    }


    // --- ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ---
    if (modal) {
        if (span) {
            span.onclick = function() {
                modal.style.display = "none";
            }
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // --- ВАЛИДАЦИЯ ФОРМЫ ВНУТРИ МОДАЛКИ (Если модалка есть) ---
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateInput(modalNameInput, 'modal-error-name');
            const isContactValid = validateInput(modalContactInput, 'modal-error-contact');

            if (isNameValid && isContactValid) {
                console.log("Заявка через модальное окно отправлена.");
                modalForm.style.display = 'none';
                if (modalSuccess) {
                    modalSuccess.style.display = 'block';
                }
            }
        });
        
        if (modalNameInput) modalNameInput.addEventListener('blur', () => validateInput(modalNameInput, 'modal-error-name'));
        if (modalContactInput) modalContactInput.addEventListener('blur', () => validateInput(modalContactInput, 'modal-error-contact'));
    }

});