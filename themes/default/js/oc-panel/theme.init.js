function init_panel()
{
    if ($("textarea[name=description]").data('editor')=='html')
    {
        $("#formorm_description, textarea[name=description], textarea[name=email_purchase_notes], .cf_textarea_fields").summernote({
            height: "450",
        });
    }
	else if ($( "#crud-post" ).length || $( "#crud-category" ).length) {
		$("#formorm_description").summernote({
            height: "350",
        });
	}
    else
    {
        $('#formorm_description, textarea[name=description], textarea[name=email_purchase_notes], .cf_textarea_fields').addClass('col-md-6').sceditorBBCodePlugin({
            toolbar: "bold,italic,underline,strike|left,center,right,justify|" +
            "bulletlist,orderedlist|link,unlink,image,youtube|source",
            resizeEnabled: "true",
            emoticonsEnabled: "false",
            emoticonsCompat: "false",
            enablePasteFiltering: "true"});
    }
    
	// paste plain text in sceditor
	$(".sceditor-container iframe").contents().find("body").bind('paste', function(e) {
		e.preventDefault();
		var text = (e.originalEvent || e).clipboardData.getData('text/plain');
		$(".sceditor-container iframe")[0].contentWindow.document.execCommand('insertText', false, text);
	});	

    $('.tips').popover();

    $("select").chosen({
        no_results_text: getChosenLocalization("no_results_text"),
        placeholder_text_multiple: getChosenLocalization("placeholder_text_multiple"),
        placeholder_text_single: getChosenLocalization("placeholder_text_single")
    });
    $('select').each(function(){
        if($(this).hasClass('disable-chosen')){
            $(this).chosen('destroy');      
        } 
    });
    
    $('.radio > input:checked').parentsUntil('div .accordion').addClass('in');
    
    $('select[name="locale_select"]').change(function()
    {
         $('#locale_form').submit();
    });
    $('select[name="type"]').change(function()
    {
        // alert($(this).val());
        if($(this).val() == 'email') 
            $('#from_email').parent().parent().css('display','block');
        else
            $('#from_email').parent().parent().css('display','none');
    });

    // form-control class should not be applied on checkbox or radio
    $('input').each(function(){
        if(!$(this).hasClass('form-control')){
            if($(this).attr('type') != "checkbox" && $(this).attr('type') != "radio"){
                $(this).addClass('form-control');
            }
        }
        
    });

    // formorm forms are dynamically generated by kohana, so this is fix for selects
    $('select').each(function(){
        if(!$(this).hasClass('form-control')){
            $(this).addClass('form-control');
            $(this).chosen('destroy').chosen({
					no_results_text: getChosenLocalization("no_results_text"),
					placeholder_text_multiple: getChosenLocalization("placeholder_text_multiple"),
					placeholder_text_single: getChosenLocalization("placeholder_text_single")});
				}
    });

    $('.btn-licenses').click(function(){

        id_order = '#'+$(this).attr('data-licenses');
        if($(id_order).hasClass('hide'))
            $(id_order).removeClass('hide');
        else
            $(id_order).addClass('hide');
    });

	// Menu icon picker
	$(".icon-picker, input[name='formorm[icon]']").iconPicker();
	
	// Load google api
	$.getScript("https://www.google.com/jsapi");
	
	// Call open_eshop.init function only if exist
	if (typeof open_eshop !== 'undefined' && $.isFunction(open_eshop.init)) {open_eshop.init(open_eshop);}

}

$(function (){
    init_panel();
});


//from https://github.com/peachananr/loading-bar
//I have recoded it a bit since uses a loop each, which is not convenient for me at all
$(function(){
    $("body").on( "click", "a.ajax-load",function(e){
        e.preventDefault(); 
        $("html,body").scrollTop(0);
        button = $(this);
        //get the link location that was clicked
        pageurl = button.attr('href');
        button.css('cursor','wait');

        //to get the ajax content and display in div with id 'content'
        $.ajax({
            url:updateURLParameter(pageurl,'rel','ajax'),
            beforeSend: function() {
                                        if ($("#loadingbar").length === 0) {
                                            $("body").append("<div id='loadingbar'></div>")
                                            $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));
                                            $("#loadingbar").width((50 + Math.random() * 30) + "%");
                                        }
                                    }
                                    }).always(function() {
                                        $("#loadingbar").width("101%").delay(200).fadeOut(400, function() {
                                        $(this).remove();});
                                    }).done(function(data) {
                                        document.title = button.attr('title');
                                        if ( history.replaceState ) history.pushState( {}, document.title, pageurl );
                                        $('.br').removeClass('active');
                                        button.closest('.br').addClass('active');
                                        button.css('cursor','');
                                        $("#content").html(data);
                                        init_panel();});

        return false;  
    });
    
});

/* the below code is to override back button to get the ajax content without reload*/
$(window).bind('popstate', function() {
    $.ajax({url:updateURLParameter(location.pathname,'rel','ajax'),success: function(data){
        $('#content').html(data);
    }});
});


function setCookie(c_name,value,exdays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : ";path=/; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

/**
 * http://stackoverflow.com/a/10997390/11236
 */
function updateURLParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}
