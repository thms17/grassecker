import { gsap } from '../index';
import { ScrollTrigger } from '../index';
gsap.registerPlugin(ScrollTrigger);

function setupNavClassChange() {
  const navPositioning = document.querySelector('.nav-positioning');
  const triggerElement = document.querySelector('[navbar-background-change=trigger]');

  // Überprüfe, ob beide Elemente existieren
  if (!navPositioning || !triggerElement) {
    return; // Beende die Funktion, falls eines der Elemente fehlt
  }

  // ScrollTrigger-Logik, wenn die Elemente vorhanden sind
  ScrollTrigger.create({
    trigger: triggerElement, // Das Element, das den Wechsel auslöst
    start: 'top bottom', // Der Wechsel beginnt, sobald das Element den Viewport berührt
    onEnter: () => {
      if (navPositioning.classList.contains('fixed')) {
        navPositioning.classList.remove('fixed'); // Entferne die Klasse `.fixed`, wenn der Trigger ausgelöst wird
      }
    },
    onLeaveBack: () => {
      navPositioning.classList.add('fixed'); // Füge die Klasse `.fixed` wieder hinzu, wenn man zurückscrollt
    },
  });
}

// Funktion aufrufen
setupNavClassChange();
