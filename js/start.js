var core = new anytab.Core();

core.start();
setInterval(function() {
	core.updateTime();
	core.render();
},1000*5);
