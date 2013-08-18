Ext.define("AM.controller.Navigation", {
	extend : "Ext.app.Controller",
	views : [
		"Content"
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
			}// ,
			// 			
			// 			'	button[action=switchCalendar]' : {
			// 				click : me.switchScreen
			// 			},
			// 			'	button[action=switchBooking]' : {
			// 				click : me.switchScreen
			// 			},
			// 			'	button[action=switchReport]' : {
			// 				click : me.switchScreen
			// 			},
			// 			'	button[action=switchMaster]' : {
			// 				click : me.switchScreen
			// 			}
			// 			
			
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
		// var activeItem = me.getContent().layout.getActiveItem();
		// activeItem.fireEvent("cardActivated", activeItem);


// 		no calendar over here
// 

	//  if(btn.action ==='switchCalendar'){
	// 	me.getViewport().fireEvent("loadCalendar");
	// }
		
		// if( btn.action === 'switchCalendar'){
		// 	me.getContent().layout.setActiveItem(0)
		// }else{
		// 	console.log("It is the other thing");
		// 	me.getContent().layout.setActiveItem(2 );
		// }
	}
	 
	   
});