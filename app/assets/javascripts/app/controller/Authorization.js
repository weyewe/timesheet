Ext.define("AM.controller.Authorization", {
	extend : "Ext.app.Controller",
	views : [
		'Navigation',
		'Viewport'
	],

	 
	
	refs: [
		{
			ref : 'userMenu',
			selector : 'navigation #optionsMenu'
		},
		{
			ref : 'viewport',
			selector : 'vp'
		}
	],
	

	 
	init : function( application ) {
		var me = this; 
		 
		me.control({
			"viewport":{
				'authenticateSuccess' : this.onAuthenticateSuccess
			}
			
		});
		
	},
	
	onAuthenticateSuccess: function(){
		var me  = this;
		// reconstruct all view elements 
		if(	AM.currentUser.hasRole('system', 'administrator')	){
			Ext.ComponentQuery.query("button[action=switchMaster]")[0].setVisible( true ) ;
		} 
		
		
		var currentUser = Ext.decode( localStorage.getItem('currentUser'));
		var email = currentUser['email'];
		
		
		// console.log("The email: " );
		// console.log( email ) ;
		var userMenu = me.getUserMenu();
		// var userMenu = Ext.ComponentQuery.query("navigation #optionsMenu")[0]
		userMenu.setText( email ) ;
		
		// console.log(userMenu);
		// userMenu.setText( "This is awesome bastard" );
		
		// get the content.. set Active Item 1 
		// this.getViewport().down('content').getLayout().setActiveItem(1);
	},

 
	
});