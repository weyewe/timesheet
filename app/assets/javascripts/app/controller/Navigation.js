Ext.define("AM.controller.Navigation", {
	extend : "Ext.app.Controller",
	views : [
		"Content",
		"PersonalReport"
	],
	
 
	
	refs: [
		{
			ref: 'viewport',
			selector: 'vp'
		} ,
		{
			ref : 'content',
			selector : 'content'
		} 
	],
	
	  
	
	 
	
	init : function( application ) {
		var me = this; 
		
		
		// console.log("INSIDE init of Navigation.js");
		me.control({  
			'navigation	button' : {
				click : me.switchScreen
			},
			
		
			
		});
	},
	
	

	switchScreen: function(btn){
		// console.log('the button is clicked');
		// console.log("The constant: " + AM.view.Constants['GET_USERS_URL']);
		// console.log(btn);
		// console.log(btn.action);
		// 
		var me = this; 
		
		var activeItem = AM.view.Constants[ btn.action ] ;
		// console.log("The constant: " + btn.action );
		// console.log("The activeItem: " + activeItem );
		// console.log("The activeItem : " + activeItem);
		me.getContent().layout.setActiveItem( AM.view.Constants[ btn.action ] );
	
		
		if( btn.action === 'switchPersonalReport'){
			// alert("Switching to personal report");
			
			var activeItem = me.getContent().layout.getActiveItem();
			// Ext.get('am-chart-wrapper').load({
			//             url : 'api/work_reports',
			//             scripts: true,
			//             text : 'Loading.. ',
			// 						method : "GET"
			//         });
			
			
		}
	}
	 
	   
});