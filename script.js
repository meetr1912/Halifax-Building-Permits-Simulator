document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const scenarioSelect = document.getElementById('scenario');
    const scenarioDesc = document.getElementById('scenario-desc');
    const imfControls = document.getElementById('imf-controls');

    const popGrowthSlider = document.getElementById('pop-growth');
    const popGrowthValue = document.getElementById('pop-growth-value');
    const interestRateSlider = document.getElementById('interest-rate');
    const interestRateValue = document.getElementById('interest-rate-value');
    const newHousingSlider = document.getElementById('new-housing');
    const newHousingValue = document.getElementById('new-housing-value');

    const projectedPriceEl = document.getElementById('projected-price');
    const totalGrowthEl = document.getElementById('total-growth');

    // --- Constants and Initial State ---
    const BASE_PRICE = 625000;
    const START_YEAR = 2025;
    const END_YEAR = 2035;
    const YEARS = END_YEAR - START_YEAR;

    const SCENARIO_DESCRIPTIONS = {
        'cmhc-bau': 'High growth based on current supply and demand trends, leading to decreased affordability.',
        'cmhc-is': 'Moderate growth assuming housing construction doubles to meet demand.',
        'imf': 'Growth is driven by the economic variables you set below.'
    };

    // --- Core Functions ---

    /**
     * Calculates the projected price and total growth based on current inputs.
     */
    function calculateProjection() {
        const scenario = scenarioSelect.value;
        let annualGrowthRate = 0;

        switch (scenario) {
            case 'cmhc-bau':
                // "Significantly faster than incomes" - let's assume a 5.5% annual growth.
                annualGrowthRate = 0.055;
                break;
            case 'cmhc-is':
                // "Balanced market" - let's assume a more modest 1.8% annual growth.
                annualGrowthRate = 0.018;
                break;
            case 'imf':
                const popGrowth = parseFloat(popGrowthSlider.value);
                const interestRate = parseFloat(interestRateSlider.value);
                const newSupply = parseInt(newHousingSlider.value, 10);

                // Formula: price growth = 1.5% + (1.5 * Pop. Growth) - (2.0 * Interest Rate) - (0.0005 * (New Supply - 4700))
                console.log(`JS DEBUG: popGrowth=${popGrowth}, interestRate=${interestRate}, newSupply=${newSupply}`);
                const growthPercent = 1.5 + (1.5 * popGrowth) - (2.0 * interestRate) - (0.0005 * (newSupply - 4700));
                console.log(`JS DEBUG: Calculated growthPercent=${growthPercent}`);
                annualGrowthRate = growthPercent / 100;
                break;
        }

        // Apply compound annual growth rate
        const projectedPrice = BASE_PRICE * Math.pow((1 + annualGrowthRate), YEARS);
        const totalGrowth = ((projectedPrice / BASE_PRICE) - 1) * 100;

        updateResults(projectedPrice, totalGrowth);
    }

    /**
     * Updates the results display with the calculated values.
     * @param {number} price - The projected price.
     * @param {number} growth - The total growth percentage.
     */
    function updateResults(price, growth) {
        projectedPriceEl.textContent = formatCurrency(price);
        totalGrowthEl.textContent = `${growth.toFixed(1)}%`;

        // Change color based on growth
        if (growth < 0) {
            totalGrowthEl.style.color = '#dc3545'; // Red for negative
        } else {
            totalGrowthEl.style.color = '#007bff'; // Blue for positive
        }
    }

    /**
     * Handles changes to the selected scenario.
     */
    function handleScenarioChange() {
        const selectedScenario = scenarioSelect.value;
        scenarioDesc.textContent = SCENARIO_DESCRIPTIONS[selectedScenario];

        if (selectedScenario === 'imf') {
            imfControls.classList.remove('hidden');
        } else {
            imfControls.classList.add('hidden');
        }
        calculateProjection();
    }

    /**
     * Updates the text display for a range slider.
     * @param {HTMLElement} slider - The slider input element.
     * @param {HTMLElement} valueEl - The element to display the value.
     * @param {number} decimals - The number of decimal places to show.
     * @param {string} unit - The unit to append (e.g., '%').
     */
    function updateSliderValue(slider, valueEl, decimals = 1, unit = '') {
        valueEl.textContent = parseFloat(slider.value).toFixed(decimals);
    }


    // --- Event Listeners ---
    scenarioSelect.addEventListener('change', handleScenarioChange);

    popGrowthSlider.addEventListener('input', () => {
        updateSliderValue(popGrowthSlider, popGrowthValue, 1);
        calculateProjection();
    });

    interestRateSlider.addEventListener('input', () => {
        updateSliderValue(interestRateSlider, interestRateValue, 2);
        calculateProjection();
    });

    newHousingSlider.addEventListener('input', () => {
        updateSliderValue(newHousingSlider, newHousingValue, 0);
        calculateProjection();
    });


    // --- Utility Functions ---
    /**
     * Formats a number as a currency string (USD).
     * @param {number} value - The number to format.
     */
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    // --- Initial Setup ---
    function initialize() {
        // Set initial slider values display
        updateSliderValue(popGrowthSlider, popGrowthValue, 1);
        updateSliderValue(interestRateSlider, interestRateValue, 2);
        updateSliderValue(newHousingSlider, newHousingValue, 0);

        // Set initial scenario description
        scenarioDesc.textContent = SCENARIO_DESCRIPTIONS[scenarioSelect.value];

        // Initial calculation
        calculateProjection();
    }

    initialize();
});
