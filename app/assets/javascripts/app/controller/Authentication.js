Ext.define("AM.controller.Authentication", {
	extend : "Ext.app.Controller",
	views : [
		"AuthenticationForm",
		'Viewport' 
	],
	
	currentUser : null, 
 
	
	refs: [
		{
			ref: 'viewport',
			selector: 'vp'
		} ,
		{
			ref : 'userMenu',
			selector : 'navigation #optionsMenu'
		},
	],
	
	 
	
	onLaunch : function(){
		// console.log("onLaunch");
		var me = this; 
		var currentUser = Ext.decode( localStorage.getItem('currentUser'));
		
		if( currentUser ){
			me.currentUser = currentUser; 
			me.getViewport().setLoading( true ) ;
			Ext.Ajax.request({
			    url: 'api/authenticate_auth_token',
			    method: 'POST',
			    params: {
			    },
			    jsonData: {},
			    success: function(result, request ) {
							me.getViewport().setLoading( false ) ;
							// me.getViewport().fireEvent("authenticateSuccess");
			    },
			    failure: function(result, request ) {
							me.getViewport().setLoading( false ) ;
							me.destroyAuthentication();
							// me.showLoginForm(); 
							// window.location.reload();
			    }
			});
		}
		
		// main navigation specific UI 
		
		// set user menu
		
		
		

		
	},
	
	
	onViewportLoaded: function(){
		// console.log("onViewportLoaded");
		var me = this;
		var currentUserBase = localStorage.getItem('currentUser');
		if( currentUserBase === null){
			me.showLoginForm(); 
		}else{
			me.currentUser = Ext.decode( currentUserBase ) ;
			
			me.showProtectedArea(); 
		}
	},
	
	init : function( application ) {
		var me = this; 
		
		
		// console.log("INSIDE INIT of Authentication.js");
		me.control({
			"button#loginBtn" : {
				click : this.onLoginClick
			},
			
			"button[action=logoutUser]": {
				click : this.onLogoutClick
			},
			'vp' : {
				'render' : this.onViewportLoaded
			} 
		});
	},
 
	
	onLoginClick: function( button ){
		// console.log("inside onLoginClick");
		var me = this; 
		
		var fieldset = button.up('fieldset');
		// button.up('fieldset').setLoading( true ) ;
		fieldset.setLoading( true ) ;
	
		var form =  button.up('form');
		var emailField = form.getForm().findField('email');
		var passwordField = form.getForm().findField('password');
				
		me.authenticateUser({
			user_login : {
				email : emailField.getValue(),
				password : passwordField.getValue()
			}
		}, fieldset); 
	
	},
	
	onLogoutClick: function( button ){
		
		var me = this;
		
		
		
		me.destroyAuthentication(); 
		
	},
	
	destroyAuthentication: function(){
		var me = this; 
		me.getViewport().setLoading( true ) ;
		Ext.Ajax.request({
		    url: 'api/users/sign_out',
		    method: 'DELETE',
		    params: {
		    },
		    jsonData: {},
		    success: function(result, request ) {
					me.getViewport().setLoading( false ) ;
					me.currentUser  = null; 
					localStorage.removeItem('currentUser');
					
					me.showLoginForm();
					window.location.reload(); 
				
		    },
		    failure: function(result, request ) {
						me.getViewport().setLoading( false ) ;
						Ext.Msg.alert("Logout Error", "Can't Logout");
						window.location.reload(); 
		    }
		});
	},
	
	authenticateUser : function( data , fieldset ){
		var me = this; 
		Ext.Ajax.request({
		    url: 'api/users/sign_in',
		    method: 'POST',
		    params: {
		    },
		    jsonData: data,
		    success: function(result, request ) {
						fieldset.setLoading( false ) ;
						// cleaning the form data
						var form = fieldset.up('form');
						var passwordField = form.getForm().findField('password');
						var emailField = form.getForm().findField('email');
						passwordField.setValue('');
						emailField.setValue('');
						
						
						var responseText=  result.responseText; 
						var data = Ext.decode(responseText ); 
						
						var currentUserObject = {
							'auth_token' : data['auth_token'] ,
							'email'				: data['email'],
							'role'				: Ext.decode( data['role'] ) 
						};
				 
						localStorage.setItem('currentUser', Ext.encode( currentUserObject ));
						
						// console.log("The currentUserObject");
						// console.log( currentUserObject );
						me.currentUser = currentUserObject;
						me.showProtectedArea(); 
		    },
		    failure: function(result, request ) {
						fieldset.setLoading( false ) ;
						Ext.Msg.alert("Login Error", "The email-password combination is invalid");
		    }
		});
	},
	
	showProtectedArea : function(){
		var me = this; 
		me.getViewport().getLayout().setActiveItem( 1) ;
		me.getViewport().fireEvent("authenticateSuccess");
	},
	showLoginForm : function(){
		var me = this;
		me.getViewport().getLayout().setActiveItem( 0 ) ;
	}
});