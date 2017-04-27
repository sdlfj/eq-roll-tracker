# eq-roll-tracker

Simple app that monitors an EverQuest log file for player's /random commands.

* If a starting phrase is specified, /random's will not be collected until that phrase is seen.
* Repeating the phrase will reset the current result list.
* Leaving the starting phrase blank will result in all observed randoms appearing in the list.
* Repeat /random's are ignored.
* /random's with parameters not matching 0 to Roll Limit are also ignored.

Built using the [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
