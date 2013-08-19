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
	
		
		if( btn.action === 'switchPersonalReport'){
			// alert("Switching to personal report");
			
			var activeItem = me.getContent().layout.getActiveItem();
			// Ext.get('am-chart-wrapper').load({
			//             url : 'api/work_reports',
			//             scripts: true,
			//             text : 'Loading.. ',
			// 						method : "GET"
			//         });
			
			Ext.Ajax.request(
			                {
			                    url: "api/work_reports",
													method : "GET",
													// scripts : true, 
			                    success: function (xhr) {
			                        try {
																		
																	console.log("The xhr");
																	console.log( xhr ) ;
																	// var decoded_xhr = Ext.decode( xhr);
																	// console.log( xhr ) 
																	console.log("The responseText (string)");
																	console.log( xhr.responseText );
																	
																	var decodedResponseText = Ext.decode( xhr.responseText );
																	console.log("decoded response text");
																	console.log( decodedResponseText );
																	
																	console.log("\n=== The component config");
																	console.log( decodedResponseText['component_config']);
																	var newComponent = Ext.Component.create( decodedResponseText['component_config']) ;
																	console.log( "newComponent");
																	console.log( newComponent ) ;
																	
																	
																	
			                            // var newComponent = eval(xhr.responseText);
			                            //add the new component to panel or container
																	// activeItem.add(newComponent);
																	// console.log( activeItem );
																	// console.log("The component Config");
																	// console.log( xhr.responseText.component_config  )
																	
																	// console.log( activeItem.add ) ;
																	activeItem.add(  newComponent );
																	
			                        }
			                        catch (ex) {
			                            alert('Exception ' + ex);
			                        }

			                    },
			                    failure: function () {
			                        alert('failure');

			                    }
			                });
		}
	}
	 
	   
});