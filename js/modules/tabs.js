function tabs() {

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
}

module.exports = tabs;