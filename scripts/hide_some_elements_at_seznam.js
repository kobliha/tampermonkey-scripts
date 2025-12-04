// ==UserScript==
// @name         Hide some unnecessary page elements
// @namespace    Hidden
// @version      2025-12-02
// @description  Hides what is not really needed at Seznam or Novinky
// @author       Monkey
// @match        https://www.novinky.cz/*
// @match        https://www.seznamzpravy.cz/*
// @match        https://medium.seznam.cz/*
// @match        https://www.forum24.cz/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Texts (links) to hide
    const TEXTS_TO_HIDE = ["Diskuze", "Líbí se", "Sdílet na Facebook", "Sdílet na X"];

    // Hides or moves away the given element
    function hide_or_destroy(element) {
        if (!element) return;
        element.style.fontSize = '0px';
        element.style.lineHeight = '0';
        element.style.width = '0px';
        element.style.height = '0px';
        element.style.position = 'absolute';
        element.style.left = '-10000px';
        element.style.opacity = '0';
    }

    /**
     * Checks a given DOM node and its children for elements that should be hidden.
     * This is more efficient than re-querying the entire document.
     * @param {Node} node The node to process.
     */
    function processNode(node) {
        if (node.nodeType !== 1) return; // Process only element nodes

        // special container
        const asides = node.querySelectorAll('aside, seznam-pocitadlolibise');
        for (const aside of asides) {
            if (aside.style.opacity !== '0') {
                hide_or_destroy(aside);
            }
        }

        // Hide elements based on their text content
        const elements = node.querySelectorAll('span, a');
        for (const element of elements) {
            for (const text of TEXTS_TO_HIDE) {
                if (element.textContent.trim().startsWith(text)) {
                    const containerToHide = element.closest('a, div[class*="szn-like-button-container"]') || element;
                    if (containerToHide && containerToHide.style.opacity !== '0') {
                        hide_or_destroy(containerToHide);
                        break; // Move to the next element once a match is found and handled
                    }
                }
            }
        }
    }

    // Run it once as soon as the script executes.
    processNode(document.body);

    // Set up a MutationObserver to re-run the function whenever the page content changes.
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            for (const node of mutation.addedNodes) {
                processNode(node);
            }
        }
    });

    // It's a cat and mouse game, some elements get readded or changed by their scripts
    observer.observe(document.body, { childList: true, subtree: true });
    console.log('Hiding observer is active.');
})();
