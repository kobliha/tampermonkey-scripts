# tampermonkey-scripts

Scripts that help me and hopefully someone else with the daily business.

These scripts don't work on their own, you will need a **Tampermonkey** browser
extension, see https://www.tampermonkey.net/ for details.

## yast_maintainer-bugzilla-helper

As a YaST Maintainer, you often need to write repeating texts, e.g., asking for
YaST logs and where and how to get them, solver test-case, etc.
You also often need to explain why reporting a bug in an understandable way is
vitally important for having it fixed. Some think that repeating the things
makes you a master, but it's boring and ineffective. For that reason, we have
at least two wiki pages with explanation and FAQ. This script is yet another
step to make this even more efficient.

This script enhances the Bugzilla interface by providing shortcuts and a helper
menu for frequently used comments.

Just by writing this in Bugzilla comment field...
### Helper Shortcuts Menu

- **xxxlogs** the script takes over and changes that into a text asking for logs
- **xxxdescr** explains that the current description needs to be extended and how
- **xxxshrug** makes a simple ASCII "shrug" :D
- **xxxsteps** asks for a step-by-step workflow

Below the comment box in Bugzilla, you will find a **Helper Shortcuts** button.
Clicking this button opens a dropdown menu with quick actions to insert
pre-defined text snippets into your comment. This is perfect for when you need
to request more information from a bug reporter without having to type
everything out.

The available menu actions are:
*   **Request better description**: Asks for a more detailed description.
*   **Request YaST logs**: Gives instructions on how to collect YaST logs.
*   **Request Agama logs**: Gives instructions for collecting Agama logs.
*   **Request steps to reproduce**: Asks for a step-by-step guide.
*   **Insert Shrug Emoji**: Inserts `¯\_(:D)_/¯`.

### Typing Shortcuts

In addition to the menu, you can type shortcuts directly into the comment box.
These will be automatically expanded as you type.

| Shortcut | Expanded Text |
| :--- | :--- |
| `xxxdescr` | Request for a better bug description. |
| `xxxlogs` | Request for YaST logs. |
| `xxxagama` | Request for Agama logs. |
| `xxxsteps` | Request for steps to reproduce the issue. |
| `xxxshrug` | The shrug emoji: `¯\_(:D)_/¯`. |

### Installation

For adding it to your Tampermonkey instance, use
https://github.com/kobliha/tampermonkey-scripts/raw/main/scripts/yast_maintainer-bugzilla-helper.user.js
