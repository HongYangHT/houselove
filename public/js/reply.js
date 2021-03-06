/**
 *@version 0.0.1
 *@author hongyang
 *@description handle replay event
 * 
 */
(function($){
	var $panelGroup = $('.panel-group');
	var $chatTitle = $('.chat-title span');
	var $dd = $panelGroup.find('dd');
	var $container = $('.chat-reply-container');
	var $sendMessage = $('#replySendMessage');
	var $message = $('#replyMessage');
	
//	$dd.on('click',function(e){
//		var $this = $(this);
//		$this.addClass('active').siblings('dd').removeClass('active').end().parents('.panel-default')
//		.siblings('.panel-default').find('dd').removeClass('active');
//		var username = $this.find('.u-name').text().trim();
//		$chatTitle.html('Reply to'+username);
//	});
	
	$sendMessage.on('click',function(){
		var date = new Date();
		var dateString = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" "+(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
		var $this = $(this);
		var text = $message.val();
		var imageSrc = $this.parents('.chat-item').find('.img-circle').attr('src');
		if(text.trim()!= ""){
			$.ajax({
				url:'/reply',
				data:{
					message:text,
					dateString:dateString,
					sendto:$chatTitle.text().split(' ')[2].toLowerCase()
				},
				type:'POST',
				dataType:'json',
				success : function(result){
					var html = '<section class="re-chat-content">'+
					   '<article class="chat-item">'+
					   '<a href="javascript:;" class="pull-right ">'+
					   '<img class="img-circle head head-m" src='+imageSrc+' /></a>'+
					   '<section class="chat-body">'+
					   '<div class="panel text-sm">'+
					   '<div class="arrow-right-up"></div>'+
					   '<div class="arrow-right-down"></div>'+
					   '<div class="panel-body">'+
					   '<p>'+text+'</p></div></div>'+
					   '<small class="send-time">'+result.username+' ,'+dateString+'</small></section></article></section>';   
					$container.append(html);
					$message.val('');
				},
				error:function(result){
					
				}
			});
		}
	});
	
	$message.on('keyup',function(e){
		var $this = $(this);
		e.preventDefault();
		e.stopPropagation();
		if(e.keyCode == '13'){
			$sendMessage.click();
		}		
	});
})(jQuery);
