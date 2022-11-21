// Styles
import 'normalize.css';
import './main.scss';

// Images

// TS Modules
import './components';
import './elements';

export let rtl = false;

const TimeLine = (document.querySelector('.TimeLine')) as HTMLElement;

rtl ? TimeLine.classList.add('rtl') : TimeLine.classList.remove('rtl');
