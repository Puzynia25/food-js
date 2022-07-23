function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    //modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimeId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    //modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    console.log(modalTimeId);
    if (modalTimeId) {
        clearInterval(modalTimeId);
    }
   
}

function modal(triggerSelector, modalSelector, modalTimeId) {
    
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    modalTrigger.forEach((item) => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimeId));
        });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // document.addEventListener('keydown', (e) => {
    //     if (e.code === 'Escape' && modal.classList.contains('show')) {
    //         closeModal();
    //     }
    // });

    function showModalByScroll() {
        if ((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimeId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};