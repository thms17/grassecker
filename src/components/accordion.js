import { gsap } from '../index';

// Setze die Dauer der Animation als Variable
const animationDuration = 0.6; // 600ms

// Funktion zum Initialisieren des Accordions
function initializeAccordion() {
  const accordions = document.querySelectorAll('[accordion="component"]');

  // Prüfe, ob die benötigten Elemente vorhanden sind
  if (!accordions.length) {
    return;
  }

  accordions.forEach((accordion) => {
    const triggerButton = accordion.querySelector('[accordion="trigger-button"]');
    const filter = accordion.querySelector('[accordion="filter"]');
    const extraButton = accordion.querySelector('[accordion="button"]');

    // Prüfe, ob triggerButton und filter im Accordion vorhanden sind
    if (!triggerButton || !filter) {
      return;
    }

    // Setze den initialen Zustand des Filters und des extraButton
    gsap.set(filter, { height: '100%' });
    if (extraButton) {
      gsap.set(extraButton, { autoAlpha: 0 });
    }

    // Füge einen Eventlistener zum Button hinzu
    triggerButton.addEventListener('click', () => {
      const isOpen = accordion.classList.contains('open');

      if (isOpen) {
        // Wenn es geöffnet ist, animiere das Schließen auf eine Höhe von 8rem, den Filter auf 100% und den extraButton auf autoAlpha 0
        gsap.to(accordion, {
          height: '8rem',
          duration: animationDuration,
          ease: 'power3.inOut',
        });
        gsap.to(triggerButton, { rotateX: 0, duration: animationDuration, ease: 'power3.inOut' });
        gsap.to(filter, {
          height: '100%',
          duration: animationDuration,
          ease: 'power3.inOut',
        });
        if (extraButton) {
          gsap.to(extraButton, { autoAlpha: 0, duration: animationDuration, ease: 'power3.inOut' });
        }
      } else {
        // Messen der aktuellen Höhe des Akkordeons vor dem Öffnen
        const currentHeight = accordion.offsetHeight;

        // Setze das Accordion auf 'auto', aber animiere von der gemessenen Höhe
        gsap.set(accordion, { height: 'auto' });
        const targetHeight = accordion.offsetHeight; // Zielhöhe nach Setzen auf 'auto'
        gsap.set(accordion, { height: currentHeight }); // Setze auf ursprüngliche Höhe zurück, um die Animation sauber zu starten

        // Animieren von der ursprünglichen Höhe zur auto-Höhe
        gsap.to(accordion, {
          height: targetHeight,
          duration: animationDuration,
          ease: 'power3.inOut',
        });
        gsap.to(triggerButton, { rotateX: 180, duration: animationDuration, ease: 'power3.inOut' });
        gsap.to(filter, {
          height: '0%',
          duration: animationDuration,
          ease: 'power3.inOut',
        });
        if (extraButton) {
          gsap.to(extraButton, { autoAlpha: 1, duration: animationDuration, ease: 'power3.inOut' });
        }
      }

      // Toggle die Klasse 'open' auf accordion=component
      accordion.classList.toggle('open');
    });
  });
}

// Funktion aufrufen
initializeAccordion();
