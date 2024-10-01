import { gsap } from '../index';
import { ScrollTrigger } from '../index';
gsap.registerPlugin(ScrollTrigger);

function initHeroScrollAnimation() {
  // Überprüfen, ob das Element mit der Klasse `.horizontal-scroll-height` vorhanden ist
  const scrollHeight = document.querySelector('.horizontal-scroll-height');
  if (!scrollHeight) {
    return; // Beende die Funktion, falls das Element nicht gefunden wird
  }

  // Überprüfen, ob es mindestens ein .section_hero-Element gibt
  const heroSections = document.querySelectorAll('.section_hero');
  if (heroSections.length === 0) {
    return; // Beende die Funktion, falls keine Sektionen vorhanden sind
  }

  heroSections.forEach((sectionEl, index) => {
    const wrapperEl = sectionEl.querySelector('.hero_grid-left-image-wrap');
    const foregroundEl = wrapperEl?.querySelector('.hero_image.foreground');

    // Überprüfen, ob das wrapperEl und foregroundEl vorhanden sind
    if (!wrapperEl || !foregroundEl) {
      return; // Beende die aktuelle Schleifeniteration, falls eines der Elemente fehlt
    }

    // Variablen für Start- und Endwerte der x-Position sowie Scrollbereiche
    let foregroundStartX, foregroundEndX;
    let startPercent, endPercent;

    if (index === 0) {
      // Für das erste Element
      foregroundStartX = '0%';
      foregroundEndX = '-12%';
      startPercent = 0;
      endPercent = 12;
    } else if (index === 1) {
      // Für das zweite Element
      foregroundStartX = '4%';
      foregroundEndX = '-10%';
      startPercent = 10;
      endPercent = 45;
    } else if (index === 2) {
      // Für das dritte Element
      foregroundStartX = '7%';
      foregroundEndX = '-10%';

      // Überprüfe, ob die Bildschirmbreite unter 992px liegt
      if (window.innerWidth < 992) {
        startPercent = 35;
        endPercent = 70;
      } else {
        startPercent = 40;
        endPercent = 75;
      }
    }

    // Opacity-Animation für das gesamte Wrapper-Element (wird auf allen Breakpoints ausgeführt)
    gsap.to(wrapperEl, {
      opacity: 1,
      scrollTrigger: {
        trigger: scrollHeight,
        start: `${startPercent}% top`, // Beginn der Animation basierend auf dem Scrollen
        end: `${startPercent + (endPercent - startPercent) * 0.15}% top`, // Endet nach einem Teil des Scrollens
        scrub: 1, // Synchronisiere die Animation mit dem Scrollen
        invalidateOnRefresh: true, // Aktualisiere die Positionen bei Layout-Änderungen
      },
    });

    // Führt die X-Translation nur bei Bildschirmen über 991px aus
    if (window.innerWidth > 991) {
      // Setze die Startposition des Foreground-Elements sofort, um ein Springen zu vermeiden
      gsap.set(foregroundEl, { x: foregroundStartX });

      // Animation für den Vordergrund - mit `to`-Animation (nur über 991px)
      gsap.to(foregroundEl, {
        x: foregroundEndX,
        scrollTrigger: {
          trigger: scrollHeight, // Setze das Scrollen auf den gesamten Bereich
          start: `${startPercent}% top`, // Beginnt bei startPercent% des Scrollens
          end: `${endPercent}% top`, // Endet bei endPercent% des Scrollens
          scrub: 1, // Synchronisiere die Animation mit dem Scrollen
          invalidateOnRefresh: true, // Aktualisiere die Positionen bei Layout-Änderungen
        },
      });
    }
  });
}

// Initialisiere die Scroll-Animation, wenn das DOM geladen ist
window.addEventListener('load', () => {
  initHeroScrollAnimation();
});
