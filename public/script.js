async function generateMealPlan() {
    const groceryList = document.getElementById('groceryList').value;
    const userEmail = document.getElementById('userEmail').value;
    const loadingSpinner = document.getElementById('loadingSpinner');
    const mealPlanDisplay = document.getElementById('mealPlanDisplay');

    if (!groceryList.trim()) {
        alert('Please enter your groceries list');
        return;
    }

    if (!userEmail.trim() || !isValidEmail(userEmail)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show loading spinner
    loadingSpinner.style.display = 'block';
    mealPlanDisplay.innerHTML = '';

    try {
        const response = await fetch('/generate-meal-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                groceryList: groceryList,
                email: userEmail 
            }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to generate meal plan');
        }

        displayMealPlan(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate meal plan. Please try again.');
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

function displayMealPlan(mealPlan) {
    const mealPlanDisplay = document.getElementById('mealPlanDisplay');
    mealPlanDisplay.innerHTML = '';

    mealPlan.forEach((day, index) => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <h2>Day ${index + 1}</h2>
            <div class="meal-type">
                <h3>Breakfast</h3>
                <p>${day.breakfast.meal}</p>
                <div class="cooking-steps">
                    <h4>Cooking Steps:</h4>
                    <ol>
                        ${day.breakfast.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
            <div class="meal-type">
                <h3>Lunch</h3>
                <p>${day.lunch.meal}</p>
                <div class="cooking-steps">
                    <h4>Cooking Steps:</h4>
                    <ol>
                        ${day.lunch.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
            <div class="meal-type">
                <h3>Dinner</h3>
                <p>${day.dinner.meal}</p>
                <div class="cooking-steps">
                    <h4>Cooking Steps:</h4>
                    <ol>
                        ${day.dinner.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `;
        mealPlanDisplay.appendChild(dayCard);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}