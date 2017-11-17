<?php
	// Exit if accessed directly
	if( !defined( 'ABSPATH' ) ) exit;
 

class wpForoSubscribe{
	private $wpforo;
    public $default;
    public $options;

	static $cache = array( 'subscribe' => array() );
	
	function __construct( $wpForo ){
		if(!isset($this->wpforo)) $this->wpforo = $wpForo;

        $this->init_defaults();
        $this->init_options();
	}

    private function init_defaults(){
        $blogname = get_option('blogname', '');
        $adminemail = get_option('admin_email');

        $this->default = new stdClass;

        $this->default->options = array (
            'from_name' =>  $blogname . ' - Forum',
            'from_email' =>  $adminemail,
            'admin_emails' => $adminemail,
            'new_topic_notify' => 1,
            'new_reply_notify' => 0,
            'confirmation_email_subject' =>  "Please confirm subscription to [entry_title]",
            'confirmation_email_message' =>  "Hello [member_name]!<br>\r\n Thank you for subscribing.<br>\r\n This is an automated response.<br>\r\n We are glad to inform you that after confirmation you will get updates from - [entry_title].<br>\r\n Please click on link below to complete this step.<br>\r\n [confirm_link]" ,
            'new_topic_notification_email_subject' =>  "New Topic" ,
            'new_topic_notification_email_message' =>  "Hello [member_name]!<br>\r\n New topic has been created on your subscribed forum - [forum].\r\n <br><br>\r\n <strong>[topic_title]</strong>\r\n <blockquote>\r\n [topic_desc]\r\n </blockquote>\r\n <br><hr>\r\n If you want to unsubscribe from this forum please use the link below.<br>\r\n [unsubscribe_link]" ,
            'new_post_notification_email_subject' =>  "New Reply" ,
            'new_post_notification_email_message' =>  "Hello [member_name]!<br>\r\n New reply has been posted on your subscribed topic - [topic].\r\n <br><br>\r\n <strong>[reply_title]</strong>\r\n <blockquote >\r\n [reply_desc]\r\n </blockquote>\r\n <br><hr>\r\n If you want to unsubscribe from this topic please use the link below.<br>\r\n [unsubscribe_link]" ,
            'report_email_subject' => "Forum Post Report",
            'report_email_message' => "<strong>Report details:</strong>\r\n Reporter: [reporter], <br>\r\n Message: [message],<br>\r\n <br>\r\n [post_url]",
            'reset_password_email_message' => "Hello! <br>\r\n\r\n You asked us to reset your password for your account using the email address [user_login]. <br>\r\n\r\n If this was a mistake, or you didn't ask for a password reset, just ignore this email and nothing will happen. <br>\r\n\r\n To reset your password, visit the following address: <br>\r\n\r\n [reset_password_url] <br>\r\n\r\n Thanks!",
            //'spam_notification_email_subject' => 'New Banned User',
            //'spam_notification_email_message' => "Hello [member_name]!<br>\r\n Please check this user's topics/posts and consider to Delete or Unban.<br>\r\n User Activity: [profile_activity_url]",
            'update' =>  '1'
        );
    }

    private function init_options(){
        $this->options = get_wpf_option('wpforo_subscribe_options', $this->default->options);
    }
 	
 	function get_confirm_key(){
		return substr(md5(rand().time()), 0, 32);
	}
 	
	function add( $args = array() ){
		if( empty($args) && empty($_REQUEST['sbscrb']) ) return FALSE;
		if( empty($args) && !empty($_REQUEST['sbscrb']) ) $args = $_REQUEST['sbscrb']; 
		if( !isset($args['active']) || !$args['active'] ) $args['active'] = 0;
		
		extract( $args, EXTR_OVERWRITE );
		if( !isset($itemid) || !$itemid || !isset($userid) || !$userid || !isset($type) || !$type ) return FALSE;
		
		if( !isset($confirmkey) || (isset($confirmkey) && !$confirmkey ) ) $confirmkey = $this->get_confirm_key();
		
		if($this->wpforo->db->insert( 
			$this->wpforo->db->prefix . 'wpforo_subscribes', 
			array( 
				'itemid' => intval($itemid),
				'type' => sanitize_text_field($type),
				'confirmkey' => sanitize_text_field($confirmkey), 
				'userid' => intval($userid),
				'active' => $active
			), 
			array( 
				'%d',
				'%s', 
				'%s', 
				'%d',
				'%d'
			)
		)){
			if( isset($active) && $active == 1 ){
				$this->wpforo->notice->add('You have been successfully subscribed', 'success');
			}else{
				$this->wpforo->notice->add('Success! Thank you. Please check your email and click confirmation link below to complete this step.', 'success');
			}
			return $confirmkey;
		}
		
		$this->wpforo->notice->add('Can\'t subscribe to this item', 'error');
		return FALSE;
	}
	
	function edit( $confirmkey = '' ){
		if( !$confirmkey && isset($_REQUEST['key']) && $_REQUEST['key'] ) $confirmkey = $_REQUEST['key']; 
		if( !$confirmkey ){
			$this->wpforo->notice->add('Invalid request!', 'error');
			return FALSE;
		}
		
		if( $this->wpforo->db->update( 
			$this->wpforo->db->prefix . 'wpforo_subscribes', 
			array( 'active' => 1 ), 
			array( 'confirmkey' => sanitize_text_field($confirmkey) ),
			array( '%d' ),
			array( '%s' )
		) ){
			$this->wpforo->notice->add('You have been successfully subscribed', 'success');
			return TRUE;
		}
		
		$this->wpforo->notice->add('Your subscription for this item could not be confirmed', 'error');
		return FALSE;
	}
	
	function delete( $confirmkey = '' ){
		if( !$confirmkey && isset($_REQUEST['confirmkey']) && $_REQUEST['confirmkey'] ) $confirmkey = $_REQUEST['confirmkey'];
		if( !$confirmkey ){
			$this->wpforo->notice->add('Invalid request!', 'error');
			return FALSE;
		}
		if( $this->wpforo->db->delete( $this->wpforo->db->prefix.'wpforo_subscribes', array( 'confirmkey' => sanitize_text_field($confirmkey) ), array( '%s' ) ) ){
			$this->wpforo->notice->add('You have been successfully unsubscribed', 'success');
			return TRUE;
		}
		
		$this->wpforo->notice->add('Could not be unsubscribe from this item', 'error');
		return FALSE;
	}
	
	function get_subscribe( $args = array() ){
		
		$cache = $this->wpforo->cache->on('memory_cashe');
		
		if( is_string($args) ) $args = array("confirmkey" => sanitize_text_field($args));
		if( empty($args) && !empty($_REQUEST['sbscrb']) ) $args = $_REQUEST['sbscrb']; 
		if( empty($args) ) return FALSE;
		extract( $args, EXTR_OVERWRITE );
		if( (!isset($itemid) || !$itemid || !isset($userid) || !$userid || !isset($type) || !$type) && (!isset($confirmkey) || !$confirmkey) ) return FALSE;
		if( isset($confirmkey) && $confirmkey){
			$where = " `confirmkey` = '".esc_sql(sanitize_text_field($confirmkey))."'";
		}elseif( isset($itemid) && $itemid && isset($userid) && $userid && isset($type) && $type ){
			$where = " `itemid` = ".intval($itemid)." AND `userid` = ".intval($userid)." AND `type` = '".esc_sql(sanitize_text_field($type))."'";
		}else{
			return FALSE;
		}
		if( $cache && isset(self::$cache['subscribe'][$itemid][$userid][$type]) ){
			return self::$cache['subscribe'][$itemid][$userid][$type];
		}
		$sql = "SELECT * FROM `".$this->wpforo->db->prefix."wpforo_subscribes` WHERE " . $where;
		$subscribe = $this->wpforo->db->get_row($sql, ARRAY_A);
		if($cache && !empty($subscribe)){
			self::$cache['subscribe'][$itemid][$userid][$type] = $subscribe;
		}
		return $subscribe;
	}
	
	function get_subscribes( $args = array(), &$items_count = 0 ){
		
		$default = array( 
		  'itemid' => NULL,
		  'type' => '',  // topic | forum
		  'userid' => NULL, //
		  'active' => 1,
		  'orderby' => 'subid', // order by `field`
		  'order' => 'DESC', // ASC DESC
		  'offset' => NULL, // OFFSET
		  'row_count' => NULL, // ROW COUNT
		);
		
		$args = wpforo_parse_args( $args, $default );
		if(!empty($args)){
			extract($args, EXTR_OVERWRITE);
			
			$sql = "SELECT * FROM `".$this->wpforo->db->prefix."wpforo_subscribes`";
			$wheres = array();
			
			if( $type ) $wheres[] = " `type` = '" . esc_sql(sanitize_text_field($type)) . "'";
			$wheres[] = " `active` = "   . intval($active);
			if($itemid != NULL)   $wheres[] = " `itemid` = "   . intval($itemid);
			if($userid != NULL)   $wheres[] = " `userid` = "   . intval($userid);
			
			if(!empty($wheres)) $sql .= " WHERE " . implode( " AND ", $wheres );
			
			$item_count_sql = preg_replace('#SELECT.+?FROM#isu', 'SELECT count(*) FROM', $sql);
			if( $item_count_sql ) $items_count = $this->wpforo->db->get_var($item_count_sql);
			
			$sql .= " ORDER BY `$orderby` " . $order;
			
			if($row_count != NULL){
				if($offset != NULL){
					$sql .= esc_sql(" LIMIT $offset,$row_count");
				}else{
					$sql .= esc_sql(" LIMIT $row_count");
				}
			}
			return $this->wpforo->db->get_results($sql, ARRAY_A);
			
		}
	}
	
	function get_confirm_link($args){
		if(is_string($args)) return wpforo_home_url( "?wpforo=sbscrbconfirm&key=" . sanitize_text_field($args) );
		
		if($args['type'] == 'forum'){
			$url = $this->wpforo->forum->get_forum_url($args['itemid']) . '/';
		}elseif($args['type'] == 'topic'){
			$url = $this->wpforo->topic->get_topic_url($args['itemid']) . '/';
		}else{
			$url = wpforo_home_url();
		}
		return wpforo_home_url( $url . "?wpforo=sbscrbconfirm&key=" . sanitize_text_field($args['confirmkey']) );
	}
	
	function get_unsubscribe_link($confirmkey){
		return wpforo_home_url( "?wpforo=unsbscrb&key=" . sanitize_text_field($confirmkey) );
	}
	
}