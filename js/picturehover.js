/**
 * Created by lenovo on 2016/5/13.
 */
;
(function($,window,document){

    var defaults = {
        target:'img',
        caption:'title',
        duration:'fast',
        fontColor:'#fff',
        textAlign:'center',
        verticalMiddle: true,
        backgroundColor:'rgba(0,0,0,.7)',
        height:'100%'
    };

    function Picturehover(ele,options){
        this.element = ele;
        this.settings = $.extend({},defaults,options);
        this.init();
    }

    Picturehover.prototype = {

        init:function(){

            var that = this,
                target = this.settings.target;

            $(this.element).off('mouseenter.hover',target).on('mouseenter.hover',target,function(){

                var $ele = $(this),
                    $container = that.createContainer($ele);
                $container.on('mouseenter.hover mouseleave.hover',function(event){
                    
                    if(event.type === 'mouseenter'){
                        
                        var $over = $container.find('.hover-over');
                        if(!$over.length){
                            $over = that.createOver(that,$ele);
                            
                            $(this).html($over);
                        }
                        that.slideIn(that,$over,$ele);
                        
                    }else{
                        
                        that.removeOver(that,$(this),$ele);
                    }
                    
                })

            })

        },
        createContainer:function($ele){
            var top = $ele.offset().top,
                left = $ele.offset().left,
                width = $ele.outerWidth(),
                height = $ele.outerHeight();

            var Container = $('<div>',{
                class:'hover-container'
            }).css({
                width:width,
                height:height,
                position:'absolute',
                top:top,
                left:left,
                borderRadius:$ele.css('border-radius'),
                zIndex:999,
                overflow:'hidden'
            });

            $('body').append(Container);

            return Container;

        },
        createOver:function(instance,$ele){
            
            var content;
            
            var left = 0,
                bottom = '-100%';

            if (instance.settings.verticalMiddle) {
                content = $('<div>').css({
                    display: 'table-cell',
                    verticalAlign: 'middle'
                }).html($ele.attr(instance.settings.caption));
            } else {
                content = $ele.attr(instance.settings.caption);
            }
            $over = $('<div>',{
                class:'hover-over'
            }).css({
                width:'100%',
                height:instance.settings.height,
                position:'absolute',
                left:left,
                bottom:bottom,
                display: instance.settings.verticalMiddle ? 'table' : 'inline',
                textAlign:instance.settings.textAlign,
                color:instance.settings.fontColor,
                background:instance.settings.backgroundColor
            }).html(content);
            
            return $over;
            
            
        },
        slideIn:function(instance,$over,$ele){
            $over.stop().animate({
                left:0,
                bottom:0
            },instance.settings.duration,function(){
                
                $(instance.element).trigger('slideInEnd',$ele.index());
            });
        },
        removeOver:function(instance,$container,$ele){
            var $over = $container.find('.hover-over');
            var dest = {
                left:0,
                bottom:'-100%'
            };
            $over.stop().animate(dest,instance.settings.duration,function(){
                $container.remove();
                $(instance.element).trigger('slideOutEnd',$ele.index());
            })
            
        }

    };


    $.fn.picturehover = function(options){
        this.each(function(){
            if(!$.data(this,"picturehover")){
                $.data(this,"picturehover",new Picturehover(this,options));
            }
        });
        return this;
    };

    $(function(){
        $('[data-picturehover]').picturehover();
    })

}(jQuery,window,document));