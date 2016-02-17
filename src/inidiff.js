// inidiff.js - Compare two ini file and efficiently return a list of differences
// Licensed under the MIT License
// Author: l2x <leiyonglin@gmail.com>

(function(){
	function IniDiff(oldText, newText) {
		this.oldText = oldText;
		this.newText = newText;
	}
	IniDiff.prototype.prettyHtml = function() {
		var dmp = new diff_match_patch();
		//dmp.Diff_EditCost = parseFloat(10);
		var d = dmp.diff_main(this.oldText, this.newText);
		dmp.diff_cleanupEfficiency(d);
		return dmp.diff_prettyHtml(d);
	};
	IniDiff.prototype.diff = function() {
		var oldini = new Ini(this.oldText);
		var newini = new Ini(this.newText);

		return diff(oldini, newini);
	};

	function diff(oldini, newini) {
		var oldObj = oldini.toObject();
		var newObj = newini.toObject();

		var d = {
			"add":{},
			"update":{},
			"delete":{},
		};

		for(var k1 in newObj) {
			for(var k2 in newObj[k1]) {
				var v = oldini.get(k1, k2);
				if(v === null) {
					if(d['add'][k1] === undefined) {
						d['add'][k1] = {};
					}
					d['add'][k1][k2] = newObj[k1][k2];
					continue;
				}
				if(v !== newObj[k1][k2]) {
					if(d['update'][k1] === undefined) {
						d['update'][k1] = {};
					}
					d['update'][k1][k2] = newObj[k1][k2];
					continue;
				}
			}
		}

		for(var k1 in oldObj) {
			for(var k2 in oldObj[k1]) {
				var v = newini.get(k1, k2);
				if(v===null) {
					if(d['delete'][k1] === undefined) {
						d['delete'][k1] = {};
					}
					d['delete'][k1][k2] = oldObj[k1][k2];
					continue;
				}
			}
		}
		return d;
	}

	this.IniDiff = IniDiff;


var css = '.inidiff{border-collapse:collapse;border:1px solid darkgray;white-space:pre-wrap;word-wrap: break-word;word-break: break-all;}.inidiff tbody{font-family:Courier,monospace}.inidiff tbody th{font-family:verdana,arial,\'Bitstream Vera Sans\',helvetica,sans-serif;background:#EED;font-size:11px;font-weight:normal;min-width:30px;border:1px solid #BBC;color:#886;padding:.3em .5em .1em 2em;text-align:right;vertical-align:top}.inidiff thead{border-bottom:1px solid #BBC;background:#efefef;font-family:Verdana}.inidiff thead th.texttitle{text-align:left}.inidiff tbody td{padding:.2em 1em;vertical-align:top}.inidiff .empty{background-color:#DDD}.inidiff .replace{background-color:#FD8}.inidiff .delete{background-color:#E99}.inidiff .skip{background-color:#efefef;border:1px solid #AAA;border-right:1px solid #BBC}.inidiff .insert{background-color:#9E9}.inidiff th.author{text-align:right;border-top:1px solid #BBC;background:#efefef}.inidiff tr:hover th{background:#ddd!important}.inidiff ins.insert{text-decoration:none}.inidiff del.delete{text-decoration:none}';
document.write('<style type="text/css">' + css + '</style>');
})();


