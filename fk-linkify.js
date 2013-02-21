define([
	'underscore'
], function(_) {

	var Linkify = {
		/**
		 * turns twitter style username refs ('@username') into links
		 * by default, the template used is <a href="http://twitter.com/#username#">@#username#<a/>
		 * pass the second param to give it a custom template
		 *
		 * @param {string} str
		 * @param {string} tpl  default is '<a href="http://twitter.com/#username#">@#username#</a>'
		 * @return {string}
		 * @member sc.helpers
		 */
		linkUsername: function(str, tplstr) {
			if (!tplstr) {
				tplstr = '<a href="http://twitter.com/<%= username %>">@<%= username %></a>';
			}
			tpl = tmpl(tplstr);

			var re_uname = /(^|\s|\(\[|,|\.|\()@([a-zA-Z0-9_]+)([^a-zA-Z0-9_]|$)/gi;

			var ms = [];
			while ((ms = re_uname.exec(str))) {
				/*
					sometimes we can end up with a null instead of a blank string,
					so we need to force the issue in javascript.
				*/
				for (var x=0; x<ms.length; x++) {
					if (!ms[x]) {
						ms[x] = '';
					}
				}

				var repl_tpl = tpl({'username':ms[2]});
				str = str.replace(ms[0], ms[1]+repl_tpl+ms[3]);

			}
			return str;
		},

		/**
		 * This is a port of the CodeIgniter helper "autolink" to javascript.
		 * It finds and links both web addresses and email addresses. It will ignore
		 * links within HTML (as attributes or between tag pairs)
		 *
		 * @param {string} str
		 * @param {string} type  'email', 'url', or 'both' (default is 'both')
		 * @param {boolean} extra_code  a string that will be inserted verbatim into <a> tag
		 * @param {integer} maxlen  the maximum length the link description can be (the string inside the <a></a> tag)
		 * @return {string}
		 * @member sc.helpers
		 **/
		linkUrl: function(str, type, extra_code, maxlen) {
			if (!type) {
				type = 'both';
			}

			var re_nohttpurl = /((^|\s)(www\.)?([a-zA-Z_\-]+\.)(com|net|org|uk)($|\s))/gi;

			var re_noemail = /(^|[\s\(:。])((http(s?):\/\/)|(www\.))([\w✪]+[^\s\)<]+)/gi;
			var re_nourl   = /(^|\s|\()([a-zA-Z0-9_\.\-\+]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-\.]*)([^\s\)<]+)/gi;

			var x, ms, period = '';

			var desc;
			var newstr;

			if (type !== 'email') {
				while ((ms = re_nohttpurl.exec(str))) { // look for URLs without a preceding "http://"
					/*
						sometimes we can end up with a null instead of a blank string,
						so we need to force the issue in javascript.
					*/
					for (x=0; x<ms.length; x++) {
						if (!ms[x]) {
							ms[x] = '';
						}
					}

					if (extra_code) {
						extra_code = ' '+extra_code;
					} else {
						extra_code = '';
					}

					desc = ms[3]+ms[4]+ms[5];

					if (maxlen && maxlen > 0 && desc.length > maxlen) {
						desc = desc.substr(0, maxlen)+'...';
					}

					newstr = ms[2]+'<a href="http://'+ms[3]+ms[4]+ms[5]+'"'+extra_code+'>'+desc+'</a>'+ms[6];
					str = str.replace(ms[0], newstr);
				}


				while ((ms = re_noemail.exec(str))) {

					/*
						sometimes we can end up with a null instead of a blank string,
						so we need to force the issue in javascript.
					*/
					for (x=0; x<ms.length; x++) {
						if (!ms[x]) {
							ms[x] = '';
						}
					}

					if (extra_code) {
						extra_code = ' '+extra_code;
					} else {
						extra_code = '';
					}

					/*
						if the last character is one of . , ; ?, we strip it off and
						stick it on the end of newstr below as "period"
					*/
					var last = ms[6].charAt(ms[6].length - 1);
					if (last.search(/[\.,;\?]/) !== -1) {
						ms[6] = ms[6].slice(0,-1);
						period = last;
					}


					desc = ms[5]+ms[6];

					if (maxlen && maxlen > 0 && desc.length > maxlen) {
						desc = desc.substr(0, maxlen)+'...';
					}


					newstr = ms[1]+'<a href="http'+ms[4]+'://'+ms[5]+ms[6]+'"'+extra_code+'>'+desc+'</a>'+period;
					str = str.replace(ms[0], newstr);
				}
			}

			if (type !== 'url')
			{
				while ((ms = re_nourl.exec(str)))
				{
					period = '';
					if ( /\./.test(ms[5]) ) {
						period = '.';
						ms[5] = ms[5].slice(0, -1);
					}

					/*
						sometimes we can end up with a null instead of a blank string,
						so we need to force the issue in javascript.
					*/
					for (x=0; x<ms.length; x++) {
						if (!ms[x]) {
							ms[x] = '';
						}
					}
					str = str.replace(ms[0], ms[1]+'<a href="mailto:'+ms[2]+'@'+ms[3]+'.'+ms[4]+ms[5]+'">'+ms[2]+'@'+ms[3]+'.'+ms[4]+ms[5]+'</a>'+period);
				}
			}

			return str;
		}
	};

	// Simple JavaScript Templating
	// John Resig - http://ejohn.org/ - MIT Licensed
	var cache = {};

	function tmpl(str, data) {
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] ||
			tmpl(document.getElementById(str).innerHTML) :

			// Generate a reusable function that will serve as a template
			// generator (and which will be cached).
			new Function("obj",
			"var p=[],print=function(){p.push.apply(p,arguments);};" +

			// Introduce the data as local variables using with(){}
			"with(obj){p.push('" +

			// Convert the template into pure JavaScript
			str
			.replace(/[\r\t\n]/g, " ")
			.split("<%").join("\t")
			.replace(/((^|%>)[^\t]*)'/g, "$1\r")
			.replace(/\t=(.*?)%>/g, "',$1,'")
			.split("\t").join("');")
			.split("%>").join("p.push('")
			.split("\r").join("\\'")
			+ "');}return p.join('');");

		// Provide some basic currying to the user
		return data ? fn( data ) : fn;
	};

	return Linkify;

});