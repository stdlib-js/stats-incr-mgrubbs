<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# incrmgrubbs

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Moving [Grubbs' test][grubbs-test] for outliers.

<section class="intro">

[Grubbs' test][grubbs-test] (also known as the **maximum normalized residual test** or **extreme studentized deviate test**) is a statistical test used to detect outliers in a univariate dataset assumed to come from a normally distributed population. [Grubbs' test][grubbs-test] is defined for the hypothesis:

-   **H_0**: the dataset does **not** contain outliers.
-   **H_1**: the dataset contains **exactly** one outlier.

For a window of size `W`, the [Grubbs' test][grubbs-test] statistic for a two-sided alternative hypothesis is defined as

<!-- <equation class="equation" label="eq:grubbs_test_statistic" align="center" raw="G = \frac{\max_{i=0,\ldots,W-1} |Y_i - \bar{Y}|}{s}" alt="Grubbs' test statistic."> -->

```math
G = \frac{\max_{i=0,\ldots,W-1} |Y_i - \bar{Y}|}{s}
```

<!-- <div class="equation" align="center" data-raw-text="G = \frac{\max_{i=0,\ldots,W-1} |Y_i - \bar{Y}|}{s}" data-equation="eq:grubbs_test_statistic">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@d157db87026794d6fab579039be09a8916cad4e0/lib/node_modules/@stdlib/stats/incr/mgrubbs/docs/img/equation_grubbs_test_statistic.svg" alt="Grubbs' test statistic.">
    <br>
</div> -->

<!-- </equation> -->

where `s` is the sample standard deviation. The [Grubbs test][grubbs-test] statistic is thus the largest absolute deviation from the sample mean in units of the sample standard deviation.

The [Grubbs' test][grubbs-test] statistic for the alternative hypothesis that the minimum value is an outlier is defined as

<!-- <equation class="equation" label="eq:grubbs_test_statistic_min" align="center" raw="G = \frac{\bar{Y} - Y_{\textrm{min}}}{s}" alt="Grubbs' test statistic for testing whether the minimum value is an outlier."> -->

```math
G = \frac{\bar{Y} - Y_{\textrm{min}}}{s}
```

<!-- <div class="equation" align="center" data-raw-text="G = \frac{\bar{Y} - Y_{\textrm{min}}}{s}" data-equation="eq:grubbs_test_statistic_min">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@d157db87026794d6fab579039be09a8916cad4e0/lib/node_modules/@stdlib/stats/incr/mgrubbs/docs/img/equation_grubbs_test_statistic_min.svg" alt="Grubbs' test statistic for testing whether the minimum value is an outlier.">
    <br>
</div> -->

<!-- </equation> -->

The [Grubbs' test][grubbs-test] statistic for the alternative hypothesis that the maximum value is an outlier is defined as

<!-- <equation class="equation" label="eq:grubbs_test_statistic_max" align="center" raw="G = \frac{Y_{\textrm{max}} - \bar{Y}}{s}" alt="Grubbs' test statistic for testing whether the maximum value is an outlier."> -->

```math
G = \frac{Y_{\textrm{max}} - \bar{Y}}{s}
```

<!-- <div class="equation" align="center" data-raw-text="G = \frac{Y_{\textrm{max}} - \bar{Y}}{s}" data-equation="eq:grubbs_test_statistic_max">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@d157db87026794d6fab579039be09a8916cad4e0/lib/node_modules/@stdlib/stats/incr/mgrubbs/docs/img/equation_grubbs_test_statistic_max.svg" alt="Grubbs' test statistic for testing whether the maximum value is an outlier.">
    <br>
</div> -->

<!-- </equation> -->

For a two-sided test, the hypothesis that a dataset does **not** contain an outlier is rejected at significance level α if

<!-- <equation class="equation" label="eq:grubbs_test_two_sided" align="center" raw="G > \frac{W-1}{\sqrt{W}} \sqrt{\frac{t^2_{\alpha/(2W),W-2}}{W - 2 + t^2_{\alpha/(2W),W-2}}}" alt="Two-sided Grubbs' test."> -->

```math
G > \frac{W-1}{\sqrt{W}} \sqrt{\frac{t^2_{\alpha/(2W),W-2}}{W - 2 + t^2_{\alpha/(2W),W-2}}}
```

<!-- <div class="equation" align="center" data-raw-text="G > \frac{W-1}{\sqrt{W}} \sqrt{\frac{t^2_{\alpha/(2W),W-2}}{W - 2 + t^2_{\alpha/(2W),W-2}}}" data-equation="eq:grubbs_test_two_sided">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@d157db87026794d6fab579039be09a8916cad4e0/lib/node_modules/@stdlib/stats/incr/mgrubbs/docs/img/equation_grubbs_test_two_sided.svg" alt="Two-sided Grubbs' test.">
    <br>
</div> -->

<!-- </equation> -->

where `t` denotes the upper critical value of the _t_-distribution with `W-2` degrees of freedom and a significance level of `α/(2W)`.

For a one-sided test, the hypothesis that a dataset does **not** contain an outlier is rejected at significance level α if

<!-- <equation class="equation" label="eq:grubbs_test_one_sided" align="center" raw="G > \frac{W-1}{\sqrt{W}} \sqrt{\frac{t^2_{\alpha/W,W-2}}{W - 2 + t^2_{\alpha/W,W-2}}}" alt="One-sided Grubbs' test."> -->

```math
G > \frac{W-1}{\sqrt{W}} \sqrt{\frac{t^2_{\alpha/W,W-2}}{W - 2 + t^2_{\alpha/W,W-2}}}
```

<!-- <div class="equation" align="center" data-raw-text="G > \frac{W-1}{\sqrt{W}} \sqrt{\frac{t^2_{\alpha/W,W-2}}{W - 2 + t^2_{\alpha/W,W-2}}}" data-equation="eq:grubbs_test_one_sided">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@d157db87026794d6fab579039be09a8916cad4e0/lib/node_modules/@stdlib/stats/incr/mgrubbs/docs/img/equation_grubbs_test_one_sided.svg" alt="One-sided Grubbs' test.">
    <br>
</div> -->

<!-- </equation> -->

where `t` denotes the upper critical value of the _t_-distribution with `W-2` degrees of freedom and a significance level of `α/W`.

</section>

<!-- /.intro -->

<section class="installation">

## Installation

```bash
npm install @stdlib/stats-incr-mgrubbs
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var incrmgrubbs = require( '@stdlib/stats-incr-mgrubbs' );
```

#### incrmgrubbs( window\[, options] )

Returns an accumulator `function` which incrementally performs [Grubbs' test][grubbs-test] for outliers. The `window` parameter defines the number of values over which to perform [Grubbs' test][grubbs-test].

```javascript
var accumulator = incrmgrubbs( 20 );
```

The function accepts the following `options`:

-   **alpha**: significance level. Default: `0.05`.

-   **alternative**: alternative hypothesis. The option may be one of the following values:

    -   `'two-sided'`: test whether the minimum or maximum value is an outlier.
    -   `'min'`: test whether the minimum value is an outlier.
    -   `'max'`: test whether the maximum value is an outlier.

    Default: `'two-sided'`.

#### accumulator( \[x] )

If provided an input value `x`, the accumulator function returns updated test results. If not provided an input value `x`, the accumulator function returns the current test results.

```javascript
var rnorm = require( '@stdlib/random-base-normal' );

var accumulator = incrmgrubbs( 3 );

var results = accumulator( rnorm( 10.0, 5.0 ) );
// returns null

results = accumulator( rnorm( 10.0, 5.0 ) );
// returns null

results = accumulator( rnorm( 10.0, 5.0 ) );
// returns <Object>

results = accumulator();
// returns <Object>
```

The accumulator function returns an `object` having the following fields:

-   **rejected**: boolean indicating whether the null hypothesis should be rejected.
-   **alpha**: significance level.
-   **criticalValue**: critical value.
-   **statistic**: test statistic.
-   **df**: degrees of freedom.
-   **mean**: sample mean.
-   **sd**: corrected sample standard deviation.
-   **min**: minimum value.
-   **max**: maximum value.
-   **alt**: alternative hypothesis.
-   **method**: method name.
-   **print**: method for pretty-printing test output.

The `print` method accepts the following options:

-   **digits**: number of digits after the decimal point. Default: `4`.
-   **decision**: `boolean` indicating whether to print the test decision. Default: `true`.

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   [Grubbs' test][grubbs-test] **assumes** that data is normally distributed. Accordingly, one should first **verify** that the data can be _reasonably_ approximated by a normal distribution before applying the [Grubbs' test][grubbs-test].
-   The minimum `window` size is `3`. In general, the larger the `window`, the more robust outlier detection will be. However, larger windows entail increased memory consumption.
-   Until `window` values have been provided, the accumulator returns `null`.
-   Input values are **not** type checked. If provided `NaN` or a value which, when used in computations, results in `NaN`, the accumulated test statistic is `NaN` for **at least** `W-1` future invocations. If non-numeric inputs are possible, you are advised to type check and handle accordingly **before** passing the value to the accumulator function.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var sensorData = require( '@stdlib/datasets-suthaharan-single-hop-sensor-network' );
var incrmgrubbs = require( '@stdlib/stats-incr-mgrubbs' );

var data;
var opts;
var acc;
var N;
var r;
var i;

// Get a test dataset:
data = sensorData();
N = 0;
for ( i = 0; i < data.length; i++ ) {
    if ( data[ i ].mote_id === 1 ) {
        N += 1;
        data[ i ] = data[ i ].temperature;
    }
}
data.length = N;

// Create a new accumulator which analyzes the last 5 minutes of data:
opts = {
    'alternative': 'two-sided'
};
acc = incrmgrubbs( 60, opts );

// Update the accumulator:
for ( i = 0; i < data.length; i++ ) {
    r = acc( data[ i ] );
    if ( r && r.rejected ) {
        console.log( 'Index: %d', i );
        console.log( '' );
        console.log( r.print() );
    }
}
```

</section>

<!-- /.examples -->

<section class="references">

* * *

## References

-   Grubbs, Frank E. 1950. "Sample Criteria for Testing Outlying Observations." _The Annals of Mathematical Statistics_ 21 (1). The Institute of Mathematical Statistics: 27–58. doi:[10.1214/aoms/1177729885][@grubbs:1950a].
-   Grubbs, Frank E. 1969. "Procedures for Detecting Outlying Observations in Samples." _Technometrics_ 11 (1). Taylor & Francis: 1–21. doi:[10.1080/00401706.1969.10490657][@grubbs:1969a].    

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/stats-incr/grubbs`][@stdlib/stats/incr/grubbs]</span><span class="delimiter">: </span><span class="description">grubbs' test for outliers.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-incr-mgrubbs.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-incr-mgrubbs

[test-image]: https://github.com/stdlib-js/stats-incr-mgrubbs/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/stats-incr-mgrubbs/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-incr-mgrubbs/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-incr-mgrubbs?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-incr-mgrubbs.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-incr-mgrubbs/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-incr-mgrubbs/tree/deno
[deno-readme]: https://github.com/stdlib-js/stats-incr-mgrubbs/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/stats-incr-mgrubbs/tree/umd
[umd-readme]: https://github.com/stdlib-js/stats-incr-mgrubbs/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/stats-incr-mgrubbs/tree/esm
[esm-readme]: https://github.com/stdlib-js/stats-incr-mgrubbs/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/stats-incr-mgrubbs/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-incr-mgrubbs/main/LICENSE

[grubbs-test]: https://en.wikipedia.org/wiki/Grubbs%27_test_for_outliers

[@grubbs:1950a]: https://doi.org/10.1214/aoms/1177729885

[@grubbs:1969a]: https://doi.org/10.1080/00401706.1969.10490657

<!-- <related-links> -->

[@stdlib/stats/incr/grubbs]: https://github.com/stdlib-js/stats-incr-grubbs

<!-- </related-links> -->

</section>

<!-- /.links -->
