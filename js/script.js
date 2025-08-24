const container = document.querySelector('.container');
const numberContainer = document.querySelector('.your-numbers');
const output = document.querySelector('.output');
const ulFirst = document.querySelectorAll('.ul-buttons-first');
const ulSecond = document.querySelectorAll('.ul-buttons-second-inner');
const yourNumbers = document.querySelector('.your-numbers');
const arr = [];
let answers = [];
let text = '';
let ctr = 0;


document.addEventListener('DOMContentLoaded', event => {
    for(let i=9; i>=0; i--){
        const listItem = document.createElement('li');
        listItem.textContent = i;
        listItem.classList.add(`num${i}`);
        arr.push(listItem);
        numberContainer.appendChild(listItem);
    }
});

ulFirst.forEach(element => {
    element.addEventListener('click', event => {
        event.preventDefault();
        const topButtons = event.target.textContent;

        if(topButtons === 'AC'){
            clearOutput();
            answers = [];
            ctr = 0;
        }else if(topButtons === '.'){
            text += topButtons;
        }else if(topButtons === '+/-'){
            let new_arr = String(text).split('');

            if(new_arr[0] === '-'){
                new_arr[0] = '+';
                text = new_arr.join('');
            }else if(new_arr[0] === '+'){
                new_arr[0] = '-';
                text = new_arr.join('');
            }else {
                text = `-${text}`;
            }
        }else if(topButtons === '←'){
            text = String(text).slice(0,-1);
            output.textContent = text;
        }
        output.textContent = text;
    });
});

ulSecond.forEach(element => {
    element.addEventListener('click', event => {
        event.preventDefault();

        if(ctr === 0){
            setAnswer(text);
            text = event.target.textContent;
            answers[ctr++] = text; 
        }else if(ctr === 2 && event.target.textContent === '='){
            setAnswer(text);
            text = mathOperation(answers[0], answers[1], answers[2]);
            output.textContent = text;
            console.log(text);
            ctr = 0;
            answers = [];
        }

        if(event.target.textContent === '=') {
        }

        output.textContent = text;
    });
});

yourNumbers.addEventListener('click', event => {
    event.preventDefault();
    
    if(ctr === 2 && output.textContent === answers[1]){
        clearOutput();
    }
    text += event.target.textContent;
    output.textContent = text;
});

function mathOperation(fnum, ops, snum){
    let answer = 0;
    const firstNum = parseFloat(fnum);
    const secondNum = parseFloat(snum);
    switch(ops){
        case '+':
            answer = firstNum + secondNum;
            break;
        case '-':
            answer = firstNum - secondNum;
            break;
        case '×':
            answer = firstNum * secondNum;
            break;
        case '÷':
            answer = firstNum / secondNum;
            answer = answer.toFixed(3);
            break;
        default:
            answer = fnum;
            console.log(`first: ${firstN} ops: ${ops} second: ${secondNum}`);
    }
    return answer;
}
function clearOutput(){
    text = '';
    output.textContent = '';
}

function setAnswer(str){
    answers[ctr++] = str;
    clearOutput();
}
