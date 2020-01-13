var ac = document.getElementById('ac');
var equalTo = document.getElementById('=');
var decimal = document.getElementById('dot');
var numbers = document.querySelectorAll('.num');
var operators = document.querySelectorAll('.ope');
var previousSpace = document.querySelector('.previous');
var del = document.getElementById('del');

numbers = Array.from(numbers);
operators = Array.from(operators);

var displaySpace = document.querySelector('.value-container');

var displayValue = '0';
if (displayValue === "0") {}
var pendingVal;
evalArray = [];
del.onclick = () => {
    let lengthOfTheDisplay = displayValue.length;
    displayValue = displayValue.slice(0, lengthOfTheDisplay - 1);
    displaySpace.textContent = displayValue;
    if (displayValue === "")
        displayValue = '0';
    displaySpace.textContent = displayValue;
}
displaySpace.textContent = displayValue;

var updateValue = (e) => {
    var btnText = e.target.innerText;

    if (displayValue === '0')
        displayValue = '';

    displayValue += btnText;
    displaySpace.textContent = displayValue;
    return btnText;
}

numbers.forEach(number => {
    number.addEventListener('click', updateValue, false);
});

ac.onclick = (e) => {
    displayValue = '0';
    pendingDis = undefined;
    evalArray = [];
    displaySpace.textContent = displayValue;
    previousSpace.textContent = "";
};
decimal.onclick = () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        displaySpace.textContent = displayValue;
    }
};

var performOperation = (e) => {
    var sign = e.target.innerText;
    switch (sign) {
        case '+':
            pendingVal = displayValue;
            var current = pendingVal + sign;
            previousSpace.textContent = current;
            displayValue = "0";
            displaySpace.textContent = displayValue;
            evalArray.push(pendingVal);
            evalArray.push('+');
            break;
        case '-':
            pendingVal = displayValue;
            var current = pendingVal + sign;
            previousSpace.textContent = current;
            displayValue = '0';
            displaySpace.textContent = displayValue;
            evalArray.push(pendingVal);
            evalArray.push('-');
            break;
        case '÷':
            pendingVal = displayValue;
            var current = pendingVal + sign;
            previousSpace.textContent = current;
            displayValue = '0';
            displaySpace.textContent = displayValue;
            evalArray.push(pendingVal);
            evalArray.push('/');
            break;
        case 'x':
            pendingVal = displayValue;
            var current = pendingVal + sign;
            previousSpace.textContent = current;
            displayValue = '0';
            displaySpace.textContent = displayValue;
            evalArray.push(pendingVal);
            evalArray.push('*');
            break;
        case '=':
            previousSpace.textContent = current;
            evalArray.push(displayValue);
            var evaluation = eval(evalArray.join(' '));
            displayValue = evaluation;
            displaySpace.textContent = displayValue;
            //previousSpace.textContent = displayValue;
            evalArray = [];
            if (displaySpace.textContent === '0') {
                displayValue = "";
            } else if (displaySpace.textContent !== '0') {
                console.log('hey');
                decimal.onclick = () => {
                    if (!displaySpace.textContent.includes('.')) {
                        displayValue += '.';
                        displaySpace.textContent = displayValue;
                    }
                };
            }
            break;
    }
}

function emptyOperator() {
    if (displayValue === '0') {
        return false;
    }
}

operators.forEach(operator => {
    operator.addEventListener('click', performOperation, false);
})
window.addEventListener('load', () => {
    (function showBa() {
        bar.classList.add('progress');
    })();
})
var bar = document.querySelector('.bar');
var h = document.querySelectorAll('h5');
var container = document.querySelector('.container');

container.addEventListener('load', showBar);

var showBar = setTimeout(loading, 1470);

function loading() {
    var loaderContainer = document.querySelector('.loader-container');
    loaderContainer.classList.add('opener');
    setTimeout(() => {
        loaderContainer.style.display = 'none';
        container.classList.add('app');
        h.forEach(h5 => {
            h5.style.opacity = 1;
        })
    }, 500)

}
var loader = document.querySelector('.loader');



var cells = document.querySelectorAll('.cells');
var overlay = document.querySelectorAll('.ripple');




// console.log(cells);
// console.log(overlay);
cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
        var currrentCell = e.target;
        var h5 = cell.children[0];
        console.log(h5);
        if (currrentCell == h5) {
            var currrentCell = h5.parentElement;
            console.log(currrentCell);
            ripple(currrentCell, e);
            return;
        }
        ripple(currrentCell, e);
    })
});

function ripple(targetElement, e) {
    var circle = document.createElement('div');
    targetElement.appendChild(circle);

    var d = Math.max(targetElement.clientWidth, targetElement.clientHeight);
    circle.style.width = circle.style.height = d + 'px';
    circle.style.left = e.offsetX - d / 2 + 'px';
    circle.style.top = e.offsetY - d / 2 + 'px';
    circle.classList.add('ripple');
    setTimeout(() => {
        targetElement.removeChild(circle);
    }, 600);
}
