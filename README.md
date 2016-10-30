jLaTeXFormula
==========
A TypeScript plugin that helps you in building your LaTeX formula.


It is inspired from [KLatexFormula](http://klatexformula.sourceforge.net/) from which it takes the subdivision and the various formulas.

In order to work, this plugin needs [MathJax](http://www.mathjax.org/) which is a dependency.

Usage
-------
It exposes only a constructor that does all the magic for you.

#### Parameters
| Name | Type | Description |
| ---- | ---- | ---- |
| rendered | string | HTMLDivElement &#124; HTMLSpanElement| Where formulas will be rendered (DOM Element or ID). |
| input | string &#124; HTMLTextAreaElement| Where user and jLaTeXFormula will write formulas DOM Element (DOM Element or ID). |
| groups | string &#124; HTMLSelectElement| Select for swapping between groups (DOM Element or ID). |
| groupContainer | string &#124; HTMLDivElement &#124; HTMLSpanElement| Where buttons (one each symbols) will be placed (DOM Element or ID). |
| localization | [string, string, string, string, string, string, string, string]| Localized which name, in an ordered list:<ol><li>Relation Symbols</li><li>Arrow Symbols</li><li>Miscellaneous Symbols</li><li>Delimiters and Accents</li><li>Greek Alphabet</li><li>Functions</li><li>Matrices & Systems</li><li>Math Alphabets and Text</li></ol> |
| openDelimiter = "$$" | string| Start LaTeX formula delimiter, useful only in case of conflicts. |
| closeDelimiter = "$$" | string| End LaTeX formula delimiter, useful only in case of conflicts. |

#### Example
A demo has been provided in order to help you undersand how it does work

Styling
--------
jLaTeXFormula comes with no CSS so that there is complete freedom in styling and embedding it to your website, but provides several useful classes:
* Each group of buttons container has class `fjslg + i`, where `i` is group zero based offset.
* Each button has class `fjslgb` and `fjslgb + i+ j` where `i` is group zero based offset and `j` in button zero based offset within the group.

Compiled Code
--------
A compiled ES5 compliant minified JavaScript version has been provided as well in order to let you use it directly.

Partially generated using [TypeDoc](http://typedoc.org/)