function goTo(){
  let input = document.getElementById("search_value").value;
  console.log(input);

  //get a tag
  let a = document.getElementById("submit")
  let localhost = "http://127.0.0.1:3000/";
  let url = localhost + input
  console.log(url)
  a.href = url
 
}