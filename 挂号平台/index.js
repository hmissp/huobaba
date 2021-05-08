// 搜索框组件
$.fn.UiSearch=function(){
    var ui=$(this);
    $('.head-right_message',ui).on('click',function(){
        $('.head-right_list').toggle();
        return false;
    });
    $('.head-right_list span').on('click',function(){
        $('.head-right_message').text($('.head-right_list span').eq($(this).index()).text());
    })
    $('body').on('click',function(){
        $('.head-right_list').hide();
    })
}


// banner图组件
$.fn.UiChangeImg=function(){
    var ui=$(this),
        index=0,
        timer=null;
    function changeImg(){
        $('.banner_img').css({'left':(-544*index)+'px'});
        $('.banner_img_tip span').removeClass('banner_img_tip_focus').eq(index).addClass('banner_img_tip_focus');
    }
    $('.banner_img_btn_pre',ui).on('click',function(){
        index--;
        if(index<0){
            index=$('.banner_img a').length-1;
        }
        changeImg();
    });
    $('.banner_img_btn_next',ui).on('click',function(){
        index++;
        if(index>($('.banner_img a').length-1)){
            index=0;
        }
        changeImg();
    });
    $('.banner_img_tip span',ui).on('mouseover',function(){
        var index=$('.banner_img_tip span').index(this);
        console.log(index);
        $('.banner_img').css({'left':(-544*index)+'px'});
        $('.banner_img_tip span').removeClass('banner_img_tip_focus').eq(index).addClass('banner_img_tip_focus');
    })
    function autoplay(){
        timer=setInterval(function(){
            index++;
            if(index>($('.banner_img a').length-1)){
                index=0;
            }
            changeImg(); 
        },2000)
    }
    autoplay();
    function stopplay(){
        clearInterval(timer);
    }
    $('.banner_wrap').on('mouseover',function(){
        stopplay();
    });
    $('.banner_wrap').on('mouseout',function(){
        autoplay();
    });
    $('.banner_img_tip span').on('click',function(){
        index=$(this).index();
        changeImg(); 
    });
    
    
}
// 级联菜单
$.fn.UiSelect=function(){
    var ui=$(this),
        selects=$('.banner_search_top_select',ui);
    selects.on('change',function(){
        var index=selects.index(this);
        var where=$(this).attr('data_where');
        where=where?where.split(','):[];
        where.push($(this).val());
        // 更新下一个菜单
        selects.eq(index+1).attr('data_where',where.join(',')).triggerHandler('create');


        // 初始化下一个之后的菜单
        ui.find('select:gt('+(index+1)+')').each(function(){
            $(this).attr('data_where','').triggerHandler('create');
            // console.log(1);
        });

    })
    .on('create',function(){
        var func=$(this).attr('data_hander'),
            where=$(this).attr('data_where').split(','),
            data=AjaxRemoteGetData[func].apply(this,where),
            select=$(this);
        $(this).find('option').remove();
        $.each(data,function(i,arr){
            var ele=$('<option>'+arr+'</option>');
            select.append(ele);
        })
    })
    selects.eq(0).triggerHandler('create');


}
// 返回顶部
$.fn.Uiback=function(){
    var ui=$(this);
    ui.css({'opacity':0});
    $(window).on('scroll',function(){
        var height=document.documentElement.scrollTop;
        ui.css({'opacity':0,'transition':'0.5s'});

        if(height>100){
            ui.css({'opacity':1});

        }
    })
    ui.on('click',function(){
        document.documentElement.scrollTop=0;
    })
}
// tab选项卡
$.fn.changeMenu=function(){
    var ui=$(this);
    $('.tab_left_leval1_item',ui).on('click',function(){
        var index=$('.tab_left_leval1_item').index(this);
        $('.tab_left_leval1_item').removeClass('focus').eq(index).addClass('focus');
        $('.tab_left_wrap').hide().eq(index).show();
    });
    $('.tab_left_leval2_item',ui).on('click',function(){
        var index=$('.tab_left_leval2_item').index(this);
        $('.tab_left_leval2_item').removeClass('focus').eq(index).addClass('focus');
        $('.tab_left_hospital').hide().eq(index).show();
        console.log($('.tab_left_hospital'));
    })
}









$(function(){
    $('.head-right').UiSearch();
    $('.banner').UiChangeImg();
    $('.banner_search_top').UiSelect();
    $('.returntop').Uiback();
    $('.tab_left').changeMenu();
})
