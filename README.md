# tampermonkey-scripts

Scripts that help me and hopefully someone else with the daily business

These scripts don't work on their own, you will need a **Tampermonkey** browser
extension, see https://www.tampermonkey.net/ for details.

## yast_maintainer-bugzilla-helper.js

As a YaST Maintainer, you often need to write repeating texts, e.g., asking for
YaST logs and where and how to get them, solver test-case, etc. You also often
need to explain why reporting a bug in an understandable way is vitally
important for having it fixed. Some think that repeating the things makes you
a master, but it's boring and ineffective. For that reason, we have at least two
wiki pages with explanation and FAQ. This script is yet another step to make
this even more efficient.

Just by writing this in Bugzilla comment field...

- **xxxlogs** the script takes over and changes that into a text asking for logs
- **xxxdescr** explains that the current description needs to be extended and how
- **xxxshrug** makes a simple ASCII "shrug" :D
- **xxxsteps** asks for a step-by-step workflow
