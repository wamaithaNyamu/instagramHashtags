$(document).ready(function(){
    let hashtag;
  $("#submit").click(function(){
    console.log("retirieving results")
      hashtag = $("#hashtag").val();
      $.post("/", {hashtag:hashtag},function(){
          $('#form').each(function(){
              this.reset();

         });
       
      });
   
      $(".loader").css({ "display": "inline-flex" });
      $("#everythingInDb").css({ "display": "none" });
     
  });
  $('#hashtag').keypress(function (e) {
    if (e.which == 13) {
        hashtag = $("#hashtag").val();
        $.post("/", {hashtag:hashtag},function(){
            $('#form').each(function(){
                this.reset();
  
           });
         
        });
     
       $(".loader").css({ "display": "inline-flex" });
       $("#everythingInDb").css({ "display": "none" });

             return false;    //<---- Add this line
    }
  });
});
