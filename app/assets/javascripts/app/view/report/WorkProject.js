Ext.define('AM.view.report.WorkProject', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workProjectReport',

		layout : {
			type : 'hbox',
			align : 'stretch'
		},

		currentFocusDate : new Date(),
		currentViewType : 'week',
		
		buildChartAndList: function(){
			console.log("Inside build CHart and List");
			
			var me = this; 
			me.removeAll();
			
			console.log("initial items in the workprojectReport:");
			console.log( me.items.length ) ;
			 
			me.setLoading(true);
			
			Ext.Ajax.request(
				{
					url: "api/work_project_reports",
					method : "GET",
					// scripts : true, 
					success: function (xhr) {
						try {
			
				
							var decodedResponseText = Ext.decode( xhr.responseText );
							// var config = Ext.Component.create( decodedResponseText['config']) ;
							var config = decodedResponseText['config'];
							me.buildChart( config);
							me.setLoading(false);
			
							console.log("final items count: " + me.items.length );
						}
						catch (ex) {
			
							alert('Exception ' + ex);
						}
			
					} 
				});
			
			
			
			// working, for simple component addition 
			// Ext.Ajax.request(
			// 	{
			// 		url: "api/work_reports",
			// 		method : "GET",
			// 		// scripts : true, 
			// 		success: function (xhr) {
			// 			try {
			// 				
			// 				console.log("Initial items: " ) ;
			// 				console.log( me.items.length );
			// 				var decodedResponseText = Ext.decode( xhr.responseText );
			// 				var newComponent = Ext.Component.create( decodedResponseText['component_config']) ;
			// 				me.add( newComponent);
			// 				console.log("The new component: " ) ;
			// 				console.log( newComponent ) ;
			//  			 
			// 				me.setLoading(false);
			// 				
			// 				
			// 				console.log("final items count: " + me.items.length );
			// 			}
			// 			catch (ex) {
			// 			
			// 				alert('Exception ' + ex);
			// 			}
			// 
			// 		} 
			// 	});
				
			
			
			// request from the server for the fields and data 
		},
		
		
	 
	
		buildChart: function(){
			var me = this; 

			me.store1 = Ext.create(Ext.data.JsonStore, {
				fields	: [
					'name',
					'data1',
					'id'
				],
				proxy  	: {
					type : 'ajax',
					url : 'api/work_project_reports',
					reader : {
						type : 'json',
						root : 'records', 
						totalProperty  : 'total'
					}
				},
				autoLoad : false 
			});

			me.loadStore();

			var chartConfig = {
				xtype: 'chart',
				flex : 3 ,
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
            title: 'Income',
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Time'
        }],
        series: [{
						id : 'superSeries',
            type: 'column',
            axis: 'bottom',
            highlight: true,
            xField: 'name',
            yField: 'data1',
						listeners:{
							itemmousedown : function(obj) {
								console.log("@itemmousedown");
								console.log("The obj");
								console.log(obj);
								
								console.log("currentViewType: ");
								console.log(me.currentViewType);
								console.log('=======\n')

								me.fireEvent('seriesClicked',  obj,  me.currentViewType  , me );
							}
						}
        }]
			}

			return chartConfig ; 
		},
		
		// 
		// buildChart: function(config){
		// 	console.log("The config: " ) ;
		// 	console.log( config ) ;
		// 	var me  = this;
		// 	var store1 = Ext.create('Ext.data.JsonStore', {
		// 	        fields: ['name', 'data1'],
		// 	        data:  config['data']
		// 	    });
		// 	
		// 	console.log("The store1");
		// 	console.log( store1);
		// 	
		// 	
		// 	var chart = Ext.create('Ext.chart.Chart', {
		// 	            style: 'background:#fff',
		// 	            animate: true,
		// 	            shadow: true,
		// 	            store: store1,
		// 							flex: 1 ,    // this is the addition.. fucker
		// 							
		// 			 
		// 							
		// 							
		// 	            axes: [{
		// 	                type: 'Numeric',
		// 	                position: 'left',
		// 	                fields: ['data1'],
		// 	                label: {
		// 	                    renderer: Ext.util.Format.numberRenderer('0,0') 
		// 	                },
		// 	                title: 'Number of Mins',
		// 	                grid: true,
		// 	                minimum: 0
		// 	            }, {
		// 	                type: 'Category',
		// 	                position: 'bottom',
		// 	                fields: ['name'],
		// 	                title: 'Project'
		// 	            }],
		// 	            series: [{
		// 	                type:   'column' ,// 'column',
		// 	                axis: 'left',
		// 	                highlight: true,
		// 	                tips: {
		// 	                  trackMouse: true,
		// 	                  width: 140,
		// 	                  height: 28,
		// 	                  renderer: function(storeItem, item) {
		// 	                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' $');
		// 	                  }
		// 	                },
		// 	                // label: {
		// 	                //   display: 'insideEnd',
		// 	                //   'text-anchor': 'middle',
		// 	                //     field: 'data1',
		// 	                //     renderer: Ext.util.Format.numberRenderer('0'),
		// 	                //     orientation: 'vertical',
		// 	                //     color: '#333'
		// 	                // },
		// 	                xField: 'name',
		// 	                yField: 'data1',
		// 									listeners:{
		// 										itemmousedown : function(obj) {
		// 
		// 											me.fireEvent('seriesClicked',  obj,  me.currentViewType  );
		// 										}
		// 									}
		// 	            }]
		// 	        });
		// 	console.log("The composed chart:");
		// 	console.log( chart ) ;
		// 	this.add( chart ) ;
		// },
		 
	  
		loadStore: function(  ){
			var me = this; 
			var date = me.currentFocusDate; 
			
			console.log("The date:" ) ;
			console.log( date ) ;
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
					focusDate :  Ext.Date.format( date, 'Y-m-d H:i:s')
				},
				callback : function(records, options, success){
					me.setLoading(false);
					result = me.fireEvent('chartLoaded', Ext.Date.format( date, 'Y-m-d H:i:s'));
				}
			});
		},
		 
		buildList: function(){
			var listConfig = {
				xtype: 'workprojectList',
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

			// this.tbar.items.push({
			//           id: this.id+'-tb-year', text: this.yearText, handler: this.onYearNavClick, scope: this, toggleGroup: this.id+'-sr-tb-views'
			//       });

		 

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
