import '../../assets/scale.png';
import '../../assets/timeline.png';
import '../../assets/Spinner.png';
import '../../assets/1937.png';
import '../../assets/1951.png';
import '../../assets/1956.png';
import '../../assets/1957.png';
import { idx, rtl } from '../..';

export const timeLineFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const slider =  (document.querySelector('.slider')) as HTMLElement;
        const slidesWrapper = (document.querySelector('.slides')) as HTMLElement;
        const scale = (document.querySelector('.scales')) as HTMLElement;
        const btnContainer = (document.querySelector('.buttons')) as HTMLElement;
        const btns = document.querySelectorAll('.btn');
        const slideImgs = document.querySelectorAll('.slide-img');
        const btn = (document.querySelector('.btn')) as HTMLElement;
        const arrowL = (document.querySelector('.arrow-left')) as HTMLElement;
        const slides = document.querySelectorAll('.slide');
        const header = document.querySelector('.Header');
        const headerContent = document.querySelector('.header-content');

        let width = slider.offsetWidth;
        let btnWidth = btn.offsetWidth;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let index = idx;
        let windowWidth = window.innerWidth;

        // ============= Arrows Navigation ===============
        arrowL.addEventListener('click', () => {
            btnContainer.style.transform = 'translateX(0px)';
            arrowL.style.display = 'none';
        });

        // ============== Slides Navigation ==============
        const removeActiveSlide = (idx: number) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.classList.add('inactive');
                if (i === idx) {
                    setTimeout(()=> {
                        slide.classList.add('active');
                    }, 2100);
                }
            });
        };

        const btnRemoveActive = (idx: number) => {
            btns.forEach((btn, i) => {
                idx === i ? btn.classList.add('active') : btn.classList.remove('active');
            });
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let timerId: any;
        const slideAnimationHandler = (i: number) => {
            i > 0 ? arrowL.style.display = 'block' : arrowL.style.display = 'none';
            if (rtl && i === 0) {
                btnContainer.style.transform = `translateX(${0}px)`;
            } else {
                btnContainer.style.transform = rtl ? `translateX(${btnWidth * i}px)` : `translateX(-${btnWidth * i}px)`;
            }
            timerId = setTimeout(() => {
                slidesWrapper.style.transform = rtl ? `translateX(${i * width}px)` : `translateX(-${i * width}px)`;
            }, 2000);
            scale.style.transform = rtl ? `translateX(-${i * width}px)` : `translateX(-${i * width}px)`;
        };

        btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                removeActiveSlide(i);
                btnRemoveActive(i);
                index.value = i;
                slideAnimationHandler(index.value);
            });
        });

        const preloadImage = (img: HTMLImageElement) => {
            const src = img.getAttribute('data-src');
            if (!src) {
                return;
            }
            img.src = src;
            img.addEventListener('load', () => {
                img.parentElement?.classList.remove('lazy');
            });
        };

        const imgOptions = {
            // threshold:  0,
            // rootMargin: '0px 0px 300px 0px',
        };

        const imgObserver = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach((entry) => {
                const target = entry.target as HTMLImageElement;
                if (entry.isIntersecting) {
                    preloadImage(target);
                    imgObserver.unobserve(target);
                }
            });
        }, imgOptions);

        slideImgs.forEach((image) => {
            imgObserver.observe(image);
        });

        const removeActiveInactive = (duration: number = 2100) => {
            slides.forEach((slide) => {
                setTimeout(() => {
                    slide.classList.remove('active', 'inactive');
                }, duration);
            });
        };

        const addActiveInactive = () => {
            slides.forEach((slide, i) => {
                slide.classList.add('inactive');
                if (i === index.value) {
                    slide.classList.add('active');
                }
            });
        };

        function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
            // eslint-disable-next-line init-declarations
            let timeoutID: number;

            return function(this: any, ...args: any[]) {
                clearTimeout(timeoutID);
                timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
                windowWidth = window.innerWidth;
                width = slider.offsetWidth;
                btnWidth = btn.offsetWidth;
            } as F;
        }

        window.addEventListener('resize', debounce(function() {
            header?.classList.remove('active');
            headerContent?.classList.remove('active');
            if (windowWidth < 993) {
                slidesWrapper.style.transform = 'translateX(0px)';
                slidesWrapper.style.transition = 'unset';
                scale.style.transition = 'none';
                btnContainer.style.transition = 'none';
                clearTimeout(timerId);
                removeActiveInactive(0);
            } else {
                this.setTimeout(() => {
                    slidesWrapper.style.transition = '1.6s ease';
                    scale.style.transition = '3s ease';
                    btnContainer.style.transition = ' 0.3s ease;';
                }, 500);
                addActiveInactive();
                slidesWrapper.style.transform = rtl ? `translateX(${index.value * width}px)` : `translateX(-${index.value * width}px)`;
                scale.style.transform = rtl ? `translateX(-${index.value * width}px)` : `translateX(-${index.value * width}px)`;
                btnContainer.style.transform = rtl ? `translateX(${btnWidth * index.value}px)` : `translateX(-${btnWidth * index.value}px)`;
            }
        }, 400));
    });
};

timeLineFunction();
