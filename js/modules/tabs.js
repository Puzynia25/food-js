function tabs(tabsSelector, tabContentSelector, tabParentSelector, activeClass) {

    // Tabs

    let tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabContentSelector),
        tabParent = document.querySelector(tabParentSelector);
     

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
                item.classList.remove(activeClass);
            });
        }
    

    hideTabContent();

    function showTabContent(i = 0) {
        tabs[i].classList.add(activeClass);

        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
    }

    showTabContent();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }    
            }); 
        }  
    }); 
}

export default tabs;