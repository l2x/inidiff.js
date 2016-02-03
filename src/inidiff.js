;(function(){
	function IniDiff(oldText, newText) {
		this.oldText = oldText;
		this.newText = newText;
	}
	IniDiff.prototype.prettyHtml = function() {
		var dmp = new diff_match_patch();
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
				var v = oldini.get(k1+"."+k2);
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
				var v = newini.get(k1+"."+k2);
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
})();