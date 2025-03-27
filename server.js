require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// AWS Bedrock Client
const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// AWS SNS Client
const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

app.post('/generate-meal-plan', async (req, res) => {
    try {
        const { groceryList } = req.body;
        if (!groceryList) {
            return res.status(400).json({ message: "Grocery list is required!" });
        }

        const prompt = `Generate a 5-day meal plan using the given ${groceryList}. Each day should include Breakfast, Lunch, and Dinner with a short description of its nutritional benefits. Keep it simple, balanced, and healthy`;

        // Call AWS Bedrock
        const params = {
            modelId: "anthropic.claude-3-haiku-20240307-v1:0",
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify({
                messages: [{ role: "user", content: prompt }],
                max_tokens: 1000,
                temperature: 0.7,
                anthropic_version: "bedrock-2023-05-31"
            })
        };

        const command = new InvokeModelCommand(params);
        const response = await bedrockClient.send(command);
        const responseText = await response.body.transformToString();

        console.log("Bedrock Raw Response:", responseText);

        const parsedResponse = JSON.parse(responseText);
        if (parsedResponse.content && parsedResponse.content[0]?.text) {
            const mealPlan = parsedResponse.content[0].text;

            // Send meal plan via SNS
            const snsParams = {
                Message: `Your personalized meal plan:\n\n${mealPlan}`,
                Subject: "Your AI-Generated Meal Plan",
                TopicArn: process.env.SNS_TOPIC_ARN // Your configured SNS topic ARN
            };

            const snsCommand = new PublishCommand(snsParams);
            await snsClient.send(snsCommand);
            console.log(`Meal plan sent to SNS Topic: ${process.env.SNS_TOPIC_ARN}`);

            return res.json({ mealPlan, message: "Meal plan generated and sent via SNS!" });
        } else {
            throw new Error("Unexpected response format from Bedrock.");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to generate meal plan" });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
