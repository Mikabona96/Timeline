import '../../assets/scale.png';
import '../../assets/timeline.png';
import '../../assets/Spinner.png';
import '../../assets/1937.png';
import '../../assets/1951.png';
import '../../assets/1956.png';
import '../../assets/1957.png';
import { rtl } from '../..';

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
        let width = slider.offsetWidth;
        let btnWidth = btn.offsetWidth;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let index = 0;

        // ============= Arrows Navigation ===============
        arrowL.addEventListener('click', () => {
            btnContainer.style.transform = 'translateX(0px)';
        });

        // ============== Slides Navigation ==============
        const removeActiveSlide = () => {
            slides.forEach((slide) => {
                slide.classList.remove('active');
                slide.classList.add('inactive');
            });
        };

        const btnRemoveActive = (idx: number) => {
            btns.forEach((btn, i) => {
                idx === i ? btn.classList.add('active') : btn.classList.remove('active');
            });
        };

        const slideAnimationHandler = (i: number) => {
            i > 0 ? arrowL.style.display = 'block' : arrowL.style.display = 'none';
            if (rtl && i === 0) {
                btnContainer.style.transform = `translateX(${0}px)`;
            } else {
                btnContainer.style.transform = rtl ? `translateX(${btnWidth * (i - 1)}px)` : `translateX(-${btnWidth * (i - 1)}px)`;
            }
            setTimeout(() => {
                slidesWrapper.style.transform = rtl ? `translateX(${i * width}px)` : `translateX(-${i * width}px)`;
                slides[ i ].classList.add('active');
            }, 2000);
            scale.style.transform = rtl ? `translateX(-${i * width}px)` : `translateX(-${i * width}px)`;
        };

        btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                removeActiveSlide();
                btnRemoveActive(i);
                index = i;
                slideAnimationHandler(index);
            });
        });

        const preloadImage = (img: any) => {
            const src = img.getAttribute('data-src');
            if (!src) {
                return;
            }
            setTimeout(() => {
                img.src = src;
            }, 500);
            setTimeout(() => {
                img.parentElement?.classList.remove('lazy');
            }, 700);
        };

        const imgOptions = {
            // threshold:  0,
            // rootMargin: '0px 0px 300px 0px',
        };

        const imgObserver = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    preloadImage(entry.target);
                    imgObserver.unobserve(entry.target);
                }
            });
        }, imgOptions);

        slideImgs.forEach((image) => {
            imgObserver.observe(image);
        });

        const removeActiveInactive = () => {
            slides.forEach((slide) => {
                setTimeout(() => {
                    slide.classList.remove('active', 'inactive');
                }, 2100);
            });
        };
        window.addEventListener('resize', () => {
            width = slider.offsetWidth;
            btnWidth = btn.offsetWidth;
            if (window.innerWidth <= 992) {
                index = 0;
                removeActiveInactive();
            }
            slideAnimationHandler(index);
        });
    });
};

timeLineFunction();
