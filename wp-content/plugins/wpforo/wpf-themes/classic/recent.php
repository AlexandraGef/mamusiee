<?php
	// Exit if accessed directly
	if( !defined( 'ABSPATH' ) ) exit;

	if(!empty($_GET['wpfpaged'])) $paged = intval($_GET['wpfpaged']);
	if(!empty($_GET['wpff'])) $args['forumid'] = intval($_GET['wpff']);
	$args = array( 'offset' => ($paged - 1) * $wpforo->post->options['posts_per_page'], 'row_count' => $wpforo->post->options['posts_per_page']);
	$args['orderby'] = (!empty($_GET['wpfob'])) ? sanitize_text_field($_GET['wpfob']) : 'created';
	$args['order'] = (!empty($_GET['wpfo'])) ? sanitize_text_field($_GET['wpfo']) : 'DESC';
	if(!is_user_logged_in() || !$wpforo->perm->usergroup_can('em')){ $args['private'] = 0; $args['status'] = 0; }
	
	$items_count = 0;
	$posts = $wpforo->post->get_posts($args, $items_count);
?>
<div class="wpforo-recent-wrap">
  <div class="wpf-head-bar">
	 <h1 id="wpforo-title" style="padding-bottom:0px; margin-bottom:0px;">
	 	<?php wpforo_phrase('Recent Posts') ?>
     	<?php if( wpforo_feature('rss-feed', $wpforo) ): ?>
            <div class="wpforo-feed"> 
                <span class="wpf-feed-forums">
                    <a href="<?php $wpforo->feed->rss2_url( true, 'forum' ); ?>"  title="<?php wpforo_phrase('Forums RSS Feed') ?>" target="_blank">
                        <span><?php wpforo_phrase('Forums') ?></span> <i class="fa fa-rss fa-0x"></i>
                    </a>
                </span><sep> | </sep>
                <span class="wpf-feed-topics">
                    <a href="<?php $wpforo->feed->rss2_url( true, 'topic' ); ?>"  title="<?php wpforo_phrase('Topics RSS Feed') ?>" target="_blank">
                        <span><?php wpforo_phrase('Topics') ?></span> <i class="fa fa-rss fa-0x"></i>
                    </a>
                </span>
             </div>
         <?php endif; ?>
     </h1>
  	 <div class="wpf-snavi">
        <?php $wpforo->tpl->pagenavi($paged, $items_count, FALSE); ?>
     </div>
  </div>
  <div class="wpforo-recent-content">
  	<?php if( !empty($posts) ): ?>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr class="wpf-htr">
        <td class="wpf-shead-avatar">&nbsp;</td>
        <td class="wpf-shead-title"><?php wpforo_phrase('Post Title') ?></td>
        <td class="wpf-shead-forum"><?php wpforo_phrase('Forum') ?></td>
      </tr>
		  <?php foreach($posts as $post) : extract($post, EXTR_OVERWRITE); ?>
              <?php 
                $member = wpforo_member($post); 
                $forum = wpforo_forum($post['forumid']);
              ?>
              <tr class="wpf-ttr">
                <td class="wpf-spost-avatar"> 
                    <?php if( $wpforo->perm->usergroup_can('va') && wpforo_feature('avatars', $wpforo) ): ?>
                        <?php echo $wpforo->member->avatar($member, 'alt="'.esc_attr($member['display_name']).'"', 40, true) ?>
                    <?php endif; ?>
                </td>
                <td class="wpf-spost-title">
                    <a href="<?php echo esc_url($wpforo->post->get_post_url($postid)) ?>" class="wpf-spost-title-link <?php wpforo_unread_topic($post['topicid']); ?>" title="<?php wpforo_phrase('View entire post') ?>"><?php echo esc_html($title) ?> &nbsp;<i class="fa fa-chevron-right" style="font-weight:100; font-size:11px;"></i></a>
                    <p style="font-size:12px"><?php wpforo_member_link($member, 'by'); ?>, <?php wpforo_date($post['created']); ?></p>
                </td>
                <td class="wpf-spost-forum"><a href="<?php echo $forum['url'] ?>"><?php echo esc_html($forum['title']); ?></a></td>
              </tr>
              <tr class="wpf-ptr">
                <td class="wpf-spost-icon">&nbsp;</td>
                <td colspan="2" class="wpf-stext">
                <?php
                    $body = wpforo_content_filter( $body );
                    $body = preg_replace('#\[attach\][^\[\]]*\[\/attach\]#is', '', strip_tags($body));
                    wpforo_text($body, 200);
                ?>
                </td>
              </tr>
          <?php endforeach ?>
    </table>
    <?php else: ?>
        <p class="wpf-p-error"><?php wpforo_phrase('No posts were found here') ?>  </p>
    <?php endif; ?>
  </div>
  <div class="wpf-snavi">
    <?php $wpforo->tpl->pagenavi($paged, $items_count, FALSE); ?>
  </div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
