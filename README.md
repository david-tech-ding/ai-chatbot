## AI Chat-Bot App

A full-stack MERN AI Chat Bot Application built using TypeScript and OpenAI's API. It allows users to ask any questions and the chatbot will provide an answer, similar to the popular ChatGPT model.

## Features

- Allow users to ask any questions, if it's code related, the chatbot will provide answers in the format of a code block when necessary.
- Shows a user's chat history.
- Allow users to clear their chat history.
- Protected routes and middlewares implemented.
- Storing user and chat cookies.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB server running locally or accessible via a URL.

## Getting Started

# 1. Clone the repository:

   git clone https://github.com/david-tech-ding/ai-chatbot.git

# 2. Install the project dependencies

- Navigate to the project folder `cd ai-chatbot`.
- Run `npm install`.

3. Create a .env.local file in the client folder and add environmental variables, then create a .env file in the server folder with the following environment variables:

- OPENAI_SECRET
- OPENAI_ORGANIZATION_ID
- MONGODB_URL
- JWT_SECRET
- COOKIE_SECRET
- PORT

## Run the deployment server

- Run command `npm run dev`. Then navigate to the localhost on your browser.
  
## Built with
- React.js
- Express.js
- MongoDB
- Node.js
- TypeScript
- MUI

## Deployment in Vercel
1. Connect the project repository to your Vercel account (https://vercel.com/).
2. Configure the deployment settings. and add the environment variables stored in .env.local file.
3. Deploy the app to Vercel.
