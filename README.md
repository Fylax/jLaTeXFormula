jLaTeXFormula
==========

A JavaScript plugin that helps you in building your LaTeX formula.

It is inspired from [KLatexFormula](http://klatexformula.sourceforge.net/) from which it takes the subdivision and the various formulas.

Usage
-------
In order to work, this plugin needs imported in the same HTML page [MathJax](http://www.mathjax.org/).

You have to prepare the HTML hosting the plugin in this way:
* div with `id="rendered-container"` where the rendered formulas will be shown.
* textarea with `id="formula-container"` where the various button-helper and the user will write.
* select with `id="group-select"` where the various groups are chosen.
* span/div/whatever-you-want with `id="symbols-[0-7]"` where the buttons of each group are shown.

Please **do note** that you have to set MathJax delimiters to `{tex}` and `{/tex}` to make it work. Take a look to the demo or to MathJax documentation to learn how to achieve it.

Symbols Groups
-------------------
jLaTeXFormula has 6 groups:

1. Relation Symbols
2. Arrow Symbols
3. Miscellaneous Symbols
4. Delimiters and Accents
5. Greek Alphabet
6. Functions
7. Matrices & Systems
8. Math Alphabets and Text

Styling
--------

jLaTeXFormula comes with no CSS so that there is complete freedom in styling and embedding it to your website.

* `#rendered-container` contains the formulas rendered via CSS, so you can set color, font-size and whatnot to this element to change how formulas are rendered.
* All helper buttons have classname `.formula-btn`, so you can easly set dimensions, colors and so on to them.
* Buttons are also grouped, so any button in n+1<sup>th</sup> group will also have a `group-n` classname.
* Textarea and Select speak for themselves and there's no need to explain how to manage them.