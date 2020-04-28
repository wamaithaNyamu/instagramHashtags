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



// function getCopied(){
//   var copyText = document.getElementsByClassName("copyText").textContent;
//   console.log("the value:", copyText);
//       // Or...
//       //var elems = document.getElementsByClassName("hl7MsgBox");
//       //var copyText = elems[0].textContent;
  
//       copyToClipBoard(copyText);
// }

// // REMAINING FRONT END
// $(document).ready(function(){
//   //POST
//   $('#form').on('submit' , function(event){
//     event.preventDefault();
//     let  hashtag = $("#hashtag").val();
//     $.ajax({
//         url:'/',
//         method:'POST',
//         contentType: 'application/json',
//         data:JSON.stringify({hashtag}),
//         success: function(response){
//           console.log('response in the post ajax',response);
//         $("#try").append("Getting hashtags related to : "+ JSON.stringify(response));

//         },
//         error:function(e){
//           alert("Error");
//           console.log("an error occured at your post ajax", e);
//         }
        
//     });
       
//   });
   
//       //GET

//       // $('#submit').on('click', function(){
//       //   $.ajax({
//       //     url: '/',
//       //     contentType: 'application/json',
//       //     success: function(response){
//       //       response.hashtag.forEach(function(hash){
//       //           $('#results').append(hash.hashtag, hash.followers, hash.relatedHashtags);
//       //       });
//       //     };

//       //   });
//       // });

//     });

