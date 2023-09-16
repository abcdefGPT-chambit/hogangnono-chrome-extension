import React from 'react';
import { createRoot } from 'react-dom/client';
import AdditionalDiv from './AdditionalDiv.jsx';

// document.addEventListener("DOMContentLoaded", () => {
//   observer.observe(document.body, { childList: true, subtree: true });
// });

const observer = new MutationObserver((mutationsList, observer) => {
  const targetElement = document.querySelector('.sub-page.apt-sub-page-review'); //user review tab

  if (targetElement) {
    addReviewButton(targetElement);
  } else {
    const myButton = document.getElementById('myButton');
    if (myButton) {
      myButton.remove(); //remove button
    }
  }
});

function addReviewButton(targetElement) {
  // const reactContainer = document.createElement('div');
  // targetElement.appendChild(reactContainer);

  // const reactRoot = createRoot(reactContainer);
  // reactRoot.render(<AdditionalDiv />);

  if (!targetElement.querySelector('button')) {
    var button = document.createElement('button');
    button.textContent = 'button';
    button.id = 'myButton';

    button.addEventListener('click', () => {
      //click event
      console.log('clicked');
    });

    targetElement.appendChild(button);
  }

}

function injectionAdditionalDiv() {
  
}

// MutationObserver start (DOM Observe)
observer.observe(document.body, { childList: true, subtree: true });