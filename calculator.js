 const screen=document.querySelector(".screen");

 const buttons=document.querySelectorAll("button");

 buttons.forEach(button =>{
     button.addEventListener("click",() => {
         const value= button.innerText;
   

 if(value === "AC"){
     screen.value = "";
 }

 else if(value === "->"){
     screen.value = screen.value.slice(0,-1);
 }

 else if(value === "="){
try{
     screen.value = eval(screen.value);
 }catch {
     screen.value = "Error";
 }
}

 else if (value === "x") {
     screen.value += "*";
}

        else {
            screen.value += value;
        }
    });
});
