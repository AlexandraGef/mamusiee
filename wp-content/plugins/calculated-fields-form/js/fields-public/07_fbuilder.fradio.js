	$.fbuilder.controls[ 'fradio' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'fradio' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Select a Choice",
			ftype:"fradio",
			layout:"one_column",
			required:false,
			toSubmit:"text",
			choiceSelected:"",
			showDep:false,
			show:function()
				{
					this.choicesVal = ((typeof(this.choicesVal) != "undefined" && this.choicesVal !== null)?this.choicesVal:this.choices);

					var l 		 = this.choices.length,
						str 	 = "",
						classDep = "";

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
						str += '<div class="'+this.layout+' cff-radiobutton-field"><label><input name="'+this.name+'" id="'+this.name+'" class="field '+classDep+' group '+((this.required)?" required":"")+'" value="'+$.fbuilder.htmlEncode(this.choicesVal[i])+'" vt="'+$.fbuilder.htmlEncode((this.toSubmit=='text') ? this.choices[i] : this.choicesVal[i])+'" type="radio" '+((this.choices[i]+' - '+this.choicesVal[i]==this.choiceSelected)?"checked":"")+'/> <span>'+$.fbuilder.htmlDecode( this.choices[i] )+'</span></label></div>';
					}

					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label>'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield">'+str+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			showHideDep:function( toShow, toHide, hiddenByContainer )
				{
					var me		= this,
						item 	= $( '[id="'+me.name+'"]' ),
						form_identifier = me.form_identifier,
						isHidden = ( typeof toHide[ me.name ] != 'undefined' || typeof hiddenByContainer[ me.name ] != 'undefined' ),
						result 	= [];

					try
					{
						item.each(function(i,e){
							if( typeof me.choicesDep[i] != 'undefined' && me.choicesDep[ i ].length )
							{
								var checked = e.checked;
								for( var j = 0, k = me.choicesDep[ i ].length; j < k; j++)
								{
									var dep = me.choicesDep[i][j]+form_identifier;
									if( isHidden || !checked )
									{
										if( typeof toShow[ dep ] != 'undefined' )
										{
											delete toShow[ dep ][ 'ref' ][ me.name+'_'+i ];
											if( $.isEmptyObject(toShow[ dep ][ 'ref' ]) )
											delete toShow[ dep ];
										}
									}

									if( checked && !isHidden )
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
						});
					}
					catch( e ){  }
					return result;
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore):checked' );
					if( e.length ) return $.fbuilder.parseValStr( e.val() );
					return 0;
				},
			setVal:function( v )
				{
					var t = (new String(v)).replace(/(['"])/g, "\\$1"), n = this.name;
					$( '[id="'+n+'"]' ).prop( 'checked', false );
					$( '[id="'+n+'"][vt="'+t+'"],[id="'+n+'"][value="'+t+'"]' ).prop( 'checked', true );
					$( '[id="'+n+'"]' ).change();
				}
		}
	);