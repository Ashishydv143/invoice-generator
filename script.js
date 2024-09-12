document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const awbNo = document.getElementById('awbNo').value;
    const consignee = document.getElementById('consignee').value;
    const destination = document.getElementById('destination').value;
    const net = document.getElementById('net').value;
    const networkNo = document.getElementById('networkNo').value;
    const ds = document.getElementById('ds').value;
    const pcs = document.getElementById('pcs').value;
    const weight = document.getElementById('weight').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const covidCharge = parseFloat(document.getElementById('covidCharge').value);
    const fuelCharge = parseFloat(document.getElementById('fuelCharge').value);

    // Calculate grand total
    const grandTotal = amount + covidCharge + fuelCharge;

    // Create invoice object
    const invoice = {
        awbNo,
        consignee,
        destination,
        net,
        networkNo,
        ds,
        pcs,
        weight,
        amount: amount.toFixed(2),
        covidCharge: covidCharge.toFixed(2),
        fuelCharge: fuelCharge.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
        date: new Date().toLocaleDateString()
    };

    // Save to local storage
    let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Update invoice display
    document.getElementById('displayAwbNo').innerText = awbNo;
    document.getElementById('displayConsignee').innerText = consignee;
    document.getElementById('displayDestination').innerText = destination;
    document.getElementById('displayNet').innerText = net;
    document.getElementById('displayNetworkNo').innerText = networkNo;
    document.getElementById('displayDS').innerText = ds;
    document.getElementById('displayPcs').innerText = pcs;
    document.getElementById('displayWeight').innerText = weight;
    document.getElementById('displayAmount').innerText = amount.toFixed(2);
    document.getElementById('displayCovidCharge').innerText = covidCharge.toFixed(2);
    document.getElementById('displayFuelCharge').innerText = fuelCharge.toFixed(2);
    document.getElementById('displayGrandTotal').innerText = grandTotal.toFixed(2);

    // Show the invoice
    document.getElementById('invoiceDisplay').style.display = 'block';

    // Set the invoice date to today's date
    document.getElementById('invoiceDate').innerText = new Date().toLocaleDateString();
});

// Function to display all saved invoices
function displayInvoices() {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const invoiceList = document.getElementById('invoiceList');
    invoiceList.innerHTML = ''; // Clear existing list

    invoices.forEach(invoice => {
        const listItem = document.createElement('li');
        listItem.textContent = `Invoice No: ${invoice.awbNo}, Date: ${invoice.date}, Total: ${invoice.grandTotal}`;
        invoiceList.appendChild(listItem);
    });
}

// Call this function to display saved invoices on page load
window.onload = displayInvoices;
