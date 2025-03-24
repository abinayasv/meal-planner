# 5-Day Meal Planner

A web application that generates personalized 5-day meal plans based on available groceries using AWS Bedrock for AI-powered meal suggestions.

## Features

- Input grocery list and email address
- Generate 5-day meal plans with breakfast, lunch, and dinner
- Detailed cooking instructions for each meal
- Email delivery of meal plans
- Responsive and clean user interface

## Prerequisites

- Node.js (v14 or higher)
- AWS Account with Bedrock access
- Gmail account for sending emails

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meal-planner
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the following variables in `.env`:
  - `AWS_REGION`: Your AWS region
  - `AWS_ACCESS_KEY_ID`: Your AWS access key
  - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
  - `EMAIL_USER`: Your Gmail address
  - `EMAIL_PASS`: Your Gmail app password

## Getting Gmail App Password

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to App passwords
5. Generate a new app password for your application
6. Use this password in your .env file

## AWS Bedrock Setup

1. Create an AWS account if you don't have one
2. Enable AWS Bedrock service
3. Create an IAM user with Bedrock access
4. Generate access keys and add them to your .env file

## Running the Application

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Enter your available groceries in the textarea
2. Provide your email address
3. Click "Generate Meal Plan"
4. View the generated meal plan on the webpage
5. Check your email for a copy of the meal plan

## Technical Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- AI: AWS Bedrock
- Email: Nodemailer
- Security: Environment variables for sensitive data

## Project Structure

```
meal-planner/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js
├── .env
└── README.md
```

## Security Notes

- Never commit your .env file
- Use environment variables for sensitive data
- Keep your AWS credentials secure
- Use app-specific passwords for Gmail

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request