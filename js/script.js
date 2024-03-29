require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import 'core-js/stable';

import tabs from './modules/tabs';
import modal, { closeModal } from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimeId = setTimeout(() => openModal('.modal', modalTimeId), 50000);
   
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimeId);
    timer('.timer', '2022-09-01');
    cards();
    calc();
    forms('form', modalTimeId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
   
});

