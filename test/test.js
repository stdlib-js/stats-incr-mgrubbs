/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/assert-is-nan' );
var isPlainObject = require( '@stdlib/assert-is-plain-object' );
var isNumber = require( '@stdlib/assert-is-number' ).isPrimitive;
var isBoolean = require( '@stdlib/assert-is-boolean' ).isPrimitive;
var isString = require( '@stdlib/assert-is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert-is-function' );
var rnorm = require( '@stdlib/random-base-normal' );
var VENUS_SEMIDIAMETERS = require( '@stdlib/datasets-herndon-venus-semidiameters' );
var incrmmean = require( '@stdlib/stats-incr-mmean' );
var incrmstdev = require( '@stdlib/stats-incr-mstdev' );
var incrmmin = require( '@stdlib/stats-incr-mmin' );
var incrmmax = require( '@stdlib/stats-incr-mmax' );
var incrmgrubbs = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof incrmgrubbs, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if provided a window size which is not a positive integer', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5,
		0,
		3.14,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmgrubbs( value );
		};
	}
});

tape( 'the function throws an error if provided a window size which is less than 3', function test( t ) {
	var values;
	var i;

	values = [
		1,
		2
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), RangeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmgrubbs( value );
		};
	}
});

tape( 'the function throws an error if provided a window size which is not a positive integer (options)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5,
		0,
		3.14,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmgrubbs( value, {} );
		};
	}
});

tape( 'the function throws an error if provided a window size which is less than 3 (options)', function test( t ) {
	var values;
	var i;

	values = [
		1,
		2
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), RangeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmgrubbs( value, {} );
		};
	}
});

tape( 'the function throws an error if provided an options argument which is not an object', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmgrubbs( 20, value );
		};
	}
});

tape( 'the function throws an error if provided an invalid option', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		-5,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), Error, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			incrmgrubbs( 20, {
				'alpha': value
			});
		};
	}
});

tape( 'the function returns an accumulator function', function test( t ) {
	t.strictEqual( typeof incrmgrubbs( 20 ), 'function', 'returns a function' );
	t.end();
});

tape( 'the function returns an accumulator function (options)', function test( t ) {
	t.strictEqual( typeof incrmgrubbs( 20, {} ), 'function', 'returns a function' );
	t.end();
});

tape( 'the accumulator function incrementally performs a moving Grubbs\' test for outliers (two-sided)', function test( t ) {
	var stats;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	W = 20;

	opts = {
		'alpha': 0.00001
	};

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < 500; i++ ) {
		v = rnorm( 10.0, 5.0 );
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		r = acc( v );
		if ( r ) {
			t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
			t.strictEqual( isBoolean( r.rejected ), true, 'returns expected value' );
			t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
			t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
			t.strictEqual( r.min, stats.min(), 'returns expected value' );
			t.strictEqual( r.max, stats.max(), 'returns expected value' );
			t.strictEqual( r.df, W-2, 'returns expected value' );
			t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
			t.strictEqual( r.alt, 'two-sided', 'returns expected value' );
			t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
			t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
			t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
		}
	}
	t.end();
});

tape( 'the accumulator function incrementally performs a moving Grubbs\' test for outliers (max)', function test( t ) {
	var stats;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	W = 20;

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	opts = {
		'alpha': 0.00001,
		'alternative': 'max'
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < 500; i++ ) {
		v = rnorm( 10.0, 5.0 );
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		r = acc( v );
		if ( r ) {
			t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
			t.strictEqual( isBoolean( r.rejected ), true, 'returns expected value' );
			t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
			t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
			t.strictEqual( r.min, stats.min(), 'returns expected value' );
			t.strictEqual( r.max, stats.max(), 'returns expected value' );
			t.strictEqual( r.df, W-2, 'returns expected value' );
			t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
			t.strictEqual( r.alt, opts.alternative, 'returns expected value' );
			t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
			t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
			t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
		}
	}
	t.end();
});

tape( 'the accumulator function incrementally performs a moving Grubbs\' test for outliers (min)', function test( t ) {
	var stats;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	W = 20;

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	opts = {
		'alpha': 0.00001,
		'alternative': 'min'
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < 500; i++ ) {
		v = rnorm( 10.0, 5.0 );
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		r = acc( v );
		if ( r ) {
			t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
			t.strictEqual( isBoolean( r.rejected ), true, 'returns expected value' );
			t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
			t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
			t.strictEqual( r.min, stats.min(), 'returns expected value' );
			t.strictEqual( r.max, stats.max(), 'returns expected value' );
			t.strictEqual( r.df, W-2, 'returns expected value' );
			t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
			t.strictEqual( r.alt, opts.alternative, 'returns expected value' );
			t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
			t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
			t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
		}
	}
	t.end();
});

tape( 'the accumulator function can reject the null hypothesis (two-sided)', function test( t ) {
	var stats;
	var data;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	// 8 mass spectrometer measurements of a uranium isotope (see Tietjen and Moore. 1972. "Some Grubbs-Type Statistics for the Detection of Several Outliers".)
	data = [ 199.31, 199.53, 200.19, 200.82, 201.92, 201.95, 202.18, 245.57 ];

	W = data.length;

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	opts = {
		'alpha': 0.05,
		'alternative': 'two-sided'
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < data.length; i++ ) {
		v = data[ i ];
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		acc( v );
	}
	r = acc();
	t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
	t.strictEqual( r.rejected, true, 'returns expected value' );
	t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
	t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
	t.strictEqual( r.min, stats.min(), 'returns expected value' );
	t.strictEqual( r.max, stats.max(), 'returns expected value' );
	t.strictEqual( r.df, W-2, 'returns expected value' );
	t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
	t.strictEqual( r.alt, opts.alternative, 'returns expected value' );
	t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
	t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
	t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
	t.end();
});

tape( 'the accumulator function can reject the null hypothesis (max)', function test( t ) {
	var stats;
	var data;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	// 8 mass spectrometer measurements of a uranium isotope (see Tietjen and Moore. 1972. "Some Grubbs-Type Statistics for the Detection of Several Outliers".)
	data = [ 199.31, 199.53, 200.19, 200.82, 201.92, 201.95, 202.18, 245.57 ];

	W = data.length;

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	opts = {
		'alpha': 0.05,
		'alternative': 'max'
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < data.length; i++ ) {
		v = data[ i ];
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		acc( v );
	}
	r = acc();
	t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
	t.strictEqual( r.rejected, true, 'returns expected value' );
	t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
	t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
	t.strictEqual( r.min, stats.min(), 'returns expected value' );
	t.strictEqual( r.max, stats.max(), 'returns expected value' );
	t.strictEqual( r.df, W-2, 'returns expected value' );
	t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
	t.strictEqual( r.alt, opts.alternative, 'returns expected value' );
	t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
	t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
	t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
	t.end();
});

tape( 'the accumulator function can accept the null hypothesis (min)', function test( t ) {
	var stats;
	var data;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	// 8 mass spectrometer measurements of a uranium isotope (see Tietjen and Moore. 1972. "Some Grubbs-Type Statistics for the Detection of Several Outliers".)
	data = [ 199.31, 199.53, 200.19, 200.82, 201.92, 201.95, 202.18, 245.57 ];

	W = data.length;

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	opts = {
		'alpha': 0.05,
		'alternative': 'min'
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < data.length; i++ ) {
		v = data[ i ];
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		acc( v );
	}
	r = acc();
	t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
	t.strictEqual( r.rejected, false, 'returns expected value' );
	t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
	t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
	t.strictEqual( r.min, stats.min(), 'returns expected value' );
	t.strictEqual( r.max, stats.max(), 'returns expected value' );
	t.strictEqual( r.df, W-2, 'returns expected value' );
	t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
	t.strictEqual( r.alt, opts.alternative, 'returns expected value' );
	t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
	t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
	t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
	t.end();
});

tape( 'the accumulator function can reject the null hypothesis (two-sided)', function test( t ) {
	var stats;
	var data;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	data = VENUS_SEMIDIAMETERS(); // eslint-disable-line new-cap

	W = data.length;

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	opts = {
		'alpha': 0.05,
		'alternative': 'two-sided'
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < data.length; i++ ) {
		v = data[ i ];
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		acc( v );
	}
	r = acc();
	t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
	t.strictEqual( r.rejected, true, 'returns expected value' );
	t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
	t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
	t.strictEqual( r.min, stats.min(), 'returns expected value' );
	t.strictEqual( r.max, stats.max(), 'returns expected value' );
	t.strictEqual( r.df, W-2, 'returns expected value' );
	t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
	t.strictEqual( r.alt, opts.alternative, 'returns expected value' );
	t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
	t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
	t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
	t.end();
});

tape( 'the accumulator function can reject the null hypothesis (min)', function test( t ) {
	var stats;
	var data;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	data = VENUS_SEMIDIAMETERS(); // eslint-disable-line new-cap

	W = data.length;

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	opts = {
		'alpha': 0.05,
		'alternative': 'min'
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < data.length; i++ ) {
		v = data[ i ];
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		acc( v );
	}
	r = acc();
	t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
	t.strictEqual( r.rejected, true, 'returns expected value' );
	t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
	t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
	t.strictEqual( r.min, stats.min(), 'returns expected value' );
	t.strictEqual( r.max, stats.max(), 'returns expected value' );
	t.strictEqual( r.df, W-2, 'returns expected value' );
	t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
	t.strictEqual( r.alt, opts.alternative, 'returns expected value' );
	t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
	t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
	t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
	t.end();
});

tape( 'the accumulator function can accept the null hypothesis (max)', function test( t ) {
	var stats;
	var data;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	data = VENUS_SEMIDIAMETERS(); // eslint-disable-line new-cap

	W = data.length;

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	opts = {
		'alpha': 0.05,
		'alternative': 'max'
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < data.length; i++ ) {
		v = data[ i ];
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		acc( v );
	}
	r = acc();
	t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
	t.strictEqual( r.rejected, false, 'returns expected value' );
	t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
	t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
	t.strictEqual( r.min, stats.min(), 'returns expected value' );
	t.strictEqual( r.max, stats.max(), 'returns expected value' );
	t.strictEqual( r.df, W-2, 'returns expected value' );
	t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
	t.strictEqual( r.alt, opts.alternative, 'returns expected value' );
	t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
	t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
	t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
	t.end();
});

tape( 'if not provided an input value, the accumulator function returns the current test results', function test( t ) {
	var stats;
	var opts;
	var acc;
	var W;
	var v;
	var r;
	var i;

	W = 20;

	stats = {
		'mean': incrmmean( W ),
		'sd': incrmstdev( W ),
		'min': incrmmin( W ),
		'max': incrmmax( W )
	};
	opts = {
		'alpha': 0.10,
		'alternative': 'max'
	};
	acc = incrmgrubbs( W, opts );
	for ( i = 0; i < 100; i++ ) {
		v = rnorm( 10.0, 5.0 );
		stats.mean( v );
		stats.sd( v );
		stats.min( v );
		stats.max( v );
		acc( v );
	}
	r = acc();
	t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
	t.strictEqual( isBoolean( r.rejected ), true, 'returns expected value' );
	t.strictEqual( r.mean, stats.mean(), 'returns expected value' );
	t.strictEqual( r.sd, stats.sd(), 'returns expected value' );
	t.strictEqual( r.min, stats.min(), 'returns expected value' );
	t.strictEqual( r.max, stats.max(), 'returns expected value' );
	t.strictEqual( r.df, W-2, 'returns expected value' );
	t.strictEqual( r.alpha, opts.alpha, 'returns expected value' );
	t.strictEqual( r.alt, opts.alternative, 'returns expected value' );
	t.strictEqual( isNumber( r.statistic ), true, 'returns expected value' );
	t.strictEqual( isNumber( r.criticalValue ), true, 'returns expected value' );
	t.strictEqual( r.method, 'Grubbs\' Test', 'returns expected value' );
	t.end();
});

tape( 'if provided a `NaN`, the accumulator function returns `NaN` for the test statistic', function test( t ) {
	var acc;
	var r;
	var i;

	acc = incrmgrubbs( 3 );
	acc( rnorm( 10.0, 5.0 ) );
	acc( rnorm( 10.0, 5.0 ) );
	acc( rnorm( 10.0, 5.0 ) );

	r = acc( NaN );
	t.strictEqual( isnan( r.statistic ), true, 'returns NaN' );
	t.strictEqual( isnan( r.mean ), true, 'returns NaN' );
	t.strictEqual( isnan( r.sd ), true, 'returns NaN' );
	t.strictEqual( isnan( r.min ), true, 'returns NaN' );
	t.strictEqual( isnan( r.max ), true, 'returns NaN' );

	r = acc();
	t.strictEqual( isnan( r.statistic ), true, 'returns NaN' );
	t.strictEqual( isnan( r.mean ), true, 'returns NaN' );
	t.strictEqual( isnan( r.sd ), true, 'returns NaN' );
	t.strictEqual( isnan( r.min ), true, 'returns NaN' );
	t.strictEqual( isnan( r.max ), true, 'returns NaN' );

	r = acc( rnorm( 10.0, 5.0 ) );
	t.strictEqual( isnan( r.statistic ), true, 'returns NaN' );
	t.strictEqual( isnan( r.mean ), true, 'returns NaN' );
	t.strictEqual( isnan( r.sd ), true, 'returns NaN' );
	t.strictEqual( isnan( r.min ), true, 'returns NaN' );
	t.strictEqual( isnan( r.max ), true, 'returns NaN' );

	r = acc( rnorm( 10.0, 5.0 ) );
	t.strictEqual( isnan( r.statistic ), true, 'returns NaN' );
	t.strictEqual( isnan( r.mean ), true, 'returns NaN' );
	t.strictEqual( isnan( r.sd ), true, 'returns NaN' );
	t.strictEqual( isnan( r.min ), true, 'returns NaN' );
	t.strictEqual( isnan( r.max ), true, 'returns NaN' );

	for ( i = 0; i < 100; i++ ) {
		r = acc( rnorm( 10.0, 5.0 ) );
		t.strictEqual( isnan( r.statistic ), false, 'does not return NaN' );
		t.strictEqual( isnan( r.mean ), false, 'does not return NaN' );
		t.strictEqual( isnan( r.sd ), false, 'does not return NaN' );
		t.strictEqual( isnan( r.min ), false, 'does not return NaN' );
		t.strictEqual( isnan( r.max ), false, 'does not return NaN' );
	}
	t.end();
});

tape( 'if the accumulator function has not been provided any data, the accumulator function returns `null`', function test( t ) {
	var acc = incrmgrubbs( 20 );
	t.strictEqual( acc(), null, 'returns expected value' );
	t.end();
});

tape( 'if the accumulator function has not been provided an initial number of data points, the accumulator function returns `null`', function test( t ) {
	var acc;
	var r;
	var i;

	acc = incrmgrubbs( 20 );
	for ( i = 0; i < 19; i++ ) {
		r = acc( rnorm( 10.0, 5.0 ) );
		t.strictEqual( r, null, 'returns expected value' );
	}
	r = acc( rnorm( 10.0, 5.0 ) );
	t.strictEqual( isPlainObject( r ), true, 'returns expected value' );
	t.end();
});

tape( 'the accumulator function returns a results object with a print method (two-sided)', function test( t ) {
	var opts;
	var acc;
	var r;
	var i;

	opts = {
		'alternative': 'two-sided'
	};
	acc = incrmgrubbs( 20, opts );
	for ( i = 0; i < 100; i++ ) {
		r = acc( rnorm( 10.0, 5.0 ) );
		if ( r ) {
			t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
			t.strictEqual( isString( r.print() ), true, 'returns expected value' );
		}
	}
	r = acc();
	t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
	t.strictEqual( isString( r.print() ), true, 'returns expected value' );
	t.end();
});

tape( 'the accumulator function returns a results object with a print method (max)', function test( t ) {
	var opts;
	var acc;
	var r;
	var i;

	opts = {
		'alternative': 'max'
	};
	acc = incrmgrubbs( 20, opts );
	for ( i = 0; i < 100; i++ ) {
		r = acc( rnorm( 10.0, 5.0 ) );
		if ( r ) {
			t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
			t.strictEqual( isString( r.print() ), true, 'returns expected value' );
		}
	}
	r = acc();
	t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
	t.strictEqual( isString( r.print() ), true, 'returns expected value' );
	t.end();
});

tape( 'the accumulator function returns a results object with a print method (min)', function test( t ) {
	var opts;
	var acc;
	var r;
	var i;

	opts = {
		'alternative': 'min'
	};
	acc = incrmgrubbs( 20, opts );
	for ( i = 0; i < 100; i++ ) {
		r = acc( rnorm( 10.0, 5.0 ) );
		if ( r ) {
			t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
			t.strictEqual( isString( r.print() ), true, 'returns expected value' );
		}
	}
	r = acc();
	t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
	t.strictEqual( isString( r.print() ), true, 'returns expected value' );
	t.end();
});

tape( 'the accumulator function returns a results object with a print method (known outlier)', function test( t ) {
	var opts;
	var data;
	var acc;
	var r;
	var i;

	// 8 mass spectrometer measurements of a uranium isotope (see Tietjen and Moore. 1972. "Some Grubbs-Type Statistics for the Detection of Several Outliers".)
	data = [ 199.31, 199.53, 200.19, 200.82, 201.92, 201.95, 202.18, 245.57 ];

	opts = {
		'alternative': 'two-sided'
	};
	acc = incrmgrubbs( data.length, opts );
	for ( i = 0; i < data.length; i++ ) {
		r = acc( data[ i ] );
		if ( r ) {
			t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
			t.strictEqual( isString( r.print() ), true, 'returns expected value' );
		}
	}
	r = acc();
	t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
	t.strictEqual( isString( r.print() ), true, 'returns expected value' );
	t.end();
});

tape( 'the accumulator function returns a results object with a print method which supports specifying a `decision` option indicating whether to print the test decision', function test( t ) {
	var popts;
	var opts;
	var data;
	var acc;
	var r;
	var i;

	// 8 mass spectrometer measurements of a uranium isotope (see Tietjen and Moore. 1972. "Some Grubbs-Type Statistics for the Detection of Several Outliers".)
	data = [ 199.31, 199.53, 200.19, 200.82, 201.92, 201.95, 202.18, 245.57 ];

	opts = {
		'alternative': 'two-sided'
	};
	popts = {
		'decision': false
	};
	acc = incrmgrubbs( 5, opts );
	for ( i = 0; i < data.length; i++ ) {
		r = acc( data[ i ] );
		if ( r ) {
			t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
			popts.decision = ( (i%2) === 0 );
			t.strictEqual( isString( r.print( popts ) ), true, 'returns expected value' );
		}
	}
	r = acc();
	t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
	t.strictEqual( isString( r.print( popts ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the accumulator function returns a results object with a print method which supports specifying a `digits` option indicating the number of digits to include after the decimal point for numeric values', function test( t ) {
	var popts;
	var opts;
	var data;
	var acc;
	var r;
	var i;

	// 8 mass spectrometer measurements of a uranium isotope (see Tietjen and Moore. 1972. "Some Grubbs-Type Statistics for the Detection of Several Outliers".)
	data = [ 199.31, 199.53, 200.19, 200.82, 201.92, 201.95, 202.18, 245.57 ];

	opts = {
		'alternative': 'two-sided'
	};
	popts = {
		'digits': 10
	};
	acc = incrmgrubbs( 5, opts );
	for ( i = 0; i < data.length; i++ ) {
		r = acc( data[ i ] );
		if ( r ) {
			t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
			t.strictEqual( isString( r.print( popts ) ), true, 'returns expected value' );
		}
	}
	r = acc();
	t.strictEqual( isFunction( r.print ), true, 'returns expected value' );
	t.strictEqual( isString( r.print( popts ) ), true, 'returns expected value' );
	t.end();
});

tape( 'the accumulator function returns a results object with a print method which throws if provided an options argument which is not an object', function test( t ) {
	var values;
	var acc;
	var r;
	var i;

	acc = incrmgrubbs( 20 );
	for ( i = 0; i < 100; i++ ) {
		acc( rnorm( 10.0, 5.0 ) );
	}
	r = acc();

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			r.print( value );
		};
	}
});

tape( 'the accumulator function returns a results object with a print method which throws if provided a `digits` option which is not a positive integer', function test( t ) {
	var values;
	var acc;
	var r;
	var i;

	acc = incrmgrubbs( 20 );
	for ( i = 0; i < 100; i++ ) {
		acc( rnorm( 10.0, 5.0 ) );
	}
	r = acc();

	values = [
		'5',
		-5,
		0,
		3.14,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var opts = {
				'digits': value
			};
			r.print( opts );
		};
	}
});

tape( 'the accumulator function returns a results object with a print method which throws if provided a `decision` option which is not a boolean', function test( t ) {
	var values;
	var acc;
	var r;
	var i;

	acc = incrmgrubbs( 20 );
	for ( i = 0; i < 100; i++ ) {
		acc( rnorm( 10.0, 5.0 ) );
	}
	r = acc();

	values = [
		'5',
		5,
		NaN,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var opts = {
				'decision': value
			};
			r.print( opts );
		};
	}
});
