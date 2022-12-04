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
        const btn = (document.querySelector('.btn')) as HTMLElement;
        const slides = document.querySelectorAll('.slide');
        const header = document.querySelector('.Header');
        const headerContent = document.querySelector('.header-content');

        let width = slider.offsetWidth;
        let btnWidth = btn.offsetWidth;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let index = idx;
        let windowWidth = window.innerWidth;

        const removeActiveBtn = () => {
            btns.forEach((btn) => {
                btn.classList.remove('active');
            });
        };

        const removeActiveSlide = () => {
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
        };

        const goToslide = () => {
            slidesWrapper.style.transform = `translateX(${rtl ? '' : '-'}${index.value * width}px)`;
            scale.style.transform = `translateX(${rtl ? '-' : '-'}${index.value * width}px)`;
            if (index.value === 0) {
                btnContainer.style.transform = `translateX(${rtl ? '' : '-'}${index.value * btnWidth}px)`;
            } else {
                btnContainer.style.transform = `translateX(${rtl ? '' : '-'}${(index.value - 1) * btnWidth}px)`;
            }
        };

        btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                removeActiveBtn();
                index.value = i;
                btn.classList.add('active');
                goToslide();
                removeActiveSlide();
            });
        });


        const preloadImage = (slide: HTMLDivElement) => {
            const img = slide.children[ 0 ] as HTMLImageElement;
            const src = img.getAttribute('data-src');
            if (!src) {
                return;
            }
            img.src = src;
            img.addEventListener('load', () => {
                windowWidth > 992 ? img!.parentElement!.classList.add('active') : img!.parentElement!.classList.remove('active');
                img.parentElement?.classList.remove('lazy');
            });
        };

        const imgOptions = {
            // threshold:  0,
            // rootMargin: '0px 0px 300px 0px',
        };

        const imgObserver = new IntersectionObserver((entries /*imgObserver */) => {
            entries.forEach((entry) => {
                const target = entry.target as HTMLImageElement;
                if (entry.isIntersecting) {
                    preloadImage(target);

                    // imgObserver.unobserve(target);
                }
            });
        }, imgOptions);

        slides.forEach((slide) => {
            imgObserver.observe(slide);
        });

        const toggleActiveInactive = (flag?: boolean) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.classList.remove('inactive');
                if (flag) {
                    index.value === i ? slide.classList.add('active') : slide.classList.add('inactive');
                }
            });
        };

        if (windowWidth < 993) {
            toggleActiveInactive();
        }

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
                toggleActiveInactive();
                slidesWrapper.style.transform = 'translateX(0px)';
                slidesWrapper.style.transition = '0s';
            } else {
                toggleActiveInactive(true);
                slidesWrapper.style.transform = `translateX(${rtl ? '' : '-'}${index.value * width}px)`;
                if (index.value === 0) {
                    btnContainer.style.transform = `translateX(${rtl ? '' : '-'}${index.value * btnWidth}px)`;
                } else {
                    btnContainer.style.transform = `translateX(${rtl ? '' : '-'}${(index.value - 1) * btnWidth}px)`;
                }
                slidesWrapper.style.transition = '1.6s ease';
            }
        }, 400));
    });
};

timeLineFunction();
