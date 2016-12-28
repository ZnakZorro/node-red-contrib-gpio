
const execSync = require("child_process").execSync;

module.exports = {
	max:5,
	
	_led: function(pin,val){
		//console.log(pin,val)
		execSync('echo '+val+' > /sys/class/gpio/gpio'+pin+'/value');		 
	},
	led: function(pin,val){
		execSync('echo '+val+' > /sys/class/gpio/gpio'+pin+'/value');		 
		if (val==1) this.fadeON(pin); else this.fadeOFF(pin);
	},
	
	fadeON: function(pin){
		var v = 0;
		var that = this;
		function pal(){
			setTimeout(function(){
				that._led(pin,0);
				v++;
				//console.log(1,v)
				if (v<that.max) pal(); else that._led(pin,1);
				setTimeout(function(){
					that._led(pin,1);
				},that.max-v);
			},that.max+v);
		}
		pal();
	},
	
	fadeOFF: function(pin){
		var v = 0;
		var that = this;
		function pal2(){
			setTimeout(function(){
				that._led(pin,1);
				v++;
				//console.log(0,v)
				if (v<that.max) pal2(); else that._led(pin,0);
				setTimeout(function(){
					that._led(pin,0);
				},that.max-v);
			},that.max+v);
		}
		pal2();
	}
	
	
	
} // EOF module

//////////////////////
