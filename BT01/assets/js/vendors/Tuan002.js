$.fn.inner_float = function(options){

	//Value of Top
	var top='20px';
	//Value of Bottom
	var bottom='20px';
    var defaults = {

        space : '50px'

    } 

    //Ghi đè lên options default của plugin

    //Nếu không truyền vào options thì mặc định lấy options defaults

    var options = $.extend(defaults, options); 

    //Lặp qua các selector dùng plugin
    var boxH = $('.right-box');
	var almostShow = $('#almost-show');
    return this.each(function(){
        var that = $(this);
        
        
        $(window).scroll(function() {
        	if ($(this).scrollTop()<parseInt(boxH.css('top'))-(parseInt(options.space)-parseInt(top))) {
        		// console.log('GD1');
        		that.addClass('GD1');
        		that.removeClass('GD2');
        		that.removeClass('GD3');
        		// that.css('top', options.space);
        		that.css('top', top);
        		that.css('width', '100%');
        	}
        	else
        	{
        		if ($(this).scrollTop()<parseInt(boxH.css('top'))+parseInt(boxH.height())- parseInt(almostShow.height())-parseInt(options.space)-parseInt(bottom)) {

        			// console.log('GD2');
        			that.removeClass('GD1');
        			that.removeClass('GD3');
        			that.addClass('GD2');
        			that.css('top', options.space);
        			that.css('width', boxH.innerWidth());
        		}
        		else
        		{
        			// console.log('GD3');
        			that.removeClass('GD1');
        			that.removeClass('GD2');
        			that.addClass('GD3');
        			that.css('bottom', bottom);
        			that.css('top', '');
        			that.css('width', '100%');

        		}
        		
        	}
        	
        });


    });

};
