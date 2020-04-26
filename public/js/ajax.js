$(document).ready(function(){
    let hashtag;
  $("#submit").click(function(){
      hashtag = $("#hashtag").val();
      $.post("/", {hashtag:hashtag},function(){
          $('#form').each(function(){
              this.reset();

          });
     // $('#results').empty();

      });
      $("#results").append("All related hashtags to:" + hashtag);
     $("#loader").show()
     
  });
});
