<p align="center">
  <a href="https://github.com/nschloe/purple-pi"><img alt="purple-pi" src="https://nschloe.github.io/purple-pi/logo-with-text.svg" width="60%"></a>
  <p align="center">LaTeX math wherever you want.</p>
</p>

[![Chrome Web Store version](https://img.shields.io/chrome-web-store/v/ingbbliecffofmmokknelnijicfcgolb)][cws]
[![chrome users](https://img.shields.io/chrome-web-store/users/ingbbliecffofmmokknelnijicfcgolb?label=Chrome%20users&logo=google-chrome&style=flat-square)](https://chrome.google.com/webstore/detail/purple-pi/ingbbliecffofmmokknelnijicfcgolb)

[![gh-actions](https://img.shields.io/github/workflow/status/nschloe/purple-pi/ci?style=flat-square)](https://github.com/nschloe/purple-pi/actions?query=workflow%3Aci)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Purple Pi is a browser extension for Google Chrome that renders LaTeX-style mathematics
on pages that don't otherwise support it. Examples are [GitHub
READMEs](https://github.com/nschloe/ndim#the-formulas) and
[Wikis](https://github.com/nschloe/purple-pi/wiki/Gallery) or [StackOverflow
posts](https://stackoverflow.com/a/63796209/353337).

Simply install the extension from the

  * [Chrome Web Store](https://chrome.google.com/webstore/detail/purple-pi/ingbbliecffofmmokknelnijicfcgolb)

and enjoy 

#### Cauchy's integral formula

Let $U$ be an open subset of the complex plane $\mathbb{C}$, and suppose the closed
disk $D$ defined as
$$
D = \bigl\\{z:|z-z_{0}|\leq r\bigr\\}
$$
is completely contained in $U$. Let $f: U\to\mathbb{C}$ be a holomorphic function, and
let $\gamma$ be the circle, oriented counterclockwise, forming the boundary of $D$.
Then for every $a$ in the interior of $D$,
$$
f(a) = \frac{1}{2\pi i} \oint _{\gamma}\frac{f(z)}{z-a} dz.
$$


### Authors

Purple Pi only runs on web pages which contain the _activation link_
```markdown
https://github.com/nschloe/purple-pi?activate
```
You can add as an `<a>` tag
```
Rendered with <a href="https://github.com/nschloe/purple-pi?activate">Purple Pi</a>.
```
or as a badge
```
[![purple-pi](https://img.shields.io/badge/Rendered%20with-Purple%20Pi-bd00ff?style=flat-square)](https://github.com/nschloe/purple-pi?activate)
```
The extension will then inject [KaTeX](https://katex.org/) into the page.
(The reason why Purple Pi uses links for activation is that you can use them almost
everywhere: GitHub pages, StackOverflow posts, etc.)

### Build instructions

To build the production zip, simply install the dependencies (`npm i`), then run
```
npm run build
```

### Development
```
npm ci
npm run watch
```
The unpacked development version of the extension will then be in `dist/`. Open Google
Chrome, go to `chrome://extensions` and `Load unpacked` this directory. Reload as
necessary.


### Related projects

 * [Boris Gromov's Wikipedia with MathJax](https://github.com/bgromov/wiki-mathjax)
 * [Or Sharir's MathJax Plugin for Github](https://github.com/orsharir/github-mathjax)
 * [Ellis Michael's TeX All the Things](https://github.com/emichael/texthings)
 * [Aaron Choo's KaTeX GitHub Chrome Extension](https://github.com/AaronCQL/katex-github-chrome-extension)


### License
This software is published under the [GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).
