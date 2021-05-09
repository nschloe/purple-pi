<p align="center">
  <a href="https://github.com/nschloe/purple-pi"><img alt="purple-pi" src="https://nschloe.github.io/purple-pi/logo-with-text.svg" width="60%"></a>
  <p align="center">LaTeX math wherever you want.</p>
</p>

[![gh-actions](https://img.shields.io/github/workflow/status/nschloe/purple-pi/ci?style=flat-square)](https://github.com/nschloe/purple-pi/actions?query=workflow%3Aci)
[![chrome users](https://img.shields.io/chrome-web-store/users/ingbbliecffofmmokknelnijicfcgolb?label=Chrome%20users&logo=google-chrome&style=flat-square)](https://chrome.google.com/webstore/detail/purple-pi/ingbbliecffofmmokknelnijicfcgolb)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![purple-pi](https://img.shields.io/badge/Rendered%20with-Purple%20Pi-800080?style=flat-square)](https://github.com/nschloe/purple-pi?activate&inlineMath=$)
[![Discord](https://img.shields.io/static/v1?logo=discord&label=chat&message=on%20discord&color=7289da&style=flat-square)](https://discord.gg/hnTJ5MRX2Y)

$$
i\\hbar \\frac{\\partial}{\\partial t} \\left|\psi(t)\\right\\rangle
= \\hat{H}\\left|\\psi(t)\\right\\rangle
$$

Purple Pi is a browser extension for Google Chrome that renders LaTeX-style mathematics
on pages that don't otherwise support it. Examples are GitHub READMEs and Wikis or
StackOverflow posts.

### Users

Install the browser extension:

  * [Chrome](https://chrome.google.com/webstore/detail/purple-pi/ingbbliecffofmmokknelnijicfcgolb)

### Authors

Specify that the page contains math by adding an _activation link_ to Purple Pi on the
page, e.g.,
```markdown
https://github.com/nschloe/purple-pi?activate
```
or
```
Rendered with <a href="https://github.com/nschloe/purple-pi?activate">Purple Pi</a>.
```
or as a badge
```
[![purple-pi](https://img.shields.io/badge/Rendered%20with-Purple%20Pi-800080?style=flat-square)](https://github.com/nschloe/purple-pi?activate&inlineMath=$)
```
The extension will then inject [MathJax](https://www.mathjax.org/) into the page.
The link is also used to communicate options to MathJax; note the URL parameters
`activate` and `inlineMath=$`. ([The default inline math delimiters are `\\(` and
`\\)`.](https://docs.mathjax.org/en/latest/options/input/tex.html)) Only the first Purple
Pi activation link in a page is considered. The reason why Purple Pi uses links for
activation is that you can use them almost everywhere: GitHub pages, StackOverflow
posts, etc.

All options with their default values:
```js
"activate"                   // no value; if absent, math is not rendered

// input options
"inlineMath": ()             // which delimiters to use
"processEscapes": true       // use \$ to produce a literal dollar sign
"processEnvironments": true  // process \begin{xxx}...\end{xxx} outside math mode
"processRefs": true          // process \ref{...} outside of math mode
"tags": 'none'               // or 'ams' or 'all'
"tagSide":'right'            // side for \tag macros
"tagIndent"'0.8em'           // amount to indent tags
"useLabelIds": true          // use label name rather than tag for ids
"multlineWidth": '85%'       // width of multline environment
"maxMacros": 1000            // maximum number of macro substitutions per expression
"maxBuffer": 5 * 1024        // maximum size for the internal TeX string (5K)

// output options
"scale": 1                   // global scaling factor for all expressions
"minScale": .5               // smallest scaling factor to use
"matchFontHeight": true      // true to match ex-height of surrounding font
"mtextInheritFont": false    // true to make mtext elements use surrounding font
"merrorInheritFont": true    // true to make merror text use surrounding font
"mathmlSpacing": false       // true for MathML spacing rules, false for TeX rules
"exFactor": .5               // default size of ex in em units
"displayAlign": 'center'     // default for indentalign when set to 'auto'
"displayIndent": '0'         // default for indentshift when set to 'auto'
"adaptiveCSS": true          // true means only produce CSS that is used in the processed equation
```

### Example

Cauchy's integral formula:

```
Let $U$ be an open subset of the complex plane $\mathbb{C}$, and suppose the closed disk
$D$ defined as
$$
D = \bigl\\{z:|z-z_{0}|\leq r\bigr\\}
$$
is completely contained in $U$. Let $f: U\to\mathbb{C}$ be a holomorphic function, and
let $\gamma$ be the circle, oriented counterclockwise, forming the boundary of $D$. Then
for every $a$ in the interior of $D$,
$$
f(a) = \frac{1}{2\pi i} \oint _{\gamma}\frac{f(z)}{z-a} dz.
$$
```

> Let $U$ be an open subset of the complex plane $\mathbb{C}$, and suppose the closed
> disk $D$ defined as
> $$
> D = \bigl\\{z:|z-z_{0}|\leq r\bigr\\}
> $$
> is completely contained in $U$. Let $f: U\to\mathbb{C}$ be a holomorphic function, and
> let $\gamma$ be the circle, oriented counterclockwise, forming the boundary of $D$.
> Then for every $a$ in the interior of $D$,
> $$
> f(a) = \frac{1}{2\pi i} \oint _{\gamma}\frac{f(z)}{z-a} dz.
> $$

With Purple Pi installed, the above is rendered as
<p align="center">
<img alt="purple-pi-screenhot" src="https://nschloe.github.io/purple-pi/purple-pi-screenshot.png" width="90%">
</p>


### Build instructions

To build the production zip, simply install the dependencies (`npm i`), then run
```
npm run build
```


### Development

```
npm install
npm run watch
```
The unpacked development version of the extension will then be in `dist/`. Open Google
Chrome, go to `chrome://extensions` and `Load unpacked` this directory. Reload as
necessary.


### Related projects

 * [Boris Gromov's Wikipedia with MathJax](https://github.com/bgromov/wiki-mathjax)
 * [Or Sharir's MathJax Plugin for Github](https://github.com/orsharir/github-mathjax)
 * [Ellis Michael's TeX All the Things](https://github.com/emichael/texthings)


### License
This software is published under the [GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).
