import React from 'react';
import { createRoot } from 'react-dom/client';
import AbcdefGPT from './abcdefGPT.jsx';

const observer = new MutationObserver((mutationsList, observer) => {
  const targetElement = document.querySelector('.apt-detail'); //user review tab
  const parentDiv = document.getElementById(`container`); //user review tab's grandparent div
  const newDivName = "abcdefGPT"; //new div's name

  if(targetElement) {
    const existingDiv = targetElement.parentElement.querySelector(`div[name="${newDivName}"]`);
    if(!existingDiv) {
      const reactRootContainer = document.createElement('div');
      reactRootContainer.setAttribute("name", newDivName);

      targetElement.parentElement.appendChild(reactRootContainer);

      const reactRoot = createRoot(reactRootContainer);
      reactRoot.render(<AbcdefGPT />);
    }
  } else {
    const existingDiv = parentDiv.querySelector(`div[name="${newDivName}"]`);
    if(existingDiv){
      existingDiv.remove();
    }
  }
});

// MutationObserver start (DOM Observe)
observer.observe(document.body, { childList: true, subtree: true });