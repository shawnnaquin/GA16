(function() {

	ssm.addStates([
		{
			id: 'main',
			minWidth: 0,
			onEnter: function() {
				App.main.init();
			}
		},
		{
			id: 'small',
			maxWidth: 1023,
			onEnter: function(){
				App.small.init();
			},
			onLeave: function() {
				App.small.destroy();
			}
		},
		/*{
			id: 'medium',
			minWidth: 1023,
			onEnter: function(){
				AppMain.mod.medium.init();
			},
			onLeave: function(){
				AppMain.mod.medium.destroy();
			}
		},*/
		{
			id: 'large',
			minWidth: 1024,
			onEnter: function(){
				App.large.init();
			},
			onLeave: function(){
				App.large.destroy();
			}
		}
	]).ready();

}());