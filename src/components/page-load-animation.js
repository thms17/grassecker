import { gsap } from '../index';

function startHeroImageAnimation() {
  const heroImage = document.querySelector('[start-animation="hero-image"]');
  const buttonGroup = document.querySelector('[start-animation="button-group"]');
  const secondImage = document.querySelector('[start-animation="second-image"]');

  // Überprüfe, ob die benötigten Elemente existieren
  if (!heroImage || !buttonGroup || !secondImage) {
    return; // Beende die Funktion, falls eines der Elemente fehlt
  }

  // Überprüfen, ob die Fensterbreite unter 991px liegt
  const isSmallScreen = window.innerWidth < 991;

  // Starte die Animation für das Hero Image nach 300 ms
  setTimeout(() => {
    // Bedingte Animation basierend auf der Fensterbreite
    if (isSmallScreen) {
      // Unter 991px: Nur die Opacity wird animiert
      gsap.to(heroImage, {
        opacity: 1,
        duration: 0.85, // Dauer von 850 ms
        ease: 'power2.out', // Starker ease-out Effekt
        onComplete: () => {
          // Animation für button-group (auf opacity 1)
          gsap.to(buttonGroup, {
            opacity: 1,
            duration: 0.65, // Dauer von 650 ms
            ease: 'power2.out', // Starker ease-out Effekt
          });

          // Animation für second-image (auf opacity 0.2)
          gsap.to(secondImage, {
            opacity: 0.1,
            duration: 0.65, // Dauer von 650 ms
            ease: 'power2.out', // Starker ease-out Effekt
          });
        },
      });
    } else {
      // Über 991px: Opacity und Position werden animiert
      gsap.to(heroImage, {
        opacity: 1,
        duration: 0.85, // Dauer von 850 ms
        ease: 'power2.out', // Starker ease-out Effekt
        x: 0, // Setze die Position auf die normale Position
        onComplete: () => {
          // Animation für button-group (auf opacity 1)
          gsap.to(buttonGroup, {
            opacity: 1,
            duration: 0.65, // Dauer von 650 ms
            ease: 'power2.out', // Starker ease-out Effekt
          });

          // Animation für second-image (auf opacity 0.2)
          gsap.to(secondImage, {
            opacity: 0.1,
            duration: 0.65, // Dauer von 650 ms
            ease: 'power2.out', // Starker ease-out Effekt
          });
        },
      });
    }
  }, 300); // Verzögerung von 300 ms für das Hero Image
}

// Starte die Funktion, wenn das DOM geladen ist
window.addEventListener('load', () => {
  startHeroImageAnimation();
});
