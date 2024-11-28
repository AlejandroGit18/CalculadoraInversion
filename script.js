// Actualiza el equivalente en GTQ al ingresar un monto válido
document.getElementById('amount').addEventListener('input', function () {
    const amount = parseInt(this.value, 10);
    const conversionLabel = document.getElementById('conversion-label');
    if (amount >= 100 && amount % 50 === 0) {
        const quetzales = amount * 8;
        conversionLabel.textContent = `Equivalente en GTQ: Q${quetzales.toFixed(2)}`;
    } else {
        conversionLabel.textContent = 'Monto no válido.';
    }
});

// Calcula y muestra los resultados
document.getElementById('calculate-btn').addEventListener('click', function () {
    const amount = parseInt(document.getElementById('amount').value, 10);
    const duration = parseInt(document.getElementById('duration').value, 10);
    const rate = parseFloat(document.getElementById('rate').value);
    const currency = document.getElementById('currency').value;

    if (amount < 100 || amount % 50 !== 0) {
        Swal.fire({
            icon: 'error',
            title: 'Monto inválido',
            text: 'El monto debe ser al menos 100 y aumentar en incrementos de 50.',
        });
        return;
    }

    let totalAmount = amount;
    let resultsHTML = `<p>Monto inicial: ${formatCurrency(amount, currency)}</p>`;
    let quarterlySum = 0;

    for (let i = 1; i <= duration; i++) {
        const benefit = totalAmount * rate;
        totalAmount += benefit;
        quarterlySum += benefit;

        if (i % 3 === 0) {
            resultsHTML += `
                <p>Trimestre ${i / 3}: Beneficio Total: ${formatCurrency(quarterlySum, currency)}, 
                Saldo Trimestral: ${formatCurrency(totalAmount, currency)}</p>`;
            quarterlySum = 0;
        }
    }

    resultsHTML += `<h5>Monto Total al Final: ${formatCurrency(totalAmount, currency)}</h5>`;

    document.getElementById('results-details').innerHTML = resultsHTML;
    document.getElementById('results').classList.remove('d-none');
    document.getElementById('to-top-btn').classList.remove('d-none');

    Swal.fire({
        icon: 'success',
        title: 'Cálculo realizado',
        text: 'El desglose se ha generado con éxito.',
    });
});

// Limpia los campos y resultados
document.getElementById('reset-btn').addEventListener('click', function () {
    document.getElementById('investment-form').reset();
    document.getElementById('conversion-label').textContent = 'Equivalente en GTQ: Q800.00';
    document.getElementById('results').classList.add('d-none');
    document.getElementById('results-details').innerHTML = '';
    document.getElementById('to-top-btn').classList.add('d-none');
    Swal.fire({
        icon: 'info',
        title: 'Campos limpiados',
        text: 'El formulario y los cálculos han sido reiniciados.',
    });
});

// Botón para volver al inicio
document.getElementById('to-top-btn').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Formatea la moneda en USD o GTQ
function formatCurrency(amount, currency) {
    const exchangeRate = 8; // 1 USD = 8 GTQ
    if (currency === 'gtq') {
        return `Q${(amount * exchangeRate).toFixed(2)}`;
    }
    return `$${amount.toFixed(2)}`;
}
