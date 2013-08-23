Ext.define('AM.model.Category', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'name', type: 'string' },
			{ name: 'is_billable', type: 'boolean' }  
  	],

	 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/categories',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'categories',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { category : record.data };
				}
			}
		}
	
  
});
Ext.define('AM.model.Customer', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'name', type: 'string' },
			{ name: 'bb_pin', type: 'string' } ,
			{ name: 'mobile_phone', type: 'string' } ,
			{ name: 'contact', type: 'string' }  
  	],

	 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/customers',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'customers',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { customer : record.data };
				}
			}
		}
	
  
});
Ext.define('AM.model.NavigationProcess', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string'},
        {name: 'viewClass', type: 'string'}
    ],
		proxy: {
        type: 'memory'
    },
});
Ext.define('AM.model.Project', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'title', type: 'string' },
			{ name: 'description', type: 'string' } ,
			{ name: 'deadline_date', type: 'string' } ,
			{ name: 'customer_id', type: 'int' } ,
			{ name: 'customer_name', type: 'string' } ,
  	],

	 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/projects',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'projects',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { project : record.data };
				}
			}
		}
	
  
});
Ext.define('AM.model.User', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
			{ name: 'role_id', type: 'int' },
			{ name: 'role_name', type: 'string' },
    	{ name: 'name', type: 'string' } ,
			'email' 
  	],

	 


   
  	idProperty: 'id' ,proxy: {
			url: 'api/app_users',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'users',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { user : record.data };
				}
			}
		}
	
  
});
Ext.define('AM.model.Work', {
  	extend: 'Ext.data.Model',
  	fields: [
    	{ name: 'id', type: 'int' },
    	{ name: 'project_id', type: 'int' },
			{ name: 'project_title', type: 'string' } ,
			
			{ name: 'start_datetime', type: 'string' } ,
			{ name: 'end_datetime', type: 'string' } ,
			{ name: 'category_id', type: 'int' } ,
			{ name: 'category_name', type: 'string' } ,
			{ name: 'duration', type: 'int' } ,
			{ name: 'description', type: 'string' } ,
  	],

	 


   
  	idProperty: 'id' ,

		proxy: {
			url: 'api/works',
			type: 'rest',
			format: 'json',

			reader: {
				root: 'works',
				successProperty: 'success',
				totalProperty : 'total'
			},

			writer: {
				getRecordData: function(record) {
					return { work : record.data };
				}
			}
		},
		 
	
	
		
  
});
Ext.define('AM.store.Categories', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Category'],
  	model: 'AM.model.Category',
  	// autoLoad: {start: 0, limit: this.pageSize},
		autoLoad : false, 
  	autoSync: false,
	// pageSize : 10, 
	
	
		
		
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 

	listeners: {

	} 
});
Ext.define('AM.store.Customers', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Customer'],
  	model: 'AM.model.Customer',
  	// autoLoad: {start: 0, limit: this.pageSize},
		autoLoad : false, 
  	autoSync: false,
	pageSize : 10, 
	
	
		
		
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 

	listeners: {

	} 
});
Ext.define('AM.store.Navigations', {
		extend: 'Ext.data.TreeStore',
    model: 'AM.model.NavigationProcess',
    proxy: {
        type: 'memory'
    },
    folderSort: true
});
Ext.define('AM.store.Projects', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Project'],
  	model: 'AM.model.Project',
  	// autoLoad: {start: 0, limit: this.pageSize},
		autoLoad : false, 
  	autoSync: false,
	pageSize : 10, 
	
	
		
		
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 

	listeners: {

	} 
});
Ext.define('AM.store.Users', {
	extend: 'Ext.data.Store',
	require : ['AM.model.User'],
	model: 'AM.model.User',
	// autoLoad: {start: 0, limit: this.pageSize},
	autoLoad : false, 
	autoSync: false,
	pageSize : 10, 
	
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 
	listeners: {

	} 
});
Ext.define('AM.store.Works', {
  	extend: 'Ext.data.Store',
		require : ['AM.model.Work'],
  	model: 'AM.model.Work',
  	// autoLoad: {start: 0, limit: this.pageSize},
		autoLoad : false, 
  	autoSync: false,
	pageSize : 10, 
	
	
		
		
	sorters : [
		{
			property	: 'id',
			direction	: 'DESC'
		}
	], 

	listeners: {

	} 
});
Ext.define("AM.view.AuthenticationForm", {
	extend : "Ext.form.Panel",
	alias : 'widget.authform',
	
	layout : {
		align : 'center',
		pack : 'center',
		type : 'hbox'
	},
	
	items : [
		{
			xtype : 'fieldset',
			width : 300,
			title : "Log in",
			items : [
				{
					xtype : 'textfield',
					anchor : '100%',
					fieldLabel : "Email Anda",
					name : 'email'
				},
				{
					xtype : 'textfield',
					anchor : '100%',
					inputType : 'password',
					fieldLabel : "Password",
					name : 'password'
				},
				{
					xtype : "button",
					anchor : "100%",
					itemId : 'loginBtn',
					text : 'Log in'
				}
			]
		}
	]
});
Ext.define('AM.view.BookingProcessPanel', {
    extend: 'Ext.panel.Panel',
		alias : 'widget.bookingProcessPanel',
    

		layout: {
        type : 'hbox',
        align: 'stretch'
    },
    
    items: [
			{
				// width: 100,
				bodyPadding: 5,
				xtype: 'bookingProcessList',
				flex : 1
			}, 
      {
					flex :  6, 
          // title: '&nbsp;',
          id   : 'worksheetPanel', 
          // overflowY: 'auto',
          bodyPadding: 0,
					layout : {
						type: 'fit'
					},
					items : [
						{
							html : "Ini adalah tampilan booking. Anda dapat membuat booking baru, atau menambah customer",
							
						}
					]
      }
    ]

    // 
    // layout: 'border',
    // 
    // items: [
    //     {
    //         region: 'west',
    //         xtype : 'container',
    // 						html : "The west region",
    // 						width : 150,
    // 						border : true 
    //     },
    //     
    //     {
    //         region: 'center',
    //      		xtype : 'container',
    // 						html : 'the center region',
    // 						border : true 
    //     }
    // ]
});
Ext.define('AM.view.ChartInspect', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.chartInspect',

		layout : {
			type : 'hbox',
			align : 'stretch'
		},

/*
	These are the configurations
*/
		currentFocusDate : new Date(),
		currentViewType : 'week',
		
		chartStoreFields : [
			'name',
			'data1',
			'id'
		],
		
		chartStoreUrl :  'api/work_project_reports', 
		listXType: 'workprojectList',
		xAxisLabel : "Project",
		yAxisLabel : 'Time Spent (mins)',
		panelTitle: "Project",
		chartListWrapperXType: "container",
		worksheetId: '#worksheetPanel',
		autoChartLoad : true, 
		selectedParentRecordId : null, 
		parentRecordType : 'user' ,
		viewer : 'personal', 

/*
	End of configuration 
*/
	 
	 
	
		buildChart: function(){
			var me = this; 

			me.store1 = Ext.create(Ext.data.JsonStore, {
				fields	: me.chartStoreFields,
				proxy  	: {
					type : 'ajax',
					url :  me.chartStoreUrl,
					reader : {
						type : 'json',
						root : 'records', 
						totalProperty  : 'total'
					}
				},
				autoLoad : false 
			});
			
			if( me.autoChartLoad){
				me.loadStore();
			}
			
			

			var chartConfig = {
				xtype: 'chart',
				flex : 5 ,
        animate: true,
        store: me.store1,
        shadow: true,
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['data1'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: me.yAxisLabel,
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: me.xAxisLabel
        }],
        series: [{
            type: 'column',
            axis: 'bottom',
            highlight: true,
            xField: 'name',
            yField: 'data1',
						listeners:{
							itemmousedown : function(obj) { 
								 
								me.fireEvent('seriesClicked',  obj,  me.currentViewType  , me );
								// console.log("ChartInspect: The series is clicked");
							}
						}
        }]
			}
			
			return chartConfig ;
		},
		 
	  
		loadStore: function(  ){
			var me = this; 
			var date = me.currentFocusDate; 
			 
			var viewType = me.currentViewType; 
			me.setLoading( true ) ; 
			var viewValue = 0;  // default viewType == week 
			if(viewType === 'month'){
				viewValue = 1;
			}else if( viewType ==='year'){
				viewValue = 2 
			}
			
			me.store1.load({
				params: {
					viewValue : viewValue,
					focusDate :  Ext.Date.format( date, 'Y-m-d H:i:s'),
					selectedParentRecordId: me.selectedParentRecordId ,
					parentRecordType: me.parentRecordType,
					viewer : me.viewer 
				},
				callback : function(records, options, success){
					me.setLoading(false);
					me.fireEvent('chartLoaded', Ext.Date.format( date, 'Y-m-d H:i:s'));
					// console.log("The container");
					// console.log( me.up("container"));
			 
					// console.log("\nBefore updating title");
					// console.log( me.up('worksheet'));
					var worksheet = me.up(  me.worksheetId);
					if( worksheet && worksheet.setTitle ){
						// console.log("There is worksheet");
						// console.log(worksheet);
						worksheet.setTitle("By "+ me.panelTitle + ": " + me.getDurationText() );
					}else{
						// console.log("There is no fucking worksheet");
					}
					// me.up(  me.up('worksheet')).setTitle("By "+ me.panelTitle + ": " + me.getDurationText() );
				}
			});
			
		},
		
		getDurationText : function(){
			var me = this; 
			if(!me.currentFocusDate || !me.currentViewType){
				return;
			}
			
			var startDate = '';
			var endDate = '';
			
			if( me.currentViewType === 'week'){
				var numberOfDaysFromSunday = me.currentFocusDate.getDay(); 
				var sundayDayNumber = me.currentFocusDate.getDate() - numberOfDaysFromSunday;
				var saturdayDayNumber = sundayDayNumber + 6 ; 
				
				var sundayDate = new Date( me.currentFocusDate.getFullYear(), me.currentFocusDate.getMonth() -1 , sundayDayNumber );
				var saturdayDate = new Date( me.currentFocusDate.getFullYear(), me.currentFocusDate.getMonth() -1 , saturdayDayNumber );
				
				return  Ext.Date.format( sundayDate, 'Y-m-d  ') + " to " + Ext.Date.format( saturdayDate, 'Y-m-d  ');
				
			}else if(me.currentViewType === 'month'){
				var firstDayDate = new Date( me.currentFocusDate.getFullYear(), me.currentFocusDate.getMonth() -1 , 1 );
				var lastDayDate = new Date( me.currentFocusDate.getFullYear(), me.currentFocusDate.getMonth()  , 0 );
				
				return  Ext.Date.format( firstDayDate, 'Y-m-d  ') + " to " + Ext.Date.format( lastDayDate, 'Y-m-d  ');
			}
			
		},
		 
		buildList: function(){
			var me = this; 
			var listConfig = {
				xtype: me.listXType,
				flex : 2
			}
			return listConfig; 
		},
		
		thisWeekText : 'Minggu Ini',
		 
		goText : "Go", 
		
		
		jumpToText: "Lihat",
		
		weekText : "Week",
		monthText : "Month",
		yearText : "Year",
		
		buildToolbar: function(){
			this.tbar = {
          cls: 'ext-cal-toolbar',
          border: true,
          items: []
      };

			this.tbar.items.push({
          id: this.id+'-sr-tb-today', text: this.thisWeekText, handler: this.onThisWeekClick, scope: this
      });

			this.tbar.items.push({id: this.id+'-tb-prev', handler: this.onPrevClick, scope: this, iconCls: 'x-tbar-page-prev'});
      this.tbar.items.push({id: this.id+'-tb-next', handler: this.onNextClick, scope: this, iconCls: 'x-tbar-page-next'});
 

			this.tbar.items.push(this.jumpToText);
      this.tbar.items.push({id: this.id+'-tb-jump-dt', xtype: 'datefield', width: 120, showToday: false});
      this.tbar.items.push({id: this.id+'-tb-jump', text: this.goText, handler: this.onJumpClick, scope: this});

			this.tbar.items.push('->');
			
			this.tbar.items.push({
          id: this.id+'-tb-week', text: this.weekText, handler: this.onWeekNavClick, scope: this, toggleGroup: this.id+'-sr-tb-views', pressed : true 
      });

			this.tbar.items.push({
				id: this.id+'-tb-month', text: this.monthText, handler: this.onMonthNavClick, scope: this, toggleGroup: this.id+'-sr-tb-views'
			});

		 

		 

		},
		
	 
		initComponent: function(){
			var me = this; 
			me.buildToolbar();
			
			this.items = [  me.buildChart() , me.buildList() ];
			
	    this.callParent(arguments);
		},
		
		
		
		// Handling the butons 
		// private
    onThisWeekClick: function(){
			var me = this; 
			me.currentFocusDate = new Date(); 
			me.loadStore();
    },
    
    // private
    onJumpClick: function(){
        var dt = Ext.getCmp(this.id+'-tb-jump-dt').getValue();
				var me = this; 
				
				if( dt === null || dt==='') {
				}else{
					me.currentFocusDate = dt; 
					me.loadStore(); 
				}
				
    },
    
    // private
    onPrevClick: function(){
			var me = this; 
			if( me.currentViewType === 'week'){
				me.currentFocusDate.setDate( me.currentFocusDate.getDate() - 7 );
			}else if( me.currentViewType ==='month'){
				me.currentFocusDate.setMonth( me.currentFocusDate.getMonth() - 1 );
			}else if( me.currentViewType ==='year'){
				me.currentFocusDate.setYear( me.currentFocusDate.getYear() - 1 );
			}
			me.loadStore() ; 
    },
    
    // private
    onNextClick: function(){
			var me = this; 
			if( me.currentViewType === 'week'){
				me.currentFocusDate.setDate( me.currentFocusDate.getDate() + 7 );
			}else if( me.currentViewType ==='month'){
				me.currentFocusDate.setMonth( me.currentFocusDate.getMonth() + 1 );
			}else if( me.currentViewType ==='year'){
				me.currentFocusDate.setYear( me.currentFocusDate.getYear() + 1 );
			}
      
			me.loadStore() ;
    },
    
    // private
    onWeekNavClick: function(){
			var me = this; 
        // this.setActiveView(this.id+'-day');
			if( me.currentViewType !== 'week'){
				me.currentViewType = 'week';
				me.loadStore();
			}
    },

		// private
    onMonthNavClick: function(){
			var me = this; 
        // this.setActiveView(this.id+'-day');
			if( me.currentViewType !== 'month'){
				me.currentViewType = 'month';
				me.loadStore();
			}
    },

		// private
    onYearNavClick: function(){
			var me = this; 
        // this.setActiveView(this.id+'-day');
			if( me.currentViewType !== 'year'){
				me.currentViewType = 'year';
				me.loadStore();
			}
    },

});
Ext.define('AM.view.Content', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.content', 
    
    
		border: false,
		activeItem : 1 ,

		layout: {
			type : 'card',
			align: 'stretch'
		},
		
		items : [
			{
				xtype : 'personalProcessPanel'
			},
			
			
			{
				xtype : "workProcess",
			},
			{
				html : "Master Data",
				xtype : 'masterProcessPanel'
			},
			{
				html : "Third",
				xtype : 'container'
			}
		]
		 
});
Ext.define('AM.view.CustomDateTimeField', {
    extend: 'Ext.form.FieldContainer',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    alias: 'widget.customdatetimefield',
    layout: 'hbox',
    width: 200,
    height: 22,
    combineErrors: true,
    msgTarget: 'side',
    submitFormat: 'Y-m-d H:i:s',

    dateCfg: null,
    timeCfg: null,

    initComponent: function () {
        var me = this;
        if (!me.dateCfg) me.dateCfg = {};
        if (!me.timeCfg) me.timeCfg = {};
        me.buildField();
        me.callParent();
        me.dateField = me.down('datefield')
        me.timeField = me.down('timefield')

        me.initField();
    },

    //@private
    buildField: function () {
        var me = this;
        me.items = [
        Ext.apply({
            xtype: 'datefield',
            submitValue: false,
            format: 'd.m.Y',
            width: 100,
            flex: 2
        }, me.dateCfg),
        Ext.apply({
            xtype: 'timefield',
            submitValue: false,
            format: 'H:i',
            width: 80,
            flex: 1 
        }, me.timeCfg)]
    },


		markInvalid: function(err_msg){
			// console.log("The shite is called!! yippiee");
			// console.log("The message: " ) ; 
			// console.log( err_msg ) ;
			var dateField = this.down("datefield");
			var timeField = this.down("timefield");
			// console.log("The dateField");
			// console.log( dateField ) ; 
			dateField.markInvalid( err_msg ) ;
			// console.log("The timefield");
			// console.log( timeField ) ;
			timeField.markInvalid( err_msg ) ;
		},
		
    getValue: function () {
        var me = this,
            value,
            date = me.dateField.getSubmitValue(),
            dateFormat = me.dateField.format,
            time = me.timeField.getSubmitValue(),
            timeFormat = me.timeField.format;
        if (date) {
            if (time) {
                value = Ext.Date.parse(date + ' ' + time, me.getFormat());
            } else {
                value = me.dateField.getValue();
            }
        }
        return value;
    },

		parseDate : function(value){
			if(value=== undefined){
				return new Date();
			}
			date_array = value.split(" ")[0];
			time_array = value.split(" ")[1];
			
			date_array = date_array.split("-");
			time_array = time_array.split(":");
			// console.log("The date_array");
			// 			console.log( date_array ) ;
			// 			
			// 			console.log("The time_array");
			// 			console.log( time_array ) ;
			
			return new Date( parseInt( date_array[0] ) , 
												parseInt( date_array[1] ) - 1,  // month is indexed from 0
												parseInt( date_array[2] ), 
									parseInt( time_array[0] ), 
									parseInt( time_array[1] ), 
									parseInt( time_array[2] ) )
		},

    setValue: function (value) {
        var me = this;
				// console.log("The dateField");
				// console.log( me.dateField) ;
				// console.log( me.dateField.setValue ) ;
				// console.log("The value to be set to datetime");
				// console.log( value ) ;
				
				var start = new Date() ; 
				
				value = me.parseDate( value ) ;
				// console.log("Proposed value into the timeField: " + value ) ;
				// console.log("Proposed value into the dateField: " + value ) ;
				// 
				// new Date(year, month, day, hours, minutes, seconds, milliseconds)
				 // 07/08/2013 00:24:59 
				
				
				me.timeField.setValue(value);
        me.dateField.setValue(value);
				
				// console.log("The value set into timeField: " + me.timeField.getValue() );
				// console.log("The value set into dateField: " + me.dateField.getValue () );
				//         
    },

    getSubmitData: function () {
        var me = this,
            data = null;
        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            data = {},
            value = me.getValue(),
            data[me.getName()] = '' + value ? Ext.Date.format(value, me.submitFormat) : null;
        }
        return data;
    },

    getFormat: function () {
        var me = this;
        return (me.dateField.submitFormat || me.dateField.format) + " " + (me.timeField.submitFormat || me.timeField.format)
    }
});
Ext.define('AM.view.MasterProcessPanel', {
    extend: 'Ext.panel.Panel',
		alias : 'widget.masterProcessPanel',
    

		layout: {
        type : 'hbox',
        align: 'stretch'
    },
    
    items: [
			{
				bodyPadding: 5,
				xtype: 'masterProcessList',
				flex : 1
			}, 
      {
					flex :  6, 
          id   : 'worksheetPanel', 
          bodyPadding: 0,
					layout : {
						type: 'fit'
					},
					items : [
						{
							xtype: 'masterDefault'
							 // : "Ini adalah tampilan master. Anda dapat membuat master baru, atau menambah customer",
						}
					]
      }
    ]
 
});
Ext.define('AM.view.Navigation', {
    extend: 'Ext.toolbar.Toolbar',
    alias : 'widget.navigation', 
   
		
		addPersonalReportButton: function(){
			this.items.push(
				{
					iconCls: 'tasks-delete-task',
					disabled: false,
					tooltip: 'Personal Report',
					xtype: 'button',
					text : "Report",
					action : "switchPersonalReport",
					pressed : false, 
					toggleGroup: this.id+'-nav-views' 
				}
			)
		},
		
		addWorkLogButton: function(){
			this.items.push(
				{
					iconCls: 'tasks-mark-complete',
					disabled: false,
					tooltip: 'Work Log',
					xtype: 'button',
					text : "Work Log",
					action : "switchWorkLog",
					pressed : true,
					toggleGroup: this.id+'-nav-views' 
				}
			)
		},
		
		addMasterButton: function(){
			this.items.push(
				{
					iconCls: 'tasks-mark-complete',
					disabled: false,
					tooltip: 'Bookings',
					xtype: 'button',
					text : "Master",
					action : "switchMaster",
					pressed : false,
					toggleGroup: this.id+'-nav-views',
					hidden : true  
				}
			)
		},
		
		addCommonButton: function(){
			this.items.push('->');
			
			this.items.push({
				text: "Options",
				itemId : 'optionsMenu',
				text : "The email", 
				menu: [
					{
						action: 'editPassword',
						text: "Ganti Password",
						listeners: {
							click: function() {
								var editPasswordWindow = Ext.widget("editPassword");
								editPasswordWindow.show();
							}
						}
					},
				]
			});
			
			this.items.push('-');
			this.items.push({
				text: 'Logout',
				action: 'logoutUser'  
			});
		},


		initComponent: function() {
			
			this.items = [];
			this.addPersonalReportButton();
			this.addWorkLogButton();
			this.addMasterButton();
			
			
			this.addCommonButton(); // password and logout 
			
			this.callParent(arguments);
		},
	 
});
Ext.define('AM.view.PersonalProcessPanel', {
    extend: 'Ext.panel.Panel',
		alias : 'widget.personalProcessPanel',
    

		layout: {
        type : 'hbox',
        align: 'stretch'
    },
    
    items: [
			{
				bodyPadding: 5,
				xtype: 'personalProcessList',
				flex : 1
			}, 
      {
					flex :  6, 
          id   : 'personal-worksheetPanel', 
          bodyPadding: 0,
					layout : {
						type: 'fit'
					},
					items : [
						{
							xtype: 'personalDefault'
						}
					]
      }
    ]
 
});
Ext.define('AM.view.ProtectedContent', {
    extend: 'Ext.panel.Panel',
		alias : 'widget.protectedcontent',
    
    
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
    
    items: [
				{
					xtype : 'navigation',
				},
				
				{
					xtype : 'content',
					flex :  1
				}
    ]
});
Ext.define("AM.view.Viewport" , {
	extend : "Ext.container.Viewport",
	alias : 'widget.vp',
	
	layout : {
		type : 'card'
	},
	
	items  : [
		{
			xtype : 'authform'
		},
		{
			xtype : 'protectedcontent'
		}
	]
	
});
Ext.define('AM.view.Work', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workProcess',
	 
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		
		items : [
			{
				xtype : 'worklist' ,
				flex : 1 
			} 
		]
});
Ext.define('AM.view.Worksheet', {
    extend: 'Ext.Container' ,
		alias: 'widget.worksheet',
		layout : {
			type: 'fit'
		}
});
Ext.define('AM.view.booking.BookingProcessList', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.bookingProcessList',

    
    // title: 'Process List',
    rootVisible: false,
		cls: 'examples-list',
    lines: false,
    useArrows: true,

		store: 'Navigations'
});
Ext.define('AM.view.header.EditPassword', {

    extend: 'Ext.window.Window',
    // alias : 'widget.editPassword',
		alias : 'widget.editPassword',
    title: 'Edit Password',
    modal: true,
    layout: 'fit',
    height: 200,
    width: 500,

    initComponent: function() {
        var me = this;
             
        Ext.apply(Ext.form.field.VTypes, {
        
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
        
            passwordText: 'Passwords tidak sama.'
        });

        Ext.applyIf(me, {
        
            items: [{
                xtype: 'form',
                url: 'api/update_password',
                border: false,
                bodyPadding: 10,
                fieldDefaults: {
                    msgTarget: 'side',
                    labelWidth: 165
                },
                items: [{
                    xtype: 'textfield',
                    allowBlank: false,
                    inputType: 'password',
                    fieldLabel: 'Password Lama',
                    name: 'user[current_password]',
                    anchor: '100%'
                }, {
                    xtype: 'textfield',
                    allowBlank: false,
                    inputType: 'password',
                    fieldLabel: 'Password Baru',
                    name: 'user[password]',
                    // id: 'pass',
                    anchor: '100%'
                }, {
                    xtype: 'textfield',
                    inputType: 'password',
                    fieldLabel: 'Ketik Ulang Password Baru',
                    name: 'user[password_confirmation]',
                    vtype: 'password',
                    // initialPassField: 'pass',
                    allowBlank: false,
                    anchor: '100%'
                }, {
                    xtype: 'container',
                    height: 10
                }, {
                    xtype: 'container',
                    height: 20,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [
        										{
                        xtype: 'container',
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: 'Simpan',
                        action: 'updatePassword',
                        listeners: {
                            click: function() {
                                var form = me.down('form');
                                if(form.getForm().isValid()) {
                                    
                                    form.getForm().waitMsgTarget = me.getEl();
                                    form.getForm().submit({
                                        method:'PUT',
                                        waitMsg: 'Updating Password..',
                                        success:function(f, a) {
                                            Ext.Msg.alert('Success', a.result.message, function(btn, text){
                                                form.getForm().reset();
                                            });
                                        },
                                        failure:function(form, action){
                                            Ext.MessageBox.show({
                                                title: 'Fail',
                                                msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                            })
                                        }
                                    });
                                }
                            }
                        }
                    }, {
                        xtype: 'container',
                        width: 5
                    }, {
                        xtype: 'button',
                        height: 20,
                        width: 60,
                        text: 'Batal',
                        scope: this,
                        handler: this.close
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }    
});
Ext.define('AM.view.master.Category', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.categoryProcess',
	 
		
		items : [
			{
				xtype : 'categorylist' ,
				flex : 1 
			} 
		]
});
Ext.define('AM.view.master.Customer', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.customerProcess',
	 
		
		items : [
			{
				xtype : 'customerlist' ,
				flex : 1 
			} 
		]
});
Ext.define('AM.view.master.Default', {
    extend: 'Ext.Container' ,
		alias: 'widget.masterDefault',
	 
		html : "Ini adalah tampilan master. Anda dapat membuat master baru, atau menambah customer"
});
Ext.define('AM.view.master.MasterProcessList', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.masterProcessList',

    
    // title: 'Process List',
    rootVisible: false,
		cls: 'examples-list',
    lines: false,
    useArrows: true,

		store: 'Navigations'
});
Ext.define('AM.view.master.Project', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.projectProcess',
	 
		
		items : [
			{
				xtype : 'projectlist' ,
				flex : 1 
			} 
		]
});
Ext.define('AM.view.master.User', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.userProcess',
	 
		
		items : [
			{
				xtype : 'userlist' ,
				flex : 1 //,
				// html : 'hahaha'
			} 
		]
});
Ext.define('AM.view.master.category.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.categoryform',

  title : 'Add / Edit Category',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
    this.items = [{
      xtype: 'form',
			msgTarget	: 'side',
			border: false,
      bodyPadding: 10,
			fieldDefaults: {
          labelWidth: 165,
					anchor: '100%'
      },
      items: [
				{
	        xtype: 'hidden',
	        name : 'id',
	        fieldLabel: 'id'
	      },{
	        xtype: 'textfield',
	        name : 'name',
	        fieldLabel: ' Nama'
				},{
					xtype: 'checkbox',
					name : 'is_billable',
					fieldLabel: 'Billable?'
				} 
			]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  }
});
Ext.define('AM.view.master.category.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.categorylist',

  	store: 'Categories', 
 

	initComponent: function() {
		this.columns = [
			// { header: 'ID', dataIndex: 'id'},
			{ header: ' Name',  dataIndex: 'name',  flex: 1 , sortable: false} ,
			{ header: ' Billable?',  dataIndex: 'is_billable',  flex: 1 , sortable: false} 
	
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add Category',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit Category',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete Category',
			action: 'deleteObject',
			disabled: true
		});
		
		// this.filler = new Ext.toolbar.FillView({});  
		
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 200,
			emptyText : "Search",
			checkChangeBuffer: 300
		}); 




		// this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton, '->', this.searchObjectButton ];
		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton,  this.searchField ];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
	}
});
Ext.define('AM.view.master.customer.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.customerform',

  title : 'Add / Edit Customer',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
    this.items = [{
      xtype: 'form',
			msgTarget	: 'side',
			border: false,
      bodyPadding: 10,
			fieldDefaults: {
          labelWidth: 165,
					anchor: '100%'
      },
      items: [
				{
	        xtype: 'hidden',
	        name : 'id',
	        fieldLabel: 'id'
	      },{
	        xtype: 'textfield',
	        name : 'name',
	        fieldLabel: ' Nama'
				},{
					xtype: 'textfield',
					name : 'bb_pin',
					fieldLabel: 'BB Pin'
				},{
					xtype: 'textfield',
					name : 'mobile_phone',
					fieldLabel: 'Nomor HP'
				},
				{
					xtype: 'textarea',
					name : 'contact',
					fieldLabel: 'Kontak Lain'
				},
				// {
	      // 					xtype: 'textfield',
	      // 					name : 'email',
	      // 					fieldLabel: 'Email'
	      // 				},{
	      // 					xtype: 'textfield',
	      // 					name : 'bbm_pin',
	      // 					fieldLabel: 'PIN BB'
	      // 				},{
	      // 					xtype: 'textarea',
	      // 					name : 'address',
	      // 					fieldLabel: 'Alamat'
	      // 				}
			]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  }
});
Ext.define('AM.view.master.customer.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.customerlist',

  	store: 'Customers', 
 

	initComponent: function() {
		this.columns = [
			// { header: 'ID', dataIndex: 'id'},
			{ header: ' Nama',  dataIndex: 'name',  flex: 1 , sortable: false} ,
			{ header: ' BB Pin',  dataIndex: 'bb_pin',  flex: 1 , sortable: false} ,
			{ header: ' Nomor HP',  dataIndex: 'mobile_phone',  flex: 1 , sortable: false} ,
			{ header: ' Kontak Lain',  dataIndex: 'contact',  flex: 1 , sortable: false} 
	
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add Customer',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit Customer',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete Customer',
			action: 'deleteObject',
			disabled: true
		});
		
		// this.filler = new Ext.toolbar.FillView({});  
		
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 200,
			emptyText : "Search",
			checkChangeBuffer: 300
		}); 




		// this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton, '->', this.searchObjectButton ];
		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton,  this.searchField ];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
	}
});
Ext.define('AM.view.master.project.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.projectform',

  title : 'Add / Edit Project',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
		var me = this; 
		
		var remoteJsonStoreCustomer = Ext.create(Ext.data.JsonStore, {
			storeId : 'customer_search',
			fields	: [
			 				{
						name : 'customer_name',
						mapping : "name"
					},
					{
						name : 'customer_bb_pin',
						mapping : 'bb_pin'
					},
					{
						name : 'customer_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_customers',
				reader : {
					type : 'json',
					root : 'records', 
					totalProperty  : 'total'
				}
			},
			autoLoad : false 
		});
		
		
    this.items = [{
      xtype: 'form',
			msgTarget	: 'side',
			border: false,
      bodyPadding: 10,
			fieldDefaults: {
          labelWidth: 165,
					anchor: '100%'
      },
      items: [
				{
	        xtype: 'hidden',
	        name : 'id',
	        fieldLabel: 'id'
	      },{
	        xtype: 'textfield',
	        name : 'title',
	        fieldLabel: 'Title'
				},{
					xtype: 'textfield',
					name : 'description',
					fieldLabel: 'Description'
				},{
					xtype: 'datefield',
					name : 'deadline_date',
					format: 'Y-m-d',
					fieldLabel : "Deadline"
				},
				{
					fieldLabel: 'Customer',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'customer_name',
					valueField : 'customer_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteJsonStoreCustomer , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{customer_name}">' +  
													'<div class="combo-name">{customer_name}</div>' +  
													'<div class="combo-name">{customer_bb_pin}</div>' +  
							 					'</div>';
						}
					},
					name : 'customer_id' 
				},
			]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);

		me.dateField = me.down("datefield");
		console.log("The datefield");
		console.log( me.dateField ) ;
  },

	setSelectedCustomer: function( customer_id ){
		var comboBox = this.down('form').getForm().findField('customer_id'); 
		var me = this; 
		var store = comboBox.store; 
		store.load({
			params: {
				selected_id : customer_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( customer_id );
			}
		});
	},

	setComboBoxData : function( record){
		var me = this; 
		me.setLoading(true);
		
		
		me.setSelectedCustomer( record.get("customer_id")  ) ;
		// me.setSelectedCalendar( record.get("calendar_id")  ) ;
	 
	}
});
Ext.define('AM.view.master.project.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.projectlist',

  	store: 'Projects', 
 

	initComponent: function() {
		this.columns = [
			{ header: 'Title',  dataIndex: 'title',  flex: 1 , sortable: false} ,
			{ header: 'Description',  dataIndex: 'description',  flex: 1 , sortable: false} ,
			{ header: 'Deadline',  dataIndex: 'deadline_date',  flex: 1 , sortable: false} ,
			{ header: 'Customer',  dataIndex: 'customer_name',  flex: 1 , sortable: false} 
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add Project',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit Project',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete Project',
			action: 'deleteObject',
			disabled: true
		});
		
		// this.filler = new Ext.toolbar.FillView({});  
		
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 200,
			emptyText : "Search",
			checkChangeBuffer: 300
		}); 




		// this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton, '->', this.searchObjectButton ];
		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton,  this.searchField ];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
	}
});
Ext.define('AM.view.master.report.ProjectList' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.masterreportprojectList',

  	store: 'Projects', 
 

	initComponent: function() {
		this.columns = [
			{ header: ' Title',  dataIndex: 'title',  flex: 1 , sortable: false} ,
			{ header: ' Deadline',  dataIndex: 'deadline_date',  flex: 1 , sortable: false},
			{ header: ' Customer',  dataIndex: 'customer_name',  flex: 1 , sortable: false}
		];
 
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: "No Record" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
});
Ext.define('AM.view.master.report.UserList' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.masterreportuserList',

  	store: 'Users', 
 

	initComponent: function() {
		this.columns = [
			{ header: ' Nama',  dataIndex: 'name',  flex: 1 , sortable: false} ,
			{ header: ' Email',  dataIndex: 'email',  flex: 1 , sortable: false}
	
		];
 
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: "No Record" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
});
Ext.define('AM.view.master.report.employee.WorkCategory', {
    extend: 'Ext.Container',
    alias: 'widget.masterreportemployeeWorkCategoryReport',

		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		header: false, 
		headerAsText : false, 
		
		initComponent: function(){
			var me = this; 
			// me.buildToolbar();
			
			// console.log("init component of masterreportemployeeWorkCategoryReport");
			
			this.items = [  {
				xtype : 'masterreportuserList',
				// xtype : 'container',
				// html : "Awesome shite",
				flex: 2 
			},
			me.buildChartInspect() ];
			
	    this.callParent(arguments);
		},
		
	 
		
		buildChartInspect: function(){
			// console.log("build Chart Inspect called");
			return {
					xtype : "chartInspect",
					chartStoreFields : [
						'name',
						'data1',
						'id'
					],
					chartStoreUrl :  'api/work_category_reports', 
					listXType: 'workcategoryList',
					yAxisLabel : "Time Spent (mins)",
					xAxisLabel : "Category",
					panelTitle: "Category",
					flex: 7,
					chartListWrapperXType: 'masterreportemployeeWorkCategoryReport',
					autoChartLoad: false 
				} 
		},

 		
});
Ext.define('AM.view.master.report.employee.WorkProject', {
    extend: 'Ext.Container',
    alias: 'widget.masterreportemployeeWorkProjectReport',

		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		header: false, 
		headerAsText : false, 
		
		initComponent: function(){
			var me = this; 
			// me.buildToolbar();
			
			// console.log("init component of masterreportemployeeWorkProjectReport");
			
			this.items = [  {
				xtype : 'masterreportuserList',
				// xtype : 'container',
				// html : "Awesome shite",
				flex: 2 
			},
			me.buildChartInspect() ];
			
	    this.callParent(arguments);
		},
		
	 
		
		buildChartInspect: function(){
			// console.log("build Chart Inspect called");
			return {
					xtype : "chartInspect",
					chartStoreFields : [
						'name',
						'data1',
						'id'
					],
					chartStoreUrl :  'api/work_project_reports', 
					listXType: 'workprojectList',
					yAxisLabel : "Time Spent (mins)",
					xAxisLabel : "Project",
					panelTitle: "Project",
					flex: 7,
					chartListWrapperXType: 'masterreportemployeeWorkProjectReport',
					autoChartLoad: false 
				} 
		},

 		
});
Ext.define('AM.view.master.report.project.WorkCategory', {
    extend: 'Ext.Container',
    alias: 'widget.masterreportprojectWorkCategoryReport',

		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		header: false, 
		headerAsText : false, 
		
		initComponent: function(){
			var me = this; 
			// me.buildToolbar();
			
			// console.log("init component of masterreportprojectWorkCategoryReport");
			
			this.items = [  {
				xtype : 'masterreportprojectList',
				// xtype : 'container',
				// html : "Awesome shite",
				flex: 2 
			},
			me.buildChartInspect() ];
			
	    this.callParent(arguments);
		},
		
	 
		
		buildChartInspect: function(){
			// console.log("build Chart Inspect called");
			return {
					xtype : "chartInspect",
					chartStoreFields : [
						'name',
						'data1',
						'id'
					],
					chartStoreUrl :  'api/work_category_reports', 
					listXType: 'workcategoryList',
					yAxisLabel : "Time Spent (mins)",
					xAxisLabel : "Category",
					panelTitle: "Category",
					flex: 7,
					chartListWrapperXType: 'masterreportprojectWorkCategoryReport',
					autoChartLoad: false 
				} 
		},

 		
});
Ext.define('AM.view.master.user.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.userform',

  title : 'Add / Edit User',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
	
		var remoteJsonStore = Ext.create(Ext.data.JsonStore, {
			storeId : 'role_search',
			fields	: [
	 				{
						name : 'role_name',
						mapping : "name"
					},
					{
						name : 'role_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_role',
				reader : {
					type : 'json',
					root : 'records', 
					totalProperty  : 'total'
				}
			},
			autoLoad : false 
		});
		
    this.items = [{
      xtype: 'form',
			msgTarget	: 'side',
			border: false,
      bodyPadding: 10,
			fieldDefaults: {
          labelWidth: 165,
					anchor: '100%'
      },
      items: [
				{
	        xtype: 'hidden',
	        name : 'id',
	        fieldLabel: 'id'
	      },{
	        xtype: 'textfield',
	        name : 'name',
	        fieldLabel: ' Name'
	      },{
					xtype: 'textfield',
					name : 'email',
					fieldLabel: 'Email'
				},
				{
					fieldLabel: 'Role',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'role_name',
					valueField : 'role_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteJsonStore , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{role_name}">' +  
													'<div class="combo-name">{role_name}</div>' +  
							 					'</div>';
						}
					},
					name : 'role_id' 
				}
			]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  },

	setComboBoxData : function( record){
		console.log("Inside the Form.. edit.. setComboBox data");
		var role_id = record.get("role_id");
		var comboBox = this.down('form').getForm().findField('role_id'); 
		var me = this; 
		var store = comboBox.store; 
		store.load({
			params: {
				selected_id : role_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( role_id );
			}
		});
	}
});

Ext.define('AM.view.master.user.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.userlist',

  	store: 'Users', 
 

	initComponent: function() {
		this.columns = [
			{ header: 'ID', dataIndex: 'id'},
			{ header: 'Nama',  dataIndex: 'name', flex: 1},
			{	header: 'Email', dataIndex: 'email', flex: 1 },
			{	header: 'Role', dataIndex: 'role_name', flex: 1 }
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add User',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit User',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete User',
			action: 'deleteObject',
			disabled: true
		});
		
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 200,
			emptyText : "Search",
			checkChangeBuffer: 300
		});



		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton  ];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
	}
});
Ext.define('AM.view.personal.Default', {
    extend: 'Ext.Container' ,
		alias: 'widget.personalDefault',
	 
		html : "Ini adalah tampilan personal. Anda dapat melihat sejarah kerja anda"
});
Ext.define('AM.view.personal.PersonalProcessList', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.personalProcessList',

    
    // title: 'Process List',
    rootVisible: false,
		cls: 'examples-list',
    lines: false,
    useArrows: true,

		store: 'Navigations'
});
Ext.define('AM.view.report.WorkCategory', {
    extend: 'AM.view.ChartInspect',
    alias: 'widget.workCategoryReport',

		

 		chartStoreFields : [
			'name',
			'data1',
			'id'
		],
		
		chartStoreUrl :  'api/work_category_reports', 
		listXType: 'workcategoryList',
		yAxisLabel : "Time Spent (mins)",
		xAxisLabel : "Category",
		panelTitle: "Category",
		worksheetId: "#personal-worksheetPanel",
		// autoChartLoad: true 
});
Ext.define('AM.view.report.WorkProject', {
    extend: 'AM.view.ChartInspect',
    alias: 'widget.workProjectReport',

		

 		chartStoreFields : [
			'name',
			'data1',
			'id'
		],
		
		chartStoreUrl :  'api/work_project_reports', 
		listXType: 'workprojectList',
		yAxisLabel : "Time Spent (mins)",
		xAxisLabel : "Project",
		panelTitle : "Project",
		worksheetId: "#personal-worksheetPanel"
});
Ext.define('AM.view.report.workcategory.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.workcategoryList',

  	store: 'Works', 
 

	initComponent: function() {
		this.columns = [
			{
				xtype : 'templatecolumn',
				text : "Info",
				flex : 1,
				tpl : '<b>{project_title}</b>' + '<br />'  + 
							'Duration: <b>{duration}</b> mins'   + '<br />'  +  '<br />'  + 
							'{description}'
			},
			
			  
	
		];
 
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: "No Record" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
});
Ext.define('AM.view.report.workproject.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.workprojectList',

  	store: 'Works', 
 

	initComponent: function() {
		this.columns = [
			{
				xtype : 'templatecolumn',
				text : "Info",
				flex : 1,
				tpl : '<b>{category_name}</b>' + '<br />'  + 
							'Duration: <b>{duration}</b> mins'   + '<br />'  +  '<br />'  + 
							'{description}'
			},
			
			  
	
		];
 
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: "No Record" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
});
Ext.define('AM.view.work.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.workform',

  title : 'Add / Edit Work',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
		var me = this; 
		
		var remoteJsonStoreProject = Ext.create(Ext.data.JsonStore, {
			storeId : 'project_search',
			fields	: [
			 				{
						name : 'project_title',
						mapping : "title"
					} ,
					{
						name : 'project_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_projects',
				reader : {
					type : 'json',
					root : 'records', 
					totalProperty  : 'total'
				}
			},
			autoLoad : false 
		});
		
		var remoteJsonStoreCategory = Ext.create(Ext.data.JsonStore, {
			storeId : 'category_search',
			fields	: [
			 				{
						name : 'category_name',
						mapping : "name"
					} ,
					{
						name : 'category_id',
						mapping : 'id'
					}
			],
			proxy  	: {
				type : 'ajax',
				url : 'api/search_categories',
				reader : {
					type : 'json',
					root : 'records', 
					totalProperty  : 'total'
				}
			},
			autoLoad : false 
		});
		
		
    this.items = [{
      xtype: 'form',
			msgTarget	: 'side',
			border: false,
      bodyPadding: 10,
			fieldDefaults: {
          labelWidth: 165,
					anchor: '100%'
      },


      items: [
				{
	        xtype: 'hidden',
	        name : 'id',
	        fieldLabel: 'id'
	      },
				{
					fieldLabel: 'Project',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'project_title',
					valueField : 'project_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteJsonStoreProject , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{project_title}">' +  
													'<div class="combo-name">{project_title}</div>' +  
							 					'</div>';
						}
					},
					name : 'project_id' 
				},
				
				{
					fieldLabel: 'Category',
					xtype: 'combo',
					queryMode: 'remote',
					forceSelection: true, 
					displayField : 'category_name',
					valueField : 'category_id',
					pageSize : 5,
					minChars : 1, 
					allowBlank : false, 
					triggerAction: 'all',
					store : remoteJsonStoreCategory , 
					listConfig : {
						getInnerTpl: function(){
							return  	'<div data-qtip="{category_name}">' +  
													'<div class="combo-name">{category_name}</div>' +  
							 					'</div>';
						}
					},
					name : 'category_id' 
				},
				{
					xtype :'customdatetimefield',
					name : 'start_datetime',
					fieldLabel : "Waktu Mulai",
					dateCfg : {
						format: 'Y-m-d',
					},
					timeCfg : {
						increment : 5
					}
				},
				{
					xtype :'customdatetimefield',
					name : 'end_datetime',
					fieldLabel : "Waktu Selesai",
					dateCfg : {
						format: 'Y-m-d',
					},
					timeCfg : {
						increment : 5
					}
				},
				{
					xtype :'textfield',
					name : 'description',
					fieldLabel : "Deskripsi"
				}
				
			]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
 
  },

	setSelectedProject: function( project_id ){
		var comboBox = this.down('form').getForm().findField('project_id'); 
		var me = this; 
		var store = comboBox.store; 
		store.load({
			params: {
				selected_id : project_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( project_id );
			}
		});
	},
	
	setSelectedCategory: function( category_id ){
		var comboBox = this.down('form').getForm().findField('category_id'); 
		var me = this; 
		var store = comboBox.store; 
		store.load({
			params: {
				selected_id : category_id 
			},
			callback : function(records, options, success){
				me.setLoading(false);
				comboBox.setValue( category_id );
			}
		});
	},

	setComboBoxData : function( record){
		// console.log("Inside setComboBox data");
		var me = this; 
		me.setLoading(true);
		
		me.setSelectedProject( record.get("project_id")  ) ;
		me.setSelectedCategory( record.get("category_id")  ) ;
	}
});
Ext.define('AM.view.work.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.worklist',

  	store: 'Works', 
 

	initComponent: function() {
		this.columns = [
			{
				xtype : 'templatecolumn',
				text : "Project",
				flex : 1,
				tpl : 'Project: <b>{project_title}</b>' + '<br />' + '<br />' +
							'Work Category:<br /> <b>{category_name}</b>'   
			},
			
			{ header: 'Description',  dataIndex: 'description',  flex: 1 , sortable: false} ,
			
			{
				xtype : 'templatecolumn',
				text : "Duration",
				flex : 1,
				tpl : 'Start:<br /> <b>{start_datetime}</b>' + '<br />' + '<br />' +
							'End:<br /> <b>{end_datetime}</b>'  + '<br />' + '<br />' +
							'Duration: <b>{duration}</b> mins' 
			},
		];

		this.addObjectButton = new Ext.Button({
			text: 'Add Work',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit Work',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete Work',
			action: 'deleteObject',
			disabled: true
		});
		
		// this.filler = new Ext.toolbar.FillView({});  
		
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 200,
			emptyText : "Search",
			checkChangeBuffer: 300
		}); 




		// this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton, '->', this.searchObjectButton ];
		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton,  this.searchField ];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
	}
});
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
Ext.define("AM.controller.BaseTreeBuilder", {
	extend : "Ext.app.Controller",

	 
	   
	buildNavigation: function( currentUser ) {
		var me = this; 
		
		
		// console.log("The length of folderList: " + folderList.length );
		var composedFolders = []; 
		// me.folderList is entered @the instance class.
		
		for(var i = 0 ; i < me.folderList.length ; i++){
			var folder = me.folderList[i];
			
			// console.log("Gonna build the folder");
			var composedFolder = me.buildFolder( currentUser, folder ); 
			if( composedFolder !== null ){
				composedFolders.push( composedFolder );
			}
		}
		
		var data = {
			text : 'text root',
			children : composedFolders
		}
		
		return data; 
	},
	
	buildFolder : function( currentUser, folder ){
		var me = this; 
		// console.log("Inside the build folder");
		var processList = [];
		// console.log("The length of folder['children']: " + folder['children'].length );
		for( var i =0 ; i < folder['children'].length; i++ ){
			var processTemplate = folder['children'][i];
			var process = me.buildProcess( currentUser, processTemplate );
			if( process !== null){
				processList.push( process );
			}
		}
		
		// console.log("The processList length: "   + processList.length);
		// for(var i = 0 ; i < processList.length; i++ ) {
		// 	console.log(processList[i]);
		// }
		
		if( processList.length !== 0 ){
			return {
				text: 			folder['text'], 
				viewClass: 	folder['viewClass'], 
				iconCls: 		folder['iconCls'], 
				expanded: 	folder['expanded'],
				children: 	processList 
			};
		}else{
			return null; 
		}
	},
	
	buildProcess : function(currentUser, processTemplate){
		
		if( !currentUser || !currentUser['role']){
			return null; 
		}
		
		var process = {
			text 			: processTemplate['text'],
			viewClass : processTemplate['viewClass'],
			leaf 			: processTemplate['leaf'],
			iconCls 	: processTemplate['iconCls']
		}
		// console.log("Inside buildProcess");
		// console.log( process );
		
		for( var i =0 ; i < processTemplate['conditions'].length; i++ ){
			var condition = processTemplate['conditions'][i];
			var controller = condition['controller'];
			var action = condition['action'];
			
			if( 
					(
						currentUser['role']['system'] &&
						currentUser['role']['system']['administrator']  
					) || 
					(
							currentUser['role'][controller] && 
							currentUser['role'][controller][action]  
					) ){
				
				// console.log("returning the process");
				return process; 
			}
		}
	 
		// console.log("returning null in the buildProcess");
		return null; 
	}
	
});
Ext.define('AM.controller.Categories', {
  extend: 'Ext.app.Controller',

  stores: ['Categories'],
  models: ['Category'],

  views: [
    'master.category.List',
    'master.category.Form'
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'categorylist'
		},
		{
			ref : 'searchField',
			selector: 'categorylist textfield[name=searchField]'
		}
	],

  init: function() {
    this.control({
      'categorylist': {
        itemdblclick: this.editObject,
        selectionchange: this.selectionChange,
				afterrender : this.loadObjectList,
      },
      'categoryform button[action=save]': {
        click: this.updateObject
      },
      'categorylist button[action=addObject]': {
        click: this.addObject
      },
      'categorylist button[action=editObject]': {
        click: this.editObject
      },
      'categorylist button[action=deleteObject]': {
        click: this.deleteObject
      },
			'categorylist textfield[name=searchField]': {
        change: this.liveSearch
      }
		
    });
  },

	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getCategoriesStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getCategoriesStore().load();
	},
 

	loadObjectList : function(me){
		me.getStore().load();
	},

  addObject: function() {
    var view = Ext.widget('categoryform');
    view.show();
  },

  editObject: function() {
		var me = this; 
    var record = this.getList().getSelectedObject();
    var view = Ext.widget('categoryform');

		

    view.down('form').loadRecord(record);
  },

  updateObject: function(button) {
		var me = this; 
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getCategoriesStore();
    var record = form.getRecord();
    var values = form.getValues();

		
		if( record ){
			record.set( values );
			form.query('checkbox').forEach(function(checkbox){
				record.set( checkbox['name']  ,checkbox['checked'] ) ;
			});
			 
			form.setLoading(true);
			record.save({
				success : function(record){
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					
					// store.getProxy().extraParams = {
					//     livesearch: ''
					// };
	 
					store.load();
					win.close();
				},
				failure : function(record,op ){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
				
			 
		}else{
			//  no record at all  => gonna create the new one 
			var me  = this; 
			var newObject = new AM.model.Category( values ) ;
			
			form.query('checkbox').forEach(function(record){
				newObject.set( record['name']  ,record['checked'] ) ;
			});
			// learnt from here
			// http://www.sencha.com/forum/showthread.php?137580-ExtJS-4-Sync-and-success-failure-processing
			// form.mask("Loading....."); 
			form.setLoading(true);
			newObject.save({
				success: function(record){
	
					store.load();
					form.setLoading(false);
					win.close();
					
				},
				failure: function( record, op){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
		} 
  },

  deleteObject: function() {
    var record = this.getList().getSelectedObject();

    if (record) {
      var store = this.getCategoriesStore();
      store.remove(record);
      store.sync();
// to do refresh programmatically
			this.getList().query('pagingtoolbar')[0].doRefresh();
    }

  },

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  }

});
Ext.define('AM.controller.Customers', {
  extend: 'Ext.app.Controller',

  stores: ['Customers'],
  models: ['Customer'],

  views: [
    'master.customer.List',
    'master.customer.Form'
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'customerlist'
		},
		{
			ref : 'searchField',
			selector: 'customerlist textfield[name=searchField]'
		}
	],

  init: function() {
    this.control({
      'customerlist': {
        itemdblclick: this.editObject,
        selectionchange: this.selectionChange,
				afterrender : this.loadObjectList,
      },
      'customerform button[action=save]': {
        click: this.updateObject
      },
      'customerlist button[action=addObject]': {
        click: this.addObject
      },
      'customerlist button[action=editObject]': {
        click: this.editObject
      },
      'customerlist button[action=deleteObject]': {
        click: this.deleteObject
      },
			'customerlist textfield[name=searchField]': {
        change: this.liveSearch
      }
		
    });
  },

	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getCustomersStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getCustomersStore().load();
	},
 

	loadObjectList : function(me){
		me.getStore().load();
	},

  addObject: function() {
    var view = Ext.widget('customerform');
    view.show();
  },

  editObject: function() {
		var me = this; 
    var record = this.getList().getSelectedObject();
    var view = Ext.widget('customerform');

		

    view.down('form').loadRecord(record);
  },

  updateObject: function(button) {
		var me = this; 
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getCustomersStore();
    var record = form.getRecord();
    var values = form.getValues();

		
		if( record ){
			record.set( values );
			 
			form.setLoading(true);
			record.save({
				success : function(record){
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					
					// store.getProxy().extraParams = {
					//     livesearch: ''
					// };
	 
					store.load();
					win.close();
				},
				failure : function(record,op ){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
				
			 
		}else{
			//  no record at all  => gonna create the new one 
			var me  = this; 
			var newObject = new AM.model.Customer( values ) ;
			
			// learnt from here
			// http://www.sencha.com/forum/showthread.php?137580-ExtJS-4-Sync-and-success-failure-processing
			// form.mask("Loading....."); 
			form.setLoading(true);
			newObject.save({
				success: function(record){
	
					store.load();
					form.setLoading(false);
					win.close();
					
				},
				failure: function( record, op){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
		} 
  },

  deleteObject: function() {
    var record = this.getList().getSelectedObject();

    if (record) {
      var store = this.getCustomersStore();
      store.remove(record);
      store.sync();
// to do refresh programmatically
			this.getList().query('pagingtoolbar')[0].doRefresh();
    }

  },

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  }

});
Ext.define("AM.controller.Master", {
	extend : "AM.controller.BaseTreeBuilder",
	views : [
		"master.MasterProcessList",
		'MasterProcessPanel',
		'Viewport'
	],

	 
	
	refs: [
		{
			ref: 'masterProcessPanel',
			selector: 'masterProcessPanel'
		} ,
		{
			ref: 'masterProcessList',
			selector: 'masterProcessList'
		}  
	],
	

	 
	init : function( application ) {
		var me = this; 
		 
		me.control({
			"masterProcessPanel" : {
				activate : this.onActiveProtectedContent,
				deactivate : this.onDeactivated
			} 
			
		});
		
	},
	
	onDeactivated: function(){
		// console.log("Master process panel is deactivated");
		var worksheetPanel = Ext.ComponentQuery.query("masterProcessPanel #worksheetPanel")[0];
		worksheetPanel.setTitle(false);
		// worksheetPanel.setHeader(false);
		worksheetPanel.removeAll();		 
		var defaultWorksheet = Ext.create( "AM.view.master.Default");
		worksheetPanel.add(defaultWorksheet); 
	},
	
	 

	managementFolder : {
		text 			: "Operation", 
		viewClass : '',
		iconCls		: 'text-folder', 
    expanded	: true,
		children 	: [
        
      { 
          text:'Customer', 
          viewClass:'AM.view.master.Customer', 
          leaf:true, 
          iconCls:'text',
 					conditions : [
						{
							controller : "customers",
							action  : 'index'
						}
					]
      },
      { 
				text:'Project', 
				viewClass:'AM.view.master.Project', 
				leaf:true, 
				iconCls:'text' ,
				conditions : [
					{
						controller : 'projects',
						action : 'index'
					}
				]
			}, 
    ]
	},
	
	inventoryFolder : {
		text:'Master Data', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
	
			{ 
				text:'User', 
				viewClass:'AM.view.master.User', 
				leaf:true, 
				iconCls:'text',
				conditions : [
					{
						controller : 'users',
						action : 'index'
					}
				]
	     },
			{ 
				text:'Category', 
				viewClass:'AM.view.master.Category', 
				leaf:true, 
				iconCls:'text',
				conditions : [
					{
						controller : 'categories',
						action : 'category'
					}
				]
	     }
		]
	},
	
	reportFolder : {
		text:'Employee Report', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
	 
			{ 
	        text:'By Project', 
	        viewClass:'AM.view.master.report.employee.WorkProject', 
	        leaf:true, 
	        iconCls:'text' ,
					conditions : [
						{
							controller : 'works',
							action : 'reports'
						}
					
					]
	    },
			{ 
          text:'By Category', 
          viewClass:'AM.view.master.report.employee.WorkCategory', 
          leaf:true, 
          iconCls:'text' ,
					conditions : [
						{
							controller : 'works',
							action : 'reports'
						}
						
					]
      },
			
		]
		
	},
	
	projectReportFolder : {
		text:'Project Report', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
	 
	 
			{ 
          text:'By Category', 
          viewClass:'AM.view.master.report.project.WorkCategory', 
          leaf:true, 
          iconCls:'text' ,
					conditions : [
						{
							controller : 'works',
							action : 'reports'
						}
						
					]
      },
			
		]
		
	},
	 
	onActiveProtectedContent: function( panel, options) {
		var me  = this; 
		var currentUser = Ext.decode( localStorage.getItem('currentUser'));
		var email = currentUser['email'];
		
		me.folderList = [
			this.managementFolder,
			this.inventoryFolder,
			this.reportFolder,
			this.projectReportFolder
		];
		
		var processList = panel.down('masterProcessList');
		processList.setLoading(true);
	
		var treeStore = processList.getStore();
		treeStore.removeAll(); 
		
		treeStore.setRootNode( this.buildNavigation(currentUser) );
		processList.setLoading(false);
	},
});
Ext.define('AM.controller.MasterEmployeeWorkCategoryReports', {
  extend: 'Ext.app.Controller',

  // stores: ['Incomes'],
  // models: ['Income'],

  views: [
    'master.report.employee.WorkCategory',
		'report.workcategory.List',
		'master.report.UserList',
		'Viewport'
  ],

	refs: [
		{
			ref: 'list',
			selector: 'workcategoryList'
		},
		{
			ref: 'recordList',
			selector: 'masterreportemployeeWorkCategoryReport masterreportuserList'
		},
		{
			ref: 'viewport',
			selector: 'vp'
		},
		{
			ref : 'report',
			selector : 'masterreportemployeeWorkCategoryReport'
		} 
	],

  init: function() {
 		console.log("init controller for master.employee.WorkCategoryReports");
	
    this.control({
      'masterreportemployeeWorkCategoryReport chartInspect': {
        'chartLoaded': this.clearList ,
				'seriesClicked' : this.updateList,
				'activate' : this.onActivePanel,
				'afterrender' : this.onAfterRender,
				'destroy' : this.onDestroy,
				'beforedestroy' : this.onBeforeDestroy,
				'beforerender': this.onBeforeRender
      } ,
      'masterreportemployeeWorkCategoryReport masterreportuserList': {
        selectionchange: this.recordSelectionChange,
				afterrender : this.loadRecordList,
      },
		
    });
  },

	loadRecordList: function(){
		var recordList = this.getRecordList();
		recordList.store.load();
	},
	
	recordSelectionChange: function(record){
		var recordList = this.getRecordList(); 
		var report = this.getReport();
		if (recordList.getSelectionModel().hasSelection()) {
			var row = recordList.getSelectionModel().getSelection()[0];
			var id = row.get("id");
			var chartInspect = report.down('chartInspect');
			chartInspect.selectedParentRecordId = id ;
			chartInspect.parentRecordType = 'user';
			chartInspect.viewer = 'master';
			chartInspect.loadStore();
		}
		// var report = this.getWorkCategoryReport();
		// report.loadStore();
	},

	onBeforeRender: function(panel ){
		// console.log("onBeforeRender");
		// panel.buildChartAndList();
		var list = this.getList(); 
		list.store.loadData([],false);
	},

	clearList: function(){
		var list = this.getList(); 
		list.store.loadData([],false);
		list.setTitle('');
		
	},
	
	updateList: function(clickedPoint, viewType, chart){
		var list = this.getList(); 
		
		var recordName = clickedPoint.value[0];
		
		result = chart.store1.queryBy(function(record){
			return record.get("name") === recordName;
		})
		 
		if( result.length === 0 ){
			Ext.Msg.alert("Error", "No series selected");
			return
		}
		 
		
		var viewValue = 0;
		if( viewType === 'month'){
			viewValue = 1;
		}
		
		var selectedParentRecordId = null;
		var recordList = this.getRecordList();  
		if (recordList.getSelectionModel().hasSelection()) {
			var row = recordList.getSelectionModel().getSelection()[0];
			var id = row.get("id"); 
			selectedParentRecordId = id ; 
		}
		
		var viewport = this.getViewport();
		
		list.store.getProxy().extraParams = {
		    viewValue : viewValue,  // for the date 
				selectedRecordId: result.items[0].get('id'), // for the perspective's object id 
				perspective: 'category',
				viewer: 'master',
				selectedParentRecordId: selectedParentRecordId,
				parentRecordType : 'user',
				companyView : false,
				focusDate :  Ext.Date.format( chart.currentFocusDate, 'Y-m-d H:i:s'),
		};
		
		
		viewport.setLoading(true);
		list.store.load({
			callback : function(records, options, success){
				list.setTitle(recordName );
				viewport.setLoading(false);
			}
		});
		
	},
	
	onActivePanel: function(){
	},
	
	onAfterRender: function(panel){
		var list = this.getList(); 
		list.store.loadData([],false);
		
		var recordList = this.getRecordList();
		recordList.store.load();
	},
	
	
	onDestroy: function(){
	},
	
	onBeforeDestroy: function(){
		var list = this.getList(); 
		list.store.getProxy().extraParams = {};
		
	},

});
Ext.define('AM.controller.MasterEmployeeWorkProjectReports', {
  extend: 'Ext.app.Controller',

  // stores: ['Incomes'],
  // models: ['Income'],

  views: [
    'master.report.employee.WorkProject',
		'report.workproject.List',
		'master.report.UserList',
		'Viewport'
  ],

	refs: [
		{
			ref: 'list',
			selector: 'workprojectList'
		},
		{
			ref: 'recordList',
			selector: 'masterreportemployeeWorkProjectReport masterreportuserList'
		},
		{
			ref: 'viewport',
			selector: 'vp'
		},
		{
			ref : 'report',
			selector : 'masterreportemployeeWorkProjectReport'
		} 
	],

  init: function() {
 		console.log("init controller for master.employee.WorkProjectReports");
	
    this.control({
      'masterreportemployeeWorkProjectReport chartInspect': {
        'chartLoaded': this.clearList ,
				'seriesClicked' : this.updateList,
				'activate' : this.onActivePanel,
				'afterrender' : this.onAfterRender,
				'destroy' : this.onDestroy,
				'beforedestroy' : this.onBeforeDestroy,
				'beforerender': this.onBeforeRender
      } ,
      'masterreportemployeeWorkProjectReport masterreportuserList': {
        selectionchange: this.recordSelectionChange,
				afterrender : this.loadRecordList,
      },
		
    });
  },

	loadRecordList: function(){
		var recordList = this.getRecordList();
		recordList.store.load();
	},
	
	recordSelectionChange: function(record){
		console.log("WorkProjectReports#recordSelectionChange")
		var recordList = this.getRecordList(); 
		var report = this.getReport();
		if (recordList.getSelectionModel().hasSelection()) {
			var row = recordList.getSelectionModel().getSelection()[0];
			var id = row.get("id");
			var chartInspect = report.down('chartInspect');
			console.log("The selected id: " + id);
			chartInspect.selectedParentRecordId = id ;
			chartInspect.parentRecordType = 'user';
			chartInspect.viewer = 'master';
			chartInspect.loadStore();
		}
		// var report = this.getWorkProjectReport();
		// report.loadStore();
	},

	onBeforeRender: function(panel ){
		// console.log("onBeforeRender");
		// panel.buildChartAndList();
		var list = this.getList(); 
		list.store.loadData([],false);
	},

	clearList: function(){
		var list = this.getList(); 
		list.store.loadData([],false);
		list.setTitle('');
		
	},
	
	updateList: function(clickedPoint, viewType, chart){
		var list = this.getList(); 
		
		var recordName = clickedPoint.value[0];
		
		result = chart.store1.queryBy(function(record){
			return record.get("name") === recordName;
		})
		 
		if( result.length === 0 ){
			Ext.Msg.alert("Error", "No series selected");
			return
		}
		 
		
		var viewValue = 0;
		if( viewType === 'month'){
			viewValue = 1;
		}
		
		var selectedParentRecordId = null;
		var recordList = this.getRecordList();  
		if (recordList.getSelectionModel().hasSelection()) {
			var row = recordList.getSelectionModel().getSelection()[0];
			var id = row.get("id"); 
			selectedParentRecordId = id ; 
		}
		
		var viewport = this.getViewport();
		
		list.store.getProxy().extraParams = {
		    viewValue : viewValue,  // for the date 
				selectedRecordId: result.items[0].get('id'), // for the perspective's object id 
				perspective: 'project',
				viewer: 'master',
				selectedParentRecordId: selectedParentRecordId,
				parentRecordType : 'user',
				companyView : false,
				focusDate :  Ext.Date.format( chart.currentFocusDate, 'Y-m-d H:i:s'),
		};
		
		
		viewport.setLoading(true);
		list.store.load({
			callback : function(records, options, success){
				list.setTitle(recordName );
				viewport.setLoading(false);
			}
		});
		
	},
	
	onActivePanel: function(){
	},
	
	onAfterRender: function(panel){
		var list = this.getList(); 
		list.store.loadData([],false);
		
		var recordList = this.getRecordList();
		recordList.store.load();
	},
	
	
	onDestroy: function(){
	},
	
	onBeforeDestroy: function(){
		var list = this.getList(); 
		list.store.getProxy().extraParams = {};
		
	},

});
Ext.define('AM.controller.MasterProjectWorkCategoryReports', {
  extend: 'Ext.app.Controller',

  // stores: ['Incomes'],
  // models: ['Income'],

  views: [
    'master.report.project.WorkCategory',
		'report.workcategory.List',
		'master.report.ProjectList',
		'Viewport'
  ],

	refs: [
		{
			ref: 'list',
			selector: 'workcategoryList'
		},
		{
			ref: 'recordList',
			selector: 'masterreportprojectWorkCategoryReport masterreportprojectList'
		},
		{
			ref: 'viewport',
			selector: 'vp'
		},
		{
			ref : 'report',
			selector : 'masterreportprojectWorkCategoryReport'
		} 
	],

  init: function() {
 		console.log("init controller for master.project.WorkCategoryReports");
	
    this.control({
      'masterreportprojectWorkCategoryReport chartInspect': {
        'chartLoaded': this.clearList ,
				'seriesClicked' : this.updateList,
				'activate' : this.onActivePanel,
				'afterrender' : this.onAfterRender,
				'destroy' : this.onDestroy,
				'beforedestroy' : this.onBeforeDestroy,
				'beforerender': this.onBeforeRender
      } ,
      'masterreportprojectWorkCategoryReport masterreportprojectList': {
        selectionchange: this.recordSelectionChange,
				afterrender : this.loadRecordList,
      },
		
    });
  },

	loadRecordList: function(){
		var recordList = this.getRecordList();
		recordList.store.load();
	},
	
	recordSelectionChange: function(record){
		var recordList = this.getRecordList(); 
		var report = this.getReport();
		if (recordList.getSelectionModel().hasSelection()) {
			var row = recordList.getSelectionModel().getSelection()[0];
			var id = row.get("id");
			var chartInspect = report.down('chartInspect');
			chartInspect.selectedParentRecordId = id ;
			chartInspect.parentRecordType = 'project';
			chartInspect.viewer = 'master';
			chartInspect.loadStore();
		}
		// var report = this.getWorkCategoryReport();
		// report.loadStore();
	},

	onBeforeRender: function(panel ){
		// console.log("onBeforeRender");
		// panel.buildChartAndList();
		var list = this.getList(); 
		list.store.loadData([],false);
	},

	clearList: function(){
		var list = this.getList(); 
		list.store.loadData([],false);
		list.setTitle('');
		
	},
	
	updateList: function(clickedPoint, viewType, chart){
		var list = this.getList(); 
		
		var recordName = clickedPoint.value[0];
		
		result = chart.store1.queryBy(function(record){
			return record.get("name") === recordName;
		})
		 
		if( result.length === 0 ){
			Ext.Msg.alert("Error", "No series selected");
			return
		}
		 
		
		var viewValue = 0;
		if( viewType === 'month'){
			viewValue = 1;
		}
		
		var selectedParentRecordId = null;
		var recordList = this.getRecordList();  
		if (recordList.getSelectionModel().hasSelection()) {
			var row = recordList.getSelectionModel().getSelection()[0];
			var id = row.get("id"); 
			selectedParentRecordId = id ; 
		}
		
		var viewport = this.getViewport();
		
		list.store.getProxy().extraParams = {
		    viewValue : viewValue,  // for the date 
				selectedRecordId: result.items[0].get('id'), // for the perspective's object id 
				perspective: 'category',
				viewer: 'master',
				selectedParentRecordId: selectedParentRecordId,
				parentRecordType : 'project',
				companyView : false,
				focusDate :  Ext.Date.format( chart.currentFocusDate, 'Y-m-d H:i:s'),
		};
		
		
		viewport.setLoading(true);
		list.store.load({
			callback : function(records, options, success){
				list.setTitle(recordName );
				viewport.setLoading(false);
			}
		});
		
	},
	
	onActivePanel: function(){
	},
	
	onAfterRender: function(panel){
		var list = this.getList(); 
		list.store.loadData([],false);
		
		var recordList = this.getRecordList();
		recordList.store.load();
	},
	
	
	onDestroy: function(){
	},
	
	onBeforeDestroy: function(){
		var list = this.getList(); 
		list.store.getProxy().extraParams = {};
		
	},

});
/*
	Control the masterProcessList.
	
	For the personal reporting, we want to extract script from the server and execute it. 
*/

Ext.define("AM.controller.MasterTreeNavigation", {
	extend : "Ext.app.Controller",
	views : [
		"master.MasterProcessList"
	],

	 
	
	refs: [
		{
			ref: 'masterProcessList',
			selector: 'masterProcessList'
		} ,
		{
			ref : 'worksheetPanel',
			selector : '#worksheetPanel'
		}
	],
	 
	init : function( application ) {
		var me = this; 
		
		 
		me.control({
			"masterProcessList" : {
				'select' : this.onTreeRecordSelected
			} 
			
		});
		
	},
	
	onTreeRecordSelected : function( me, record, item, index, e ){
		if (!record.isLeaf()) {
			return;
		}

		this.setActiveExample( record.get('viewClass'), record.get('text'));
	},
	
	setActiveExample: function(className, title) {
      var worksheetPanel = this.getWorksheetPanel();
      
      worksheetPanel.setTitle(title);

      worksheet = Ext.create(className);
      worksheetPanel.removeAll();

      worksheetPanel.add(worksheet);
  }
});
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
			'navigation	button[action=switchPersonalReport], navigation button[action=switchWorkLog], navigation button[action=switchMaster]' : {
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
Ext.define("AM.controller.Personal", {
	extend : "AM.controller.BaseTreeBuilder",
	views : [
		"personal.PersonalProcessList",
		'PersonalProcessPanel',
		'Viewport'
	],

	 
	
	refs: [
		{
			ref: 'personalProcessPanel',
			selector: 'personalProcessPanel'
		} ,
		{
			ref: 'personalProcessList',
			selector: 'personalProcessList'
		}  
	],
	

	 
	init : function( application ) {
		var me = this; 
		 
		me.control({
			"personalProcessPanel" : {
				activate : this.onActiveProtectedContent,
				deactivate : this.onDeactivated
			} 
			
		});
		
	},
	
	onDeactivated: function(){
		// console.log("Personal process panel is deactivated");
		var worksheetPanel = Ext.ComponentQuery.query("personalProcessPanel #personal-worksheetPanel")[0];
		worksheetPanel.setTitle(false);
		worksheetPanel.removeAll();		 
		var defaultWorksheet = Ext.create( "AM.view.personal.Default");
		worksheetPanel.add(defaultWorksheet); 
	},
	
	 

	
	reportFolder : {
		text:'Report', 
    viewClass:'Will', 
    iconCls:'text-folder', 
    expanded: true,
		children : [
			{ 
          text:'By Project', 
          viewClass:'AM.view.report.WorkProject', 
          leaf:true, 
          iconCls:'text' ,
					conditions : [
						{
							controller : 'works',
							action : 'project_reports'
						}
					]
      },
	
			{ 
          text:'By Category', 
          viewClass:'AM.view.report.WorkCategory', 
          leaf:true, 
          iconCls:'text' ,
					conditions : [
						{
							controller : 'works',
							action : 'category_reports'
						}
					]
      }
		]
		
	},
	
	onActiveProtectedContent: function( panel, options) {
		var me  = this; 
		var currentUser = Ext.decode( localStorage.getItem('currentUser'));
		var email = currentUser['email'];
		
		me.folderList = [
			this.reportFolder
		];
		
		var processList = panel.down('personalProcessList');
		processList.setLoading(true);
	
		var treeStore = processList.getStore();
		treeStore.removeAll(); 
		
		treeStore.setRootNode( this.buildNavigation(currentUser) );
		processList.setLoading(false);
	},
});
/*
	Control the personalProcessList.
	
	For the personal reporting, we want to extract script from the server and execute it. 
*/

Ext.define("AM.controller.PersonalTreeNavigation", {
	extend : "Ext.app.Controller",
	views : [
		"personal.PersonalProcessList"
	],

	 
	
	refs: [
		{
			ref: 'personalProcessList',
			selector: 'personalProcessList'
		} ,
		{
			ref : 'worksheetPanel',
			selector : '#personal-worksheetPanel'
		}
	],
	 
	init : function( application ) {
		var me = this; 
		
		 
		me.control({
			"personalProcessList" : {
				'select' : this.onTreeRecordSelected
			} 
			
		});
		
	},
	
	onTreeRecordSelected : function( me, record, item, index, e ){
		if (!record.isLeaf()) {
			return;
		}

		this.setActiveExample( record.get('viewClass'), record.get('text'));
	},
	
	setActiveExample: function(className, title) {
      var worksheetPanel = this.getWorksheetPanel();
      
      worksheetPanel.setTitle(title);

      worksheet = Ext.create(className);
      worksheetPanel.removeAll();

      worksheetPanel.add(worksheet);
  }
});
Ext.define('AM.controller.Projects', {
  extend: 'Ext.app.Controller',

  stores: ['Projects'],
  models: ['Project'],

  views: [
    'master.project.List',
    'master.project.Form'
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'projectlist'
		},
		{
			ref : 'searchField',
			selector: 'projectlist textfield[name=searchField]'
		}
	],

  init: function() {
    this.control({
      'projectlist': {
        itemdblclick: this.editObject,
        selectionchange: this.selectionChange,
				afterrender : this.loadObjectList,
      },
      'projectform button[action=save]': {
        click: this.updateObject
      },
      'projectlist button[action=addObject]': {
        click: this.addObject
      },
      'projectlist button[action=editObject]': {
        click: this.editObject
      },
      'projectlist button[action=deleteObject]': {
        click: this.deleteObject
      },
			'projectlist textfield[name=searchField]': {
        change: this.liveSearch
      }
		
    });
  },

	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getProjectsStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getProjectsStore().load();
	},
 

	loadObjectList : function(me){
		me.getStore().load();
	},

  addObject: function() {
    var view = Ext.widget('projectform');
    view.show();
  },

  editObject: function() {
		var me = this; 
    var record = this.getList().getSelectedObject();
    var view = Ext.widget('projectform');

		

    view.down('form').loadRecord(record);
		view.setComboBoxData(record); 
  },

  updateObject: function(button) {
		var me = this; 
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getProjectsStore();
    var record = form.getRecord();
    var values = form.getValues();

		
		if( record ){
			record.set( values );
			 
			form.setLoading(true);
			record.save({
				success : function(record){
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					
					// store.getProxy().extraParams = {
					//     livesearch: ''
					// };
	 
					store.load();
					win.close();
				},
				failure : function(record,op ){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
				
			 
		}else{
			//  no record at all  => gonna create the new one 
			var me  = this; 
			var newObject = new AM.model.Project( values ) ;
			
			// learnt from here
			// http://www.sencha.com/forum/showthread.php?137580-ExtJS-4-Sync-and-success-failure-processing
			// form.mask("Loading....."); 
			form.setLoading(true);
			newObject.save({
				success: function(record){
	
					store.load();
					form.setLoading(false);
					win.close();
					
				},
				failure: function( record, op){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
		} 
  },

  deleteObject: function() {
    var record = this.getList().getSelectedObject();

    if (record) {
      var store = this.getProjectsStore();
      store.remove(record);
      store.sync();
// to do refresh programmatically
			this.getList().query('pagingtoolbar')[0].doRefresh();
    }

  },

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  }

});
Ext.define('AM.controller.Users', {
  extend: 'Ext.app.Controller',

  stores: ['Users'],
  models: ['User'],

  views: [
    'master.user.List',
    'master.user.Form'
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'userlist'
		} 
	],

  init: function() {
    this.control({
      'userlist': {
        itemdblclick: this.editObject,
        selectionchange: this.selectionChange,
				afterrender : this.loadObjectList,
      },
      'userform button[action=save]': {
        click: this.updateObject
      },
      'userlist button[action=addObject]': {
        click: this.addObject
      },
      'userlist button[action=editObject]': {
        click: this.editObject
      },
      'userlist button[action=deleteObject]': {
        click: this.deleteObject
			}	,
			'userlist textfield[name=searchField]': {
				change: this.liveSearch
			}
		
    });
  },

	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getUsersStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getUsersStore().load();
	},
 

	loadObjectList : function(me){
		// console.log("************* IN THE USERS CONTROLLER: afterRENDER");
		me.getStore().load();
	},

  addObject: function() {
    var view = Ext.widget('userform');
    view.show();
  },

  editObject: function() {
    var record = this.getList().getSelectedObject();
    var view = Ext.widget('userform');

    view.down('form').loadRecord(record);
		view.setComboBoxData(record); 
  },

  updateObject: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getUsersStore();
    var record = form.getRecord();
    var values = form.getValues();

		
		if( record ){
			record.set( values );
			 
			form.setLoading(true);
			record.save({
				success : function(record){
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					store.load();
					win.close();
				},
				failure : function(record,op ){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
				
			 
		}else{
			//  no record at all  => gonna create the new one 
			var me  = this; 
			var newObject = new AM.model.User( values ) ;
			
			// learnt from here
			// http://www.sencha.com/forum/showthread.php?137580-ExtJS-4-Sync-and-success-failure-processing
			// form.mask("Loading....."); 
			form.setLoading(true);
			newObject.save({
				success: function(record){
					//  since the grid is backed by store, if store changes, it will be updated
					store.load();
					form.setLoading(false);
					win.close();
					
				},
				failure: function( record, op){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
		} 
  },

  deleteObject: function() {
    var record = this.getList().getSelectedObject();

    if (record) {
      var store = this.getUsersStore();
      store.remove(record);
      store.sync();
// to do refresh programmatically
		this.getList().query('pagingtoolbar')[0].doRefresh();
    }

  },

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  }

});
Ext.define('AM.controller.WorkCategoryReports', {
  extend: 'Ext.app.Controller',

  // stores: ['Incomes'],
  // models: ['Income'],

  views: [
    'report.WorkCategory',
		'report.workcategory.List',
		'Viewport'
  ],

	refs: [
		{
			ref: 'list',
			selector: 'workcategoryList'
		},
		{
			ref: 'viewport',
			selector: 'vp'
		},
		{
			ref : 'workCategoryReport',
			selector : 'workCategoryReport'
		} 
	],

  init: function() {
 
	
    this.control({
      'workCategoryReport': {
        'chartLoaded': this.clearList ,
				'seriesClicked' : this.updateList,
				'activate' : this.onActivePanel,
				'afterrender' : this.onAfterRender,
				'destroy' : this.onDestroy,
				'beforedestroy' : this.onBeforeDestroy,
				'beforerender': this.onBeforeRender
      } 
		
    });
  },

	onBeforeRender: function(panel ){
		// console.log("onBeforeRender");
		// panel.buildChartAndList();
		var list = this.getList(); 
		list.store.loadData([],false);
	},

	clearList: function(){
		// console.log("from the clearList");
		var list = this.getList(); 
		list.store.loadData([],false);
		list.setTitle('');
		
		// list.reload();
		// list.store.getProxy().extraParams = {};
	},
	
	updateList: function(clickedPoint, viewType, chart){
		var list = this.getList(); 
		
		var recordName = clickedPoint.value[0];
		
		// console.log("The recordName: ");
		// console.log(recordName);
		result = chart.store1.queryBy(function(record){
			return record.get("name") === recordName;
		})
		
		// console.log("The store: ");
		// console.log( chart.store1);
		
		if( result.length === 0 ){
			Ext.Msg.alert("Error", "No series selected");
			return
		}
		
		// console.log("The result: ");
		// console.log( result ) ;
		
		
		var viewValue = 0;
		if( viewType === 'month'){
			viewValue = 1;
		}
		
		var viewport = this.getViewport();
		
		list.store.getProxy().extraParams = {
		    viewValue : viewValue,
				selectedRecordId: result.items[0].get('id'),
				perspective: 'category',
				viewer: 'personal',
				focusDate :  Ext.Date.format( chart.currentFocusDate, 'Y-m-d H:i:s'),
		};
		
		
		viewport.setLoading(true);
		list.store.load({
			callback : function(records, options, success){
				list.setTitle(recordName );
				viewport.setLoading(false);
			}
		});
		
	},
	
	onActivePanel: function(){
	},
	
	onAfterRender: function(panel){
		var list = this.getList(); 
		list.store.loadData([],false);
	},
	
	
	onDestroy: function(){
	},
	
	onBeforeDestroy: function(){
		var list = this.getList(); 
		list.store.getProxy().extraParams = {};
		
	},

});
Ext.define('AM.controller.WorkProjectReports', {
  extend: 'Ext.app.Controller',

  // stores: ['Incomes'],
  // models: ['Income'],

  views: [
    'report.WorkProject',
		'report.workproject.List',
		'Viewport'
  ],

	refs: [
		{
			ref: 'list',
			selector: 'workprojectList'
		} ,
		{
			ref: 'viewport',
			selector: 'vp'
		},
		{
			ref : 'workProjectReport',
			selector : 'workProjectReport'
		} 
	],

  init: function() {
 
	
    this.control({
      'workProjectReport': {
        'chartLoaded': this.clearList ,
				'seriesClicked' : this.updateList,
				'activate' : this.onActivePanel,
				'afterrender' : this.onAfterRender,
				'destroy' : this.onDestroy,
				'beforedestroy' : this.onBeforeDestroy,
				'beforerender': this.onBeforeRender
      } 
		
    });
  },

	onBeforeRender: function(panel ){
		// console.log("onBeforeRender");
		// panel.buildChartAndList();
		var list = this.getList(); 
		list.store.loadData([],false);
	},

	clearList: function(){
		// console.log("from the clearList");
		var list = this.getList(); 
		list.store.loadData([],false);
		list.setTitle('');
		
		// list.reload();
		// list.store.getProxy().extraParams = {};
	},
	
	updateList: function(clickedPoint, viewType, chart){
		var list = this.getList(); 
		
		var recordName = clickedPoint.value[0];
		
		// console.log("The recordName: ");
		// console.log(recordName);
		result = chart.store1.queryBy(function(record){
			return record.get("name") === recordName;
		})
		
		// console.log("The store: ");
		// console.log( chart.store1);
		
		if( result.length === 0 ){
			Ext.Msg.alert("Error", "No series selected");
			return
		}
		
		// console.log("The result: ");
		// console.log( result ) ;
		
		
		var viewValue = 0;
		if( viewType === 'month'){
			viewValue = 1;
		}
		
		var viewport = this.getViewport();
		
		list.store.getProxy().extraParams = {
		    viewValue : viewValue,
				selectedRecordId: result.items[0].get('id'),
				perspective: 'project',
				viewer: 'personal',
				focusDate :  Ext.Date.format( chart.currentFocusDate, 'Y-m-d H:i:s'),
		};
		
		
		viewport.setLoading(true);
		list.store.load({
			callback : function(records, options, success){
				list.setTitle(recordName );
				viewport.setLoading(false);
			}
		});
		
	},
	
	onActivePanel: function(){
	},
	
	onAfterRender: function(panel){
		var list = this.getList(); 
		list.store.loadData([],false);
	},
	
	
	onDestroy: function(){
	},
	
	onBeforeDestroy: function(){
		var list = this.getList(); 
		list.store.getProxy().extraParams = {};
		
	},

});
Ext.define('AM.controller.Works', {
  extend: 'Ext.app.Controller',

  stores: ['Works'],
  models: ['Work'],

  views: [
    'work.List',
    'work.Form',
		'Work'
  ],

  	refs: [
		{
			ref: 'list',
			selector: 'worklist'
		},
		{
			ref : 'searchField',
			selector: 'worklist textfield[name=searchField]'
		},
		{
			ref : 'workProcess',
			selector : 'workProcess'
		}
	],

  init: function() {
    this.control({
      'worklist': {
        itemdblclick: this.editObject,
        selectionchange: this.selectionChange, 
				// afterrender : this.onAfterRender, 
				
      },
			'workProcess' : {
				activate : this.loadObjectList, 
				// activate : this.onWorkProcessActivated
			},
      'workform button[action=save]': {
        click: this.updateObject
      },
      'worklist button[action=addObject]': {
        click: this.addObject
      },
      'worklist button[action=editObject]': {
        click: this.editObject
      },
      'worklist button[action=deleteObject]': {
        click: this.deleteObject
      },
			'worklist textfield[name=searchField]': {
        change: this.liveSearch
      }
		
    });
  },
 
 
	liveSearch : function(grid, newValue, oldValue, options){
		var me = this;

		me.getWorksStore().getProxy().extraParams = {
		    livesearch: newValue
		};
	 
		me.getWorksStore().load();
	},
 

	loadObjectList : function(activeItem){
		// console.log("Wtf bro.. in the loadObjectList");
		var date = new Date();
		// console.log( date ) ;
		// console.log( arguments ) ;
		activeItem.down("worklist").getStore().load();
		// this.getStore().load();
	},

  addObject: function() {
    var view = Ext.widget('workform');
    view.show();
  },

  editObject: function() {
		var me = this; 
    var record = this.getList().getSelectedObject();
    var view = Ext.widget('workform');

		

    view.down('form').loadRecord(record);
		view.setComboBoxData(record); 
  },

  updateObject: function(button) {
		var me = this; 
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getWorksStore();
    var record = form.getRecord();
    var values = form.getValues();

		
		if( record ){
			record.set( values );
			 
			form.setLoading(true);
			record.save({
				success : function(record){
					form.setLoading(false);
					//  since the grid is backed by store, if store changes, it will be updated
					
					// store.getProxy().extraParams = {
					//     livesearch: ''
					// };
	 
					store.load();
					win.close();
				},
				failure : function(record,op ){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
				
			 
		}else{
			//  no record at all  => gonna create the new one 
			var me  = this; 
			var newObject = new AM.model.Work( values ) ;
			
			// learnt from here
			// http://www.sencha.com/forum/showthread.php?137580-ExtJS-4-Sync-and-success-failure-processing
			// form.mask("Loading....."); 
			form.setLoading(true);
			newObject.save({
				success: function(record){
	
					store.load();
					form.setLoading(false);
					win.close();
					
				},
				failure: function( record, op){
					form.setLoading(false);
					var message  = op.request.scope.reader.jsonData["message"];
					var errors = message['errors'];
					form.getForm().markInvalid(errors);
					this.reject();
				}
			});
		} 
  },

  deleteObject: function() {
    var record = this.getList().getSelectedObject();

    if (record) {
      var store = this.getWorksStore();
      store.remove(record);
      store.sync();
// to do refresh programmatically
			this.getList().query('pagingtoolbar')[0].doRefresh();
    }

  },

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      grid.enableRecordButtons();
    } else {
      grid.disableRecordButtons();
    }
  }

});
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

 






 



