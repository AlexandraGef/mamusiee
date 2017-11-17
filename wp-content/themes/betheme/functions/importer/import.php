<?php
if ( ! defined( 'ABSPATH' ) ){
	exit;
}

/**
 * Install pre-built website
 * 
 * @author Muffin Group
 * @version 2.0
 */
class mfnImport {

	private $method	= 'default';
	private $error	= array();
	private $failed	= array();
	
	private $demos 	= array();

	private $categories = array(
		'bus'	=> 'Business',
		'ent'	=> 'Entertainment',
		'cre'	=> 'Creative',
		'blo'	=> 'Blog',
		'por'	=> 'Portfolio',
		'one'	=> 'One Page',
		'sho'	=> 'Shop',
		'oth'	=> 'Other',
	);
	
	private $plugins = array(
		'bud'	=> array(
			'name' 	=> 'BuddyPress',
			's'		=> 'BuddyPress',
			'url'	=> 'buddypress/bp-loader.php',
		),
		'cf7'	=> array(
			'name' 	=> 'Contact Form 7',
			'url' 	=> 'contact-form-7/wp-contact-form-7.php',
		),
		'mch'	=> array(
			'name' 	=> 'MailChimp',
			's'		=> 'MailChimp+Forms+by+MailMunch',
			'url'	=> 'mailchimp-for-wp/mailchimp-for-wp.php',
		),
		'rev'	=> array(
			'name' 	=> 'Revolution Slider',
			'url' 	=> 'revslider/revslider.php',
		),
		'woo'	=> array(
			'name' 	=> 'WooCommerce',
			's'		=> 'WooCommerce',
			'url'	=> 'woocommerce/woocommerce.php',
		),
	);
	
	
	/**
	 * Constructor
	 */
	function __construct() {
		
		// Set demos list
		require_once LIBS_DIR. '/importer/demos.php';
		$this->demos = $demos;
		
		// It runs after the basic admin panel menu structure is in place.
		add_action( 'admin_menu', array( &$this, 'init' ) );
		
	}
	
	
	/**
	 * Add theme page & enqueue styles
	 */
	function init() {
		
		if( WHITE_LABEL ){
			
			// White Label | Hide 'Import Demo Data' Page
			$this->page = add_theme_page(
				__( 'Install pre-built website', 'mfn-opts' ),
				'Theme pre-built websites',
				'edit_theme_options',
				'mfn_import',
				array( &$this, 'import_white' )
			);
			
		} else {
			
			$this->page = add_theme_page(
				__( 'Install pre-built website', 'mfn-opts' ),
				'BeTheme pre-built websites',
				'edit_theme_options',
				'mfn_import',
				array( &$this, 'import' )
			);
			
		}
		
		add_action( 'admin_print_styles-'.$this->page, array( &$this, '_enqueue' ) );
	}
	
	
	/**
	 * Enqueue
	 */
	function _enqueue(){
		
		wp_enqueue_style( 'mfn-opts-font', 'http'. mfn_ssl() .'://fonts.googleapis.com/css?family=Open+Sans:300,400,400italic,600' );
		wp_enqueue_style( 'mfn-import', LIBS_URI. '/importer/css/style.css', false, THEME_VERSION, 'all' );
		
		wp_enqueue_script( 'mfn-import', LIBS_URI. '/importer/js/scripts.js', false, THEME_VERSION, true );
		
	}
	
	
	/**
	 * White Label
	 * 
	 * Hide 'Import Demo Data' Page
	 */
	function import_white() {
		?>
			<div id="mfn-wrapper" class="mfn-import wrap">
				<h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
				<p><?php _e( 'This feature is disabled in White Label mode', 'mfn-opts' );?></p>	
			</div>
		<?php 
	}
	
	
	/**
	 * Demo URL
	 * 
	 * Get demo url to replace
	 * 
	 * @param string $demo
	 * @return string
	 */
	function get_demo_url( $demo ){
		if( $demo == 'be' ){
			$url = 'http://themes.muffingroup.com/betheme/';
		} else {
			$url = 'http://themes.muffingroup.com/be/'. $demo .'/';
		}
		return $url;
	}
	
	
	/**
	 * wp_remote_get with HTTP Basic Authorization
	 * 
	 * @param string $file_path
	 * @return string
	 */
	function wp_remote_get_auth( $file_path ){

		if( isset( $_POST['args_login'] ) && isset( $_POST['args_pass'] ) ){
			
			$username = esc_attr( $_POST['args_login'] );
			$password = esc_attr( $_POST['args_pass'] );
			
			$args = array(
				'headers' => array(
					'Authorization' => 'Basic '. call_user_func( 'base'.'64_encode', $username.':'.$password )
				)
			);
			
			$file_data 	= wp_remote_get( $file_path, $args );
				
		} else {
			
			$file_data 	= wp_remote_get( $file_path );
			
		}
		
		return $file_data;
	}
	
	
	/**
	 * Get FILE data
	 *
	 * 1. wp_remote_get ( wp_remote_get_auth )
	 * 2. file_get_contents
	 * 3. fopen
	 *
	 * @param $file string
	 * @param $method string
	 * @return string
	 */
	function get_file_data( $file, $method = false ){
	
		$file_data 	= false;
		$error		= array();
	
		if( ! $method ){
			$method = $this->method;
		}
	
		switch( $method ){
				
			case 'file_get_contents':
	
				$path 	= LIBS_DIR .'/importer/demo/'. $file;
	
				if( file_exists( $path ) ){
						
					$file_data = file_get_contents( $path );
						
				} else {
	
					$error['function'] = __( 'PHP function <a target="_blank" href="http://php.net/manual/en/function.file-get-contents.php">file_get_contents</a> error.', 'mfn-opts' );
					$error['file'] = $path;
					$error['code'] = '404';
					$error['message'] = 'Not Found';
	
					$this->error[] = $error;
	
				}
	
				// debug
// 				print_r( '<br />method: file_get_contents<br />' );
	
				break;
	
			case 'fopen':
	
				$path 	= LIBS_DIR .'/importer/demo/'. $file;
	
				if( file_exists( $path ) ){
						
					$fp = fopen( $path, 'r' );
					$file_data = fread( $fp, filesize( $path ) );
					fclose( $fp );
						
				} else {
						
					$error['function'] = __( 'PHP function <a target="_blank" href="http://php.net/manual/en/function.fopen.php">fopen</a> error.', 'mfn-opts' );
					$error['file'] = $path;
					$error['code'] = '404';
					$error['message'] = 'Not Found';
						
					$this->error[] = $error;
						
				}
	
				// debug
// 				print_r( '<br />method: fopen<br />' );
	
				break;
	
			default:	// wp_remote_get()
	
				$path 		= LIBS_URI .'/importer/demo/'. $file;
				$response 	= $this->wp_remote_get_auth( $path );
	
				// Check the response code
				$response_code		= wp_remote_retrieve_response_code( $response );
				$response_message 	= wp_remote_retrieve_response_message( $response );
	
				if( 200 != $response_code ){
	
					$error['function'] = __( 'WordPress function <a target="_blank" href="https://developer.wordpress.org/reference/functions/wp_remote_get/">wp_remote_get()</a> response error</b>.', 'mfn-opts' );
					$error['file'] = $path;
					$error['code'] = $response_code;
					$error['message'] = $response_message ? $response_message : __( 'Unknown error occurred', 'mfn-opts' );
	
					$this->error[] = $error;
	
				} else {
	
					$file_data =  wp_remote_retrieve_body( $response );
	
				}
	
				// debug
// 				print_r( '<br />method: wp_remote_get<br />' );
	
				break;
	
		}
	
		return $file_data;
	}
	
	
	/**
	 * Import | Content
	 * 
	 * @param string $file
	 */
	function import_content( $file = 'all.xml.gz' ){
		$import = new WP_Import();
		$xml = LIBS_DIR . '/importer/demo/'. $file;
		
		// debug - get file DIR/name.xml.gz
// 		print_r($xml);
// 		exit;
		
		if( $_POST[ 'attachments' ] && ( $_POST[ 'type' ] == 'complete' ) ){
			$import->fetch_attachments = true;
		} else {
			$import->fetch_attachments = false;
		}
		
		ob_start();
		$import->import( $xml );	
		ob_end_clean();
	}
	
	
	/**
	 * Import | Menu - Locations
	 * 
	 * @param string $file
	 */
	function import_menu_location( $file = 'menu.txt' ){
		
		$file_path 	= LIBS_URI . '/importer/demo/'. $file;

		$file_data 	= $this->get_file_data( $file );
		$data 		= @unserialize( call_user_func( 'base'.'64_decode', $file_data ) );
		
		// debug
// 		print_r( $data );
		
		if( is_array( $data ) ){
			
			$menus = wp_get_nav_menus();
				
			foreach( $data as $key => $val ){
				foreach( $menus as $menu ){
					if( $val && $menu->slug == $val ){
						$data[$key] = absint( $menu->term_id );
					}
				}
			}
			
			set_theme_mod( 'nav_menu_locations', $data );

		} else {
			
			$this->failed['menu'] = true;
			
		}
	}
	
	
	/**
	 * Import | Theme Options
	 * 
	 * @param string $file
	 * @param string $url
	 */
	function import_options( $file = 'options.txt', $url = false ){

		$file_data 	= $this->get_file_data( $file );
		$data 		= @unserialize( call_user_func( 'base'.'64_decode', $file_data ) );
		
		// debug
// 		print_r( $data );
		
		if( is_array( $data ) ){
				
			// images URL | replace exported URL with destination URL
			if( $url ){
				$replace = home_url('/');
				foreach( $data as $key => $option ){
					if( is_string( $option ) ){						// variable type string only
						$option 	= $this->migrate_cb_ms( $option );
						$data[$key] = str_replace( $url, $replace, $option );
					}
				}
			}
			
			ob_start();
			update_option( THEME_NAME, $data );
			ob_end_clean();

		} else {
			
			$this->failed['options'] = true;
			
		}
	}
	
	
	/**
	 * Import | Widgets
	 * 
	 * @param string $file
	 */
	function import_widget( $file = 'widget_data.json' ){
		
		$file_data 	= $this->get_file_data( $file );
		
		// debug
// 		print_r( $file_data );
	
		if( $file_data ){
		
			$this->import_widget_data( $file_data );
		
		} else {
				
			$this->failed['widgets'] = true;
				
		}
	}
	

	/**
	 * Import | Migrate Multisite
	 * 
	 * Multisite 'uploads' directory url
	 * 
	 * @param string $field
	 * @return string
	 */
	function migrate_cb_ms( $field ){
		if ( is_multisite() ){
			global $current_blog;
			if( $current_blog->blog_id > 1 ){
				$old_url 	= '/wp-content/uploads/';
				$new_url 	= '/wp-content/uploads/sites/'. $current_blog->blog_id .'/';
				$field 		= str_replace( $old_url, $new_url, $field );
			}
		}
		return $field;
	}

	/**
	 * Import | Migrate Muffin Builder
	 * 
	 * @param string $old_url
	 */
	function migrate_cb( $old_url ){
		global $wpdb;
		
		$new_url = home_url('/');
		
		$results = $wpdb->get_results( "SELECT * FROM $wpdb->postmeta
			WHERE `meta_key` = 'mfn-page-items'
		" );
		
		// posts loop -----------------
		if( is_array( $results ) ){
			foreach( $results as $result_key => $result ){
				
				$meta_id 	= $result->meta_id;
				$meta_value = @unserialize( $result->meta_value );
				
				
				// Builder 2.0 Compatibility
				if( $meta_value === false ){
					$meta_value = unserialize( call_user_func( 'base'.'64_decode', $result->meta_value ) );
				}


				// Loop | Sections ----------------
				if( is_array( $meta_value ) ){
					foreach( $meta_value as $sec_key => $sec ){
							
						// Loop | Section Attributes ----------------
						if( isset( $sec['attr'] ) && is_array( $sec['attr'] ) ){
							foreach( $sec['attr'] as $attr_key => $attr ){
								$attr = str_replace( $old_url, $new_url, $attr );
								$meta_value[$sec_key]['attr'][$attr_key] = $attr;
							}
						}
						
						// Builder 3.0 | Loop | Wraps ----------------
						if( isset( $sec['wraps'] ) && is_array( $sec['wraps'] ) ){
							foreach( $sec['wraps'] as $wrap_key => $wrap ){
								
								// Loop | Wrap Attributes ----------------
								if( isset( $wrap['attr'] ) && is_array( $wrap['attr'] ) ){
									foreach( $wrap['attr'] as $attr_key => $attr ){
								
										$attr = str_replace( $old_url, $new_url, $attr );
										$meta_value[$sec_key]['wraps'][$wrap_key]['attr'][$attr_key] = $attr;
								
									}
								}
						
								// Loop | Items ----------------
								if( isset( $wrap['items'] ) && is_array( $wrap['items'] ) ){
									foreach( $wrap['items'] as $item_key => $item ){
								
										// Loop | Fields ----------------
										if( isset( $item['fields'] ) && is_array( $item['fields'] ) ){
											foreach( $item['fields'] as $field_key => $field ) {
													
												if( $field_key == 'tabs' ) {
													// Tabs, Accordion, FAQ, Timeline
														
													// Loop | Tabs --------------------
													if( isset( $field ) && is_array( $field ) ){
														foreach( $field as $tab_key => $tab ){
															$field = str_replace( $old_url, $new_url, $tab['content'] );
															$field = $this->migrate_cb_ms( $field );
															$meta_value[$sec_key]['wraps'][$wrap_key]['items'][$item_key]['fields'][$field_key][$tab_key]['content'] = $field;
														}
													}
												} else {
													// Default
													$field = str_replace( $old_url, $new_url, $field );
													$field = $this->migrate_cb_ms( $field );
													$meta_value[$sec_key]['wraps'][$wrap_key]['items'][$item_key]['fields'][$field_key] = $field;
												}
											}
										}
								
									}
								}
								
							}
						}
		
						// Builder 2.0 | Loop | Items ----------------
						if( isset( $sec['items'] ) && is_array( $sec['items'] ) ){
							foreach( $sec['items'] as $item_key => $item ){
				
								// Loop | Fields ----------------
								if( isset( $item['fields'] ) && is_array( $item['fields'] ) ){
									foreach( $item['fields'] as $field_key => $field ) {
											
										if( $field_key == 'tabs' ) {
											// Tabs, Accordion, FAQ, Timeline
					
											// Loop | Tabs --------------------
											if( is_array( $field ) ){
												foreach( $field as $tab_key => $tab ){
													$field = str_replace( $old_url, $new_url, $tab['content'] );
													$field = $this->migrate_cb_ms( $field );
													$meta_value[$sec_key]['items'][$item_key]['fields'][$field_key][$tab_key]['content'] = $field;
												}
											}
										} else {
											// Default
											$field = str_replace( $old_url, $new_url, $field );
											$field = $this->migrate_cb_ms( $field );
											$meta_value[$sec_key]['items'][$item_key]['fields'][$field_key] = $field;
										}
									}
								}
								
							}
						}
						
					}
				}
		
				// print_r($meta_value);
		
				$meta_value = call_user_func( 'base'.'64_encode', serialize( $meta_value ) );
				
				$wpdb->query( "UPDATE $wpdb->postmeta
					SET `meta_value` = '" . addslashes( $meta_value ) . "'
					WHERE `meta_key` = 'mfn-page-items'
					AND `meta_id`= " . $meta_id . "
				" );
				
			}
		}
	}
	

	/**
	 * Import
	 */
	function import(){

		$output 	= '';

		if( isset( $_POST['mfn_import_nonce'] ) ){
			
			// AFTER IMPORT --------------------
			
			if ( wp_verify_nonce( $_POST['mfn_import_nonce'], basename(__FILE__) ) ){
				
				
				// debug
// 				print_r($_POST);
// 				exit;
	
				
				// Importer classes
				
				if( ! defined( 'WP_LOAD_IMPORTERS' ) ){
					define( 'WP_LOAD_IMPORTERS', true );
				}
				
				if( ! class_exists( 'WP_Importer' ) ){
					require_once ABSPATH . 'wp-admin/includes/class-wp-importer.php';
				}
				
				if( ! class_exists( 'WP_Import' ) ){
					require_once LIBS_DIR . '/importer/wordpress-importer.php';
				}
				
				
				// Import START
				
				if( class_exists( 'WP_Importer' ) && class_exists( 'WP_Import' ) ){

					// Set import method
					if( isset( $_POST['method'] ) ){
						$this->method = htmlspecialchars( stripslashes( $_POST['method'] ) );
					}
					
					// Force import method
					if( isset( $_POST['method_force'] ) && $_POST['method_force'] ){
						$this->method = htmlspecialchars( stripslashes( $_POST['method_force'] ) );
					}
		
					$demo = htmlspecialchars( stripslashes( $_POST['demo'] ) );
					
					if( $_POST['type'] == 'selected' ){
						
						// Selected data only ---------------------------------
						
						if( $_POST['data'] == 'content' ){

							// WordPress XML importer
							
							$file = 'be/'. $demo .'/content.xml.gz';
							$this->import_content( $file );
							$this->migrate_cb( $this->get_demo_url( $demo ) );
							
						} else {

							// Theme Options
							
							$file = 'be/'. $demo .'/options.txt';
							$this->import_options( $file, $this->get_demo_url( $demo ) );
							
						}
						
					} else {
					
						// Complete pre-built website ---------------------------------		

						// WordPress XML importer
						$file = 'be/'. $demo .'/content.xml.gz';
						$this->import_content( $file );
						$this->migrate_cb( $this->get_demo_url( $demo ) );
												
								
						// Menu locations
						$file = 'be/'. $demo .'/menu.txt';
						$this->import_menu_location( $file );
						
						
						// Theme Options
						$file = 'be/'. $demo .'/options.txt';
						$this->import_options( $file, $this->get_demo_url( $demo ) );							
						
											
						// Widgets
						$file = 'be/'. $demo .'/widget_data.json';
						$this->import_widget( $file );													
				
						
						// Set HOME page
						$home = get_page_by_title( 'Home' );
						if( isset( $home->ID ) ) {
							update_option( 'show_on_front', 'page' );
							update_option( 'page_on_front', $home->ID ); // Front Page
						}
						
					}

				}
				
				
				// Import END
				
				if( $this->error ){
						
					// Errors
						
					foreach( $this->error as $error ){
						$output .= '<div class="mfn-message mfn-error">';
							$output .= $error['function'];
							$output .= '<br />File patch: '. $error['file'];
							$output .= '<br />Response code: '. $error['code'] .'. Response message: '. $error['message'];
						$output .= '</div>';
					}
						
				}
				
			}
			
			$this->import_html( 'after', $output );
			
		} else {
			
			// BEFORE IMPORT --------------------
			
			// PHP 7 & Default WordPress Importer
			
			$phpversion = 0;
			if( function_exists( 'phpversion' ) ){
				$phpversion = floatval( phpversion() );
			}
			
			if( ( $phpversion >= 7 ) && is_plugin_active( 'wordpress-importer/wordpress-importer.php' ) ){
				$output .= '<div class="mfn-message mfn-error php-7">';
					$output .= 'Default <a target="_blank" href="plugins.php">WordPress Importer</a> plugin is not compatible with PHP '. $phpversion .', please deactivate this plugin before import';
				$output .= '</div>';
			}
			
			// Import methods test
			
			$test_file 		= '_verify.txt';
			$test_methods 	= array( 'default', 'file_get_contents', 'fopen' );
			$test_success 	= false;
			
			foreach( $test_methods as $tm ){
				$test_data 	= $this->get_file_data( $test_file, $tm );
				if( $test_data == 't3sTfi1ec0nt3nt' ){
					$this->method = $tm;
					$test_success = true;
					break;
				}
			}
			
			// All import methods failed
			
			if( ! $test_success && $this->error ){
					
				if( isset( $this->error[0]['code'] ) && ( $this->error[0]['code'] == 401 ) ){
			
					// 401 Unauthorized | HTTP Basic Authentication
			
					$output .= '<div class="mfn-message mfn-error">';
						$output .= 'Your server uses HTTP Basic Authentication, please enter your login details:';
						$output .= '<div class="form-401">';
							$output .= '<label for="args_login">Login:</label><input type="text" name="args_login" onkeypress="return event.keyCode != 13;" />';
							$output .= '<label for="args_pass">Password:</label><input type="password" name="args_pass" onkeypress="return event.keyCode != 13;" />';
						$output .= '</div>';
					$output .= '</div>';
			
				} else {
			
					foreach( $this->error as $error ){
						$output .= '<div class="mfn-message mfn-error">';
							$output .= $error['function'];
							$output .= '<br />File patch: '. $error['file'];
							$output .= '<br />Response code: '. $error['code'] .'. Response message: '. $error['message'];
						$output .= '</div>';
					}
			
				}
					
			}
			
			$this->import_html( 'before', $output );
			
		}

	}	
	

	/**
	 * Import HTML
	 * 
	 * @param string $status
	 * @param string|array $output
	 */
	function import_html( $status, $output = '' ){
		?>
		
		<div id="mfn-wrapper" class="mfn-demo-data wrap">
		
			<div id="mfn-overlay"><!-- overlay --></div>
			
			<form id="form" action="" method="post">
			
				<input type="hidden" name="mfn_import_nonce" value="<?php echo wp_create_nonce( basename( __FILE__ ) ); ?>" />
				<input type="hidden" name="method" value="<?php echo $this->method; ?>" />
				<input type="hidden" name="demo" id="input-demo" value="" />
				
				<input type="hidden" name="type" id="input-type" value="complete" />
				<input type="hidden" name="data" id="input-data" value="content" />
				<input type="hidden" name="attachments" id="input-attachments" value="1" />
				

				<div class="header">
					<div class="logo">

						<svg width="30" height="20" xmlns="http://www.w3.org/2000/svg">
							<path d="M0,19.8V0h7.3c1.4,0,2.5,0.1,3.5,0.4c1,0.3,1.7,0.6,2.3,1.1c0.6,0.5,1,1,1.3,1.7c0.3,0.7,0.4,1.4,0.4,2.2
							c0,0.4-0.1,0.9-0.2,1.3c-0.1,0.4-0.3,0.8-0.6,1.2c-0.3,0.4-0.6,0.7-1,1c-0.4,0.3-0.9,0.5-1.5,0.8c1.3,0.3,2.3,0.8,2.9,1.5
							c0.6,0.7,0.9,1.6,0.9,2.7c0,0.8-0.2,1.6-0.5,2.3c-0.3,0.7-0.8,1.4-1.4,1.9c-0.6,0.5-1.4,1-2.3,1.3c-0.9,0.3-2,0.5-3.2,0.5H0z
							 M4.6,8.3H7c0.5,0,1,0,1.4-0.1c0.4-0.1,0.8-0.2,1-0.4C9.7,7.7,9.9,7.4,10,7.1c0.1-0.3,0.2-0.7,0.2-1.2c0-0.5-0.1-0.9-0.2-1.2
							C10,4.4,9.8,4.2,9.5,4C9.3,3.8,9,3.6,8.6,3.6C8.2,3.5,7.8,3.4,7.3,3.4H4.6V8.3z M4.6,11.4v4.9h3.2c0.6,0,1.1-0.1,1.5-0.2
							c0.4-0.2,0.7-0.4,0.9-0.6c0.2-0.2,0.4-0.5,0.4-0.8c0.1-0.3,0.1-0.6,0.1-0.9c0-0.4,0-0.7-0.1-1c-0.1-0.3-0.3-0.5-0.5-0.7
							c-0.2-0.2-0.5-0.4-0.9-0.5c-0.4-0.1-0.9-0.2-1.4-0.2H4.6z"/>
							<path d="M22.8,5.5c0.9,0,1.8,0.1,2.6,0.4c0.8,0.3,1.4,0.7,2,1.3c0.6,0.6,1,1.2,1.3,2c0.3,0.8,0.5,1.7,0.5,2.7
							c0,0.3,0,0.6,0,0.8c0,0.2-0.1,0.4-0.1,0.5s-0.2,0.2-0.3,0.2c-0.1,0-0.3,0.1-0.5,0.1H20c0.1,1.2,0.5,2,1.1,2.6
							c0.6,0.5,1.3,0.8,2.2,0.8c0.5,0,0.9-0.1,1.3-0.2c0.4-0.1,0.7-0.2,0.9-0.4c0.3-0.1,0.5-0.3,0.8-0.4c0.2-0.1,0.5-0.2,0.7-0.2
							c0.3,0,0.6,0.1,0.8,0.4l1.2,1.5c-0.4,0.5-0.9,0.9-1.4,1.2c-0.5,0.3-1,0.6-1.5,0.7s-1.1,0.3-1.6,0.4c-0.5,0.1-1,0.1-1.5,0.1
							c-1,0-1.9-0.2-2.8-0.5c-0.9-0.3-1.6-0.8-2.3-1.4c-0.6-0.6-1.2-1.4-1.5-2.4c-0.4-0.9-0.6-2-0.6-3.3c0-0.9,0.2-1.8,0.5-2.7
							c0.3-0.8,0.8-1.6,1.4-2.2C18.3,6.9,19,6.4,19.9,6C20.7,5.7,21.7,5.5,22.8,5.5z M22.8,8.4c-0.8,0-1.4,0.2-1.9,0.7
							c-0.5,0.5-0.8,1.1-0.9,2h5.3c0-0.3,0-0.7-0.1-1c-0.1-0.3-0.2-0.6-0.4-0.8C24.6,9,24.3,8.8,24,8.6C23.7,8.5,23.3,8.4,22.8,8.4z"/>
						</svg>
						
					</div>
					
					<div class="title"><?php echo esc_html( get_admin_page_title() ) ?></div>
				</div>

				
				<?php if( $status == 'after' ): ?>
				
						
					<?php if( ! $this->error ): ?>
					
						<?php 
							$demo = htmlspecialchars( stripslashes( $_POST['demo'] ) ); 
							$demo_args = $this->demos[ $demo ];
							
							// data | name
							if( isset( $demo_args['name'] ) ){
								$demo_name = $demo_args['name'];
							} else {
								$demo_name = ucfirst( $demo );
							}
							
							$slider = false;
							if( array_search( 'rev', $demo_args['plugins'] ) !== false ){
								$slider = true;	
							}
							
						?>
					
						<div class="import-all-done item" data-id="<?php echo $demo; ?>">

							<div class="done-image">
								<div class="item-image"></div>
							</div>
	
							<div class="done-header">							
								Be <?php echo $demo_name; ?> has been successfully installed<br />
								You have a new website now
							</div>
							
							<div class="done-subheader">							
								What would you like to do next?
							</div>
							
							<div class="done-buttons">		
							
								<?php 
									if( $slider ){
										if( is_plugin_active( $this->plugins[ 'rev' ][ 'url' ] ) ){
											echo '<a target="_blank" href="admin.php?page=revslider" class="mfn-button mfn-button-secondary">Import slider</a>';
										} else {
											echo '<a target="_blank" href="themes.php?page=tgmpa-install-plugins" class="mfn-button mfn-button-secondary">Install Revolution Slider</a>';
										}	
									}
								?>

								<a target="_blank" href="themes.php?page=muffin_options" class="mfn-button mfn-button-secondary">Go to Muffin Options</a>
								<a target="_blank" href="<?php echo get_home_url(); ?>" class="mfn-button mfn-button-primary">Preview website</a>

							</div>
							
							<div class="done-learn">
								<span>or</span>
								<div class="learn-header">Learn more about BeTheme</div>
								Remember, it is a good practise to read the manual first
							</div>
							
							<div class="done-help">
								<a target="_blank" href="http://themes.muffingroup.com/betheme/documentation/">
									<span class="dashicons dashicons-info"></span>
									Learn how to use BeTheme from our manual
								</a>
							</div>

						</div>
					
					<?php else: echo $output; endif; ?>
					
				
				<?php else: ?>
				
				
					<?php
						// PHP error messages
						echo $output;
					?>
				
				
					<div class="subheader">
						
						<div class="filters">
							<ul class="filter-categories">					
								<li data-filter="*" class="active"><a href="javascript:void(0);">All</a></li>				
								<?php 
									foreach( $this->categories as $key_cat => $cat ){
										echo '<li data-filter="'. $key_cat .'"><a href="javascript:void(0);">'. $cat .'</a></li>';	
									}
								?>
							</ul>				
						</div>
						
						<div class="demo-search">
							<span class="dashicons dashicons-search"></span>
							<input class="input-search" placeholder="Search website..." onkeypress="return event.keyCode != 13;" />
						</div>
						
						<div class="method">
							<a href="javascript:void(0);" class="open">Force import method</a>
						</div>
					
					</div>
					
					<div id="mfn-method-popup">
						<div class="popup-inner">
						
							<a href="javascript:void(0);" class="close"><i class="dashicons dashicons-no-alt"></i></a>
						
							<p>Please use this option <strong>only</strong> if you experienced issues with auto detect</p>
							<label for="method_force">Import method</label>
							<select name="method_force" id="method_force">
								<option value="">--- auto detect ---</option>
								<option value="default">wp_remote_get()</option>
								<option value="file_get_contents">file_get_contents()</option>
								<option value="fopen">fopen()</option>
							</select>
							
						</div>
					</div>
					
					
					<ul class="demos">
						<?php
							foreach( $this->demos as $key => $demo ){
								
								$categories = array_intersect_key( $this->categories, array_flip( $demo['categories'] ));
								$categories = implode( ', ', $categories );
	
								// class | categories
								$class = '';
								if( is_array( $demo['categories'] ) ){
									foreach( $demo['categories'] as $cat ){
										$class .= ' category-' .$cat;	
									}
								}
								
								// data | name
								if( isset( $demo['name'] ) ){
									$demo_name = $demo['name'];
								} else {
									$demo_name = ucfirst( $key );
								}
								
								echo '<li class="item'. $class .'" data-id="'. $key .'" data-name="'. $demo_name .'">';
									
									echo '<div class="border"></div>'; // border for hover effect
										
									echo '<div class="item-inner">';
									
										echo '<div class="item-header">';
										
											echo '<a href="javascript:void(0);" class="close"><i class="dashicons dashicons-no-alt"></i></a>';
										
											echo '<div class="item-image"></div>'; // sprite image
	
											echo '<div class="item-title">'. $demo_name .'</div>';
												
											if( $categories ){
												echo '<div class="item-category">';
													echo '<span class="label">Category:</span>';
													echo '<span class="list">'. $categories .'</span>';
												echo '</div>';
											}
										
										echo '</div>';
									
										echo '<div class="item-content">';
											echo '<div class="item-content-wrapper">';
												
												if( isset( $demo['plugins'] ) ){
													
													echo '<p>';
														echo '<b>Install the following plugins before website installation</b>';
													echo '</p>';
				
													echo '<ul class="plugins-used">';
			
														if( ( $plugins_key = array_search( 'rev', $demo['plugins'] ) ) !== false ){
															
															if( isset( $demo['revslider'] ) ){
																$slider_name = $demo['revslider'];
															} else {
																$slider_name = $key .'.zip';
															}
	
															echo '<li class="plugin-rev">';
																echo '<b>'. $this->plugins[ 'rev' ]['name'] .'</b><br />';
	
																	if( is_plugin_active( $this->plugins[ 'rev' ]['url'] ) ){
																		echo '<span class="install">Active</span>';
																	} else {
																		echo '<span class="install"><a target="_blank" href="themes.php?page=tgmpa-install-plugins">Install</a></span>';
																	}
																	
																echo 'Import <span class="slider-name">'. $slider_name .'</span> after plugin installation. ';
																echo '<a target="_blank" href="http://themes.muffingroup.com/betheme/documentation/#slider">How to import slider</a>';
															echo '</li>';
															
															unset( $demo['plugins'][$plugins_key] );
														}
							
														foreach( $demo['plugins'] as $plugin ){
															
															if( isset( $this->plugins[ $plugin ]['s'] ) ){
																$install_url = 'plugin-install.php?s='. $this->plugins[ $plugin ]['s'] .'&amp;tab=search&amp;type=term';
															} else {
																$install_url = 'themes.php?page=tgmpa-install-plugins';
															}
															
															echo '<li class="plugin-'. $plugin .'">';
															
																echo '<b>'. $this->plugins[ $plugin ]['name'] .'</b><br />';
																
																if( is_plugin_active( $this->plugins[ $plugin ]['url'] ) ){
																	echo '<span class="install">Active</span>';
																} else {
																	echo '<span class="install"><a target="_blank" href="'. $install_url .'">Install</a></span>';
																}
																
															echo '</li>';
														}
			
													echo '</ul>';
													
												}
			
												echo '<a href="javascript:void(0);" class="mfn-button mfn-button-primary mfn-button-import">Install</a>';
																							
												if( isset( $demo['url'] ) ){
													$demo_url = $demo['url'];
												} else {
													$demo_url = 'http://themes.muffingroup.com/be/'. $key .'/';
												}
												
												echo '<p class="align-center"><a target="_blank" href="'. $demo_url .'">Live preview</a></p>';
											
											echo '</div>';
										echo '</div>';
									
									echo '</div>';
								
								echo '</li>'."\n";
							}
						?>
					</ul>	
					
					
					<div id="mfn-demo-popup">
						<div class="popup-inner">
					
							<div class="popup-header">
								<div class="item-image"></div>
							</div>
							
							<div class="popup-content">
							
								<div class="popup-step step-1">
									
									<h3 class="item-title-wrapper"><b>Database Reset</b></h3>
									
									<p class="align-center">If you have already installed any pre-built website, before the new installation, please <b>reset WordPress</b> to default.</p>
									
									<p><b>We recommend to use plugin below:</b></p>
									
									<ul class="plugins-used">
										<li>
											<b>WordPress Database Reset</b><br />	
											After plugin activation, please navigate to <i>Tools / Database Reset</i> and select all database tables except <i>users</i> &amp; <i>usermeta</i>
											
											<?php
												if( is_plugin_active( 'wordpress-database-reset/wp-reset.php' ) ){
													echo '<span class="install"><a target="_blank" href="tools.php?page=database-reset">Reset</a></span>';
												} else {
													echo '<span class="install"><a target="_blank" href="plugin-install.php?s=WordPress+Database+Reset+&tab=search&type=term">Install</a></span>';
												}
											?>
										</li>
									</ul>
									
									<div class="popup-buttons">
										<a href="javascript:void(0);" class="mfn-button mfn-button-secondary mfn-button-cancel">Cancel</a>
										<a href="javascript:void(0);" class="mfn-button mfn-button-primary mfn-button-next">Next <span class="dashicons dashicons-arrow-right"></span></a>
									</div>
									
								</div>
								
								<div class="popup-step step-2">
							
									<h3 class="item-title-wrapper">Install Be<span class="item-title"></span></h3>
									
									<div class="import-options active">
										<label><input type="radio" name="radio_import" class="radio-type checked" value="complete" /> <b>Complete pre-built website</b></label>
										<ul>
											<li>
												<label><input type="checkbox" class="checkbox-attachments checked" value="1" /> Import media (images, videos, etc.)<br />
												Media download may take a while</label>
											</li>
										</ul>
									</div>
									
									<div class="import-options">
										<label><input type="radio" name="radio_import" class="radio-type" value="selected" /> <b>Selected data only</b></label>
										<ul>
											<li><label><input type="radio" name="radio_type" class="radio-data checked" value="content" /> Content</label></li>
											<li><label><input type="radio" name="radio_type" class="radio-data" value="options" /> Theme Options</label></li>
										</ul>
									</div>
									
									<div class="popup-buttons">
										<a href="javascript:void(0);" class="mfn-button mfn-button-secondary mfn-button-cancel">Cancel</a>
										<a href="javascript:void(0);" class="mfn-button mfn-button-primary mfn-button-submit">Install</a>
									</div>
								
								</div>
								
								<div class="popup-step step-3">
							
									<h3 class="item-title-wrapper">Installing Be<span class="item-title"></span></h3>
									
									<div class="import-progress-bar"></div>
									
									<p class="align-center"><b>Please wait</b> for the whole demo data import before doing anything. <b>It may take a while</b>...</p>
								
								</div>
			
							</div>
						
						</div>
					</div>
						
					
					<input id="form-submit" type="submit" name="submit" value="import" style="display:none" />

					
				<?php endif; ?>
					
			</form>
			
		</div>
		
		<?php
	}	

	
	/**
	 * Parse JSON import file
	 * 
	 * http://wordpress.org/plugins/widget-settings-importexport/
	 * 
	 * @param string $json_data
	 */
	function import_widget_data( $json_data ) {
	
		$json_data 		= json_decode( $json_data, true );
		$sidebar_data 	= $json_data[0];
		$widget_data 	= $json_data[1];	
// 		print_r($json_data);
	
		// prepare widgets table
		$widgets = array();
		foreach( $widget_data as $k_w => $widget_type ){
			if( $k_w ){
				$widgets[ $k_w ] = array();
				foreach( $widget_type as $k_wt => $widget ){
					if( is_int( $k_wt ) ) $widgets[$k_w][$k_wt] = 1;
				}
			}
		}
// 		print_r($widgets);

		// sidebars
		foreach ( $sidebar_data as $title => $sidebar ) {
			$count = count( $sidebar );
			for ( $i = 0; $i < $count; $i++ ) {
				$widget = array( );
				$widget['type'] = trim( substr( $sidebar[$i], 0, strrpos( $sidebar[$i], '-' ) ) );
				$widget['type-index'] = trim( substr( $sidebar[$i], strrpos( $sidebar[$i], '-' ) + 1 ) );
				if ( !isset( $widgets[$widget['type']][$widget['type-index']] ) ) {
					unset( $sidebar_data[$title][$i] );
				}
			}
			$sidebar_data[$title] = array_values( $sidebar_data[$title] );
		}
	
		// widgets
		foreach ( $widgets as $widget_title => $widget_value ) {
			foreach ( $widget_value as $widget_key => $widget_value ) {
				$widgets[$widget_title][$widget_key] = $widget_data[$widget_title][$widget_key];
			}
		}
// 		print_r($sidebar_data);
		
		$sidebar_data = array( array_filter( $sidebar_data ), $widgets );
		$this->parse_import_data( $sidebar_data );
	}

	
	/**
	 * Import widgets
	 * 
	 * http://wordpress.org/plugins/widget-settings-importexport/
	 * 
	 * @param array $import_array
	 * @return boolean
	 */
	function parse_import_data( $import_array ) {
		$sidebars_data 		= $import_array[0];
		$widget_data 		= $import_array[1];
		
		mfn_register_sidebars(); // fix for sidebars added in Theme Options
		$current_sidebars 	= get_option( 'sidebars_widgets' );
		$new_widgets 		= array( );

// 		print_r($sidebars_data);
// 		print_r($current_sidebars);
	
		foreach ( $sidebars_data as $import_sidebar => $import_widgets ) :
	
			foreach ( $import_widgets as $import_widget ) :
			
				// if NOT the sidebar exists
				if ( ! isset( $current_sidebars[$import_sidebar] ) ){
					$current_sidebars[$import_sidebar] = array();
				}

				$title = trim( substr( $import_widget, 0, strrpos( $import_widget, '-' ) ) );
				$index = trim( substr( $import_widget, strrpos( $import_widget, '-' ) + 1 ) );
				$current_widget_data = get_option( 'widget_' . $title );
				$new_widget_name = $this->get_new_widget_name( $title, $index );
				$new_index = trim( substr( $new_widget_name, strrpos( $new_widget_name, '-' ) + 1 ) );
			
				if ( !empty( $new_widgets[ $title ] ) && is_array( $new_widgets[$title] ) ) {
					while ( array_key_exists( $new_index, $new_widgets[$title] ) ) {
						$new_index++;
					}
				}
				$current_sidebars[$import_sidebar][] = $title . '-' . $new_index;
				if ( array_key_exists( $title, $new_widgets ) ) {
					$new_widgets[$title][$new_index] = $widget_data[$title][$index];
					
					// notice fix
					if( ! key_exists('_multiwidget',$new_widgets[$title]) ) $new_widgets[$title]['_multiwidget'] = '';
					
					$multiwidget = $new_widgets[$title]['_multiwidget'];
					unset( $new_widgets[$title]['_multiwidget'] );
					$new_widgets[$title]['_multiwidget'] = $multiwidget;
				} else {
					$current_widget_data[$new_index] = $widget_data[$title][$index];
					
					// notice fix
					if( ! key_exists('_multiwidget',$current_widget_data) ) $current_widget_data['_multiwidget'] = '';
					
					$current_multiwidget = $current_widget_data['_multiwidget'];
					$new_multiwidget = isset($widget_data[$title]['_multiwidget']) ? $widget_data[$title]['_multiwidget'] : false;
					$multiwidget = ($current_multiwidget != $new_multiwidget) ? $current_multiwidget : 1;
					unset( $current_widget_data['_multiwidget'] );
					$current_widget_data['_multiwidget'] = $multiwidget;
					$new_widgets[$title] = $current_widget_data;
				}
				
			endforeach;
		endforeach;
	
		if ( isset( $new_widgets ) && isset( $current_sidebars ) ) {
			update_option( 'sidebars_widgets', $current_sidebars );
	
			foreach ( $new_widgets as $title => $content )
				update_option( 'widget_' . $title, $content );
	
			return true;
		}
	
		return false;
	}
	
	
	/**
	 * Get new widget name
	 * 
	 * http://wordpress.org/plugins/widget-settings-importexport/
	 * 
	 * @param string $widget_name
	 * @param int $widget_index
	 * @return string
	 */
	function get_new_widget_name( $widget_name, $widget_index ) {
		$current_sidebars = get_option( 'sidebars_widgets' );
		$all_widget_array = array( );
		foreach ( $current_sidebars as $sidebar => $widgets ) {
			if ( !empty( $widgets ) && is_array( $widgets ) && $sidebar != 'wp_inactive_widgets' ) {
				foreach ( $widgets as $widget ) {
					$all_widget_array[] = $widget;
				}
			}
		}
		while ( in_array( $widget_name . '-' . $widget_index, $all_widget_array ) ) {
			$widget_index++;
		}
		$new_widget_name = $widget_name . '-' . $widget_index;
		return $new_widget_name;
	}
	
}

$mfn_import = new mfnImport;
