define([
	'fk-linkify'
], function(FKLinkify) {

	describe('FKLinkify', function() {
		describe('linkUsername', function() {

			var tpl = '<a href="/loves/<%=username%>">@<%=username%></a>';
			var input;
			var expect;

			it('should return linked @foobar on "@foobar"', function() {
				input = '@foobar';
				expect = '<a href="/loves/foobar">@foobar</a>';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @foo_bar on "@foo_bar"', function() {
				input = '@foo_bar';
				expect = '<a href="/loves/foo_bar">@foo_bar</a>';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @9__owqif8h__ on "@9__owqif8h__"', function() {
				input = '@9__owqif8h__';
				expect = '<a href="/loves/9__owqif8h__">@9__owqif8h__</a>';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @9__owqif8h__ within lots of text"', function() {
				input = 'Lorem ipsum dolor sit amet, @9__owqif8h__ consectetuer adipiscing elit. Phasellus nisl dolor, pulvinar id, pharetra a, egestas nec, ante. Duis scelerisque eleifend metus. Sed non odio id odio varius rutrum. Pellentesque congue commodo lacus. In semper pede lacinia felis. Morbi mollis molestie lorem. Morbi suscipit libero. Quisque ut erat sit amet elit aliquam nonummy. Donec tortor. Aliquam gravida ullamcorper pede. Praesent eros. Sed fringilla ligula sed odio pharetra imperdiet. Integer aliquet quam vitae nibh. Nam pretium, neque non congue vulputate, odio odio vehicula augue, sit amet gravida pede massa ac lectus. Curabitur a libero vitae dui sagittis aliquet. Ut suscipit. Curabitur accumsan sem a urna. Ut elit pede, vulputate sed, feugiat quis, congue sed, lacus.';
				expect = 'Lorem ipsum dolor sit amet, <a href="/loves/9__owqif8h__">@9__owqif8h__</a> consectetuer adipiscing elit. Phasellus nisl dolor, pulvinar id, pharetra a, egestas nec, ante. Duis scelerisque eleifend metus. Sed non odio id odio varius rutrum. Pellentesque congue commodo lacus. In semper pede lacinia felis. Morbi mollis molestie lorem. Morbi suscipit libero. Quisque ut erat sit amet elit aliquam nonummy. Donec tortor. Aliquam gravida ullamcorper pede. Praesent eros. Sed fringilla ligula sed odio pharetra imperdiet. Integer aliquet quam vitae nibh. Nam pretium, neque non congue vulputate, odio odio vehicula augue, sit amet gravida pede massa ac lectus. Curabitur a libero vitae dui sagittis aliquet. Ut suscipit. Curabitur accumsan sem a urna. Ut elit pede, vulputate sed, feugiat quis, congue sed, lacus.';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @9__owqif8h__ at end of text with trailing period"', function() {
				input = 'Lorem ipsum dolor sit amet, @9__owqif8h__.';
				expect = 'Lorem ipsum dolor sit amet, <a href="/loves/9__owqif8h__">@9__owqif8h__</a>.';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @9__owqif8h__ at end of text with trailing semicolon"', function() {
				input = 'Lorem ipsum dolor sit amet: @9__owqif8h__;';
				expect = 'Lorem ipsum dolor sit amet: <a href="/loves/9__owqif8h__">@9__owqif8h__</a>;';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @user_name with comma before and ! after"', function() {
				input = "foo,@user_name!";
				expect = 'foo,<a href="/loves/user_name">@user_name</a>!';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @user_name with period before and comma after"', function() {
				input = ".@user_name, foo!";
				expect = '.<a href="/loves/user_name">@user_name</a>, foo!';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @user_name inside (parens)"', function() {
				input = "(@user_name)";
				expect = '(<a href="/loves/user_name">@user_name</a>)';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @a"', function() {
				input = "@a";
				expect = '<a href="/loves/a">@a</a>';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @_a"', function() {
				input = "@_a";
				expect = '<a href="/loves/_a">@_a</a>';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @_"', function() {
				input = "@_";
				expect = '<a href="/loves/_">@_</a>';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});

			it('should return linked @9__owqif8h__ at end of text with trailing semicolon"', function() {
				input = 'Lorem ipsum dolor sit amet: @9__owqif8h__;';
				expect = 'Lorem ipsum dolor sit amet: <a href="/loves/9__owqif8h__">@9__owqif8h__</a>;';
				FKLinkify.linkUsername(input, tpl).should.equal(expect);
			});
		});

		describe('linkUrl', function() {

			it('should return http:// url linked inside text', function() {
				input   = 'I think @n8han is fast becoming my favorite programming blog stylist. Read http://technically.us/code/ and enjoy.';
				expect  = 'I think @n8han is fast becoming my favorite programming blog stylist. Read <a href="http://technically.us/code/">technically.us/code/</a> and enjoy.';
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return http:// url linked inside text, after :, trailed by )', function() {
				input   = '(I did one for my site; see the logo:http://bit.ly/1LkKk1)';
				expect  = '(I did one for my site; see the logo:<a href="http://bit.ly/1LkKk1">bit.ly/1LkKk1</a>)';
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return ow.ly url linked inside text, after :, trailed by )', function() {
				input   = '(I did one for my site; see the logo:http://ow.ly/i/8kuq)';
				expect  = '(I did one for my site; see the logo:<a href="http://ow.ly/i/8kuq">ow.ly/i/8kuq</a>)';
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return short http:// url linked inside text with length limit of 20', function() {
				input   = '(Testing for length limits; see the logo:http://bit.ly/1LkKk1)';
				expect  = '(Testing for length limits; see the logo:<a href="http://bit.ly/1LkKk1">bit.ly/1LkKk1</a>)';
				FKLinkify.linkUrl(input, null, null, 20).should.equal(expect);
			});
			it('should return LONG http:// url linked inside text with length limit of 20', function() {
				input   = '(I did one for my site; see the logo:https://www.deadspin.com/5227676/stafford-welcomed-to-detroit-with-warm-prickly-arms)';
				expect  = '(I did one for my site; see the logo:<a href="https://www.deadspin.com/5227676/stafford-welcomed-to-detroit-with-warm-prickly-arms">www.deadspin.com/522...</a>)';
				FKLinkify.linkUrl(input, null, null, 20).should.equal(expect);
			});
			it('should return http:// url with complex query string', function() {
				input   = '(http://bit.ly/1LkKk1?[foo]=bar,32&500;xyz)';
				expect  = '(<a href="http://bit.ly/1LkKk1?[foo]=bar,32&500;xyz">bit.ly/1LkKk1?[foo]=bar,32&500;xyz</a>)';
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return linked email address', function() {
				input   = '@mynameiszanders you should get ande.rs, so you can have z@ande.rs';
				expect  = '@mynameiszanders you should get ande.rs, so you can have <a href="mailto:z@ande.rs">z@ande.rs<\/a>';
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return link trailed by comma', function() {
				input   = 'I like http://bit.ly/fwoiefu, too';
				expect   = 'I like <a href="http://bit.ly/fwoiefu">bit.ly/fwoiefu</a>, too';
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return http:// url with ✪ char in domain and email address', function() {
				input   = '@mynameiszanders you should get http://✪df.ws/fez so you can have z@ande.rs';
				expect  = '@mynameiszanders you should get <a href="http://✪df.ws/fez">✪df.ws/fez</a> so you can have <a href="mailto:z@ande.rs">z@ande.rs<\/a>';
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return link with extra code in <a> tag', function() {
				var extra   = "target='_blank'";
				input   = 'There will be some extra code in this http://funkatron.com';
				expect  = 'There will be some extra code in this <a href="http://funkatron.com" '+extra+'>funkatron.com<\/a>';
				FKLinkify.linkUrl(input, null, extra).should.equal(expect);
			});
			it('should return linked simple domain without http://', function() {
				input   = 'emyller.net down for maintenance. migrating for a new server.';
				expect  = '<a href="http://emyller.net">emyller.net</a> down for maintenance. migrating for a new server.';
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return linked simple domain with www. without http://', function() {
				input   = 'www.emyller.net down for maintenance. migrating for a new server.';
				expect  = '<a href="http://www.emyller.net">www.emyller.net</a> down for maintenance. migrating for a new server.';
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return http:// links and skip non-http:// links that have paths', function() {
				input   = 'aww man, don\'t say that...hastigerbanged.com is available. must. resist. htb.com/mywife => "probably" (for every url) gmail.com www.gmail.com http://foo.bar.com/ bit.ly/qrewof RT @ax0n: http://sysadvent.blogspot.com <-- An advent calendar for UNIX nerds';
				expect  = "aww man, don't say that...hastigerbanged.com is available. must. resist. htb.com/mywife => \"probably\" (for every url) <a href=\"http://gmail.com\">gmail.com</a> <a href=\"http://www.gmail.com\">www.gmail.com</a> <a href=\"http://foo.bar.com/\">foo.bar.com/</a> bit.ly/qrewof RT @ax0n: <a href=\"http://sysadvent.blogspot.com\">sysadvent.blogspot.com</a> <-- An advent calendar for UNIX nerds";
				FKLinkify.linkUrl(input).should.equal(expect);
			});
			it('should return linked http:// link at end of chinese text', function() {
				input   = '2009年4月19日的《泰晤士报》用一整版报道了中国几十年试验原子弹所造成的生命代价。报道说大约有19万中国人死于中国的核武器试验。http://3.ly/lzAL';
				expect  = "2009年4月19日的《泰晤士报》用一整版报道了中国几十年试验原子弹所造成的生命代价。报道说大约有19万中国人死于中国的核武器试验。<a href=\"http://3.ly/lzAL\">3.ly/lzAL</a>";
				FKLinkify.linkUrl(input).should.equal(expect);
			});
		});
	});

});
