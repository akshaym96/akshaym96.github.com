$(document).ready( function() {
  var SPACE = " ";
  var DOT = ".";

  var quoteContent = "";
  var quoteAuthor = "";
  var randomQuoteUrl = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

  var faQuoteStartRight = "<i class='fa fa-quote-right' aria-hidden='true'></i>";
  var faQuoteStartLeft = "<i class='fa fa-quote-left' aria-hidden='true'></i>";
 
	function cleanupQuoteContent (quoteContent) {
    quoteContent = quoteContent
      .replace("<p>","") // removes <p> attribute
      .replace("</p>","") // removes </p> attribute
      .replace("\n",""); // removes newline char
    quoteContent = quoteContent.substring(0, quoteContent.length - 1); // removes 1 unnecessary space from the very end

    return quoteContent;
  }
	
	function requestQuote () {
    
    $.ajax( {
      url: randomQuoteUrl,
      success: function(data) {

        var firstQuote = data.shift();
     
          quoteContent = cleanupQuoteContent(firstQuote.content);

          var quoteContent_ = faQuoteStartLeft + SPACE + quoteContent + SPACE + faQuoteStartRight; // adding start and end quote marks to quote content

          $(".quote-content-row").html(quoteContent_);
          $(".quote-author").html(firstQuote.title);

          quoteAuthor = firstQuote.title;
        
      },
      cache: false
    });
  }
	
	requestQuote();
	
	
	// Logo
	var $logo 	= $('#logo');
	 if (location.href.indexOf("#") != -1) {
        if(location.href.substr(location.href.indexOf("#"))!='#about'){
        	$logo.show();
        }
    }
    
	// Show logo 
	$('#tab-container .tab a').click(function() {
	  $logo.slideDown('slow');
	});
	// Hide logo
	$('#tab-about').click(function() {
	  $logo.slideUp('slow');
	});	
function animMeter(){
    $(".meter > span").each(function() {
                $(this)
                    .data("origWidth", $(this).width())
                    .width(0)
                    .animate({
                        width: $(this).data("origWidth")
                    }, 1200);
            });
}
animMeter();

      $('#tab-container').easytabs({
        animate			: true,
        updateHash		: true,
        transitionIn	: 'slideDown',
        transitionOut	: 'slideUp',
        animationSpeed	: 600,
        tabActiveClass	: 'active'}).bind('easytabs:midTransition', function(event, $clicked, $targetPanel){
            if($targetPanel.selector=='#resume'){
                    animMeter();
            }
        });
    });
