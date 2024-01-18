// ==UserScript==
// @name         [YMBH] YaST Maintainer Bugzilla Helper
// @namespace    https://github.com/kobliha/tampermonkey-scripts
// @version      1705566316
// @description  This tool helps you to write often used messages faster (and better :))
// @author       The Helper Guys
// @match        https://bugzilla.suse.com/show_bug.cgi?id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=suse.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // The ID of the text area for writing comments in Bugzilla
    const comment_textarea_id = 'comment';

    // Generic wiki page about 'how' and 'why' to report good bugreports
    const bug_howto = 'https://en.opensuse.org/openSUSE:How_to_Write_a_Good_Bugreport';

    // More specific FAQ-like wiki page containing details about getting YaST/other logs, enabling verbose mode and more
    const logs_howto = 'https://en.opensuse.org/openSUSE:Report_a_YaST_bug';

    const need_y2logs = "We need detailed YaST logs for understanding the details of this issue. " +
          "Please use the supplied 'save_y2logs' script and attach the resulting file to this bug." +
          "\n\nFor more information, see " + logs_howto + ' or more generic ' + bug_howto;

    // Mapping from text to replace to the new text
    // Use either ['old text', 'new text'] or [regex, 'new text']
    // See, e.g., https://www.freecodecamp.org/news/regular-expressions-for-beginners/ for reference
    const translations = [
        [/\b(is\sa\s)*useless\s+bug\s*report\b/gi, 'bugreport is missing some essential information'],
        [/\b(a\s)*zero\suseful\sinformation\b/gi, 'not enough information to proceed further'],
        [/\bthere\sis\sno\s(bug\s)*description\b/gi, 'The description does not seem to contain all the relevant information to be understandable for us. Please, see ' + bug_howto + ' for more information.'],
        [/xxxdescr/gi, 'The description does not seem to contain all the relevant information to be understandable for us. Please, see ' + bug_howto + ' for more information.'],
        [/xxxlogs/gi, need_y2logs],
        [/need_y2logs/gi, need_y2logs],
    ];

    function adaptComment(comment_area) {
        var old_text = comment_area.value;
        var new_text = comment_area.value;

        translations.forEach((texts) => {
            var find_text = texts[0];
            var replace_with = texts[1];

            if (new_text.match(find_text)) {
                console.log('Replacing ' + find_text + ' with ' + replace_with);
                new_text = new_text.replaceAll(find_text, replace_with);
            }
        });

        if (new_text != old_text) {
            console.log('New comment: ' + new_text);
            comment_area.value = new_text;
        }
    }

    var comment_area = document.getElementById(comment_textarea_id);

    if (comment_area != undefined) {
        comment_area.addEventListener("input", function(){
            adaptComment(comment_area);
        });
    }
})();
