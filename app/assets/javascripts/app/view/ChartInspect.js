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
