jLaTeXFormula
=============

A JavaScript plugin that helps you in building your LaTeX formula.

It is inspired from [KLatexFormula](http://klatexformula.sourceforge.net/) from which it takes the subdivision and the various formulas.

Usage
-----
In order to work, this plugin needs imported in the same HTML page [KaTeX](https://github.com/Khan/KaTeX).

You have to prepare the HTML hosting the plugin in this way:
* div with `id="rendered-container"` where the rendered formulas will be shown.
* input with `id="formula-container"` where the various button-helper and the user will write.
* select with `id="group-select"` where the various groups are chosen.
* span with `id="symbols-[0-4]"` where the buttons of each group are shown.

Symbols Groups
--------------
KLatexFormula has 7 groups. Due to the KaTeX limitations, I have actually used only 5 groups that are:

1. Relation Symbols
2. Arrow Symbols
3. Miscellaneous Symbols
4. Delimiters and Accents
5. Greek Alphabet


Please **do note** that a lot of buttons are actually de-activated. This is due a limitation of KaTeX. Each time it gets an update, several new buttons will be available.
