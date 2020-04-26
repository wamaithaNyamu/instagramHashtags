$(document).ready(function(){
    let hashtag;
  $("#submit").click(function(){
      hashtag = $("#hashtag").val();
      $.post("/", {hashtag:hashtag},function(){
          $('#form').each(function(){
              this.reset();

         });
       
      });
   
      $("#results").append("All related hashtags to:" + hashtag);
     $("#loader").show()
     
  });
  $('#hashtag').keypress(function (e) {
    if (e.which == 13) {
        hashtag = $("#hashtag").val();
        $.post("/", {hashtag:hashtag},function(){
            $('#form').each(function(){
                this.reset();
  
           });
         
        });
     
        $("#results").append("All related hashtags to:" + hashtag);
       $(".loader").css({ "display": "inline-flex" });
             return false;    //<---- Add this line
    }
  });
});

//REMAINING FRONT END
//order according to number of people using the hashtag
//copy hashtags they want
//max 30 hashtags
//copy to clipboard