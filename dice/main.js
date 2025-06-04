const keep = document.querySelector("#keep")
const roll = document.querySelector("#roll")
const submitbutton = document.querySelector("#submitbutton")

const errorwindow = document.querySelector("#errorwindow")
const points = document.querySelector("#points")

let game = false
let submitedCount = 0

let pointsval = 0

points.textContent = pointsval

const checkForPossibleMoves = (values) => {
    let valid = false;
    let valuecount = [0,0,0,0,0,0]
    if(values) {
        values.forEach(el=>{
            valuecount[parseInt(el)-1]++
        })
        valuecount.forEach((el,i)=>{
            if(i+1!=1 && i+1!=5) {
                if(parseInt(el)>=3) {
                    valid = true
                }
            } else {
                if(parseInt(el)>=1) {
                    valid = true
                }
            }
        })
    }
    return valid
}

submitbutton.addEventListener("click",()=>{ 
    errorwindow.textContent = ""
    if(!game) {
        game = true
        let values = null
        while(!checkForPossibleMoves(values)) {
            roll.innerHTML = ""
            console.log("a")
            values = []
            for (let i = 0; i < 6; i++){
                const dice = document.createElement("div")
                dice.className += "dice"
                dice.textContent = Math.floor(Math.random()*6+1)
                values.push(parseInt(dice.textContent))
                dice.addEventListener("click",()=>{
                    dice.classList.toggle("selected")
                })
                roll.appendChild(dice)
            }
        }
    } else {
        if(document.querySelectorAll(".selected").length) {
            //Pattern matcher
            let values = []
            let valuecount = [0,0,0,0,0,0]
            document.querySelectorAll(".selected").forEach(el=>{
                values.push(el.textContent)
            })
            values.forEach(el=>{
                valuecount[parseInt(el)-1]++
            })
            valuecount.forEach((el,i)=>{
                if(i+1!=1 && i+1!=5) {
                    if(parseInt(el)<3&&parseInt(el)>0) {
                        valuecount = null
                    }
                }
            })
            //Main logic
            if(valuecount) {
                valuecount.forEach((el,i)=>{
                    if(parseInt(el)>0) {
                        switch (i+1) {
                        case 1:
                            if(parseInt(el)>=3) {
                                pointsval+=1000*(parseInt(el)-2)
                            } else {
                                pointsval+=100*parseInt(el)
                            }
                            break;
                        case 5:
                            if(parseInt(el)>=3) {
                                pointsval+=500*(parseInt(el)-2)
                            } else {
                                pointsval+=50*parseInt(el)
                            }
                            break;
                        default:
                            pointsval+=(i+1)*100*(parseInt(el)-2)
                            break;
                        }   
                    }
                })
                points.textContent = pointsval
                document.querySelectorAll(".selected").forEach(el=>{
                    el.classList.toggle("selected")
                    keep.appendChild(el)
                })
                if(!document.querySelectorAll("#roll .dice").length) {
                    document.querySelectorAll(".dice").forEach(el=>{
                        roll.appendChild(el)
                    }) 
                }
                let newValues = []
                document.querySelectorAll("#roll .dice").forEach(el=>{
                    el.textContent = Math.floor(Math.random()*6+1)
                    newValues.push(parseInt(el.textContent))
                })
                if(!checkForPossibleMoves(newValues)) {
                    errorwindow.textContent = "No possible moves"
                    setTimeout(() => {
                        location.reload()
                    }, 5000);
                }
            } else {
                errorwindow.textContent = "Numbers are not valid"
            } 
        } else {
            errorwindow.textContent = "No selected dices"
        }
    }
})