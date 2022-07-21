function slider() {

    // slider

    const slider = document.querySelector('.offer__slider'),
          slides = document.querySelectorAll('.offer__slide'),
          currentNumber = document.querySelector('#current'),
          totalNumber = document.querySelector('#total'),
          next = document.querySelector('.offer__slider-next'),
          prev = document.querySelector('.offer__slider-prev'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    // 1 способ (простое переключение картинок)
    
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

    // 2 способ - карусель (+ 14 урок - точки)

    let slideIndex = 1, 
        offset = 0;
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex'; 
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width; // на случай добавления слайдов разной ширины
    });
    
    slider.style.position = 'relative';

    const indicator = document.createElement('ol'),
          dotMassive = [];

    indicator.classList.add('carousel-indicators');
    indicator.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicator);
    
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        
        indicator.append(dot);

        if (i == 0) {
            dot.style.opacity = '1';
        }
        dotMassive.push(dot);
    }

    if (slides.length < 10) {
        totalNumber.textContent = `0${slides.length}`;
    } else {
        totalNumber.textContent = slides.length;
    }

    function showCurrentNumber() {
        if (slideIndex < 10) {
            currentNumber.textContent = `0${slideIndex}`;
        } else {
            currentNumber.textContent = slideIndex;
        }
    }

    function showDotIndicator() {
        dotMassive.forEach(item => {
            item.style.opacity = '.5';
        });
        dotMassive[slideIndex-1].style.opacity = '1';
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    showCurrentNumber();

    next.addEventListener('click', () => {

        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // '500px'
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translate(-${offset}px)`; 

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showCurrentNumber();
        showDotIndicator();
        
    });

    prev.addEventListener('click', () => {

        if (offset == 0) { 
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translate(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showCurrentNumber();
        showDotIndicator();
    });

    dotMassive.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            
            slidesField.style.transform = `translate(-${offset}px)`;

            showCurrentNumber();
            showDotIndicator();
        });
    });
}

module.exports = slider;