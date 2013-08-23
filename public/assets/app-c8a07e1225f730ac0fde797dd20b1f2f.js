// Set valid ExtJS loading path (/vendor/assets/extjs4/src)
// Ext.Loader.setPath('Ext', '/assets/extjs4/src');
// Ext.Loader.setConfig({
// 	enabled:true  
// });
// 
// Ext.Loader.setConfig({
//     enabled: true,
//     paths: {
//         'Ext.calendar': './app/src'
//     }
// });


Ext.Loader.setConfig({ enabled: false });


Ext.application({


	
		 
		
		controllers: ["Authentication","Authorization","BaseTreeBuilder","Categories","Customers","Master","MasterEmployeeWorkCategoryReports","MasterEmployeeWorkProjectReports","MasterProjectWorkCategoryReports","MasterTreeNavigation","Navigation","Personal","PersonalTreeNavigation","Projects","Users","WorkCategoryReports","WorkProjectReports","Works"],
	
		 
		
		models: ["Category","Customer","NavigationProcess","Project","User","Work"],
	
		 
		
		stores: ["Categories","Customers","Navigations","Projects","Users","Works"],
	
		 
		
		views: ["AuthenticationForm","BookingProcessPanel","ChartInspect","Content","CustomDateTimeField","MasterProcessPanel","Navigation","PersonalProcessPanel","ProtectedContent","Viewport","Work","Worksheet"],
	

// ... the rest of your ExtJS 4 application definition goes here ...
// the global namespace
     name: 'AM',
     appFolder: '/assets/app',
     autoCreateViewport: true,
});



Ext.override(Ext.Container, {
    removeAll: function() {
        this.items.each(function(childItem){ this.remove(childItem);}, this);
    }
});

Ext.define("AM.view.Constants",{
	singleton	: true,
	
	LOGIN_URL	: "/login.do",
	LOGOUT_URL	: "/logout.do",
	
	GET_USERS_URL	:  "/users/all",
	GET_USER_URL	: "/users/get",
	
	switchPersonalReport : 0,
	switchWorkLog : 1 ,
	switchMaster : 2 ,  
});


Ext.define("AM.currentUser",{
	singleton	: true,
	
	LOGIN_URL	: "/login.do",
	LOGOUT_URL	: "/logout.do",
	
	GET_USERS_URL	:  "/users/all",
	GET_USER_URL	: "/users/get",
	
	hasRole : function(controller, action){
		// console.log("Inside the hasRole");
		var currentUser = Ext.decode( localStorage.getItem('currentUser'));
		
		if( !currentUser || !currentUser['role'] ){
			return false; 
		}
		
		if( 
				(
					currentUser['role']['system'] &&
					currentUser['role']['system']['administrator']  
				) || 
				(
						currentUser['role'][controller] && 
						currentUser['role'][controller][action]  
				) ){
			
			return true; 
		}else{
			return false; 
		}
		
		
	}
});


Ext.onReady(function(){
	// console.log("ext onReady");
	AM.view.Constants['moron'] = 'Awesome';
	// console.log( AM.currentUser.hasRole('system', 'administrator') ) ;
	// update the logo 
	
	// document.getElementById('logo-body').innerHTML = new Date().getDate();
	
	Ext.Ajax.on('beforerequest', function(conn, options) {
		// always include the auth_token.. 
			var currentUser = Ext.decode( localStorage.getItem('currentUser'));
			
			if( currentUser !== null){
				var auth_token_value = currentUser['auth_token'];
				Ext.Ajax.extraParams = { auth_token: auth_token_value };
			}
			
			 
			
			
			
			
		// include the csrf prevention 
	    var content, metatag;
	    metatag = Ext.select('meta[name="csrf-token"]');
	    if (metatag.first() != null) {
	      content = metatag.first().dom.content;
	      options.headers || (options.headers = {});
	      return options.headers["X-CSRF-Token"] = content;
	    }
	  }, this);

	Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts){
		// console.log("on request complete");
		// console.log(response);
		// 
		var responseText=  response.responseText; 
		var data = Ext.decode(responseText ); 
	
		if( data['auth_token_invalid'] !== undefined && data['auth_token_invalid'] === true ){
			Ext.Msg.alert("Login Error", "The authentication token is expired. Please retry login");
		}
		
		if( data['access_denied'] ){
			Ext.Msg.alert("Tidak Berizin",  data['access_denied']);
		}


		// console.log("Form app.js.erb, onRequestComplete, we shall bypass the generic_errors from here");
		// console.log( data ) ;
		if( data['message'] && data['message']['errors']  && data['message']['errors']['generic_errors']){
			Ext.Msg.alert("Gagal",  data['message']['errors']['generic_errors']);
		}
	});
	
		Extensible.calendar.data.EventMappings = {
			EventId:     {name: 'id', mapping:'id', type:'int'}, // int by default
			// CalendarId:  {name: 'calendar_id', mapping: 'calendar_id', type: 'string'}, // int by default
			CalendarId:  {name: 'calendar_id', mapping: 'calendar_id', type: 'int'}, // int by default
			Title:       {name: 'title', mapping: 'title', type :'string'},
			StartDate:   {name: 'start_datetime', mapping: 'start_datetime', type: 'date', dateFormat: 'c'},
			EndDate:     {name: 'end_datetime', mapping: 'end_datetime', type: 'date', dateFormat: 'c'},
			RRule:       {name: 'RecurRule', mapping: 'recur_rule'},
			Location:    {name: 'Location', mapping: 'location'},
			Notes:       {name: 'Desc', mapping: 'full_desc'},
			Url:         {name: 'LinkUrl', mapping: 'link_url'},
			IsAllDay:    {name: 'AllDay', mapping: 'all_day', type: 'boolean'},
			Reminder:    {name: 'Reminder', mapping: 'reminder'},

			// We can also add some new fields that do not exist in the standard EventRecord:
			CreatedBy:   {name: 'CreatedBy', mapping: 'created_by'},
			IsPrivate:   {name: 'Private', mapping:'private', type:'boolean'}
		};
    // Don't forget to reconfigure!
			
		Extensible.calendar.data.EventModel.reconfigure();
			
		Extensible.calendar.data.CalendarMappings = {
			// Same basic concept for the CalendarMappings as above
			// CalendarId:   {name:'calendar_id', mapping: 'cal_id', type: 'string'}, // int by default
			CalendarId:   {name:'calendar_id', mapping: 'id', type: 'int'}, // int by default
			Title:        {name:'title', mapping: 'title', type: 'string'},
			Description:  {name:'description', mapping: 'description', type: 'string'},
			ColorId:      {name:'color', mapping: 'color', type: 'int'},
			IsHidden:     {name:'Hidden', mapping: 'hidden', type: 'boolean'}
		};


		Extensible.calendar.data.CalendarModel.reconfigure();
});

 

