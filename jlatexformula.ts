/*
 * The MIT License (MIT)
 * =====================
 *
 * Copyright © `<year>` `<copyright holders>`
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/// <reference path="typings/mathjax/mathjax.d.ts" />
namespace Fylax {
    "use strict";

    /**
     * A JavaScript plugin that helps you in building your LaTeX formula.
     * It exposes only a constructor that does all the magic for you.
     * 
     * It is inspired from [KLatexFormula](http://klatexformula.sourceforge.net/) from which it takes the subdivision and the various formulas.
     *
     * In order to work, this plugin needs [MathJax](http://www.mathjax.org/) which is a dependency.
     */
    export class jLaTeXFormula {

        private readonly rendered: HTMLDivElement | HTMLSpanElement;
        private readonly input: HTMLTextAreaElement;
        private readonly groups: HTMLSelectElement;
        private readonly groupContainer: HTMLDivElement | HTMLSpanElement;
        private readonly start: string;
        private readonly end: string;

        /**
         * Creates a new instance of jLaTeXFormula.
         * @param rendered Where formulas will be rendered (DOM Element or ID).
         * @param input Where user and jLaTeXFormula will write formulas DOM Element (DOM Element or ID).
         * @param groups Select for swapping between groups (DOM Element or ID).
         * @param groupContainer Where buttons (one each symbols) will be placed (DOM Element or ID).
         * @param localization Localized which name, in an ordered list:
         * 1. Relation Symbols
         * 2. Arrow Symbols
         * 3. Miscellaneous Symbols
         * 4. Delimiters and Accents
         * 5. Greek Alphabet
         * 6. Functions
         * 7. Matrices & Systems
         * 8. Math Alphabets and Text
         * @param openDelimiter Start LaTeX formula delimiter, useful only in case of conflicts.
         * @param closeDelimiter End LaTeX formula delimiter, useful only in case of conflicts.
         */
        public constructor(rendered: string | HTMLDivElement | HTMLSpanElement,
            input: string | HTMLTextAreaElement, groups: string | HTMLSelectElement,
            groupContainer: string | HTMLDivElement | HTMLSpanElement,
            localization: [string, string, string, string, string, string, string, string],
            openDelimiter: string = "$$", closeDelimiter: string = "$$") {
            this.start = openDelimiter;
            this.end = closeDelimiter;
            /********************************
             * Start DOM configuration.
             ********************************/
            if (typeof rendered === "string") {
                this.rendered = <HTMLDivElement | HTMLSpanElement>document.getElementById(rendered);
            } else {
                this.rendered = rendered;
            }
            if (typeof input === "string") {
                this.input = <HTMLTextAreaElement>document.getElementById(input);
            } else {
                this.input = input;
            }
            if (typeof groups === "string") {
                this.groups = <HTMLSelectElement>document.getElementById(groups);
            } else {
                this.groups = groups;
            }
            if (typeof groupContainer === "string") {
                this.groupContainer = <HTMLDivElement | HTMLSpanElement>document.getElementById(groupContainer);
            } else {
                this.groupContainer = groupContainer;
            }
            /********************************
             * End DOM configuration.
             ********************************/
            MathJax.Hub.Config(
                {
                    tex2jax: {
                        displayMath: [[this.start, this.end]],
                        processEnvironments: true,
                    }
                }
            );
            /****************************************
             * Start localized SELECT configuration.
             ****************************************/
            let options = document.createDocumentFragment();
            for (let i = 0; i < localization.length; ++i) {
                let option = document.createElement("option");
                option.innerText = localization[i];
                if (i === 0) {
                    option.selected = true;
                }
                options.appendChild(option);
            }
            this.groups.appendChild(options);
            /****************************************
             * End localized SELECT configuration.
             ****************************************/
            // All known symbols. Some are commented as MathJax does not support them (yet).
            let symbols = [
                [
                    "\\pm",
                    "\\cap",
                    "\\diamond",
                    "\\oplus",
                    "\\mp",
                    "\\cup",
                    "\\bigtriangleup",
                    "\\ominus",
                    "\\times",
                    "\\uplus",
                    "\\bigtriangledown",
                    "\\otimes",
                    "\\div",
                    "\\sqcap",
                    "\\triangleleft",
                    "\\oslash",
                    "\\ast",
                    "\\sqcup",
                    "\\triangleright",
                    "\\odot",
                    "\\star",
                    "\\vee",
                    "\\bigcirc",
                    "\\circ",
                    "\\wedge",
                    "\\dagger",
                    "\\bullet",
                    "\\setminus",
                    "\\ddagger",
                    "\\cdot",
                    "\\wr",
                    "\\amalg",
                    "\\leq",
                    "\\geq",
                    "\\equiv",
                    "\\models",
                    "\\prec",
                    "\\succ",
                    "\\sim",
                    "\\perp",
                    "\\preceq",
                    "\\succeq",
                    "\\simeq",
                    "\\mid",
                    "\\ll",
                    "\\gg",
                    "\\asymp",
                    "\\parallel",
                    "\\subset",
                    "\\supset",
                    "\\approx",
                    "\\bowtie",
                    "\\subseteq",
                    "\\supseteq",
                    "\\cong",
                    "\\neq",
                    "\\smile",
                    "\\sqsubseteq",
                    "\\sqsupseteq",
                    "\\doteq",
                    "\\frown",
                    "\\in",
                    "\\ni",
                    "\\propto",
                    "\\vdash",
                    "\\dashv",
                    "\\sum_{i=0}^{+\\infty}",
                    "\\bigcap_{a}^{b}",
                    "\\bigcup_{a}^{b}",
                    "\\bigoplus",
                    "\\bigodot",
                    "\\bigotimes",
                    "\\prod_{i=0}^{+\\infty}",
                    "\\coprod_{i=0}^{+\\infty}",
                    "\\bigsqcup",
                    "\\bigwedge",
                    "\\bigvee",
                    "\\biguplus",
                    "\\int_{a}^{b}",
                    "\\iint_{a}^{b}",
                    "\\iiint_{a}^{b}",
                    "\\iiiint",
                    "\\idotsint",
                    "\\oint_{\\gamma}",
                    //"\\varoint_{\\gamma}",
                    //"\\dotsint",
                    //"\\fint",
                    //"\\landdownint",
                    //"\\landupint",
                    //"\\oiint",
                    //"\\ointclockwise",
                    //"\\ointctrclockwise",
                    //"\\sqint",
                    //"\\sqiint",
                    //"\\varointclockwise",
                    //"\\varointctrclockwise",
                    "\\leqslant",
                    "\\geqslant",
                    "\\lhd",
                    "\\rhd",
                    "\\unlhd",
                    "\\unrhd",
                    "\\Join",
                    "\\dotplus",
                    "\\smallsetminus",
                    "\\Cap",
                    "\\Cup",
                    "\\barwedge",
                    "\\veebar",
                    "\\doublebarwedge",
                    "\\boxminus",
                    "\\boxtimes",
                    "\\boxdot",
                    "\\boxplus",
                    "\\divideontimes",
                    "\\ltimes",
                    "\\rtimes",
                    "\\leftthreetimes",
                    //"\\righttreetimes",
                    "\\curlywedge",
                    "\\curlyvee",
                    "\\circleddash",
                    //"\\circleddast",
                    "\\circledcirc",
                    "\\centerdot",
                    "\\intercal",
                    "\\leqq",
                    //"\\eqlantless",
                    "\\lesssim",
                    "\\lessapprox",
                    "\\approxeq",
                    "\\lessdot",
                    "\\lll",
                    "\\lessgtr",
                    "\\lesseqgtr",
                    "\\lesseqqgtr",
                    "\\doteqdot",
                    "\\risingdotseq",
                    "\\fallingdotseq",
                    "\\backsim",
                    "\\backsimeq",
                    "\\subseteqq",
                    "\\Subset",
                    "\\preccurlyeq",
                    "\\curlyeqprec",
                    "\\precsim",
                    "\\precapprox",
                    "\\vartriangleleft",
                    "\\trianglelefteq",
                    "\\vDash",
                    "\\Vvdash",
                    "\\smallsmile",
                    "\\smallfrown",
                    "\\bumpeq",
                    "\\Bumpeq",
                    "\\geqq",
                    "\\eqslantgtr",
                    "\\gtrsim",
                    "\\gtrapprox",
                    "\\gtrdot",
                    "\\ggg",
                    "\\gtrless",
                    "\\gtreqless",
                    "\\gtreqqless",
                    "\\eqcirc",
                    "\\circeq",
                    "\\triangleq",
                    "\\thicksim",
                    "\\thickapprox",
                    "\\supseteqq",
                    "\\Supset",
                    "\\succcurlyeq",
                    "\\curlyeqsucc",
                    "\\succsim",
                    "\\succapprox",
                    "\\vartriangleright",
                    "\\trianglerighteq",
                    "\\Vdash",
                    "\\shortmid",
                    "\\shortparallel",
                    "\\between",
                    "\\pitchfork",
                    "\\varpropto",
                    "\\blacktriangleleft",
                    "\\therefore",
                    "\\backepsilon",
                    "\\blacktriangleright",
                    "\\because",
                    "\\nless",
                    "\\nleq",
                    "\\nleqslant",
                    "\\nleqq",
                    "\\lneq",
                    "\\lneqq",
                    "\\lvertneqq",
                    "\\lnsim",
                    "\\lnapprox",
                    "\\nprec",
                    "\\npreceq",
                    "\\precnsim",
                    "\\precnapprox",
                    "\\nsim",
                    "\\nmid",
                    "\\nshortmid",
                    "\\nvdash",
                    "\\nvDash",
                    "\\ntriangleleft",
                    "\\ntrianglelefteq",
                    "\\nsubseteq",
                    "\\subsetneq",
                    "\\subsetneqq",
                    "\\varsubsetneqq",
                    "\\ngtr",
                    "\\ngeq",
                    "\\ngeqslant",
                    "\\ngeqq",
                    "\\gneq",
                    "\\gneqq",
                    "\\gvertneqq",
                    "\\gnsim",
                    "\\gnapprox",
                    "\\nsucc",
                    "\\nsucceq",
                    "\\succnsim",
                    "\\succnapprox",
                    "\\ncong",
                    "\\nparallel",
                    "\\nshortparallel",
                    "\\nVDash",
                    "\\ntriangleright",
                    "\\ntrianglerighteq",
                    "\\nsupseteq",
                    "\\nsupseteqq",
                    "\\supsetneq",
                    "\\varsupsetneq",
                    "\\supsetneqq",
                    "\\varsupsetneqq",
                    //"\\dotcup",
                    //"\\baro",
                    //"\\bbslash",
                    //"\\binampersand",
                    //"\\bindnasrepma",
                    //"\\boxast",
                    //"\\boxbar",
                    //"\\boxbox",
                    //"\\boxbslash",
                    //"\\boxcircle",
                    "\\boxdot",
                    //"\\boxempty",
                    //"\\boxslash",
                    //"\\curlyveedownarrow",
                    //"\\curlyveeuparrow",
                    //"\\curlywedgedownarrow",
                    //"\\curlywedgeuparrow",
                    //"\\fatbslash",
                    //"\\fatsemi",
                    //"\\fatslash",
                    //"\\interleave",
                    //"\\leftslice",
                    //"\\merge",
                    //"\\minuso",
                    //"\\moo",
                    //"\\nplus",
                    //"\\obar",
                    //"\\oblong",
                    //"\\obslash",
                    //"\\ogreaterthan",
                    //"\\olessthan",
                    //"\\ovee",
                    //"\\owedge",
                    //"\\rightslice",
                    //"\\sslash",
                    //"\\talloblong",
                    //"\\varbigcirc",
                    //"\\varcurlyvee",
                    //"\\varcurlywedge",
                    //"\\varoast",
                    //"\\varobar",
                    //"\\varobslash",
                    //"\\varocircle",
                    //"\\varodot",
                    //"\\varogreaterthan",
                    //"\\varolessthan",
                    //"\\varominus",
                    //"\\varoplus",
                    //"\\varoslash",
                    //"\\varotimes",
                    //"\\varovee",
                    //"\\varowedge",
                ],
                [
                    "\\leftarrow",
                    //"\\longeleftarrow",
                    "\\uparrow",
                    "\\Leftarrow",
                    "\\Longleftarrow",
                    "\\Uparrow",
                    "\\rightarrow",
                    "\\longrightarrow",
                    "\\downarrow",
                    "\\Rightarrow",
                    "\\Longrightarrow",
                    "\\Downarrow",
                    "\\leftrightarrow",
                    "\\longleftrightarrow",
                    "\\updownarrow",
                    "\\Leftrightarrow",
                    "\\Longleftrightarrow",
                    "\\Updownarrow",
                    "\\mapsto",
                    "\\longmapsto",
                    "\\nearrow",
                    "\\hookleftarrow",
                    "\\hookrightarrow",
                    "\\searrow",
                    "\\leftharpoonup",
                    "\\rightharpoonup",
                    "\\swarrow",
                    "\\leftharpoondown",
                    "\\rightharpoondown",
                    "\\nwarrow",
                    "\\leftrightharpoons",
                    "\\dashrightarrow",
                    "\\dashleftarrow",
                    "\\leftleftarrows",
                    "\\leftrightarrows",
                    "\\Lleftarrow",
                    "\\twoheadleftarrow",
                    "\\leftarrowtail",
                    "\\looparrowleft",
                    "\\rightleftharpoons",
                    "\\curvearrowleft",
                    "\\circlearrowleft",
                    "\\Lsh",
                    "\\upuparrows",
                    "\\upharpoonleft",
                    "\\downharpoonright",
                    "\\multimap",
                    //"\\leftrightsquirarrow",
                    "\\rightrightarrows",
                    "\\rightleftarrows",
                    //"\\twoheadrightarrows",
                    "\\rightarrowtail",
                    "\\looparrowright",
                    "\\curvearrowright",
                    "\\circlearrowright",
                    "\\Rsh",
                    //"\\downdownarrow",
                    "\\upharpoonright",
                    "\\downharpoonleft",
                    //"\\rightsquirarrow",
                    "\\nleftarrow",
                    "\\nrightarrow",
                    "\\nLeftarrow",
                    "\\nRightarrow",
                    "\\nleftrightarrow",
                    "\\nLeftrightarrow",
                    "\\leadsto",
                    "\\xleftarrow[xyz]{abc}",
                    "\\xrightarrow[xyz]{abc}"
                ],
                [
                    "\\ldots",
                    "\\cdots",
                    "\\vdots",
                    "\\ddots",
                    "\\aleph",
                    "\\prime",
                    "\\forall",
                    "\\infty",
                    "\\hbar",
                    "\\emptyset",
                    "\\exists",
                    "\\imath",
                    "\\nabla",
                    "\\neg",
                    "\\jmath",
                    "\\surd",
                    "\\flat",
                    "\\triangle",
                    "\\ell",
                    "\\top",
                    "\\natural",
                    "\\clubsuit",
                    "\\wp",
                    "\\bot",
                    "\\sharp",
                    "\\diamondsuit",
                    "\\Re\\left(z \\right )",
                    "\\backslash",
                    "\\heartsuit",
                    "\\Im\\left(z \\right )",
                    "\\angle",
                    "\\partial",
                    "\\spadesuit",
                    "\\hslash",
                    "\\vartriangle",
                    "\\triangledown",
                    "\\square",
                    "\\lozenge",
                    "\\circledS",
                    "\\measuredangle",
                    "\\nexists",
                    "\\mho",
                    "\\Finv",
                    "\\Game",
                    "\\Bbbk",
                    "\\backprime",
                    "\\varnothing",
                    "\\blacktriangle",
                    "\\blacktriangledown",
                    "\\blacksquare",
                    "\\blacklozenge",
                    "\\bigstar",
                    "\\sphericalangle",
                    "\\complement",
                    "\\eth",
                    "\\diagup",
                    "\\diagdown",
                    //"\\laplacian",
                    //"\\varlaplacian",
                    //"\\coloneqq",
                    //"\\Coloneqq",
                    "\\stackrel{\\text{def}}{=}"
                ],
                [
                    "\\vert",
                    "\\Vert",
                    "\\lbrace",
                    "\\rbrace",
                    "\\lfloor",
                    "\\rfloor",
                    "\\lceil",
                    "\\rceil",
                    "\\langle",
                    "\\rangle",
                    "\\overbrace{xyz}",
                    "\\underbrace{xyz}",
                    "\\overline{xyz}",
                    "\\underline{xyz}",
                    "\\overleftarrow{xyz}",
                    "\\overrightarrow{xyz}",
                    "\\widehat{xyz}",
                    "\\widetilde{xyz}",
                    "\\ulcorner",
                    "\\urcorner",
                    "\\llcorner",
                    //"\\rrcorner",
                    "\\lmoustache",
                    "\\rmoustache",
                    "\\lgroup",
                    "\\rgroup",
                    "\\arrowvert",
                    "\\Arrowvert",
                    "\\bracevert",
                    "\\sqrt{xyz}",
                    "\\sqrt[n]{xyz}",
                    //"\\abs{x}",
                    "\\bar{a}",
                    "\\vec{a}",
                    "\\dot{a}",
                    "\\ddot{a}",
                    "\\hat{a}",
                    "\\check{a}",
                    "\\breve{a}",
                    "\\tilde{a}",
                    "\\acute{a}",
                    "\\grave{a}",
                    //"\\ket{\\psi}",
                    //"\\bra{\\psi}",
                    //"\\braket{\\phi}{\\psi}",
                    //"\\matrixel{\\phi}{H}{\\psi}",
                    //"\\slashed{a}"
                ],
                [
                    "\\alpha",
                    "\\beta",
                    "\\gamma",
                    "\\delta",
                    "\\epsilon",
                    "\\varepsilon",
                    "\\zeta",
                    "\\eta",
                    "\\theta",
                    "\\vartheta",
                    "\\iota",
                    "\\kappa",
                    "\\lambda",
                    "\\mu",
                    "\\nu",
                    "\\xi",
                    "\\pi",
                    "\\varpi",
                    "\\rho",
                    "\\varrho",
                    "\\sigma",
                    "\\varsigma",
                    "\\tau",
                    "\\upsilon",
                    "\\phi",
                    "\\varphi",
                    "\\chi",
                    "\\psi",
                    "\\omega",
                    "\\Gamma",
                    "\\Delta",
                    "\\Theta",
                    "\\Lambda",
                    "\\Xi",
                    "\\Pi",
                    "\\Sigma",
                    "\\Upsilon",
                    "\\Phi",
                    "\\Psi",
                    "\\Omega"
                ],
                [
                    "a^{b}",
                    "a_{c}",
                    "a_{c}^{b}",
                    "\\frac{a}{b}",
                    "\\binom{a}{b}",
                    "\\sin{x}",
                    "\\cos{x}",
                    "\\tan{x}",
                    "\\cot{x}",
                    "\\sec{x}",
                    "\\csc{x}",
                    "\\sinh{x}",
                    "\\cosh{x}",
                    "\\tanh{x}",
                    "\\coth{x}",
                    "\\lim_{x \\to 0}f(x)",
                    "\\limsup_{x \\to 0}f(x)",
                    "\\liminf_{x \\to 0}f(x)",
                    "\\sup_{x \\in A}f(x)",
                    "\\inf_{x \\in A}f(x)",
                    "\\min_{x \\in A}f(x)",
                    "\\max_{x \\in A}f(x)",
                    "\\log{x}",
                    "\\ln{x}",
                    "\\lg{x}",
                    "\\log_{n}{x}",
                    "\\exp{x}",
                    "\\arcsin{x}",
                    "\\arccos{x}",
                    "\\arctan{x}",
                    "\\ker{x}",
                    "\\deg{x}",
                    "\\gcd{x}",
                    "\\Pr{x}",
                    "\\det{x}",
                    "\\hom{x}",
                    "\\arg{x}",
                    "\\dim{x}"
                ],
                [
                    "\\begin{matrix}\n1 & 2 \\\\\n3 & 4\n\\end{matrix}",
                    "\\begin{bmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{bmatrix}",
                    "\\begin{pmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{pmatrix}",
                    "\\left(\\begin{smallmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{smallmatrix}\\right)",
                    "\\begin{cases}\nx=2 \\\\\ny=3\n\\end{cases}",
                    "\\begin{vmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{vmatrix}",
                    "\\begin{Bmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{Bmatrix}",
                    "\\begin{Vmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{Vmatrix}"
                ],
                [
                    "\\mathcal{A}",
                    "\\mathcal{B}",
                    "\\mathcal{C}",
                    "\\mathcal{D}",
                    "\\mathcal{E}",
                    "\\mathcal{F}",
                    "\\mathcal{G}",
                    "\\mathcal{H}",
                    "\\mathcal{I}",
                    "\\mathcal{J}",
                    "\\mathcal{K}",
                    "\\mathcal{L}",
                    "\\mathcal{M}",
                    "\\mathcal{N}",
                    "\\mathcal{O}",
                    "\\mathcal{P}",
                    "\\mathcal{Q}",
                    "\\mathcal{R}",
                    "\\mathcal{S}",
                    "\\mathcal{T}",
                    "\\mathcal{U}",
                    "\\mathcal{V}",
                    "\\mathcal{W}",
                    "\\mathcal{X}",
                    "\\mathcal{Y}",
                    "\\mathcal{Z}",
                    "\\mathscr{A}",
                    "\\mathscr{B}",
                    "\\mathscr{C}",
                    "\\mathscr{D}",
                    "\\mathscr{E}",
                    "\\mathscr{F}",
                    "\\mathscr{G}",
                    "\\mathscr{H}",
                    "\\mathscr{I}",
                    "\\mathscr{J}",
                    "\\mathscr{K}",
                    "\\mathscr{L}",
                    "\\mathscr{M}",
                    "\\mathscr{N}",
                    "\\mathscr{O}",
                    "\\mathscr{P}",
                    "\\mathscr{Q}",
                    "\\mathscr{R}",
                    "\\mathscr{S}",
                    "\\mathscr{T}",
                    "\\mathscr{U}",
                    "\\mathscr{V}",
                    "\\mathscr{W}",
                    "\\mathscr{X}",
                    "\\mathscr{Y}",
                    "\\mathscr{Z}",
                    "\\mathbb{A}",
                    "\\mathbb{B}",
                    "\\mathbb{C}",
                    "\\mathbb{D}",
                    "\\mathbb{E}",
                    "\\mathbb{F}",
                    "\\mathbb{G}",
                    "\\mathbb{H}",
                    "\\mathbb{I}",
                    "\\mathbb{J}",
                    "\\mathbb{K}",
                    "\\mathbb{L}",
                    "\\mathbb{M}",
                    "\\mathbb{N}",
                    "\\mathbb{O}",
                    "\\mathbb{P}",
                    "\\mathbb{Q}",
                    "\\mathbb{R}",
                    "\\mathbb{S}",
                    "\\mathbb{T}",
                    "\\mathbb{U}",
                    "\\mathbb{V}",
                    "\\mathbb{W}",
                    "\\mathbb{X}",
                    "\\mathbb{Y}",
                    "\\mathbb{Z}",
                    "\\mathbf{A}",
                    "\\mathbf{B}",
                    "\\mathbf{C}",
                    "\\mathbf{D}",
                    "\\mathbf{E}",
                    "\\mathbf{F}",
                    "\\mathbf{G}",
                    "\\mathbf{H}",
                    "\\mathbf{I}",
                    "\\mathbf{J}",
                    "\\mathbf{K}",
                    "\\mathbf{L}",
                    "\\mathbf{M}",
                    "\\mathbf{N}",
                    "\\mathbf{O}",
                    "\\mathbf{P}",
                    "\\mathbf{Q}",
                    "\\mathbf{R}",
                    "\\mathbf{S}",
                    "\\mathbf{T}",
                    "\\mathbf{U}",
                    "\\mathbf{V}",
                    "\\mathbf{W}",
                    "\\mathbf{X}",
                    "\\mathbf{Y}",
                    "\\mathbf{Z}",
                    "\\mathfrak{A}",
                    "\\mathfrak{B}",
                    "\\mathfrak{C}",
                    "\\mathfrak{D}",
                    "\\mathfrak{E}",
                    "\\mathfrak{F}",
                    "\\mathfrak{G}",
                    "\\mathfrak{H}",
                    "\\mathfrak{I}",
                    "\\mathfrak{J}",
                    "\\mathfrak{K}",
                    "\\mathfrak{L}",
                    "\\mathfrak{M}",
                    "\\mathfrak{N}",
                    "\\mathfrak{O}",
                    "\\mathfrak{P}",
                    "\\mathfrak{Q}",
                    "\\mathfrak{R}",
                    "\\mathfrak{S}",
                    "\\mathfrak{T}",
                    "\\mathfrak{U}",
                    "\\mathfrak{V}",
                    "\\mathfrak{W}",
                    "\\mathfrak{X}",
                    "\\mathfrak{Y}",
                    "\\mathfrak{Z}",
                    "\\text{[regular text]}",
                    "\\boldsymbol{bold\ symbol}",
                    "\\textit{[Italic Text]}"
                ]
            ];
            let fragment = document.createDocumentFragment();
            /****************************************
             * Start BUTTONs configuration.
             ****************************************/
            for (let i = 0; i < symbols.length; ++i) {
                let group = document.createElement("span");
                group.setAttribute("id", "fjslg" + i);
                for (let j = 0; j < symbols[i].length; ++j) {
                    let button = document.createElement("button");
                    button.innerText = this.start + symbols[i][j] + this.end;
                    button.dataset["formula"] = symbols[i][j];
                    button.className = "fjslgb fjslgb" + i + j;
                    button.addEventListener("click", this.buttonClicked.bind(this), false);
                    group.appendChild(button);
                }
                fragment.appendChild(group);
            }
            this.groupContainer.appendChild(fragment);
            /****************************************
             * End BUTTONs configuration.
             ****************************************/
            this.input.addEventListener("input", this.typedCharacter.bind(this), false);
            this.groups.addEventListener("change", this.showGroup.bind(this), false);
            this.showGroup();
        }

        /**
         * Event listener for clicked button, inserts into the TextArea the corresponding formula.
         * @param event Required for retrieving correct dispatching button
         */
        private buttonClicked(event: MouseEvent) {
            this.input.value += (<HTMLButtonElement>event.currentTarget).getAttribute("data-formula");
            let keyEvent = new Event("input");
            this.input.dispatchEvent(keyEvent);
        }

        /**
         * Updated rendered area after user (or jLaTeXFormula) types into the TextArea
         */
        private typedCharacter() {
            this.rendered.innerText = this.start + this.input.value + this.end;
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.rendered]);
        }

        /**
         * Shows a portion of buttons, accordigly to the currently selected OPTION.
         */
        private showGroup() {
            let groups = this.groupContainer.childNodes;
            for (let i = 0; i < this.groups.options.length; ++i) {
                (<HTMLSpanElement>groups[i]).style.display = (i === this.groups.selectedIndex) ? "" : "none";
            }
        }
    }
}