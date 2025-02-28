// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(this.getAttribute('data-tab')).classList.add('active');
    });
});

// Calculate financial data
document.getElementById('calculateBtn').addEventListener('click', function() {
    calculateFinancials();
    document.querySelector('[data-tab="results-tab"]').click();
});

// AI Insights button
document.getElementById('aiInsightsBtn').addEventListener('click', function() {
    calculateFinancials();
    generateAIInsights();
    document.querySelector('[data-tab="results-tab"]').click();
});

// Add welcome page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already seen welcome page
    if (!sessionStorage.getItem('welcomePageSeen')) {
        document.getElementById('welcome-page').classList.add('active');
        sessionStorage.setItem('welcomePageSeen', 'true');
    } else {
        document.getElementById('home-tab').classList.add('active');
        document.getElementById('home').classList.add('active');
    }
});

// Get started button on welcome page with transition
document.getElementById('getStartedBtn').addEventListener('click', function() {
    // Add a fade-out effect
    document.getElementById('welcome-page').style.opacity = '0';
    
    // Wait for animation to complete before redirecting
    setTimeout(() => {
        window.location.href = 'pi1.html';
    }, 500);  // 500ms delay for transition
});

function calculateFinancials() {
    // Get values from form
    const businessName = document.getElementById('businessName').value || 'Your Business';
    const revenue = parseFloat(document.getElementById('totalRevenue').value) || 0;
    const giftVouchers = parseFloat(document.getElementById('giftVouchers').value) || 0;
    const rawMaterialCost = parseFloat(document.getElementById('rawMaterialCost').value) || 0;
    const wasteCost = parseFloat(document.getElementById('wasteCost').value) || 0;
    const rentCost = parseFloat(document.getElementById('rentCost').value) || 0;
    const electricityCost = parseFloat(document.getElementById('electricityCost').value) || 0;
    const employeeCount = parseInt(document.getElementById('employeeCount').value) || 0;
    const averageSalary = parseFloat(document.getElementById('averageSalary').value) || 0;
    const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const loanInterest = parseFloat(document.getElementById('loanInterest').value) || 0;
    const taxPaid = parseFloat(document.getElementById('taxPaid').value) || 0;
    const schemesBenefit = parseFloat(document.getElementById('schemesBenefit').value) || 0;

    // Calculate costs and profits
    const totalRevenue = revenue + giftVouchers + schemesBenefit;
    const employeeCost = employeeCount * averageSalary;
    const loanInterestCost = loanAmount * (loanInterest / 100);
    const facilityCosts = rentCost + electricityCost;
    const totalCosts = rawMaterialCost + wasteCost + facilityCosts + employeeCost + loanInterestCost + taxPaid;
    
    // Calculate net profit
    const netProfit = totalRevenue - totalCosts;
    const profitMargin = (netProfit / totalRevenue) * 100;

    // Get the results display element
    const resultsDisplay = document.getElementById('results-display');
    
    // Check if element exists
    if (!resultsDisplay) {
        console.error('Results display element not found!');
        return;
    }

    // Display results
    resultsDisplay.innerHTML = `
        <div class="results-container">
            <div class="result-card revenue">
                <h3>Revenue Breakdown</h3>
                
                <p>Total Revenue: ₹${totalRevenue.toLocaleString()}</p>
                <p>Sales Revenue: ₹${revenue.toLocaleString()}</p>
                <p>Gift Vouchers: ₹${giftVouchers.toLocaleString()}</p>
                <p>Schemes Benefit: ₹${schemesBenefit.toLocaleString()}</p>
            </div>

            <div class="result-card costs">
                <h3>Cost Breakdown</h3>
                <p>Raw Materials: ₹${rawMaterialCost.toLocaleString()}</p>
                <p>Waste Cost: ₹${wasteCost.toLocaleString()}</p>
                <p>Facility Costs: ₹${facilityCosts.toLocaleString()}</p>
                <p>Employee Costs: ₹${employeeCost.toLocaleString()}</p>
                <p>Loan Interest: ₹${loanInterestCost.toLocaleString()}</p>
                <p>Tax Paid: ₹${taxPaid.toLocaleString()}</p>
                <p>Total Costs: ₹${totalCosts.toLocaleString()}</p>
            </div>

            <div class="result-card profit ${netProfit >= 0 ? 'profit-positive' : 'profit-negative'}">
                <h3>Profit Analysis</h3>
                <p class="net-profit">Net Profit: ₹${netProfit.toLocaleString()}</p>
                <p>Profit Margin: ${profitMargin.toFixed(2)}%</p>
            </div>
        </div>
    `;

    // Add debug logs
    console.log('Calculations completed');
    console.log('Total Revenue:', totalRevenue);
    console.log('Total Costs:', totalCosts);
    console.log('Net Profit:', netProfit);

    // Make sure results tab is visible
    const resultsTab = document.getElementById('results');
    if (resultsTab) {
        resultsTab.classList.add('active');
    }
}

// Add this CSS to your stylesheet
const styles = `
.results-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.result-card {
    background: white;
    border-radius: 15px;
    padding: 20px;
    margin: 15px 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.result-card h3 {
    color: #2C74B3;
    margin-bottom: 15px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
}

.result-card p {
    margin: 10px 0;
    font-size: 1.1rem;
}

.revenue {
    border-left: 5px solid #4CAF50;
}

.costs {
    border-left: 5px solid #FF9800;
}

.profit {
    border-left: 5px solid #2196F3;
}

.profit-positive .net-profit {
    color: #4CAF50;
    font-weight: bold;
    font-size: 1.3rem;
}

.profit-negative .net-profit {
    color: #f44336;
    font-weight: bold;
    font-size: 1.3rem;
}

@media (min-width: 768px) {
    .results-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }
}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);