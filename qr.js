/**
  * style     0/1 con bordes o no
  * text      datos qr
  * tag       etiqueta 0000
  * user      nameIdentifique QR
  * color     #000/black
  * tipo  aztec/qrcode
  {style:0,text:this.value,tag:'tag',user:'user',color:'black',tipo:qrcode}
**/
function makeQr(q){
   callback = q.tipe || qrcode
   return togif(q.style,callback(q.text),q.tag,q.user,q.color)
}


function togif( tipo, matriz, tag, usuario , color ){
if(matriz.length!=0){
 raiz = matriz.length || Math.sqrt(matriz.length).toFixed(0)
 block = Number((600/raiz).toString().split('.')[0])
 canvas = document.createElement('canvas')
 padding = 50
 if(tipo==1){recorte = 50}else{recorte = 250}
 canvas.width = width = block*raiz +padding*2
 canvas.height = height = block*raiz +padding*2 +recorte
   x = padding
   y = padding +recorte-50
 var ctx = canvas.getContext("2d")
function curva(xb,yb,widthb,heightb,color,radius){
   ctx.beginPath();
   ctx.moveTo(xb,yb+radius);
   ctx.lineTo(xb,yb+heightb-radius);
   ctx.quadraticCurveTo(xb,yb+heightb,xb+radius,yb+heightb);
   ctx.lineTo(xb+widthb-radius,yb+heightb);
   ctx.quadraticCurveTo(xb+widthb,yb+heightb,xb+widthb,yb+heightb-radius);
   ctx.lineTo(xb+widthb,yb+radius);
   ctx.quadraticCurveTo(xb+widthb,yb,xb+widthb-radius,yb);
   ctx.lineTo(xb+radius,yb);
   ctx.quadraticCurveTo(xb,yb,xb,yb+radius);
   ctx.fillStyle = color;
   ctx.closePath();
   ctx.fill();
} 
    if(tipo!=1){
        curva(0,0,width,height,'#222333',40)
        curva(10,200,width-20,height-210,'#fff',40)
        ctx.fillStyle = "#fff";
        ctx.font = "bold 130px serif";
        ctx.fillText(`QRSkner `,25,130);
        ctx.font = "bold 40px serif";
        ctx.fillText(usuario||'Unknown',130,180);
    }else{
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0,width,height)
    }
 for(var e=0; e<matriz.length; e++){
     for(var i=0; i<matriz[e].length; i++){
         ctx.fillStyle = color || '#000';
         if(matriz[e][i]==1){ctx.fillRect(x, y,block,block)}
         x+=block
     }
     y+=block
     x=padding
 }
     ctx.fillStyle = '#000';
     ctx.font = "bold 40px serif";
     ctx.fillText(`${tag||'QRSkner'}`,35,height-25);
 
 return canvas.toDataURL("image/png")
 }
}


function qrcode(text, level, ver) { // create QR and micro QR bar code symbol
	var mode, size, align, blk, ec;
	var i, j, k, c, b, d, w, x, y, n;
	var erc=[[2, 5, 6, 8,  7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30], // error correction words L
	        [99, 6, 8,10, 10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28], // M
	        [99,99,99,14, 13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30], // Q
	        [99,99,99,99, 17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30], // H
	        [ 1, 1, 1, 1, 1,1,1,1,1,2,2,2,2,4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25], // error correction blocks L
	        [ 1, 1, 1, 1, 1,1,1,2,2,4,4,4,5,5, 5, 8, 9, 9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49], // M
	        [ 1, 1, 1, 1, 1,1,2,2,4,4,6,6,8,8, 8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68], // Q
	        [ 1, 1, 1, 1, 1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]  // H
	];  //   M1,M2,M3,M4,V1, 2, .. 
	var lev = 3-"HQMLhqml3210".indexOf(level||0)&3; // level "LMQH" to 0,1,2,3
	var chars = [ "0123456789", // char table for numeric
				"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:", // alpha
				String.fromCharCode.apply(null, Array.apply(null, {length: 127}).map(Number.call, Number)), // binary, >127 -> use utf-8
				typeof kanji === "undefined" || kanji.length != 7973 ? "" : kanji ]; // kanji char index (in kanji.js)
	function len(mod,chr) { // get encoding length in 1/6 bits
		if (chars[mod].indexOf(chr) >= 0) return [20,33,48,78][mod];
		return mod != 2 ? 1e9 : chr.charCodeAt(0) < 2048 ? 96 : 144; // two/three byte utf-8
	}
	function cib(mod) { // get # of bits of count indicator
		return ver < 1 ? ver+((19-2*mod)/3|0) : // micro QR
			[[10,12,14],[9,11,13],[8,16,16],[8,10,12]][mod][(ver+7)/17|0]; // QR
	}
	function push(val,bits) { // add data to bit stream
		val <<= 8; eb += bits;
		enc[enc.length-1] |= val>>eb;
		while (eb > 7) enc[enc.length] = (val>>(eb -= 8))&255;
	}
	/** compute symbol version size, ver < 1: micro QR */
	ver = isNaN(ver) ? 0 : ver-1;
	do { // increase version till message fits
		if (++ver >= erc[0].length-3) return []; // text too long for QR
		if (ver < 2 || ver == 10 || ver == 27) { // recompute stream
			var enc = [0], el, eb = 0; // encoding data, length, bits
			var head = []; // calculate the bit table using dynamic programming:
			for (j = 0; j < 4; j++) // www.nayuki.io/page/optimal-text-segmentation-for-qr-codes
				head.push((Math.min(4,ver+3)+cib(j))*6); // segment head sizes
			var bits = [[]], cost = head.slice(); // cost table in 1/6 bits
			for (i = text.length; i-- > 0; ) { // data analysis
				bits.unshift(cost.slice()); // record costs
				for (j = 0; j < cost.length; j++) // accumulate costs from back
					cost[j] += len(j,text.charAt(i));
				b = Math.min.apply(null,cost);
				for (j = 0; j < cost.length; j++) // switch to shorter encoding
					cost[j] = Math.min(cost[j],((b+5)/6|0)*6+head[j]);
			}
			n = mode = cost.indexOf(b); // start encoding with mode of fewest bits
			for (i = j = 0; j++ < text.length; ) { // calc optimal encoding for each char
				[2,3,1,0].forEach(function(k) { // check binary, kanji, alpha, numeric mode
					b = bits[j][k]+len(k,text.charAt(j))+5; // switch to shorter encoding
					if (b < 1e7 && (mode == k || 6*(b/6|0) == bits[j-1][mode]-head[mode])) n = k;
				});
				if (mode != n || j == text.length) { // mode changes -> encode previous
					if (ver < -1 && ver+3 < mode) push(0,50); // prevent illegal mode
					if (ver > 0) push(1<<mode,4); // mode indicator, QR
					else push(mode,ver+3); // mode indicator micro QR
					b = unescape(encodeURIComponent(text.substring(i,j))); // to utf-8
					push(mode == 2 ? b.length : j-i,cib(mode)); // character count indicator
					if (mode == 0) { // encode numeric data
						for (; i < j-2; i += 3)
							push(text.substr(i,3),10); // 3 digits in 10 bits
						if (i < j) push(text.substring(i,j),j-i == 1 ? 4 : 7);
					} else if (mode == 1) { // encode alphanumeric data
						for (; i < j-1; i += 2)  // 2 chars in 11 bits
							push(chars[1].indexOf(text.charAt(i))*45+chars[1].indexOf(text.charAt(i+1)),11);
						if (i < j) push(chars[1].indexOf(text.charAt(i)),6);
					} else if (mode == 2) // encode binary (utf-8)
						for (i = 0; i < b.length; i++)
							push(b.charCodeAt(i),8); // 1 char in 8 bits
					else for (; i < j; i++) // encode kanji
							push(chars[3].indexOf(text.charAt(i)),13); // 1 char in 13 bits
					i = j; mode = n; // next segment
				}
			}
		}
		size = ver*(ver < 1 ? 2 : 4)+17; // symbol size
		align = ver < 2 ? 0 : (ver/7|0)+2; // # of align patterns
		el = (size-1)*(size-1)-(5*align-1)*(5*align-1); // total bits - align - timing
		el -= ver < 1 ? 59 : ver < 2 ? 191 : ver < 7 ? 136 : 172; // finder, version, format
		i = ver < 1 ? 8-(ver&1)*4 : 8; // M1+M3: last byte only one nibble
		c = erc[lev+4][ver+3]*erc[lev][ver+3]; // # of error correction blocks/bytes
	} while ((el&-8)-c*8 < enc.length*8+eb-i); // message fits in version

	for (;(!level || (level.charCodeAt(0)&-33) == 65) && lev < 3; lev++) { // if level undefined or 'A'
		j = erc[lev+5][ver+3]*erc[lev+1][ver+3]; // increase security level
		if ((el&-8)-j*8 < enc.length*8+eb-i) break; // if data fits in same size
	}
	blk = erc[lev+4][ver+3]; // # of error correction blocks
	ec = erc[lev][ver+3]; // # of error correction bytes
	el = (el>>3)-ec*blk; // remaining data bytes
	w = Math.floor(el/blk); // # of words in group 1 (group 2: w+1)
	b = blk+w*blk-el; // # of blocks in group 1 (group 2: blk-b)

	if ((-3&ver) == -3 && el == enc.length)
		enc[w-1] >>= 4; // M1, M3: shift high bits to low nibble
	if (el >= enc.length) push(0,ver > 0 ? 4 : ver+6); // terminator
	if (eb == 0 || el < enc.length) enc.pop(); // bit padding
	for (i = 236; el > enc.length; i ^= 236^17) // byte padding
		enc.push((-3&ver) == -3 && enc.length == el-1 ? 0 : i); // M1, M3: last 4 bit zero

	/** error correction coding */
	var rs = new Array(ec+1); // reed/solomon code
	var lg = new Array(256), ex = new Array(255); // log/exp table for multiplication
	for (j = 1, i = 0; i < 255; i++) { // compute log/exp table of Galois field prime
		ex[i] = j; lg[j] = i;
		j += j; if (j > 255) j ^= 285; // GF polynomial a^8+a^4+a^3+a^2+1 = 100011101b = 285
	}
	for (i = 0, rs[0] = 1; i < ec; i++) // compute RS generator polynomial
		for (j = i+1, rs[j] = 0; j > 0; j--)
			rs[j] ^= ex[(lg[rs[j-1]]+i)%255];
	for (i = 0; i <= ec*blk; i++) enc.push(0); // clr checkwords
	for (k = c = 0, eb = el; c < blk; c++, eb += ec) // for each data block
		for (i = c < b ? w : w+1; i-- > 0; k++) // compute RS checkwords 
			for (j = 0, x = enc[eb]^enc[k]; j++ < ec; )
				enc[eb+j-1] = enc[eb+j]^(x ? ex[(lg[rs[j]]+lg[x])%255] : 0);

	/** layout symbol */
	var mat = Array(size).fill(null).map(function() {return [];});
	function set(x,y,pat) { // layout fixed pattern: finder & align
		for (var i = 0; i < pat.length; i++)
			for (var p = pat[i], j = 0; 1<<j <= pat[0]; j++, p >>= 1)
				mat[y+i][x+j] = (p&1)|2;
	}
	c = ver < 1 ? 0 : 6;
	for (i = 8; i < size; i++) mat[c][i] = mat[i][c] = i&1^3; // timing pattern
	set(0,0,[383,321,349,349,349,321,383,256,511]); // finder upper left +format
	if (ver > 0) {
		set(0,size-8,[256,383,321,349,349,349,321,383]); // finder lower left
		set(size-8,0,[254,130,186,186,186,130,254,0,255]); // finder upper right
		c = (ver+1)/(1-align)*4&-2; // alignment pattern spacing
		for (x = 0; x < align; x++) // alignment grid
			for (y = 0; y < align; y++) 
				if ((x > 0 && y > 0) || (x != y && x+y != align-1)) // no align at finder
					set(x == 0 ? 4 : size-9+c*(align-1-x), // set alignment pattern
						y == 0 ? 4 : size-9+c*(align-1-y), [31,17,21,17,31]);
		if (ver > 6) // reserve version area
			for (i = 0; i < 18; i++) 
				mat[size+i%3-11][i/3|0] = mat[i/3|0][size+i%3-11] = 2;
	}
	/** layout codewords */
	y = x = size-1; // start lower right
	for (i = 0; i < eb; i++) {
		c = k = 0; j = w+1; // interleave data
		if (i >= el) { c = k = el; j = ec; } // interleave checkwords
		else if (i+blk-b >= el) c = k = -b; // interleave group 2 last bytes
		else if (i%blk >= b) c = -b; // interleave group 2 
		else j--; // interleave group 1
		c = enc[c+(i-k)%blk*j+((i-k)/blk|0)]; // interleave data
		for (j = (-3&ver) == -3 && i == el-1 ? 8 : 128; j > 0; j >>= 1) { // M1,M3: 4 bit
			if (c & j) mat[y][x] = 1; // layout bit
			k = ver > 0 && x < 6 ? 1 : 0; // skip vertical timing pattern
			do	if (1 & x-- ^ k) { // advance x,y
					if (size-x-k & 2) if (y > 0) y--; else continue; // top turn
					else 		if (y < size-1) y++; else continue; // bottom turn
					x += 2; // no turn
				}
			while (mat[y][x]&2); // skip reserved area
		}
	}
	/** data masking */
	var get = [ function(x,y) { return ((x+y|mat[y][x]>>1)^mat[y][x])&1^1; }, // pattern generation conditions
	            function(x,y) { return ((y|mat[y][x]>>1)^mat[y][x])&1^1; },
	            function(x,y) { return ((x%3>0|mat[y][x]>>1)^mat[y][x])&1^1; },
	            function(x,y) { return (((x+y)%3>0|mat[y][x]>>1)^mat[y][x])&1^1; },
	            function(x,y) { return ((x/3+(y>>1)|mat[y][x]>>1)^mat[y][x])&1^1; },
	            function(x,y) { return ((((x*y)&1)+x*y%3>0|mat[y][x]>>1)^mat[y][x])&1^1; },
	            function(x,y) { return ((x*y+x*y%3|mat[y][x]>>1)^mat[y][x])&1^1; },
	            function(x,y) { return ((x+y+x*y%3|mat[y][x]>>1)^mat[y][x])&1^1; } ];
	if (ver < 1) get = [get[1],get[4],get[6],get[7]]; // mask pattern for micro QR
	var msk, pen = 30000, p;
	for (var m = 0; m < get.length; m++) { // compute penalty of masks
		x = y = p = d = 0;
		if (ver < 1) { // penalty micro QR
			for (i = 1; i < size; i++) {
				x -= get[m](i,size-1);
				y -= get[m](size-1,i);
			}
			p = x > y ? 16*x+y : x+16*y;
		} else { // penalty QR
			[	[[1,1,1,1,1]], [[0,0,0,0,0]], // N1 >4 adjacent
				[[1,1],[1,1]], [[0,0],[0,0]], // N2 block 2x2
				[[1,0,1,1,1,0,1,0,0,0,0]], [[0,0,0,0,1,0,1,1,1,0,1]], // N3 like finder
				[[1]] // N4 darks
			].forEach(function(pat,pi) { // look for pattern
				for (p += d, d = y = 0; y+pat.length <= size; y++) {
					var add = [3,3,40,1, 3,0,40,0]; // N1, N2, N3, N4; horizontal/vertical
					for (x = 0; x+pat[0].length <= size; x++) {
						i = j = 1;
						for (var py = 0; py < pat.length; py++)
							for (var px = 0; px < pat[py].length; px++) {
								if (get[m](x+px,y+py) != pat[py][px]) i = 0; // horizontal
								if (get[m](y+py,x+px) != pat[py][px]) j = 0; // vertical
							}
						d += add[pi>>1]*i+add[pi>>1|4]*j; // add penalty
						add[0] = 3-2*i; add[4] = 3-2*j; // toggle N1: 3-1-1-...
					}
				}
			});
			p += Math.floor(Math.abs(10-20*d/(size*size)))*10; // N4: darks
		}
		if (p < pen) { pen = p; msk = m; } // take mask of lower penalty
	}
	for (y = 0; y < size; y++) // remove reservation, apply mask
		for (x = 0; x < size; x++) 
			mat[y][x] = get[msk](x,y);

	/** format information, code level & mask */
	j = ver == -3 ? msk : ver < 1 ? (2*ver+lev+5)*4+msk : ((5-lev)&3)*8+msk;
	for (k = j *= 1024, i = 4; i >= 0; i--) // BCH error correction: 5 data, 10 error bits
		if (j >= 1024<<i) j ^= 1335<<i; // generator polynomial: x^10+x^8+x^5+x^4+x^2+x+1 = 10100110111b = 1335
	k ^= j^(ver < 1 ? 17477 : 21522); // XOR masking
	for (j = 0; j < 15; j++, k >>= 1) // layout format information
		if (ver < 1) 
			mat[j < 8 ? j+1 : 8][j < 8 ? 8 : 15-j] = k&1; // micro QR
		else 
			mat[8][j < 8 ? size-j-1 : j == 8 ? 7 : 14-j] = // QR horizontal
				mat[j < 6 ? j : j < 8 ? j+1 : size+j-15][8] = k&1; // vertical
	/** version information */
	for (k = ver*4096, i = 5; i >= 0; i--) // BCH error correction: 6 data, 12 error bits
		if (k >= 4096<<i) k ^= 7973<<i; // generator: x^12+x^11+x^10+x^9+x^8+x^5+x^2+1 = 1111100100101b = 7973
	if (ver > 6) // layout version information
		for (k ^= ver*4096, j = 0; j < 18; j++, k >>= 1) 
			mat[size+j%3-11][j/3|0] = mat[j/3|0][size+j%3-11] = k&1;

	return mat; // QR additionally needs a quiet zone of 4 cells around the symbol!
}



/**	Aztec bar code symbol creation according ISO/IEC 24778:2008
*	creates Actec and compact Aztec bar code symbol.
* @param text to encode
* @param sec optional: percentage of checkwords used for security 2%-90% (23%)
* @param lay optional: minimum number of layers (size), 0: Aztec Rune
* @return matrix array of barcode ([] if text too long for Aztec)
*/
function aztec(text, sec, lay) { // make Aztec bar code
	var e = 20000, BackTo, numBytes, CharSiz = [5,5,5,5,4];
	var LatLen = [[ 0,5,5,10,5,10], [9,0,5,10,5,10], [5,5,0,5,10,10],
	             [5,10,10,0,10,15], [4,9,9,14,0,14], [0,0,0,0,0,0]];
	var ShftLen =  [[0,e,e,5,e], [5,0,e,5,e], [e,e,0,5,e], [e,e,e,0,e], [4,e,e,4,0]];
	var Latch = [[[],  [28],    [29],   [29,30],[30],   [31]], // from upper to ULMPDB
	            [[30,14],[],    [29],   [29,30],[30],   [31]], //      lower
	            [[29],  [28],   [],     [30],   [28,30],[31]], //      mixed
	            [[31],  [31,28],[31,29],[],	    [31,30],[31,31]], //   punct
	            [[14],  [14,28],[14,29],[14,29,30],[],  [14,31]]]; //  digit
	var CharMap = [	"  ABCDEFGHIJKLMNOPQRSTUVWXYZ", // upper
	                "  abcdefghijklmnopqrstuvwxyz", // lower
	                String.fromCharCode(0,32,1,2,3,4,5,6,7,8,9,10,11,12,13,
	                    27,28,29,30,31,64,92,94,95,96,124,126,127), // mixed
	                " \r\r\r\r\r!\"#$%&'()*+,-./:;<=>?[]{}", // punct
	                "  0123456789,."]; // digit
	var enc, el = text.length, b, typ = 0, x,y, ctr, c, i, j, l;

	function stream(seq, val, bits) { // add data to bit stream 
		var eb = seq[0]%b+bits; // first element is length in bits
		val <<= b; seq[0] += bits; // b - word size in bits
		seq[seq.length-1] |= val>>eb; // add data
		while (eb >= b) { // word full?
			bits = seq[seq.length-1]>>1;
			if (typ == 0 && (bits == 0 || 2*bits+2 == 1<<b)) { // bit stuffing: all 0 or 1
				seq[seq.length-1] = 2*bits+(1&bits^1); // insert complementary bit
				seq[0]++; eb++;
			}
			eb -= b;
			seq.push((val>>eb)&((1<<b)-1));
		}
	}
	function binary(seq, pos) { // encode numBytes of binary
		seq[0] -= numBytes*8+(numBytes > 31 ? 16 : 5); // stream() adjusts len too -> remove
		stream(seq, numBytes > 31 ? 0 : numBytes, 5); // len
		if (numBytes > 31) stream(seq, numBytes-31, 11); // long len
		for (var i = pos-numBytes; i < pos; i++)
			stream(seq, text.charCodeAt(i), 8); // bytes
	}
	/** encode text */
	sec = 100/(100-Math.min(Math.max(sec||25,0),90)); // limit percentage of check words to 0-90%
	for (j = c = 4; ; c = b) { // compute word size b: 6/8/10/12 bits
		j = Math.max(j,(Math.floor(el*sec)+3)*c); // total needed bits, at least 3 check words
		b = j <= 240 ? 6 : j <= 1920 ? 8 : j <= 10208 ? 10 : 12; // bit capacity -> word size
		if (lay) b = Math.max(b, lay < 3 ? 6 : lay < 9 ? 8 : lay < 23 ? 10 : 12); // parameter
		if (c >= b) break; // fits in word size

		var Cur = [[0,0],[e],[e],[e],[e],[e]]; // current sequence for [U,L,M,P,D,B]
		for (i = 0; i < text.length; i++) { // calculate shortest message sequence
			for (var to = 0; to < 6; to++) // check for shorter latch to
				for (var frm = 0; frm < 6; frm++) // if latch from
					if (Cur[frm][0]+LatLen[frm][to] < Cur[to][0] && (frm < 5 || to == BackTo)) {
						Cur[to] = Cur[frm].slice(); // replace by shorter sequence
						if (frm < 5) // latch from shorter mode
							Latch[frm][to].forEach(function (lat) {stream(Cur[to], lat, lat < 16 ? 4 : 5);});
						else 
							binary(Cur[to], i); // return from binary -> encode
						if (to == 5) { BackTo = frm; numBytes = 0; Cur[5][0] += 5; } // begin binary shift
					}
			var Nxt = [[e],[e],[e],[e],[e],Cur[5]]; // encode char
			var twoChar = ["\r\n",". ",", ",": "].indexOf(text.substr(i,2)); // special 2 char sequences
			for (to = 0; to < 5; to++) { // to sequence
				var idx = twoChar < 0 ? CharMap[to].indexOf(text.substr(i,1),1) : twoChar+2; // index to map
				if (idx < 0 || (twoChar >= 0 && to != 3)) continue; // char in set ?
				for (frm = 0; frm < 5; frm++) // encode char
					if (Cur[frm][0]+ShftLen[frm][to]+CharSiz[to] < Nxt[frm][0]) {
						Nxt[frm] = Cur[frm].slice();
						if (frm != to) // add shift
							stream(Nxt[frm], to == 3 ? 0 : frm < 4 ? 28 : 15, CharSiz[frm]);
						stream(Nxt[frm], idx, CharSiz[to]); // add char
					}
			}
			Nxt[5][0] += numBytes++ == 31 ? 19 : 8; // binary exeeds 31 bytes
			if (twoChar >= 0) { i++; Nxt[5][0] += numBytes++ == 31 ? 19 : 8; } // 2 char seq: jump over 2nd
			Cur = Nxt; // take next sequence
		}
		binary(Cur[5], text.length); // encode remaining bytes
		enc = Cur.reduce(function(a,b) { return a[0] < b[0] ? a : b; }); // get shortest sequence
		i = b-enc[0]%b; if (i < b) stream(enc,(1<<i)-1,i); // padding
		enc.pop(); // remove 0-byte
		el = enc.shift()/b|0; // get encoding length
	}
	if (el > 1660) return []; // message too long
	typ = j > 608 || el > 64 || (lay && lay > 4) ? 14 : 11; // full or compact Aztec finder size
	var mod = parseInt(text); // Aztec rune possible?
	if (mod < 0 || mod > 255 || mod+"" != text || lay != 0) // Aztec rune 0-255 ?
		lay = Math.max(lay||1,Math.min(32,(Math.ceil((Math.sqrt(j+typ*typ)-typ)/4)))); // needed layers
	var ec = Math.floor((8*lay*(typ+2*lay))/b)-el; // # of error words
	typ >>= 1; ctr = typ+2*lay; ctr += (ctr-1)/15|0; // center position

	/** compute Reed Solomon error detection and correction */
	function rs(ec,s,p) { // # of checkwords, polynomial bit size, generator polynomial
		var rc = new Array(ec+2), i, j, el = enc.length; // reed/solomon code
		var lg = new Array(s+1), ex = new Array(s); // log/exp table for multiplication
		for (j = 1, i = 0; i < s; i++) { // compute log/exp table of Galois field
			ex[i] = j; lg[j] = i;
			j += j; if (j > s)  j ^= p; // GF polynomial
		}
		for (rc[ec+1] = i = 0; i <= ec; i++) // compute RS generator polynomial
			for (j = ec-i, rc[j] = 1; j++ < ec; )
				rc[j] = rc[j+1]^ex[(lg[rc[j]]+i)%s];
		for (i = 0; i < el; i++) // compute RS checkwords
			for (j = 0, p = enc[el]^enc[i]; j++ < ec; )
				enc[el+j-1] = enc[el+j]^(p ? ex[(lg[rc[j]]+lg[p])%s] : 0);
	}
	/** layout Aztec barcode */
	var mat = Array(2*ctr+1).fill(null).map(function() {return [];});
	for (y = 1-typ; y < typ; y++) // layout central finder
		for (x = 1-typ; x < typ; x++)
			mat[ctr+y][ctr+x] = Math.max(Math.abs(x),Math.abs(y))&1^1;
	mat[ctr-typ+1][ctr-typ] = mat[ctr-typ][ctr-typ] = 1; // orientation marks
	mat[ctr-typ][ctr-typ+1] = mat[ctr+typ-1][ctr+typ] = 1;
	mat[ctr-typ+1][ctr+typ] = mat[ctr-typ][ctr+typ] = 1; 
	function move(dx,dy) { // move one cell
		do x += dx; while (typ == 7 && (x&15) == 0); // skip reference grid
		do y += dy; while (typ == 7 && (y&15) == 0);
	}
	if (lay > 0) { // layout the message
		rs(ec,(1<<b)-1,[67,301,1033,4201][b/2-3]); // error correction, generator polynomial
		x = -typ; y = x-1; // start of layer 1 at top left
		j = l = (3*typ+9)/2; // length of inner side
		var dx = 1, dy = 0; // direction right
		while ((c = enc.pop()) !== undefined) // data in reversed order inside to outside
			for (i = b/2; i-- > 0; c >>= 2) {
				if (c&1) mat[ctr+y][ctr+x] = 1; // odd bit
				move(dy,-dx); // move across
				if (c&2) mat[ctr+y][ctr+x] = 1; // even bit
				move(dx-dy,dx+dy); // move ahead
				if (j-- == 0) { // spiral turn
					move(dy,-dx); // move across
					j = dx; dx = -dy; dy = j; // rotate clockwise
					if (dx < 1) // move to next side
						for (j = 2; j--;) move(dx-dy,dx+dy);
					else l += 4; // full turn -> next layer
					j = l; // start new side
				}
			}
		if (typ == 7) // layout reference grid
			for (x = (15-ctr)&-16; x <= ctr; x += 16)
				for (y = (1-ctr)&-2; y <= ctr; y += 2) 
					mat[ctr+y][ctr+x] = mat[ctr+x][ctr+y] = 1;
		mod = (lay-1)*(typ*992-4896)+el-1; // 2/5 + 6/11 mode bits
	}
	/** process modes message compact/full */
	b = (typ*3-1)/2; // 7/10 bits per side
	for (i = typ-2; i-- > 0; mod >>= 4) enc[i] = mod&15; // mode to 4 bit words
	rs((typ+5)/2,15,19); // add 5/6 words error correction
	enc.push(0); j = lay ? 0 : 10; // XOR Aztec rune data
	for (i = 1; i <= b; i++) stream(enc,j^enc[i],4); // 8/16 words to 4 sides
	for (i = 2-typ, j = 1; i < typ-1; i++, j += j) { // layout mode data
		if (typ == 7 && i == 0) i++; // skip reference grid
		if (enc[b+1]&j) mat[ctr-typ][ctr-i] = 1; // top
		if (enc[b+2]&j) mat[ctr-i][ctr+typ] = 1; // right
		if (enc[b+3]&j) mat[ctr+typ][ctr+i] = 1; // bottom
		if (enc[b+4]&j) mat[ctr+i][ctr-typ] = 1; // left
	}
	return mat; // matrix Aztec barcode
}



