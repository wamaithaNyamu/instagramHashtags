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
// $(document).ready(function(){
//   //POST
//   $('#form').on('submit' , function(event){
//     event.preventDefault();
//     let  hashtag = $("#hashtag");
//     $.ajax({
//         url:'/submit',
//         method:'POST',
//         contentType: 'application/json',
//         data:JSON.stringify({name: hashtag.val()}),
//         success: function(response){
//           console.log('response in the post ajax',response);
//           hashtag.val('');
//           $('#submit').click();
//         }
//     });
       
//   });
   
//       //GET

//       $('#submit').on('click', function(){
//         $.ajax({
//           url: '/',
//           contentType: 'application/json',
//           success: function(response){
//             response.hashtag.forEach(function(hash){
//                 $('#results').append(hash.hashtag, hash.followers, hash.relatedHashtags);
//             });
//           };

//         });
//       });

//     });

