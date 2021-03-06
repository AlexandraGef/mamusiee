<?php
/*
* Plugin Name: Forums - wpForo
* Plugin URI: https://wpforo.com
* Description: Forums wpForo is a new generation of forum plugins. It's full-fledged forum solution for your community. Comes with multiple modern forum layouts.
* Author: gVectors Team (A. Chakhoyan, R. Hovhannisyan)
* Author URI: https://gvectors.com/
* Version: 1.4.2
* Text Domain: wpforo
* Domain Path: /wpf-languages
*/

//Exit if accessed directly
if( !defined( 'ABSPATH' ) ) exit;
if( !defined( 'WPFORO_VERSION' ) ) define('WPFORO_VERSION', '1.4.2');

function wpforo_load_plugin_textdomain() { load_plugin_textdomain( 'wpforo', FALSE, basename( dirname( __FILE__ ) ) . '/wpf-languages/' ); }
add_action( 'plugins_loaded', 'wpforo_load_plugin_textdomain' );

if( !class_exists( 'wpForo' ) ) {

	define('WPFORO_DIR', rtrim( plugin_dir_path( __FILE__ ), '/' ));
	define('WPFORO_URL', rtrim( plugins_url( '', __FILE__ ), '/' ));
	define('WPFORO_FOLDER', rtrim( plugin_basename(dirname(__FILE__)), '/'));
	define('WPFORO_BASENAME', plugin_basename(__FILE__)); //wpforo/wpforo.php

	include( WPFORO_DIR . '/wpf-includes/wpf-hooks.php' );
	include( WPFORO_DIR . '/wpf-includes/wpf-actions.php');
	include( WPFORO_DIR . '/wpf-includes/functions.php' );
	if(wpforo_is_admin()) {
		include( WPFORO_DIR . '/wpf-includes/functions-installation.php' );
	}
	include( WPFORO_DIR . '/wpf-includes/functions-integration.php' );
	include( WPFORO_DIR . '/wpf-includes/functions-template.php' );
	include( WPFORO_DIR . '/wpf-includes/class-cache.php' );
	include( WPFORO_DIR . '/wpf-includes/class-forums.php' );
	include( WPFORO_DIR . '/wpf-includes/class-topics.php' );
	include( WPFORO_DIR . '/wpf-includes/class-posts.php' );
	include( WPFORO_DIR . '/wpf-includes/class-usergroups.php' );
	include( WPFORO_DIR . '/wpf-includes/class-members.php' );
	include( WPFORO_DIR . '/wpf-includes/class-permissions.php' );
	include( WPFORO_DIR . '/wpf-includes/class-phrases.php');
	include( WPFORO_DIR . '/wpf-includes/class-subscribes.php' );
	include( WPFORO_DIR . '/wpf-includes/class-template.php' );
	include( WPFORO_DIR . '/wpf-includes/class-notices.php' );
	include( WPFORO_DIR . '/wpf-includes/class-feed.php' );
	include( WPFORO_DIR . '/wpf-includes/class-moderation.php' );

	class wpForo{
	
		public $options = array();
		public $db;
		public $phrases;
		public $access;
		public $usergroup;
		public $theme;
		public $addons = array();
		public $current_object;
		public $menu = array();
		public $form = array();
		public $default;

		public	function __construct(){
			$this->init_defaults();
			$this->init_options();
            $this->setup();
        }
		
		public	function init(){
			$this->cache->init();
			$this->member->init_current_user();
			$this->init_current_object();
			$this->moderation->init();
			$this->tpl->init_member_templates();
			$this->tpl->init_nav_menu();
			add_action( 'wp_loaded', 'wpforo_actions');
		}

		private function init_defaults(){
            $this->default = new stdClass;

            $this->default->use_home_url = 0;
            $this->default->excld_urls = '';
            $this->default->permastruct = 'community';

            $blogname = get_option('blogname', '');
            $this->default->general_options = array(
                'title' =>       $blogname . ' ' . __('Forum', 'wpforo'),
                'description' => $blogname . ' ' . __('Discussion Board', 'wpforo'),
                'lang' => 1
            );

            $this->default->features = array(
                'user-admin-bar' => 0,
                'page-title' => 1,
                'top-bar' => 1,
                'top-bar-search' => 1,
                'breadcrumb' => 1,
                'footer-stat' => 1,
				'view-logging' => 1,
                'author-link' => 0,
                'comment-author-link' => 0,
                'user-register' => 1,
                'user-register-email-confirm' => 0,
                'register-url' => 0,
                'login-url' => 0,
				'resetpass-url' => 0, //In most cases incompatible with security and antispam plugins
                'replace-avatar' => 1,
                'avatars' => 1,
                'custom-avatars' => 1,
                'signature' => 1,
                'rating' => 1,
                'rating_title' => 1,
                'member_cashe' => 1,
                'object_cashe' => 1,
                'html_cashe' => 0,
                'memory_cashe' => 1,
                'seo-title' => 1,
                'seo-meta' => 1,
                'seo-profile' => 1,
				'rss-feed' => 1,
                'font-awesome' => 1,
                'user-synch' => 0,
                'output-buffer' => 1,
                'wp-date-format' => 0,
                'subscribe_conf' => 1,
                'subscribe_checkbox_on_post_editor' => 1,
                'subscribe_checkbox_default_status' => 0,
                'attach-media-lib' => 1,
                'debug-mode' => 0,
                'copyright' => 1
            );

            $this->default->tools_antispam = array(
                'spam_filter' => 1,
                'spam_filter_level_topic' => mt_rand(30, 60),
                'spam_filter_level_post' => mt_rand(30, 60),
                'spam_user_ban' => 0,
                'new_user_max_posts' => 5,
                'spam_user_ban_notification' => 1,
                'min_number_post_to_attach' => 3,
                'min_number_post_to_link' => 0,
                'limited_file_ext' => 'pdf|doc|docx|txt|htm|html|rtf|xml|xls|xlsx|zip|rar|tar|gz|bzip|7z'
            );

            $this->default->tools_cleanup = array(
                'user_reg_days_ago' => 7,
                'auto_cleanup_users' => 0,
                'usergroup' => array ( 1 => '0', 5 => '0', 2 => '1', 3 => '0' )
            );

            $this->default->stats = array(
                'forums' => 0,
                'topics' => 0,
                'posts' => 0,
                'members' => 0,
                'online_members_count' => 0,
                'last_post_title' => '',
                'last_post_url' => '',
                'newest_member_dname' => '',
                'newest_member_profile_url' => ''
            );
        }
		
		private function init_options(){
			global $wpdb;
			$this->db = $wpdb;
			$this->file = __FILE__;
			$this->error = NULL;
			$this->basename = plugin_basename( $this->file );

			$permalink_structure = get_option('permalink_structure');
			
			$this->use_trailing_slashes = ( '/' == substr($permalink_structure, -1, 1) );

			//OPTIONS
			$this->use_home_url = get_wpf_option('wpforo_use_home_url', $this->default->use_home_url);
			$this->excld_urls = get_wpf_option('wpforo_excld_urls', $this->default->excld_urls);

			$this->permastruct = trim( get_wpf_option('wpforo_permastruct', $this->default->permastruct), '/' );
			$this->permastruct = preg_replace('#^/?index\.php/?#isu', '', $this->permastruct);
			$this->permastruct = trim($this->permastruct, '/');

			$this->base_permastruct = (!$this->use_home_url ? $this->permastruct : '');
			$this->base_permastruct = rtrim( ( strpos($permalink_structure, 'index.php') !== FALSE ? '/index.php/' . $this->base_permastruct : '/' . $this->base_permastruct ), '/\\' );
			$this->url = esc_url( home_url( $this->user_trailingslashit($this->base_permastruct) ) );
            $this->pageid = get_wpf_option( 'wpforo_pageid');

            $this->general_options = get_wpf_option( 'wpforo_general_options', $this->default->general_options);
            $this->features = get_wpf_option('wpforo_features', $this->default->features);
            $this->tools_antispam = get_wpf_option('wpforo_tools_antispam', $this->default->tools_antispam);
            $this->tools_cleanup = get_wpf_option('wpforo_tools_cleanup', $this->default->tools_cleanup);

            //CONSTANTS
            define('WPFORO_BASE_PERMASTRUCT', $this->base_permastruct );
            define('WPFORO_BASE_URL', $this->url );
        }
		
		private function setup(){
			if( wpforo_is_admin() ){ 
				register_activation_hook($this->basename, 'do_wpforo_activation');
				if( !wpforo_feature('user-synch') && get_option('wpforo_version') ){
					$users = $this->db->get_var("SELECT COUNT(*) FROM `" . $this->db->prefix . "users`");
					$profiles = $this->db->get_var("SELECT COUNT(*) FROM `" . $this->db->prefix . "wpforo_profiles`");
					$delta = $users - $profiles; 
					if( $users > 100 && $delta > 2 ){ add_action( 'admin_notices', 'wpforo_profile_notice' ); }
				}
				$db_version = get_option('wpforo_version_db');
				if( !$db_version || version_compare( $db_version, WPFORO_VERSION, '<') ){
					add_action( 'admin_notices', 'wpforo_update_db_notice' );
				}
				register_deactivation_hook($this->basename, 'do_wpforo_deactivation');
			}
		}
		
		public function user_trailingslashit($url) {
			$rtrimed_url = '';
			$url_append_vars = '';
			if( preg_match('#(^.+?)(/?\?.*$|$)#isu', $url, $match) ){
				if(isset($match[1]) && $match[1]) $rtrimed_url = rtrim($match[1], '/\\');
				if(isset($match[2]) && $match[2]) $url_append_vars = trim($match[2], '/\\');
				if( $rtrimed_url ) {
					$home_url = rtrim( preg_replace('#/?\?.*$#isu', '', home_url()), '/\\' );
					if( $rtrimed_url == $home_url ){
						$url = $rtrimed_url . '/';
					}else{
						$url = ( $this->use_trailing_slashes ? $rtrimed_url . '/' : $rtrimed_url );
					}
				}
			}
			return $url . $url_append_vars;
		}
		
		public function statistic( $mode = 'get', $template = 'all' ){
			
			if( $mode == 'get' ){
				if( $cached_stat = get_option('wpforo_stat') ) return $cached_stat;
			}

			if( $mode == 'get' || $template == 'all' ) {
                $stats['forums'] = $this->forum->get_count();
                $stats['topics'] = $this->topic->get_count();
                $stats['posts'] = $this->post->get_count();
                $stats['members'] = $this->member->get_count();
                $stats['online_members_count'] = $this->member->online_members_count();

                $posts = $this->topic->get_topics(array('orderby' => 'modified', 'order' => 'DESC', 'row_count' => 1));
                if ( isset($posts[0]) && !empty($posts[0]) && $this->perm->forum_can('vf', $posts[0]['forumid']) ) {
                    $stats['last_post_title'] = $posts[0]['title'];
                    $stats['last_post_url'] = $this->post->get_post_url($posts[0]['last_post']);
                }

                $members = $this->member->get_members(array('orderby' => 'userid', 'order' => 'DESC', 'row_count' => 1));
                if (isset($members[0]) && !empty($members[0])) {
                    $stats['newest_member_dname'] = $members[0]['display_name'] ? $members[0]['display_name'] : urldecode($members[0]['user_nicename']);
                    $stats['newest_member_profile_url'] = $this->member->get_profile_url($members[0]['ID']);
                }
            }else{
                $stats = get_wpf_option('wpforo_stat', $this->default->stats);
                switch ($template){
                    case 'forum':
                        $stats['forums'] = $this->forum->get_count();
                    break;
                    case 'topic':
                        $stats['topics'] = $this->topic->get_count();
                        $posts = $this->topic->get_topics(array('orderby' => 'modified', 'order' => 'DESC', 'row_count' => 1));
                        if ( isset($posts[0]) && !empty($posts[0]) && $this->perm->forum_can('vf', $posts[0]['forumid']) ) {
                            $stats['last_post_title'] = $posts[0]['title'];
                            $stats['last_post_url'] = $this->post->get_post_url($posts[0]['last_post']);
                        }
                    break;
                    case 'post':
                        $stats['posts'] = $this->post->get_count();
                        $posts = $this->topic->get_topics(array('orderby' => 'modified', 'order' => 'DESC', 'row_count' => 1));
                        if ( isset($posts[0]) && !empty($posts[0]) && $this->perm->forum_can('vf', $posts[0]['forumid']) ) {
                            $stats['last_post_title'] = $posts[0]['title'];
                            $stats['last_post_url'] = $this->post->get_post_url($posts[0]['last_post']);
                        }
                    break;
                    case 'user':
                        $stats['members'] = $this->member->get_count();
                        $stats['online_members_count'] = $this->member->online_members_count();

                        $members = $this->member->get_members(array('orderby' => 'userid', 'order' => 'DESC', 'row_count' => 1));
                        if (isset($members[0]) && !empty($members[0])) {
                            $stats['newest_member_dname'] = $members[0]['display_name'] ? $members[0]['display_name'] : urldecode($members[0]['user_nicename']);
                            $stats['newest_member_profile_url'] = $this->member->get_profile_url($members[0]['ID']);
                        }
                    break;
                }
            }

            $stats = array_merge($this->default->stats, $stats);
            $stats = apply_filters('wpforo_get_statistic_array_filter', $stats);
            update_option( 'wpforo_stat', $stats );
            return $stats;
        }
		
		public function init_current_object($url = ''){
			$this->current_object = array('template' => '', 'paged' => 1, 'is_404' => false, 'user_is_same_current_user' => false);
			if(!$url) $url = wpforo_get_request_uri();
			
			if( !is_wpforo_page($url) ) return;
			
			$current_url = wpforo_get_url_query_vars_str($url);
			
			if( $this->use_home_url ) $this->permastruct = '';
			
			$current_object = array();
			$current_object['template'] = '';
			$current_object['is_404'] = false;
            $current_object['user_is_same_current_user'] = false;
			
			if(isset($_GET['wpfs'])) $current_object['template'] = 'search';
			if( isset($_GET['wpforo']) ){
				switch($_GET['wpforo']){
					case 'signup':
						if(!is_user_logged_in()) $current_object['template'] = 'register';
					break;
					case 'signin':
						if(!is_user_logged_in()) $current_object['template'] = 'login';
					break;
					case 'lostpassword':
						if(!is_user_logged_in()) $current_object['template'] = 'lostpassword';
					break;
					case 'resetpassword':
                        $current_object['template'] = 'resetpassword';
					break;
					case 'logout':
						wp_logout();
						wp_redirect( wpforo_home_url( preg_replace('#\?.*$#is', '', wpforo_get_request_uri()) ) );
						exit();
					break;
				}
			}
			
			$wpf_url = preg_replace( '#^/?'.preg_quote($this->permastruct).'#isu', '' , $current_url, 1 );
			$wpf_url = preg_replace('#/?\?.*$#isu', '', $wpf_url);
			$wpf_url_parse = array_filter( explode('/', trim($wpf_url, '/')) );
			$wpf_url_parse = array_reverse($wpf_url_parse);

			if(in_array('paged', $wpf_url_parse)){
				foreach($wpf_url_parse as $key => $value){
					if( $value == 'paged'){
						unset($wpf_url_parse[$key]);
						break;
					}
					if(is_numeric($value)) $paged = intval($value);
					
					unset($wpf_url_parse[$key]);
				}
			}
			if(isset($_GET['wpfpaged']) && intval($_GET['wpfpaged'])) $paged = intval($_GET['wpfpaged']);
			$current_object['paged'] = (isset($paged) && $paged) ? $paged : 1;
			
			$wpf_url_parse = array_values($wpf_url_parse);
			
			if( !isset($current_object['template']) || !$current_object['template'] )
				$current_object = apply_filters('wpforo_before_init_current_object', $current_object, $wpf_url_parse);
			
			if( !isset($current_object['template']) || !$current_object['template'] ) {
				if(in_array('members', $wpf_url_parse) && $wpf_url_parse[0] == 'members'){
					$current_object['template'] = 'members';
				}elseif(in_array('recent', $wpf_url_parse) && $wpf_url_parse[0] == 'recent'){
					$current_object['template'] = 'recent';
				}elseif(in_array('profile', $wpf_url_parse)){
					$current_object['template'] = 'profile';
					foreach($wpf_url_parse as $value){
						if( $value == 'profile') break;
						if(is_numeric($value)) $current_object['userid'] = $value; else $current_object['username'] = $value;
					}
				}elseif(in_array('account', $wpf_url_parse)){
					$current_object['template'] = 'account';
					foreach($wpf_url_parse as $value){
						if( $value == 'account') break;
						if(is_numeric($value)) $current_object['userid'] = $value; else $current_object['username'] = $value;
					}
				}elseif(in_array('activity', $wpf_url_parse)){
					$current_object['template'] = 'activity';
					foreach($wpf_url_parse as $value){
						if( $value == 'activity') break;
						if(is_numeric($value)) $current_object['userid'] = $value; else $current_object['username'] = $value;
					}
				}elseif(in_array('subscriptions', $wpf_url_parse)){
					$current_object['template'] = 'subscriptions';
					foreach($wpf_url_parse as $value){
						if( $value == 'subscriptions') break;
						if(is_numeric($value)) $current_object['userid'] = $value; else $current_object['username'] = $value;
					}
				}else{
					$current_object['template'] = 'forum';
					if( isset($wpf_url_parse[0]) ){
						if( isset($wpf_url_parse[1]) ){
							$current_object['topic_slug'] = $wpf_url_parse[0];
							$current_object['forum_slug'] = $wpf_url_parse[1];
							$current_object['template'] = 'post';
						}else{
							$current_object['forum_slug'] = $wpf_url_parse[0];
							$current_object['template'] = 'topic';
						}
					}
				}
			}
			
			if( isset($current_object['userid']) || isset($current_object['username']) ){
				$args = array();
				if(isset($current_object['userid'])) $args['userid'] = $current_object['userid'];
				if(isset($current_object['username'])) $args['username'] = $current_object['username'];
				$selected_user = $this->member->get_member($args);
				if(isset($current_object['userid']) && empty($selected_user)) $selected_user = $this->member->get_member(array('username' => $current_object['userid']));
				if(!empty($selected_user)){
					$current_object['user'] = $selected_user;
					$current_object['userid'] = $selected_user['ID'];
					$current_object['username'] = $selected_user['user_nicename'];
                    $current_object['user_is_same_current_user'] = !empty($this->current_userid) && $selected_user['ID'] == $this->current_userid;
					
					switch($current_object['template']){
						case 'activity':
							$args = array(
								'offset' => ($current_object['paged'] - 1) * $this->post->options['posts_per_page'],
								'row_count' => $this->post->options['posts_per_page'],
								'userid' => $current_object['userid'],
								'order' => 'DESC',
								'check_private' => true
							);
							$current_object['items_count'] = 0;
							$current_object['activities'] = $this->post->get_posts( $args, $current_object['items_count']);
						break;
						case 'subscriptions':
							$args = array(
								'offset' => ($current_object['paged'] - 1) * $this->post->options['posts_per_page'],
								'row_count' => $this->post->options['posts_per_page'],
								'userid' => $current_object['userid'],
								'order' => 'DESC'
							);
							$current_object['items_count'] = 0;
							$current_object['subscribes'] = $this->sbscrb->get_subscribes( $args, $current_object['items_count']);
						break;
					}
					
				}else{
					$current_object['is_404'] = true;
					$current_object['user'] = array();
					$current_object['userid'] = 0;
					$current_object['username'] = '';
				}
			}
			
			if(isset($current_object['forum_slug']) && $current_object['forum_slug']){
				$forum = $this->forum->get_forum(array('slug' => $current_object['forum_slug']), TRUE);
				if(!empty($forum)){
					$current_object['forum'] = $forum;
					$current_object['forumid'] = $forum['forumid'];
					$current_object['forum_desc'] = $forum['description'];
					$current_object['forum_meta_key'] = $forum['meta_key'];
					$current_object['forum_meta_desc'] = $forum['meta_desc'];
				}else{
					$current_object['is_404'] = true;
					$current_object['forum'] = array();
					$current_object['forumid'] = 0;
					$current_object['forum_desc'] = '';
					$current_object['forum_meta_key'] = '';
					$current_object['forum_meta_desc'] = '';
				}
			}
			
			if(isset($current_object['topic_slug']) && $current_object['topic_slug']){
				$topic = $this->topic->get_topic(array('slug' => $current_object['topic_slug']));
				if(!empty($topic)){
					$current_object['topic'] = $topic;
					$current_object['topicid'] = $topic['topicid'];
				}elseif( $this->current_object['status'] == 'unapproved' && !is_user_logged_in() ){
                    wp_redirect( wpforo_login_url() );
                    exit();
                }else{
					$current_object['is_404'] = true;
					$current_object['topic'] = array();
					$current_object['topicid'] = 0;
				}
			}
			
			$this->current_object = apply_filters('wpforo_after_init_current_object', $current_object, $wpf_url_parse);
		}

		public function is_installed(){
		    return (bool) get_option('wpforo_version');
        }
	}
	
	$wpforo = new wpForo();
	$wpforo->cache = new wpForoCache( $wpforo );
	$wpforo->phrase = new wpForoPhrase( $wpforo );
	$wpforo->forum = new wpForoForum( $wpforo );
	$wpforo->topic = new wpForoTopic( $wpforo );
	$wpforo->post = new wpForoPost( $wpforo );
	$wpforo->usergroup = new wpForoUsergroup( $wpforo );
	$wpforo->member = new wpForoMember( $wpforo );
	$wpforo->perm = new wpForoPermissions( $wpforo );
	$wpforo->sbscrb = new wpForoSubscribe( $wpforo );
	$wpforo->tpl = new wpForoTemplate( $wpforo );
	$wpforo->notice = new wpForoNotices();
	$wpforo->feed = new wpForoFeed( $wpforo );
    $wpforo->moderation = new wpForoModeration( $wpforo );
	if(wpforo_is_admin()) include( WPFORO_DIR .'/wpf-admin/admin.php' );
	$GLOBALS['wpforo'] = $wpforo;
	add_action('init', array($wpforo, 'init'));
	
	//ADDONS/////////////////////////////////////////////////////
	$wpforo->addons = array(
		'embeds' => array('version' => '1.0.4', 'requires' => '1.4.0', 'class' => 'wpForoEmbeds', 'title' => 'Embeds', 'thumb' => WPFORO_URL . '/wpf-assets/addons/' . 'embeds' . '/header.png', 'desc' => __('Allows to embed hundreds of video, social network, audio and photo content providers in forum topics and posts.', 'wpforo'), 'url' => 'https://gvectors.com/product/wpforo-embeds/'),
		'ucf' => array('version' => '1.0.0', 'requires' => '1.4.0', 'class' => 'WpforoUcf', 'title' => 'User Custom Fields', 'thumb' => WPFORO_URL . '/wpf-assets/addons/' . 'ucf' . '/header.png', 'desc' => __('Advanced user profile builder system. Allows to add new fields and manage profile page. Creates custom Registration, Account, Member Search forms.', 'wpforo'), 'url' => 'https://gvectors.com/product/wpforo-user-custom-fields/'),
		'attachments' => array('version' => '1.1.2', 'requires' => '1.4.0', 'class' => 'wpForoAttachments', 'title' => 'Advanced Attachments', 'thumb' => WPFORO_URL . '/wpf-assets/addons/' . 'attachments' . '/header.png', 'desc' => __('Adds an advanced file attachment system to forum topics and posts. AJAX powered media uploading and displaying system with user specific library.', 'wpforo'), 'url' => 'https://gvectors.com/product/wpforo-advanced-attachments/'),
		'cross' => array('version' => '1.0.3', 'requires' => '1.4.0', 'class' => 'wpForoCrossPosting', 'title' => '"Forum - Blog" Cross Posting', 'thumb' => WPFORO_URL . '/wpf-assets/addons/' . 'cross' . '/header.png', 'desc' => __('Blog to Forum and Forum to Blog content synchronization. Blog posts with Forum topics and Blog comments with Forum replies.', 'wpforo'), 'url' => 'https://gvectors.com/product/wpforo-cross-posting/'),
		'pm' => array('version' => '1.0.3', 'requires' => '1.4.0', 'class' => 'wpForoPMs', 'title' => 'Private Messages', 'thumb' => WPFORO_URL . '/wpf-assets/addons/' . 'pm' . '/header.png', 'desc' => __('Provides a safe way to communicate directly with other members. Messages are private and can only be viewed by conversation participants.', 'wpforo'), 'url' => 'https://gvectors.com/product/wpforo-private-messages/'),
		'ad-manager' => array('version' => '1.0.0', 'requires' => '1.4.0', 'class' => 'wpForoAD', 'title' => 'Ads Manager', 'thumb' => WPFORO_URL . '/wpf-assets/addons/' . 'ad-manager' . '/header.png', 'desc' => __('Ads Manager is a powerful yet simple advertisement management system, that allows you to add adverting banners between forums, topics and posts.', 'wpforo'), 'url' => 'https://gvectors.com/product/wpforo-ad-manager/'),
    );
	$wp_version = get_bloginfo('version'); if (version_compare($wp_version, '4.2.0', '>=')) { add_action('wp_ajax_dismiss_wpforo_addon_note', array($wpforo->notice, 'dismissAddonNote')); add_action('admin_notices', array($wpforo->notice, 'addonNote'));}
	/////////////////////////////////////////////////////////////
}