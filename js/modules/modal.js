function modal() {
    
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

}

module.exports = modal;