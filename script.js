document.addEventListener('DOMContentLoaded', () => {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const button = document.getElementById('btn');

    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiRange = document.getElementById('bmi-range');
    const bmiIndicator = document.getElementById('bmi-indicator');
    const resultContainer = document.getElementById('output');

    const heightError = document.getElementById('height_error');
    const weightError = document.getElementById('weight_error');
    const ageError = document.getElementById('age_error');
    const genderError = document.getElementById('gender_error');

    const resultsTable = document.getElementById('results-table');

    button.addEventListener('click', calculateBMI);

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        const age = parseInt(ageInput.value);
        const gender = genderSelect.value;

        let valid = true;

        if (isNaN(height) || height <= 0) {
            heightError.textContent = 'Please enter a valid height';
            valid = false;
        } else {
            heightError.textContent = '';
        }

        if (isNaN(weight) || weight <= 0) {
            weightError.textContent = 'Please enter a valid weight';
            valid = false;
        } else {
            weightError.textContent = '';
        }

        if (isNaN(age) || age <= 0 || age > 120) {
            ageError.textContent = 'Please enter a valid age';
            valid = false;
        } else {
            ageError.textContent = '';
        }

        if (!gender) {
            genderError.textContent = 'Please select gender';
            valid = false;
        } else {
            genderError.textContent = '';
        }

        if (valid) {
            const bmi = (weight / ((height * height) / 10000)).toFixed(1);
            displayResults(bmi, age, gender);
        } else {
            resetResults();
        }
    }

    function displayResults(bmi, age, gender) {
        bmiValue.textContent = bmi;

        let category = "", categoryClass = "", rangeText = "", indicatorPosition = 0;

        if (bmi < 18.5) {
            category = "Underweight";
            categoryClass = "underweight-category";
            rangeText = "BMI range: < 18.5";
            indicatorPosition = (bmi / 18.5) * 20; // 0% to 20%
        } else if (bmi >= 18.5 && bmi < 25) {
            category = "Healthy Weight";
            categoryClass = "healthy-category";
            rangeText = "BMI range: 18.5 - 24.9";
            indicatorPosition = 20 + ((bmi - 18.5) / (25 - 18.5)) * 35; // 20% to 55%
        } else if (bmi >= 25 && bmi < 30) {
            category = "Overweight";
            categoryClass = "overweight-category";
            rangeText = "BMI range: 25 - 29.9";
            indicatorPosition = 55 + ((bmi - 25) / (30 - 25)) * 25; // 55% to 80%
        } else {
            category = "Obese";
            categoryClass = "obese-category";
            rangeText = "BMI range: ≥ 30";
            indicatorPosition = 80 + (Math.min(bmi - 30, 10) / 10) * 20; // 80% to 100%
        }

        // Clamp position and apply to triangle
        indicatorPosition = Math.max(2, Math.min(indicatorPosition, 98));
        bmiIndicator.style.left = `${indicatorPosition}%`;
        bmiIndicator.className = `bmi-indicator ${categoryClass}`;

        // Set category and range text
        bmiCategory.textContent = category;
        bmiCategory.className = categoryClass;
        bmiRange.textContent = rangeText;

        // Set the results panel
        resultsTable.innerHTML = `
            <h4>Detailed Result</h4>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>BMI:</strong> ${bmi}</p>
            <p><strong>Category:</strong> ${category}</p>
        `;
    }

    function resetResults() {
        bmiValue.textContent = "00.0";
        bmiCategory.textContent = "Enter your details";
        bmiCategory.className = "";
        bmiRange.textContent = "";
        bmiIndicator.style.left = "-100px";
        resultsTable.innerHTML = "";
    }
});
