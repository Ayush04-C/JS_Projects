const billInput = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.tip-percent-btn');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('num-people');
const tipAmountDisplay = document.getElementById('tip-amount-display');
const totalAmountDisplay = document.getElementById('total-amount-display');
const resetButton = document.getElementById('reset-button');

// console.log('Bill Input Element:', billInput);
// console.log('Tip Buttons NodeList:', tipButtons);
// console.log('Custom Tip Input Element:', customTipInput);
// console.log('People Input Element:', peopleInput);
// console.log('Tip Amount Display Element:', tipAmountDisplay);
// console.log('Total Amount Display Element:', totalAmountDisplay);
// console.log('Reset Button Element:', resetButton);

billInput.addEventListener('input', calculatorTip);

tipButtons.forEach(function(button){
    button.addEventListener('click', (event) => {
        const clickButton = event.target;
        const tipPercent = clickButton.dataset.tip;

        tipButtons.forEach(btn => btn.classList.remove('active'));
        clickButton.classList.add('active');

        customTipInput.value = '';
        console.log('Tip Button clicked:', clickButton.textContent);

        calculatorTip()
    });
});

customTipInput.addEventListener('input', function(event){
        const customTipValue = event.target.value;
        tipButtons.forEach(btn => btn.classList.remove('active'));

        console.log('Custom Tip Input Value:', customTipValue);
        calculatorTip();
});

peopleInput.addEventListener('input', calculatorTip);


if(resetButton){
    resetButton.addEventListener('click', () => {
        console.log('Reset Button clicked');
        resetCalculator();
    });
} else {
    console.error("Reset Button Element not found.");
}

function calculatorTip(){
    const billValueStr = billInput.value;
    const peopleValueStr = peopleInput.value;
    const customTipValueStr = customTipInput.value;

    let selectedButtonTipStr = null;
    const activeButton = document.querySelector('.tip-percent-btn.active');

    if(activeButton){
        selectedButtonTipStr = activeButton.dataset.tip;
    }

    // console.log("Raw Input - Bill:", billValueStr);
    // console.log("Raw Input - People:", peopleValueStr);
    // console.log("Raw Input - Custom Tip:", customTipValueStr);
    // console.log("Raw Input - Selected Button Tip:", selectedButtonTipStr);

    const billAmount = parseFloat(billValueStr);
    const numberOfPeople = parseFloat(peopleValueStr);
    const customTipPercent = parseFloat(customTipValueStr);
    const selectedButtonTipPercent = selectedButtonTipStr ? parseFloat(selectedButtonTipStr) : null;

    const isBillValid = !isNaN(billAmount) && billAmount >= 0;
    // console.log("Is Bill Valid:", isBillValid);
    let isTipValid = false;
    let isPeopleValid = false;
    const isCustomTipInputValid = customTipValueStr === '' || !isNaN(customTipPercent) && customTipInput >= 0;
    
    let actualTipPercent = 0;

    if(customTipValueStr !== '' && !isNaN(customTipPercent) && customTipPercent >= 0){
        actualTipPercent = customTipPercent;
        console.log("Using Custom Tip Percent:", actualTipPercent);
    }
    else if(customTipValueStr === ''){
        const activeButton = document.querySelector('.tip-percent-btn.active');
        if(activeButton){
            const selectedButtonTipPercent = parseFloat(activeButton.dataset.tip);
            if(!isNaN(selectedButtonTipPercent) && selectedButtonTipPercent >= 0){
                actualTipPercent = selectedButtonTipPercent;
            }
        }
    }
    else{
        console.log("No valid tip percent selected.");
    }

    isTipValid = !isNaN(actualTipPercent) && actualTipPercent >=0;
    

    let totalTipAmount = 0;
    if (isBillValid && isTipValid){
        totalTipAmount  = billAmount * (actualTipPercent / 100);
    }

    const totalBillAmount = billAmount + totalTipAmount;

    let tipAmountPerPerson = 0;
    let totalAmountPerPerson = 0;

    isPeopleValid = !isNaN(numberOfPeople) && numberOfPeople > 0 && Number.isInteger(numberOfPeople);
    console.log(isPeopleValid)

    if(isBillValid && isTipValid && isPeopleValid){
        if(!isNaN(totalBillAmount)){
            tipAmountPerPerson = totalTipAmount / numberOfPeople;
            totalAmountPerPerson = totalBillAmount / numberOfPeople;
            console.log("Calculating amounts per person:");
        }
    }
    else{
        tipAmountPerPerson = 0;
        totalAmountPerPerson = 0;
    }

    const formattedTipAmount = tipAmountPerPerson.toFixed(2);
    const formattedTotalAmount = totalAmountPerPerson.toFixed(2);

    const displayTipAmount = `$${formattedTipAmount}`;
    const displayTotalAmount = `$${formattedTotalAmount}`;

    if(tipAmountDisplay){
        tipAmountDisplay.textContent = displayTipAmount;
    }
    else{
        console.error("Tip Amount Display Element not found.");
    }

    if(totalAmountDisplay){
        totalAmountDisplay.textContent = displayTotalAmount;
    }
    else{
        console.error("Total Amount Display Element not found.");
    }


    if(billInput){
        billInput.classList.toggle('error', !isBillValid);
    }
    if(peopleInput){
        peopleInput.classList.toggle('error', !isPeopleValid);
    }
    if(customTipInput){
        customTipInput.classList.toggle('error', !isCustomTipInputValid);
    }
}



function resetCalculator(){
        if(billInput){
            billInput.value = '';
        }
        if (customTipInput){
            customTipInput.value = ' ';
        }
        if(tipButtons && tipButtons.length > 0){
            tipButtons.forEach(btns => btns.classList.remove('active'));
        }
        if(peopleInput){
            peopleInput.value = " ";
        }
        if(tipAmountDisplay){
            tipAmountDisplay.textContent = "$0.00";
        }
        if(totalAmountDisplay){
            totalAmountDisplay.textContent = "$0.00";
        }
        if(billInput){
            billInput.classList.remove('error');
        }
        if(peopleInput){
            peopleInput.classList.remove('error');
        }
        if(customTipInput){
            customTipInput.classList.remove('error');
        }
}


document.addEventListener('DOMContentLoaded', () => {
    calculatorTip();
});