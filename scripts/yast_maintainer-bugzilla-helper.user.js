// ==UserScript==
// @name         [YMBH] YaST Maintainer Bugzilla Helper
// @namespace    https://github.com/kobliha/tampermonkey-scripts
// @version      1706257310
// @description  This tool helps you to write often used messages faster (and better :))
// @author       The Helper Guys
// @match        https://bugzilla.suse.com/show_bug.cgi?id=*
// @match        https://bugzilla.opensuse.org/show_bug.cgi?id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=suse.com
// @grant        none
// @downloadURL  https://github.com/kobliha/tampermonkey-scripts/raw/main/scripts/yast_maintainer-bugzilla-helper.user.js
// @updateURL    https://github.com/kobliha/tampermonkey-scripts/raw/main/scripts/yast_maintainer-bugzilla-helper.user.js
// ==/UserScript==

(function() {
    'use strict';

    // The ID of the text area for writing comments in Bugzilla
    const comment_textarea_id = 'comment';

    // Generic wiki page about 'how' and 'why' to report good bugreports
    const bug_howto = 'https://en.opensuse.org/openSUSE:How_to_Write_a_Good_Bugreport';

    // More specific FAQ-like wiki page containing details about getting YaST/other logs, enabling verbose mode and more
    const logs_howto = 'https://en.opensuse.org/openSUSE:Report_a_YaST_bug';

    // Documentation for collecting Agama logs.
    const agama_logs_howto = 'https://agama-project.github.io/docs/user/guides/collecting_logs';

    // Definitions for text replacements and shortcuts.
    // Each item is an object with a `find` regex and a `replace` string.
    // If it should also appear in the helper menu, add a `menuLabel`.
    // See, e.g., https://www.freecodecamp.org/news/regular-expressions-for-beginners/ for reference
    const translations = [
        // Automatic replacements
        {
            find: /\b(is\sa\s)*useless\s+bugreport\b/gi,
            replace: 'bugreport is missing some essential information'
        },
        {
            find: /\b(a\s)*zero\suseful\sinformation\b/gi,
            replace: 'not enough information to proceed further'
        },
        {
            find: /\bthere\sis\sno\s(bug\s)*description\b/gi,
            replace: 'To help us understand the issue, please provide a more detailed description. ' +
                     'The current one seems to be missing some key information. ' +
                     'You can find guidance on writing effective bug reports here: ' + bug_howto
        },
        // Shortcuts for typing and for the menu
        {
            find: /xxxdescr/gi,
            replace: 'To help us understand the issue, please provide a more detailed description. ' +
                     'The current one seems to be missing some key information. ' +
                     'You can find guidance on writing effective bug reports here: ' + bug_howto,
            menuLabel: 'Request better description'
        },
        {
            find: /xxxlogs/gi,
            replace: 'To investigate this issue further, we need the YaST logs. ' +
                     'Please attach the log files to this bug report.\n\n' +
                     'Instructions for collecting the logs can be found here: ' + logs_howto,
            menuLabel: 'Request YaST logs'
        },
        {
            find: /xxxagama/gi,
            replace: 'To investigate this issue further, we need the Agama logs. ' +
                     'Please attach the log files to this bug report.\n\n' +
                     'Instructions for collecting the logs can be found here: ' + agama_logs_howto,
            menuLabel: 'Request Agama logs'

        },
        {
            find: /xxxsteps/gi,
            replace: 'Please provide a detailed, step-by-step description of how to reproduce this issue. ' +
                     'For more details on what to include, please see: ' + bug_howto,
            menuLabel: 'Request steps to reproduce'
        },
        {
            find: /xxxshrug/gi,
            replace: '¯\\_(:D)_/¯',
            menuLabel: 'Insert Shrug Emoji'
        },
    ];

    function adaptComment(comment_area) {
        var old_text = comment_area.value;
        var new_text = comment_area.value;

        translations.forEach((item) => {
            if (new_text.match(item.find)) {
                console.log('Replacing ' + item.find + ' with ' + item.replace);
                new_text = new_text.replaceAll(item.find, item.replace);
            }
        });

        if (new_text != old_text) {
            console.log('New comment: ' + new_text);
            comment_area.value = new_text;
        }
    }

    /**
     * Creates and injects a helper menu with shortcuts below the given text area.
     */
    function createHelperMenu(comment_area) {
        const helperContainer = document.createElement('div');
        helperContainer.style.marginBottom = '1px';
        helperContainer.style.position = 'relative'; // For positioning the dropdown

        // 2. Create the menu button
        const menuButton = document.createElement('button');
        menuButton.textContent = 'Helper Shortcuts';
        menuButton.type = 'button'; // Prevents submitting a form
        menuButton.style.cursor = 'pointer';

        // 3. Create the dropdown menu
        const dropdownMenu = document.createElement('div');
        dropdownMenu.style.display = 'none'; // Initially hidden
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.border = '1px solid #ccc';
        dropdownMenu.style.backgroundColor = '#fff';
        dropdownMenu.style.zIndex = '1000';
        dropdownMenu.style.minWidth = '200px';

        // 4. Populate the dropdown with shortcuts
        translations.forEach(item => {
            // Only add items to the menu that have a menuLabel defined.
            if (item.menuLabel) {
                const textToInsert = item.replace;

                const menuItem = document.createElement('div');
                menuItem.textContent = item.menuLabel; // Use the new label for the menu item text
                menuItem.style.padding = '8px 12px';
                menuItem.style.cursor = 'pointer';

                menuItem.addEventListener('mouseenter', () => { menuItem.style.backgroundColor = '#f1f1f1'; });
                menuItem.addEventListener('mouseleave', () => { menuItem.style.backgroundColor = '#fff'; });

                menuItem.addEventListener('click', () => {
                    comment_area.value += textToInsert;
                    comment_area.focus(); // Put cursor back in the text area
                    dropdownMenu.style.display = 'none'; // Hide menu after selection
                });

                dropdownMenu.appendChild(menuItem);
            }
        });

        // 5. Add logic to show/hide the menu
        menuButton.addEventListener('click', () => {
            const isHidden = dropdownMenu.style.display === 'none';
            dropdownMenu.style.display = isHidden ? 'block' : 'none';
        });

        // 6. Add the new elements to the page
        helperContainer.appendChild(menuButton);
        helperContainer.appendChild(dropdownMenu);
        comment_area.parentNode.insertBefore(helperContainer, comment_area.nextSibling);
    }

    var comment_area = document.getElementById(comment_textarea_id);

    if (comment_area) {
        createHelperMenu(comment_area);

        comment_area.addEventListener("input", function(){
            adaptComment(comment_area);
        });
    }
})();
