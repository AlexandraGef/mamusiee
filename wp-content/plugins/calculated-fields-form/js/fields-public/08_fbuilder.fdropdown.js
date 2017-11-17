	$.fbuilder.controls[ 'fdropdown' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'fdropdown' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Select a Choice",
			ftype:"fdropdown",
			size:"medium",
			required:false,
			toSubmit:"text",
			choiceSelected:"",
			showDep:false,
			show:function()
				{
					this.choicesVal = ((typeof(this.choicesVal) != "undefined" && this.choicesVal !== null)?this.choicesVal:this.choices)

					var c	= this.choices,
						cv	= this.choicesVal,
						l 	= c.length,
						classDep = '',
						str = '';

					if ( typeof this.choicesDep == "undefined" || this.choicesDep == null )
						this.choicesDep = new Array();

					for (var i=0;i<l;i++)
					{
						if( typeof this.choicesDep[i] != 'undefined' )
							this.choicesDep[i] = $.grep(this.choicesDep[i],function(n){ return n != ""; });
						else
							this.choicesDep[i] = [];

						if( this.choicesDep[i].length )
							classDep = 'depItem';
					}

					for (var i=0;i<l;i++)
					{
						str += '<option '+((this.choiceSelected == c[i]+' - '+cv[i])?"selected":"")+' '+( ( classDep != '' ) ? 'class="'+classDep+'"' : '' )+' value="'+$.fbuilder.htmlEncode(cv[i])+'" vt="'+$.fbuilder.htmlEncode((this.toSubmit=='text') ? c[i] : cv[i])+'" >'+c[i]+'</option>';
					}

					return '<div class="fields '+this.csslayout+' cff-dropdown-field" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><select id="'+this.name+'" name="'+this.name+'" class="field '+( ( classDep != '' ) ? ' depItemSel ' : '' )+this.size+((this.required)?" required":"")+'" >'+str+'</select><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div><div class="clearer"></div></div>';
				},
			showHideDep:function( toShow, toHide, hiddenByContainer )
				{
					var me = this,
						item = $( '#'+me.name+'.depItemSel' ),
						form_identifier = me.form_identifier,
						isHidden = ( typeof toHide[ me.name ] != 'undefined' || typeof hiddenByContainer[ me.name ] != 'undefined' ),
						result = [];

					try
					{
						if( item.length )
						{
							var selected = item[0].selectedIndex;
							for( var i = 0, h = me.choices.length; i < h; i++ )
							{
								if( typeof me.choicesDep[i] != 'undefined' && me.choicesDep[ i ].length )
								{
									for( var j = 0, k = me.choicesDep[ i ].length; j < k; j++)
									{
										var dep = me.choicesDep[i][j]+form_identifier;
										if( isHidden || selected != i )
										{
											if( typeof toShow[ dep ] != 'undefined' )
											{
												delete toShow[ dep ][ 'ref' ][ me.name+'_'+i ];
												if( $.isEmptyObject(toShow[ dep ][ 'ref' ]) )
												delete toShow[ dep ];
											}
										}

										if( selected == i && !isHidden )
										{
											if( typeof toShow[ dep ] == 'undefined' )
											{
												$( '#'+dep ).closest( '.fields' ).show();
												$( '[id*="'+dep+'"].ignore' ).removeClass( 'ignore' );
												toShow[ dep ] = { 'ref': {}};
											}
											toShow[ dep ][ 'ref' ][ me.name+'_'+i ]  = 1;
											if( typeof toHide[ dep ] != 'undefined')
											{
												result.push( dep );
												delete toHide[ dep ];
											}
										}
										else
										{
											if( typeof toShow[ dep ] == 'undefined' )
											{
												$( '#'+dep ).closest( '.fields' ).hide();
												$( '[id*="'+dep+'"]:not(.ignore)' ).addClass( 'ignore' );
												if( typeof toHide[ dep ] == 'undefined') result.push( dep );
												toHide[ dep ] = {};
											}
										}
									}
								}
							}
						}
					}
					catch( e ){}
					return result;
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore)' );
					if( e.length ) return $.fbuilder.parseValStr( e.val() );
					return 0;
				},
			setVal:function( v )
				{
					var t = (new String(v)).replace(/(['"])/g, "\\$1"), n = this.name;
					$( '[id="'+n+'"] OPTION[vt="'+t+'"],[id="'+n+'"] OPTION[value="'+t+'"]' ).prop( 'selected', true );
					$( '[id="'+n+'"]' ).change();
				}
		}
	);