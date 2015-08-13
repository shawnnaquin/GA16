(function() {

	ssm.addStates([
		{
			id: 'main',
			minWidth: 0,
			onEnter: function() {
				App.main.init();
			},
			onLeave: function(){
				// NOTHING
			}
		},
		{
			id: 'small',
			maxWidth: 640,
			onEnter: function(){
				App.small.init();
			},
			onLeave: function() {
				App.small.destroy();
			}
		},
		{
			id: 'medium',
			minWidth: 641,
			maxWidth: 1025,
			onEnter: function(){
				App.medium.init();
			},
			onLeave: function(){
				App.medium.destroy();
			}
		},
		{
			id: 'large',
			minWidth: 1025,
			onEnter: function(){
				App.large.init();
			},
			onLeave: function(){
				App.large.destroy();
			}
		}
	]).ready();

}());