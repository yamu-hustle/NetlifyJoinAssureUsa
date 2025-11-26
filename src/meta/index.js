/**
 * Home page JS here
 */
import accordion from ".././assets/js/accordion";
import kkThankYou from '.././assets/js/thank-you';
import contentLoaded from '.././assets/js/vendor/contentloaded';
import initMarquees from '.././assets/js/marquee';

contentLoaded(window, () => {
    kkThankYou();
    accordion();
    initMarquees();
})