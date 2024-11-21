/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/
function css_browser_selector(u) {
	var ua = u.toLowerCase(),
		is = function(t) {
			return ua.indexOf(t) > -1
		},
		g = 'gecko',
		w = 'webkit',
		s = 'safari',
		c = 'chrome',
		o = 'opera',
		m = 'mobile',
		d = 'desktop',
		n = 'naver',
		k = 'kakao',
		sb = 'samsungbrowser',
		v = 0,
		r = window.devicePixelRatio ? (window.devicePixelRatio + '').replace('.', '_') : '1';
	var res = [
		/* IE */
		(!(/opera|webtv/.test(ua)) && /msie\s(\d+)/.test(ua) && (v = RegExp.$1 * 1)) ?
			('ie ie' + v + ((v == 6 || v == 7) ?
				' ie67 ie678 ie6789' : (v == 8) ?
				' ie678 ie6789' : (v == 9) ?
				' ie6789 ie9m' : (v > 9 ) ?
				' ie9m' : '')) :
			/* EDGE */
			(/edge\/(\d+)\.(\d+)/.test(ua) && (v = [RegExp.$1, RegExp.$2])) ?
			'ie ie' + v[0] + ' ie' + v[0] + '_' + v[1] + ' ie9m edge' :
				/* IE 11 */
				(/trident\/\d+.*?;\s*rv:(\d+)\.(\d+)\)/.test(ua) && (v = [RegExp.$1, RegExp.$2])) ?
					'ie ie' + v[0] + ' ie' + v[0] + '_' + v[1] + ' ie9m' :
					/* FF */
					(/firefox\/(\d+)\.(\d+)/.test(ua) && (re = RegExp)) ?
						g + ' ff ff' + re.$1 + ' ff' + re.$1 + '_' + re.$2 :
						is('gecko/') ? g :
							/* Opera - old */
							is(o) ? 'old' + o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 :
								(/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) :
								/* K */
								is('konqueror') ? 'konqueror' :
									/* Black Berry */
									is('blackberry') ? m + ' blackberry' :
										/* Chrome */
										(is(c) || is('crios')) ? w + ' ' + c :
											/* Iron */
												is('iron') ? w + ' iron' :
													/* Safari */
													!is('cpu os') && is('applewebkit/') ? w + ' ' + s :
														/* Mozilla */
														is('mozilla/') ? g : '',
		/* Android */
		is('android') ? m + ' android' : '',
		/* Tablet */
		is('tablet') ? 'tablet' : '',
		/* blink or webkit engine browsers */
			/* Opera */
			is('opr/') ? o : '',
			/* Yandex */
			is('yabrowser') ? 'yandex' : '',
		/* Machine */
		is('j2me') ? m + ' j2me' :
			is('ipad; u; cpu os') ? m + ' chrome android tablet' :
				is('ipad;u;cpu os') ? m + ' chromedef android tablet' :
					is('iphone') ? m + ' ios iphone' :
						is('ipod') ? m + ' ios ipod' :
							is('ipad') ? m + ' ios ipad tablet' :
								(is('mac') && navigator.maxTouchPoints > 1 ) ? m + ' ios ipad tablet' :
									is('mac') ? d + ' mac' :
										is('darwin') ? d + ' mac' :
											is('webtv') ? 'webtv' :
												is('win') ? d + ' win' + (is('windows nt 6.0') ? ' vista' : '') :
													is('freebsd') ? d + ' freebsd' :
														(is('x11') || ( ! is( 'android' ) && is('linux')) ) ? d + ' linux' : '',
		/* Naver, Kakao check */
		is('naver') ? n :
			is('kakao') ? k : '',
                is('samsungbrowser') ? sb : '',
		/* Ratio (Retina) */
		(r != '1') ? ' retina ratio' + r : '',
		'js '].join(' ');
	if(window.jQuery && !window.jQuery.browser) {
		window.jQuery.browser = v ? {msie: 1, version: v} : {};
	}
	return res;
};
(function(d, w) {
	var _c = css_browser_selector(navigator.userAgent);
	var h = d.documentElement;
	h.className += ' ' + _c;
	var _d = _c.replace(/^\s*|\s*$/g, '').split(/ +/);
	w.CSSBS = 1;
	for(var i = 0; i < _d.length; i++) {
		w['CSSBS_' + _d[i]] = 1;
	}
	var _de = function(v) {
		return d.documentElement[v] || d.body[v];
	}

})(document, window);