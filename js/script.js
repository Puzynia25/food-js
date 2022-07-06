window.addEventListener('DOMContentLoaded', () => {
    
    // Tabs

    const tabContent = document.querySelectorAll('.tabcontent');
    const tabParent = document.querySelector('.tabheader__items');
    const tabs = document.querySelectorAll('.tabheader__item');

    // function hideTabContent() {
    //     tabContent.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     tabs.forEach(item => {
    //         item.classList.remove('tabheader__item_active');
    //     });
    // }

    function hideTabContent() {
            tabContent.forEach(item => {
                item.classList.remove('show', 'fade');
                item.classList.add('hide');
            });
    
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }
    

    hideTabContent();

    function showTabContent(i = 0) {
        tabs[i].classList.add('tabheader__item_active');

        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
    }

    showTabContent();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.matches('div.tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }    
            }); 
        }  
    }); 

    // Timer

    const deadline = '2022-06-17';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
    
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero (num) {

        if (num < 0) {
            return 0;
        }
        if (num >= 0 && num < 10) {
            num = `0${num}`;
        } 
        return num;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerId = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(timerId);  
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

        modalTrigger.forEach((item) => {
            item.addEventListener('click', openModal);
            });

        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            //modal.classList.toggle('show');
            document.body.style.overflow = '';
        }

        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            //modal.classList.toggle('show');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimeId);
        }
 
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        // document.addEventListener('keydown', (e) => {
        //     if (e.code === 'Escape' && modal.classList.contains('show')) {
        //         closeModal();
        //     }
        // });

        const modalTimeId = setTimeout(openModal, 50000);

        function showModalByScroll() {
            if ((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }

        window.addEventListener('scroll', showModalByScroll);

        // menu_item классы для карточек

        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 29;
                this.changeToUAH();
            }

            changeToUAH() {
                this.price = this.price * this.transfer;
            }

            render() {
                const div = document.createElement('div');

                if (this.classes.length === 0) {
                    this.div = 'menu__item';
                    div.classList.add(this.div);
                } else {
                    this.classes.forEach(className => div.classList.add(className));
                }

                div.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span> ${this.price}</span> грн/день</div>
                </div>`;
                
                this.parent.append(div);
            }

        }

        const gerResource = async (url) => {
            const res = await fetch (url);
    
            if(!res.ok) {
                throw new Error(`Could not fetch ${url}, status ${res.status}`);
            }

            return await res.json();
        };

        // 1 способ создания карточек:

        gerResource('http://localhost:3000/menu') 
            .then(data => {
                data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
            });

        // 2 способ создания карточек:

        // gerResource('http://localhost:3000/menu')
        //     .then(data => {
        //         createCard(data);
        //     });

        // function createCard(data) {
        //     data.forEach(({img, altimg, title, descr, price}) => {
        //         const div = document.createElement('div');
        //         div.classList.add('menu__item');

        //         div.innerHTML = `
        //         <img src=${img} alt=${altimg}>
        //         <h3 class="menu__item-subtitle">${title}</h3>
        //         <div class="menu__item-descr">${descr}</div>
        //         <div class="menu__item-divider"></div>
        //         <div class="menu__item-price">
        //             <div class="menu__item-cost">Цена:</div>
        //             <div class="menu__item-total"><span> ${price}</span> грн/день</div>
        //         </div>`;
                
        //         document.querySelector('.menu .container').append(div);
        //     });
        // }

    // Forms
   
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch (url, {
            method: "POST", 
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 5px auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => form.reset());
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close="">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        modal.append(thanksModal);

        setTimeout(() => {
            closeModal();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            thanksModal.remove();
        }, 4000);

        //prevModalDialog.classList.remove('show');
    }
  

    // slider

    const slides = document.querySelectorAll('.offer__slide'),
          currentNumber = document.querySelector('#current'),
          totalNumber = document.querySelector('#total'),
          next = document.querySelector('.offer__slider-next'),
          prev = document.querySelector('.offer__slider-prev'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    // 1 способ - более простой
    
    // let index = 1;

    // if (slides.length < 10) {
    //     totalNumber.textContent = `0${slides.length}`;
    // } else {
    //     totalNumber.textContent = slides.length;
    // }

    // showSlides(index);

    // function showSlides(i) {
    //     if (i > slides.length) {
    //         index = 1;
    //     }
    //     if (i < 1) {
    //         index = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     slides[index - 1].style.display = 'block';

    //     if (i < 10) {
    //         currentNumber.textContent = `0${index}`;
    //     } else {
    //         currentNumber.textContent = `${index}`;
    //     }
        
    // }
    
    // function plusSlides(i) {
    //     showSlides(index += i);
    // }

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // 2 способ - карусель

    let index = 1, 
        offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex'; 
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width; // на случай добавления слайдов разной ширины
    });

    if (slides.length < 10) {
        totalNumber.textContent = `0${slides.length}`;
    } else {
        totalNumber.textContent = slides.length;
    }

    if (index < 10) {
        currentNumber.textContent = `0${index}`;
    } else {
        currentNumber.textContent = index;
    }

    next.addEventListener('click', () => {

        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // '500px'
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translate(-${offset}px)`; 

        if (index == slides.length) {
            index = 1;
        } else {
            index++;
        }

        if (index < 10) {
            currentNumber.textContent = `0${index}`;
        } else {
            currentNumber.textContent = index;
        }
    });

    prev.addEventListener('click', () => {

        if (offset == 0) { 
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translate(-${offset}px)`;

        if (index == 1) {
            index = slides.length;
        } else {
            index--;
        }

        if (index < 10) {
            currentNumber.textContent = `0${index}`;
        } else {
            currentNumber.textContent = index;
        }
    });



});

