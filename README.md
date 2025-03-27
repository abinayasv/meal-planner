Here’s a revised version of your **5-Day Meal Planner** project description, tailored to your code:  

---

# **5-Day AI-Powered Meal Planner**  

A web application that generates **personalized 5-day meal plans** based on available groceries. It utilizes **AWS Bedrock** for AI-generated meal suggestions and **Amazon SNS** to send meal plans via email.  

## **✨ Features**  
✅ **User Inputs Grocery List** 📋  
✅ **Generates 5-Day Meal Plan** 🥗🍲  
✅ **Step-by-Step Cooking Instructions** 🍳  
✅ **Nutritional Information & Dietary Suitability** 🏋️‍♂️  
✅ **Preparation Time & YouTube Recipe Links** 🎥  
✅ **Responsive UI with Meal Images** 🖼️  
✅ **Email Delivery via AWS SNS** 📩  

---

## **📌 Prerequisites**  
✔ **Node.js (v14 or higher)**  
✔ **AWS Account with Bedrock & SNS access**  
✔ **Gmail Account for Sending Emails**  

---

## **🚀 Installation**  

### **1️⃣ Clone the Repository**  
```sh
git clone <repository-url>
cd meal-planner
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Configure Environment Variables**  
- Copy `.env.example` → `.env`  
- Update `.env` with:  
  ```env
  AWS_REGION=your-region
  AWS_ACCESS_KEY_ID=your-access-key
  AWS_SECRET_ACCESS_KEY=your-secret-key
  SNS_TOPIC_ARN=your-sns-topic-arn

---

## **☁ AWS Configuration**  

### **🔹 Bedrock Setup**  
- Enable **AWS Bedrock**  
- Create **IAM User** with Bedrock Access  
- Add **Access Keys** to `.env`  

### **🔹 SNS Setup (Amazon Simple Notification Service)**  
1. **Create an SNS Topic**  
2. **Subscribe your Email to SNS**  
3. **Verify Email (Check your inbox)**  
4. **Copy the SNS Topic ARN** → Add to `.env`  

---

## **🚀 Running the Application**  

### **Start the Server**  
```sh
npm start
```

### **Access the Web App**  
🔗 Open in Browser:  
👉 `http://localhost:3000`  

---

## **💻 Usage Instructions**  
1️⃣ **Enter Grocery List** in the input box  
2️⃣ **Click "Generate Meal Plan"** to fetch AI-generated results  
3️⃣ **View detailed meal plan** (meals, steps, nutrients, etc.)  
4️⃣ **Receive an Email** with the full meal plan  

---

## **⚙️ Tech Stack**  
🔹 **Frontend:** HTML, CSS, JavaScript  
🔹 **Backend:** Node.js, Express.js  
🔹 **AI Integration:** AWS Bedrock  
🔹 **Notifications:** Amazon SNS  
🔹 **Security:** `.env` variables for credentials  

---

## **📂 Project Structure**  
```
meal-planner/
├── public/
│   ├── index.html    # Frontend UI
│   ├── styles.css    # Styling (Responsive)
│   ├── script.js     # Client-side Logic
├── server.js         # Backend (Express + AWS API)
├── .env              # Environment Variables
├── README.md         # Project Documentation
```

---

## **🛡️ Security Notes**  
❌ **Never commit `.env` file**  
✅ **Use environment variables for sensitive data**  
🔒 **Secure AWS Credentials**  
🔐 **Use App Passwords for Gmail**  
