import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimeId) {  
     
    // Forms
   
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

   
    
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

        if (prevModalDialog.classList.contains('show')) {
            prevModalDialog.classList.remove('show');
        }
    
        prevModalDialog.classList.add('hide');

        openModal('.modal', modalTimeId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close="">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            // if (document.querySelector('.modal').classList.contains('hide')) {
            //     thanksModal.remove();
            // }

            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            thanksModal.remove();
            closeModal('.modal');
        }, 4000);

    }
}

export default forms;
