const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) { // Adjust the threshold as needed
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Add the 'initial' class to set the initial state
header.classList.add('initial');

// Function to check if an element is in the viewport

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}
  
// Function to handle the scroll effect for individual image-text pairs
function handleScroll() {
    const imageContainers = document.querySelectorAll('.image-container');
  
    imageContainers.forEach((container) => {
        const imageText = container.querySelector('.image-text');
      
        if (imageText < window.innerHeight && imageText >= 0) {
            console.log(5 + 6);
            imageText.style.opacity = '1'; // Fade in the text
        }
    });
}
  
// Add event listener for scrolling
window.addEventListener('scroll', handleScroll);