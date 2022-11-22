// Styles
import 'normalize.css';
import './main.scss';

// Images

// TS Modules
import './components';
import './elements';

export let rtl = false;

const TimeLine = (document.querySelector('.TimeLine')) as HTMLElement;
const header = (document.querySelector('.Header')) as HTMLElement;
const footer = (document.querySelector('.Footer')) as HTMLElement;

rtl ? TimeLine.classList.add('rtl') : TimeLine.classList.remove('rtl');
rtl ? header.classList.add('rtl') : header.classList.remove('rtl');
rtl ? footer.classList.add('rtl') : footer.classList.remove('rtl');
