//LOAN CALCULATOR

document.querySelector('#loan-form').addEventListener('submit', calculateLoan);

function calculateLoan (e) {
    //SELECT DOM INPUTS
    const amount = parseFloat(document.querySelector('#amount').value);
    const annualInterest = parseFloat(document.querySelector('#interest').value);
    const years = parseFloat(document.querySelector('#years').value);


    //INIT VARIABLES
    let monthlyPayment;
    let totalPayment;
    let totalInterest;
    let monthlyInterest;
    let installments;
    let discountFactor;

    //CLEAR ERROR IF PRESENT
    if (document.querySelector('.warning')) {
        clearError();
    }


    //LOAN FORMULA
    monthlyInterest = ( annualInterest / 100 ) / 12;
    installments = years * 12;
    //calculate Discount Factor
    discountFactor = (Math.pow(1 + monthlyInterest, installments) - 1) / (monthlyInterest * Math.pow(1 + monthlyInterest, installments));

    //MONTHLY PAYMENT
    monthlyPayment = amount / discountFactor;

    //TOTAL PAYMENT
    totalPayment = monthlyPayment * installments;

    //TOTAL INTEREST PAYABLE
    totalInterest = totalPayment - amount;

    if (isFinite(monthlyPayment)) {
        //SHOW LOADING
        document.querySelector('#loading').style.display = 'block';
        //HIDE RESULTS
        document.querySelector('#results').style.display = 'none';
        setTimeout(showResults, 1000);

        //SEND OUTPUTS TO DOM
        document.querySelector('#monthly-payment').value = monthlyPayment.toFixed(2);
        document.querySelector('#total-payment').value = totalPayment.toFixed(2);
        document.querySelector('#total-interest').value = totalInterest.toFixed(2);

    } else {
        displayError();
    }

    e.preventDefault();
}

function showResults() {
    //HIDE LOADING
    document.querySelector('#loading').style.display = 'none';
    document.querySelector('#results').style.display = 'block';
}

function displayError() {
    // CREATE HTML ELEMENT FOR THE ERROR
    const errorDiv = document.createElement('div');
    errorDiv.className = 'warning alert alert-danger';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.appendChild(document.createTextNode('Type correct values!'));

    document.querySelector('#loan-form').appendChild(errorDiv);

    // CLEAR THE OUTPUT
    document.querySelector('#monthly-payment').value = '';
    document.querySelector('#total-payment').value = '';
    document.querySelector('#total-interest').value = '';

    //HIDE RESULTS
    document.querySelector('#results').style.display = 'none';
}

function clearError () {
    //CLEAR OUTPUTS TO DOM
    document.querySelector('.warning').remove();
}