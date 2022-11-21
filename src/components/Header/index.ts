import '../../assets/logo.png';
import '../../assets/logo-text.png';
import '../../assets/logo-text-2.png';
import '../../assets/drop-menu-img1.png';
import '../../assets/drop-menu-img2.png';
import '../../assets/drop-menu-img3.png';
import '../../assets/drop-menu-img4.png';
import '../../assets/drop-menu-img5.png';
import '../../assets/search.png';
import '../../assets/combinelogo.png';
import '../../assets/facebook.png';
import '../../assets/instagram.png';
import '../../assets/twitter.png';
import '../../assets/linkedin.png';

export const headerFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const open = document.querySelector('.open-menu');
        const close = document.querySelector('.close-menu');
        const headerContent = document.querySelector('.header-content');
        const body = (document.querySelector('body')) as HTMLBodyElement;
        const links = document.querySelectorAll('.Header .header-links-second-row .header-link a');
        const header = (document.querySelector('.Header')) as HTMLElement;
        const dropMenu = (document.querySelector('.Header .drop-menu')) as HTMLDivElement;
        const dropMenuItems = document.querySelectorAll('.drop-menu .drop-menu-item');
        const width = header.clientWidth;

        const displayDropMenu = () => {
            if (width >= 1360) {
                dropMenu.addEventListener('mouseleave', () => {
                    header.classList.remove('active');
                    dropMenu.style.display = 'none';
                });
                const dropMenuHandler = (idx: number) => {
                    dropMenuItems.forEach((item, i) => {
                        item.classList.remove('active');
                        if (idx === i) {
                            item.classList.add('active');
                        }
                    });
                };
                links.forEach((link, idx) => {
                    link.addEventListener('mouseenter', (event) => {
                        event.preventDefault();
                        header.classList.add('active');
                        dropMenu.style.display = 'flex';

                        dropMenuHandler(idx);
                    });
                });
            }
        };

        displayDropMenu();


        open?.addEventListener('click', () => {
            if (width <= 992) {
                header.classList.add('active');
            }
            headerContent?.classList.add('active');
            body.style.overflow = 'hidden';
            header.style.height = '100%';
        });

        close?.addEventListener('click', () => {
            headerContent?.classList.remove('active');
            body.style.overflow = '';
            setTimeout(() => {
                header.style.height = '100px';
            }, 1000);
        });
        window.addEventListener('resize', () => {
            displayDropMenu();
        });
    });
};
headerFunction();
