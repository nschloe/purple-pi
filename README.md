<p align="center">
  <a href="https://github.com/nschloe/green-pi"><img alt="green-pi" src="https://nschloe.github.io/green-pi/logo-with-text.svg" width="60%"></a>
  <p align="center">Beautiful math wherever you want.</p>
</p>

[![gh-actions](https://img.shields.io/github/workflow/status/nschloe/green-pi/ci?style=flat-square)](https://github.com/nschloe/green-pi/actions?query=workflow%3Aci)
[![chrome users](https://img.shields.io/chrome-web-store/users/ingbbliecffofmmokknelnijicfcgolb?label=Chrome%20users&logo=google-chrome&style=flat-square)](https://chrome.google.com/webstore/detail/green-pi/ingbbliecffofmmokknelnijicfcgolb)
[![firefox users](https://img.shields.io/amo/users/green-pi?label=Firefox%20users&logo=mozilla-firefox&style=flat-square)](https://addons.mozilla.org/en-US/firefox/addon/green-pi)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Green Pi is a browser extension that, once installed, renders LaTeX-style mathematics on
pages that don't otherwise render math, like GitHub.

Get Green Pi for

  * [Chrome](https://chrome.google.com/webstore/detail/green-pi/ingbbliecffofmmokknelnijicfcgolb)
  * [Firefox](https://addons.mozilla.org/en-US/firefox/addon/green-pi)

For example Cauchy's integral formula:

```
Let \\(U\\) be an open subset of the complex plane \\(\mathbb{C}\\), and suppose the
closed disk \\(D\\) defined as
$$
D = \bigl\\{z:|z-z_{0}|\leq r\bigr\\}
$$
is completely contained in \\(U\\). Let \\(f: U\to\mathbb{C}\\) be a holomorphic
function, and let \\(\gamma\\) be the circle, oriented counterclockwise, forming the
boundary of \\(D\\). Then for every \\(a\\) in the interior of \\(D\\),
$$
f(a) = \frac{1}{2\pi i} \oint _{\gamma}\frac{f(z)}{z-a} dz.
$$
```
> Let \\(U\\) be an open subset of the complex plane \\(\mathbb{C}\\), and suppose the
> closed disk \\(D\\) defined as
> $$
> D = \bigl\\{z:|z-z_{0}|\leq r\bigr\\}
> $$
> is completely contained in \\(U\\). Let \\(f: U\to\mathbb{C}\\) be a holomorphic
> function, and let \\(\gamma\\) be the circle, oriented counterclockwise, forming the
> boundary of \\(D\\). Then for every \\(a\\) in the interior of \\(D\\),
> $$
> f(a) = \frac{1}{2\pi i} \oint _{\gamma}\frac{f(z)}{z-a} dz.
> $$

With Green Pi installed, the above is rendered as
<p align="center">
<img alt="green-pi-screenhot" src="https://nschloe.github.io/green-pi/green-pi-screenshot.png" width="90%">
</p>


### Build instructions

To build the production zip, simply install the dependencies (`npm i`), then run
```
npm run build
```


### Related projects

 * [Boris Gromov's Wikipedia with MathJax](https://github.com/bgromov/wiki-mathjax)
 * [Or Sharir's MathJax Plugin for Github](https://github.com/orsharir/github-mathjax)
 * [Ellis Michael's TeX All the Things](https://github.com/emichael/texthings)


### License
This software is published under the [GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).
