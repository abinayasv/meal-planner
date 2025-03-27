async function generateMealPlan() {
    const groceryList = document.getElementById("groceryList").value.trim();

    if (!groceryList) {
        alert("Please enter your grocery list!");
        return;
    }

    document.getElementById("result").innerHTML = "⏳ Generating meal plan...";

    try {
        const response = await fetch("/generate-meal-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groceryList })
        });

        const data = await response.json();
        console.log("Meal Plan Response:", data); // Debugging output

        if (data.mealPlan) {
            document.getElementById("result").innerHTML = `
                ✅ Meal plan generated successfully!  
                <pre>${data.mealPlan}</pre>  
                📩 SNS notification sent!
            `;
        } else {
            throw new Error("No meal plan received");
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerHTML = "❌ Failed to generate meal plan.";
    }
}
