require('dotenv').config();
const express = require('express');
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// AWS Bedrock client configuration
const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/generate-meal-plan', async (req, res) => {
    try {
        const { groceryList, email } = req.body;

        // Prepare the prompt for AWS Bedrock
        const prompt = `Generate a 5-day meal plan using these ingredients: ${groceryList}. 
        For each day, provide breakfast, lunch, and dinner with detailed cooking steps. 
        Format the response as a JSON array with 5 objects, each containing breakfast, lunch, 
        and dinner objects with 'meal' and 'steps' properties.`;

        // Call AWS Bedrock
        const params = {
            modelId: "anthropic.claude-v2:1",
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify({
                prompt: `\\n\\nHuman: ${prompt}\\n\\nAssistant:`,
                max_tokens_to_sample: 4096,
                temperature: 0.7,
                anthropic_version: "bedrock-2023-05-31"
            })
        };

        const command = new InvokeModelCommand(params);
        const response = await bedrockClient.send(command);
        const mealPlan = JSON.parse(response.body);

        // Send email with meal plan
        const emailContent = formatMealPlanEmail(mealPlan);
        await sendEmail(email, emailContent);

        res.json(mealPlan);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to generate meal plan' });
    }
});

function formatMealPlanEmail(mealPlan) {
    let emailContent = '<h1>Your 5-Day Meal Plan</h1>';
    
    mealPlan.forEach((day, index) => {
        emailContent += `
            <h2>Day ${index + 1}</h2>
            <h3>Breakfast</h3>
            <p>${day.breakfast.meal}</p>
            <h4>Cooking Steps:</h4>
            <ol>
                ${day.breakfast.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            
            <h3>Lunch</h3>
            <p>${day.lunch.meal}</p>
            <h4>Cooking Steps:</h4>
            <ol>
                ${day.lunch.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            
            <h3>Dinner</h3>
            <p>${day.dinner.meal}</p>
            <h4>Cooking Steps:</h4>
            <ol>
                ${day.dinner.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            <hr>
        `;
    });
    
    return emailContent;
}

async function sendEmail(to, content) {
    // Ensure email is provided and valid
    if (!to || typeof to !== 'string') {
        throw new Error('Valid email address is required');
    }
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Your 5-Day Meal Plan',
        html: content
    };

    await transporter.sendMail(mailOptions);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});