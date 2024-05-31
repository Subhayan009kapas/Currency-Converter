let dropdown=document.querySelectorAll("select");

// for dropdown option
for(let select of dropdown){
          for(let currcode in countryList){
                    let  newele=document.createElement("option");
                    newele.innerText=currcode;
                    console.log(newele)

                    if(select.name=="from" && currcode=="USD"){
                              newele.selected="selected"; // initiallly USD wiilbe selected
                    }
                    else  if(select.name=="to" && currcode=="INR"){
                              newele.selected="selected";  // initilally INR will be selected
                    }

                    select.append(newele);

          }
          select.addEventListener("change",(evt)=>{
            // console.log(evt.target);  // print  from or to selet option
            flagupdate(evt.target);

          })
}

// for update the flag

const  flagupdate=(element)=>{
      let currcode =element.value;
      let countrycode=countryList[currcode];
      let new_src=`https://flagsapi.com/${countrycode}/flat/64.png`;
      let img =element.parentElement.querySelector("img");
      img.src=new_src;

}
// button

let amount=document.querySelector(".amount input");
let btn=document.querySelector("button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");

btn.addEventListener("click" ,async(evt)=>{
      evt.preventDefault();

      if(amount.value=="" ||  amount.value<0){
            amount.value=1;
      }
      console.log(amount.value);
      console.log(fromCurr.value , toCurr.value);

      let url=`https://v6.exchangerate-api.com/v6/3f28c1827660e47be46451ff/latest/${fromCurr.value.toLowerCase()}`;
      let response=await  fetch(url);
      let data=await response.json();
      console.log(data);
   let rate=data.conversion_rates[toCurr.value];  // point to be noted
   let final_amount=amount.value*rate;
   console.log(final_amount);
   msg.innerText=`${amount.value} ${fromCurr.value}  = ${final_amount} ${toCurr.value}`;
   msg.style.background="black";
   msg.style.color="white";
   msg.style.marginTop="10px";


})