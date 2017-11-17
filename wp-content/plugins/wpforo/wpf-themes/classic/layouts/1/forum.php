<?php
	// Exit if accessed directly
	if( !defined( 'ABSPATH' ) ) exit;

/**
* 
* @layout: Extended
* @url: http://gvectors.com/
* @version: 1.0.0
* @author: gVectors Team
* @description: Extended layout displays one level deeper information in advance.
* 
*/
?>

<div class="wpfl-1">
	<div class="wpforo-category">
	    <div class="cat-title"><?php echo esc_html($cat['title']); ?></div>
	    <div class="cat-stat-posts"><?php wpforo_phrase('Posts'); ?></div>
	    <div class="cat-stat-topics"><?php wpforo_phrase('Topics'); ?></div>
	    <br class="wpf-clear" />
	</div><!-- wpforo-category -->
	<?php foreach($forums as $key => $forum) : 
		if( !$wpforo->perm->forum_can( 'vf', $forum['forumid'] ) ) continue;
		$sub_forums = $wpforo->forum->get_forums( array( "parentid" => $forum['forumid'], "type" => 'forum' ) );
		$has_sub_forums = ( is_array($sub_forums) && !empty($sub_forums) ? TRUE : FALSE );
		
		$data = wpforo_forum($forum['forumid'], 'childs');
		$counts = wpforo_forum($forum['forumid'], 'counts');
		$topics = $wpforo->topic->get_topics( array("forumids" => $data, "orderby" => "type, modified", "order" => "DESC", "row_count" => $wpforo->forum->options['layout_extended_intro_topics_count'] ) );
		
		$has_topics = ( is_array($topics) && !empty($topics) ? TRUE : FALSE );
		
		$forum_url = wpforo_forum($forum['forumid'], 'url');
		$topic_toglle = $wpforo->forum->options['layout_extended_intro_topics_toggle'];
		
		$forum_icon = ( isset($forum['icon']) && $forum['icon']) ? $forum['icon'] : 'fa-comments';
		?>
	    <div id="wpf-forum-<?php echo $forum['forumid'] ?>" class="forum-wrap">
	       <div class="wpforo-forum">
	         <div class="wpforo-forum-icon"><i class="fa <?php echo esc_attr($forum_icon) ?> wpfcl-0"></i></div>
	         <div class="wpforo-forum-info">
	            <h3 class="wpforo-forum-title <?php wpforo_unread_forum($forum['forumid']) ?>"><a href="<?php echo esc_url($forum_url) ?>"><?php echo esc_html($forum['title']); ?></a></h3>
	            <p class="wpforo-forum-description"><?php echo $forum['description']; ?></p>
				
	            <?php if($has_sub_forums) : ?>
					
	                <div class="wpforo-subforum">
	                   <ul>
	                    	<li class="first wpfcl-2"><?php wpforo_phrase('Subforums'); ?>:</li>
	                    	<?php foreach($sub_forums as $sub_forum) : 
	                    		if( !$wpforo->perm->forum_can( 'vf', $sub_forum['forumid'] ) ) continue;
								$sub_forum_icon = ( isset($sub_forum['icon']) && $sub_forum['icon']) ? $sub_forum['icon'] : 'fa-comments'; ?>
	                    		<li class="<?php wpforo_unread_forum($sub_forum['forumid']) ?>"><i class="fa <?php echo esc_attr($sub_forum_icon) ?> wpfcl-0"></i>&nbsp;<a href="<?php echo esc_url( wpforo_forum($sub_forum['forumid'], 'url') ) ?>"><?php echo esc_html($sub_forum['title']); ?></a></li>
								
	                    	<?php endforeach; ?>
							
	                   </ul>
	                   <br class="wpf-clear" />
	                </div><!-- wpforo-subforum -->
					
	            <?php endif; ?>
				
				<?php if($has_topics) : ?>
					
		            <div class="wpforo-forum-footer">
		                <span class="wpfcl-5"><?php wpforo_phrase('Recent Topics'); ?></span> &nbsp; 
		                <i id="img-arrow-<?php echo intval($forum['forumid']) ?>" class="topictoggle fa fa-chevron-<?php echo ( $topic_toglle == 1 ? 'up' : 'down' ) ?>" style="color: rgb(67, 166, 223);font-size: 14px; cursor: pointer;"></i>
		            </div>
		            
		        <?php endif ?>
		        
	         </div><!-- wpforo-forum-info -->
	         
	         <div class="wpforo-forum-stat-posts"><?php echo wpforo_print_number($counts['posts']) ?></div>
	         <div class="wpforo-forum-stat-topics"><?php echo wpforo_print_number($counts['topics']) ?></div>
				
	         <br class="wpf-clear" />
	       </div><!-- wpforo-forum -->
		   
			<?php if($has_topics) : ?>
				
	           <div class="wpforo-last-topics-<?php echo intval($forum['forumid']) ?>" style="display: <?php echo ( $topic_toglle == 1 ? 'block' : 'none' ) ?>;">
	              <div class="wpforo-last-topics-tab">&nbsp;</div>
	              <div class="wpforo-last-topics-list">
	                <ul>
						<?php foreach($topics as $topic) : ?>
                        	<?php $last_post = wpforo_post($topic['last_post']) ?>
							<?php $member = wpforo_member($last_post); ?>
	                        <li> 
	                            <div class="wpforo-last-topic-title <?php wpforo_unread_topic($topic['topicid']) ?>" title="<?php $icon_title = $wpforo->tpl->icon('topic', $topic, false, 'title'); if( $icon_title ) echo esc_html($icon_title) ?>"><i class="fa <?php $wpforo->tpl->icon('topic', $topic); ?> wpfcl-0"></i> &nbsp;
	                            <a href="<?php echo esc_url($last_post['url']) ?>"><?php echo esc_html(wpforo_text($topic['title'], 45, false)) ?></a></div> 
	                            <div class="wpforo-last-topic-user" title="<?php echo esc_attr($member['display_name']) ?>"><?php wpforo_member_link($member, 'by', 9); ?></div>
	                            <div class="wpforo-last-topic-date"><?php wpforo_date($topic['modified']); ?></div> 
	                            <br class="wpf-clear" />
	                        </li>
						<?php endforeach; ?>
						<?php if( intval($forum['topics']) > $wpforo->forum->options['layout_extended_intro_topics_count'] ): ?>
                            <li>
                                <div class="wpforo-last-topic-user wpf-vat">
                                	<a href="<?php echo esc_url($forum_url) ?>"><?php wpforo_phrase('view all topics', true, 'lower');  ?> <i class="fa fa-angle-right" aria-hidden="true"></i></a>
                                </div>
                                <br class="wpf-clear" />
                            </li>
						<?php endif ?>
	                </ul>
	              </div>
	              <br class="wpf-clear" />
	           </div><!-- wpforo-last-topics -->
			   
			<?php endif; ?>
		   
	    </div><!-- forum-wrap -->
        
        <?php do_action( 'wpforo_loop_hook', $key ) ?>
	    
	<?php endforeach; ?> <!-- $forums as $forum -->
</div><!-- wpfl-1 -->