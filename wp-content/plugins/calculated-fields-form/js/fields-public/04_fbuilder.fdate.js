	$.fbuilder.controls[ 'fdate' ] = function(){};
	$.extend(
		$.fbuilder.controls[ 'fdate' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Date",
			ftype:"fdate",
			predefined:"",
			predefinedClick:false,
			size:"medium",
			required:false,
			dformat:"mm/dd/yyyy",
			tformat:"24",
			showDropdown:false,
			dropdownRange:"-10:+10",
			minDate:"",
			maxDate:"",
            invalidDates:"",
			minHour:0,
			maxHour:23,
			minMinute:0,
			maxMinute:59,
			
			stepHour: 1,
			stepMinute: 1,
			
			showDatepicker: true,
			showTimepicker: false,
			
			defaultDate:"",
			defaultTime:"",
			working_dates:[true,true,true,true,true,true,true],
			formats:new Array("mm/dd/yyyy","dd/mm/yyyy"),
			init:function()
				{
					function checkValue( v, min, max )
						{
							v = parseInt( v );
							if( isNaN( v ) )   v = max;
							else if( v < min ) v = min;
							else if( v > max ) v = max;
							return v;
						}
						
					this.minHour 	= checkValue( this.minHour, 0, 23 );
					this.maxHour 	= checkValue( this.maxHour, 0, 23 );
					this.minMinute 	= checkValue( this.minMinute, 0, 59 );
					this.maxMinute 	= checkValue( this.maxMinute, 0, 59 );
					this.stepHour 	= checkValue( this.stepHour, 1, Math.max( 1, this.maxHour - this.minHour ) );
					this.stepMinute = checkValue( this.stepMinute, 1, Math.max( 1, this.maxMinute - this.minMinute ) );
					
                    this.invalidDates = this.invalidDates.replace( /\s+/g, '' );
					if( !/^\s*$/.test( this.invalidDates ) )
					{
						var	dateRegExp = new RegExp( /^\d{1,2}\/\d{1,2}\/\d{4}$/ ),
							counter = 0,
							dates = this.invalidDates.split( ',' );
						this.invalidDates = [];
						for( var i = 0, h = dates.length; i < h; i++ )
						{
							var range = dates[ i ].split( '-' );
							
							if( range.length == 2 && range[0].match( dateRegExp ) != null && range[1].match( dateRegExp ) != null )
							{
								var fromD = new Date( range[ 0 ] ),
									toD = new Date( range[ 1 ] );
								while( fromD <= toD )
								{
									this.invalidDates[ counter ] = fromD;
									var tmp = new Date( fromD.valueOf() );
									tmp.setDate( tmp.getDate() + 1 );
									fromD = tmp;
									counter++;
									
								}
							}
							else
							{
								for( var j = 0, k = range.length; j < k; j++ )
								{
									if( range[ j ].match( dateRegExp ) != null )
									{
										this.invalidDates[ counter ] = new Date( range[ j ] );
										counter++;
									}	
								}	
							}	
						}	
					}	
                },
			get_hours:function()
				{
					var str = '',
						i = 0,
						h,
						from = ( this.tformat == 12 ) ? 1  : this.minHour,
						to   = ( this.tformat == 12 ) ? 12 : this.maxHour;
					
					while( ( h = from + this.stepHour * i ) <= to )
					{

						if( h < 10 ) h = '0'+''+h;
						str += '<option value="' + h + '">' + h + '</option>';
						i++;
					}
					return '<select id="'+this.name+'_hours" name="'+this.name+'_hours">' + str + '</select>:';
				},
			get_minutes:function()
				{
					var str = '',
						i = 0,
						m;
					
					while( ( m = this.minMinute + this.stepMinute * i ) <= this.maxMinute )
					{
						if( m < 10 )
						{
							m = '0'+''+m;
						}
						str += '<option value="' + m + '">' + m + '</option>';
						i++;
					}
					return '<select id="'+this.name+'_minutes" name="'+this.name+'_minutes">' + str + '</select>';
				},
			get_ampm:function()
				{
					var str = '';	
					if( this.tformat == 12 )
					{
						return '<select id="'+this.name+'_ampm"><option value="am">am</option><option value="pm">pm</option></select>';
					}
					return str;
				},
			set_date_time:function()
				{
					var str = $( '#'+this.name+'_date' ).val();
					if( this.showTimepicker )
					{
						var h = $( '#'+this.name+'_hours' ).val()*1;
						str += ' ';
						if( this.tformat == 12 )
						{
							h = (h==12) ? 0 : h;
							if( $( '#'+this.name+'_ampm' ).val() == 'pm' ) str += ( h + 12 );
							else str += h;
						}	
						else str += h;
						str += ':'+$( '#'+this.name+'_minutes' ).val();
					}
					$( '#'+this.name ).val( str ).change();
				},
			show:function()
				{
                    var attr 			= 'value',
						format_label   	= [],
						date_tag_type  	= 'text',
						disabled		= '',
						date_tag_class 	= 'field date'+this.dformat.replace(/\//g,"")+' '+this.size+((this.required)?' required': '');
		
                    if( this.predefinedClick ) attr = 'placeholder';
                    if( this.showDatepicker ) format_label.push(this.dformat);
					else{ date_tag_type = 'hidden'; disabled='disabled';}
                    if( this.showTimepicker ) format_label.push('HH:mm');
                    
					return '<div class="fields '+this.csslayout+' cff-date-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+( (format_label.length) ? ' <span class="dformat">('+format_label.join(' ')+')</span>' : '' )+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" type="hidden" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><input id="'+this.name+'_date" name="'+this.name+'_date" class="'+date_tag_class+'" type="'+date_tag_type+'" '+attr+'="'+$.fbuilder.htmlEncode(this.predefined)+'" '+disabled+' />'+( ( this.showTimepicker ) ? ' '+this.get_hours()+this.get_minutes()+' '+this.get_ampm() : '' )+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			setDefaultDate : function()
				{
					var me = this,
						p  = { 
							dateFormat: me.dformat.replace(/yyyy/g,"yy"),
							minDate: me.minDate,
							maxDate: me.maxDate
						},
						dp = $( "#"+me.name+"_date" ),
						dd = (me.defaultDate != "") ? me.defaultDate : ( ( me.predefined != "" ) ? me.predefined : new Date() );
						
					dp.click( function(){ $(document).click(); $(this).focus(); } );	
					if (me.showDropdown )
					{
						if( me.dropdownRange.indexOf( ':' ) == -1 ) me.dropdownRange = '-10:+10';
						p = $.extend(p,{changeMonth: true,changeYear: true,yearRange: me.dropdownRange});
					}	
					p = $.extend(p, { beforeShowDay: ( function ( w, i ) { return function( d ){ return me.validateDate( d, w, i ); }; } )( me.working_dates, me.invalidDates ) } );
					dp.datepicker(p);
                    if( !me.predefinedClick ) dp.datepicker( "setDate", dd);
                    if( !me.validateDate( dp.datepicker( "getDate"), me.working_dates, me.invalidDates)[ 0 ]  )
                    {    
                        dp.datepicker( "setDate", '');
                    }
				},
			setDefaultTime : function()
				{
					function setValue( f, v, m )
					{
						v = Math.min( v*1, m*1 );
						v = ( v < 10 ) ? 0+''+v : v; 
						$( '#' + f + ' [value="' + v + '"]' ).prop( 'selected', true );
					};
			
					if( this.showTimepicker )
					{
						var parts, time = {}, tmp = 0;
						if(  ( parts = /(\d{1,2}):(\d{1,2})/g.exec( this.defaultTime ) ) != null )
						{
							time[ 'hour' ] = parts[ 1 ];
							time[ 'minute' ] = parts[ 2 ];
						}
						else
						{
							var d = new Date();
							time[ 'hour' ] = d.getHours();
							time[ 'minute' ] = d.getMinutes();
						}
 
						setValue( 
							this.name+'_hours', 
							( this.tformat == 12 ) ? ( ( time[ 'hour' ] > 12 ) ? time[ 'hour' ] - 12 : ( ( time[ 'hour' ] == 0 ) ? 12 : time[ 'hour' ] ) ) : time[ 'hour' ], 
							( this.tformat == 12 ) ? 12 : this.maxHour 
						);

						setValue( this.name+'_minutes', time[ 'minute' ], this.maxMinute );					  						
						$( '#'+this.name+'_ampm'+' [value="' + ( ( time[ 'hour' ] < 12 ) ? 'am' : 'pm' ) + '"]' ).prop( 'selected', true );
					}
				},
			setEvents : function()
				{
					var me = this,
						f  = function(){
							if( !me.after_show_flag )
								$( '#'+me.name+'_date' ).valid();
							me.set_date_time();
						};
					
					$( document ).on( 'change', '#'+me.name+'_date', 	function(){ f(); } );
					$( document ).on( 'change', '#'+me.name+'_hours',   function(){ f(); } );
					$( document ).on( 'change', '#'+me.name+'_minutes', function(){ f(); } );
					$( document ).on( 'change', '#'+me.name+'_ampm', 	function(){ f(); } );
					
					$( '#cp_calculatedfieldsf_pform'+me.form_identifier ).bind( 'reset', function(){ setTimeout( function(){ me.setDefaultDate(); me.setDefaultTime(); me.set_date_time(); }, 500 ); } );
				},
			validateDate: function( d, w, i )
				{
					try{
						if( d === null ) return [false,""];
						if ( !w[ d.getDay()]) return [false,""];
						if( i !== null )
						{
							for( var j = 0, h = i.length; j < h; j++ )
							{
								if( d.getDate() == i[ j ].getDate() && d.getMonth() == i[ j ].getMonth() && d.getFullYear() == i[ j ].getFullYear() ) return [false,""];
							}
						}
					}
					catch( _err ){}
					return [true,""]; 
				},	
			validateTime : function( e, i )
				{
					if( i.showTimepicker )
					{
						var base = e.name.replace( '_date', '' ),
							h = $('#'+base+'_hours').val(),
							m = $('#'+base+'_minutes').val();
						if( i.tformat == 12 )
						{	
							if( $('#'+base+'_ampm').val() == 'pm' && h != 12 ) h = h*1 + 12;
							if( $('#'+base+'_ampm').val() == 'am' && h == 12 ) h = 0;
						}	
						if( h < i.minHour || h > i.maxHour ) return false;
					}
					return true;	
				},
			after_show:function()
				{
					var me = this;
					me.after_show_flag = true;
					me.setEvents();
					me.setDefaultDate();
					me.setDefaultTime();
					$( '#'+this.name+'_date' ).change();
                    me.after_show_flag = false;
					var validator = function( v, e )
					{
												
						try
						{
							var _dp			= $.datepicker,
								_fb			= $.fbuilder,
								p           = e.name.replace( '_date', '' ).split( '_' ),
								_index		= ( p.length > 1 ) ? '_'+p[ 1 ] : '',
								item        = ( 
												typeof _fb[ 'forms' ] != 'undefined' && 
												typeof _fb[ 'forms' ][ _index ] != 'undefined'  
											  ) ? _fb[ 'forms' ][ _index ].getItem( p[ 0 ]+'_'+p[ 1 ] ) : null,
								inst        = _dp._getInst( e ),
								minDate     = _dp._determineDate( inst, _dp._get( inst, 'minDate'), null),
								maxDate     = _dp._determineDate(inst, _dp._get(inst, 'maxDate'), null),
								dateFormat  = _dp._get(inst, 'dateFormat'),
								date        = _dp.parseDate(dateFormat, v, _dp._getFormatConfig(inst));
								
							if( item != null )
							{	
								return 	this.optional( e ) || 
										( 
											( minDate == null || date >= minDate  ) && 
											( maxDate == null || date <= maxDate ) && 
											me.validateDate( $( e ).datepicker( 'getDate' ), item.working_dates, item.invalidDates )[ 0 ] &&
											me.validateTime( e, item )
										);
							}
							return true;	
						}
						catch( er )
						{
							return false;
						}
					};
					
                    $.validator.addMethod("dateddmmyyyy", validator );
					$.validator.addMethod("datemmddyyyy", validator );
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore)' );
					if( e.length )
					{
						var rt;
						if( this.dformat == 'yyyy/mm/dd' || this.dformat == 'yyyy/dd/mm' ) 
							rt = '(\\d{4})[\\/\\-\\.](\\d{1,2})[\\/\\-\\.](\\d{1,2})';
						else
							rt = '(\\d{1,2})[\\/\\-\\.](\\d{1,2})[\\/\\-\\.](\\d{4})';
						
						var v  = $.trim( e.val() ),
							re = new RegExp( rt+'(\\s(\\d{1,2})[:\\.](\\d{1,2}))?' ),
							d  = re.exec( v ),
							h  = 0,
							m  = 0,
							date;

						if( d )
						{
							if( typeof d[ 5 ] != 'undefined' ) h = d[ 5 ];
							if( typeof d[ 6 ] != 'undefined' ) m = d[ 6 ];
							
							switch( this.dformat )
							{
								case 'yyyy/dd/mm':
									date = new Date( d[ 1 ], ( d[ 3 ] * 1 - 1 ), d[ 2 ], h, m, 0, 0 );
								break;
								case 'yyyy/mm/dd':
									date = new Date( d[ 1 ], ( d[ 2 ] * 1 - 1 ), d[ 3 ], h, m, 0, 0 );
								break;
								case 'dd/mm/yyyy':
									date = new Date( d[ 3 ], ( d[ 2 ] * 1 - 1 ), d[ 1 ], h, m, 0, 0 );
								break;
								case 'mm/dd/yyyy':
									date = new Date( d[ 3 ], ( d[ 1 ] * 1 - 1 ), d[ 2 ], h, m, 0, 0 );
								break;
							}
							
							if( this.showTimepicker )
							{
								return date.valueOf() / 86400000;
							}
							else
							{
								return Math.ceil( date.valueOf() / 86400000 );
							}
						}	
					}
					return 0;
				},
			setVal:function( v )
				{
					try
					{
						$( '[name="'+this.name+'"]' ).val( v );
						if( v.length )
						{	
							v = v.replace( /\s+/g, ' ' ).split( ' ' );
							this.defaultDate = v[ 0 ];
							this.setDefaultDate();
							if( v.length == 2 )
							{	
								this.defaultTime = v[ 1 ];
								this.setDefaultTime();
							}	
						}	
					}catch( err ){}
				}
		}
	);