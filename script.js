document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('btn');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultContainer = document.getElementById('output');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiRange = document.getElementById('bmi-range');
    const bmiIndicator = document.getElementById('bmi-indicator');

    button.addEventListener('click', calculateBMI);

    // Allow pressing Enter in input fields to calculate
    heightInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculateBMI();
    });

    weightInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculateBMI();
    });

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        let heightValid = false, weightValid = false;

        // Validate height
        if (isNaN(height) || height <= 0) {
            document.getElementById('height_error').textContent = 'Please enter a valid height';
        } else {
            document.getElementById('height_error').textContent = '';
            heightValid = true;
        }

        // Validate weight
        if (isNaN(weight) || weight <= 0) {
            document.getElementById('weight_error').textContent = 'Please enter a valid weight';
        } else {
            document.getElementById('weight_error').textContent = '';
            weightValid = true;
        }

        if (heightValid && weightValid) {
            const bmi = (weight / ((height * height) / 10000)).toFixed(1);
            displayResults(bmi);
        } else {
            resetResults();
        }
    }

    function displayResults(bmi) {
        bmiValue.textContent = bmi;
        
        let category, categoryClass, rangeText, indicatorPosition;

        if (bmi < 18.5) {
            category = "Underweight";
            categoryClass = "underweight-category";
            rangeText = "BMI range: < 18.5";
            indicatorPosition = (bmi / 18.5) * 20;
        } else if (bmi >= 18.5 && bmi < 25) {
            category = "Healthy Weight";
            categoryClass = "healthy-category";
            rangeText = "BMI range: 18.5 - 24.9";
            indicatorPosition = 20 + ((bmi - 18.5) / (25 - 18.5)) * 35;
        } else if (bmi >= 25 && bmi < 30) {
            category = "Overweight";
            categoryClass = "overweight-category";
            rangeText = "BMI range: 25 - 29.9";
            indicatorPosition = 55 + ((bmi - 25) / (30 - 25)) * 25;
        } else {
            category = "Obese";
            categoryClass = "obese-category";
            rangeText = "BMI range: ≥ 30";
            indicatorPosition = 80 + (Math.min(bmi - 30, 10) / 10) * 20;
        }

        // Update UI
        bmiCategory.textContent = category;
        bmiCategory.className = categoryClass;
        bmiRange.textContent = rangeText;
        
        // Position indicator (ensure it stays within bounds)
        indicatorPosition = Math.max(2, Math.min(indicatorPosition, 98));
        bmiIndicator.style.left = `${indicatorPosition}%`;
        bmiIndicator.className = `bmi-indicator ${categoryClass}`;
        
        // Show results with animation
        resultContainer.style.opacity = 0;
        setTimeout(() => {
            resultContainer.style.opacity = 1;
        }, 10);
    }

    function resetResults() {
        bmiValue.textContent = "00.0";
        bmiCategory.textContent = "Enter your details";
        bmiCategory.className = "";
        bmiRange.textContent = "";
        bmiIndicator.style.left = "-100px";
    }
});