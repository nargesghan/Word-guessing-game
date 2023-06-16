function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }
  

const boxes=document.querySelectorAll(".letter");

async function checkword(word) {
  return fetch('https://words.dev-apis.com/validate-word', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "word": word })
  })
    .then(response => response.json())
    .then(response => {
     // console.log(response);
      if (response.validWord == true) {
        return commonCharacters(answer, word);
      }
      else {
        
        return 'FFFFFF';
      }
    });
}
let answer="";
fetch("https://words.dev-apis.com/word-of-the-day")
  .then((response) => response.json())
  .then((json) => {//.log(json);
answer=json.word;

});

const commonCharacters = function(string1, string2) {
  let duplicateCharacter = '';
  for (let i = 0; i < string1.length; i += 1) {
    if (duplicateCharacter.indexOf(string1[i]) === -1) {//skip characters you have already encountered!
      if (string2.indexOf(string1[i]) !== -1) {//string2 must have string1[i] character
        duplicateCharacter += string1[i].toLowerCase();
        if(string2.indexOf(string1[i])===i){
        duplicateCharacter=duplicateCharacter.slice(0, -1) +duplicateCharacter.slice(-1).toUpperCase();
        }
      }
    }
  }
  return duplicateCharacter;
};

let word="";

let lastBoxIndex=0;
document
  .onkeydown=("keydown", function (event) {
  //every time we press a key on keyboard, this function will be called
  if(event.key=='Enter' && word.length==5){//if one word is entered,it checks that word
    
    let Mypromise=checkword(word);
    Mypromise.then(isword => {
      //console.log(isword);
      if (isword==='FFFFFF'){//if is not word border will blink
        for(j=lastBoxIndex;j>lastBoxIndex-5;j--){
          boxes[j].classList.add('blinking');

        }
      }else if(answer.toUpperCase()===isword){//correct answer
        for(j=lastBoxIndex;j>lastBoxIndex-5;j--){
        boxes[j].style.backgroundColor='green';
        document.querySelector('h1').classList.add('change-color');
        alert('correct word');
        word="";
        
        }
      }
      else{
        for(j=lastBoxIndex;j>lastBoxIndex-5;j--){
          if(isword.indexOf(boxes[j].innerText)!=-1){//if innertext of boxes[j] is in isword(obviously in uppercase)
            boxes[j].style.backgroundColor='green';
            word="";
            
          }if(isword.indexOf(boxes[j].innerText.toLowerCase())!=-1){
            boxes[j].style.backgroundColor='#f96d00';
            word='';
            
          }
        }
      }
    });

   
            
  }
  if(event.key==='Backspace'){
    if(lastBoxIndex%5==4 && !boxes[lastBoxIndex].classList.contains('blinking') ){

    }
  else{
   boxes[lastBoxIndex].innerText="";
   if(boxes[lastBoxIndex].classList.contains('blinking')){
    for(let t=0;t<5;t++){
      boxes[lastBoxIndex-t].classList.remove('blinking');
    }
   }
   word=word.slice(0,-1);
   //console.log(word);
   if (lastBoxIndex!=0){lastBoxIndex-=1};
  }}

  if (isLetter(event.key) && word.length<5 && !(boxes[lastBoxIndex].classList.contains('blinking'))) {//It checks that we have entered the letters
    for(let i=0;i<boxes.length;i++){
    
        if(boxes[i].innerText===""){
            boxes[i].innerText=event.key;//puts this letter into the last empty box
            word+=event.key;//add this letter to the current word
            lastBoxIndex=i;//this help us in backspace key
           break;
        }
       
        }
  }
});