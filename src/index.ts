// Styles
import 'normalize.css';
import './main.scss';

// Images

// TS Modules
import './components';
import './elements';

const rtlSwitcher = document.querySelector('.header-links-second-row .header-link.rtl');
const mobileRtlSwitcher = document.querySelector('.Header .header-nav .header-content .content-links.first .content-link.rtl');

export let rtl = false;

const TimeLine = (document.querySelector('.TimeLine')) as HTMLElement;
const header = (document.querySelector('.Header')) as HTMLElement;
const footer = (document.querySelector('.Footer')) as HTMLElement;
const slidesWrapper = (document.querySelector('.slides')) as HTMLElement;
const btnContainer = (document.querySelector('.buttons')) as HTMLElement;
const scale = (document.querySelector('.scales')) as HTMLElement;
const slider =  (document.querySelector('.slider')) as HTMLElement;
const btn = (document.querySelector('.btn')) as HTMLElement;
let btnWidth = btn.offsetWidth;
let width = slider.offsetWidth;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let windowWidth = window.innerWidth;

export const idx = {
    value: 0,
};

const switchRtlHelper = () => {
    rtl = !rtl;
    rtl ? TimeLine.classList.add('rtl') : TimeLine.classList.remove('rtl');
    rtl ? header.classList.add('rtl') : header.classList.remove('rtl');
    rtl ? footer.classList.add('rtl') : footer.classList.remove('rtl');
    slidesWrapper.style.transition = 'none';
    scale.style.transition = 'none';
    btnContainer.style.transition = 'none';
    if (width < 993) {
        slidesWrapper.style.transform = 'translateX(0px)';
        scale.style.transform = 'translateX(0px)';
        btnContainer.style.transform = 'translateX(0px)';
    } else {
        slidesWrapper.style.transform = `translateX(${rtl ? '' : '-'}${idx.value * width}px)`;
        scale.style.transform = `translateX(${rtl ? '-' : '-'}${idx.value * width}px)`;
        if (idx.value === 0) {
            btnContainer.style.transform = `translateX(${rtl ? '' : '-'}${idx.value * btnWidth}px)`;
        } else {
            btnContainer.style.transform = `translateX(${rtl ? '' : '-'}${(idx.value - 1) * btnWidth}px)`;
        }
    }
    setTimeout(() => {
        slidesWrapper.style.transition = '1.6s ease';
        scale.style.transition = '3s ease';
        btnContainer.style.transition = ' 0.1s ease;';
    }, 2200);
};
mobileRtlSwitcher?.addEventListener('click', () => {
    rtl ? mobileRtlSwitcher.innerHTML = 'RTL' : mobileRtlSwitcher.innerHTML = 'LTR';
    rtl ? rtlSwitcher!.innerHTML = 'RTL' : rtlSwitcher!.innerHTML = 'LTR';
    switchRtlHelper();
});

rtlSwitcher?.addEventListener('click', () => {
    rtl ? rtlSwitcher.innerHTML = 'RTL' : rtlSwitcher.innerHTML = 'LTR';
    rtl ? mobileRtlSwitcher!.innerHTML = 'RTL' : mobileRtlSwitcher!.innerHTML = 'LTR';
    switchRtlHelper();
});


window.addEventListener('resize', () => {
    width = slider.offsetWidth;
    windowWidth = window.innerWidth;
});
