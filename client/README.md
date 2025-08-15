# PersonaGPT - AI Chat with Tech Influencers

PersonaGPT is an interactive chat application that lets you have conversations with AI personas of popular tech influencers. Currently featuring **Hitesh Choudhary** (Chai Aur Code) and **Piyush Garg** (Teachyst), each with their unique teaching styles and personalities.

## 🌟 Features

- **Interactive Chat Interface**: Real-time conversations with AI personas
- **Multiple Personas**: Chat with different tech influencers
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Context-Aware**: Maintains conversation history for better responses
- **Beautiful UI**: Modern design with smooth animations using Framer Motion
- **Environment-Aware**: Automatically switches between local and production APIs

## 🚀 Live Demo

Visit the live application: [https://persona-gpt-8oit.vercel.app/](https://persona-gpt-8oit.vercel.app/)

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, OpenAI GPT-4
- **Deployment**: Vercel (Frontend), Custom API Server
- **Styling**: Tailwind CSS with custom gradients and animations

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenAI API key (for the backend)

## 🏃‍♂️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/eklavya-15/PersonaGPT.git
cd PersonaGPT
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../api
npm install
```

### 3. Environment Setup

Create a `.env` file in the `api` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=development
```

### 4. Start the Application

#### Option A: Development Mode (Both Frontend & Backend)

```bash
# Terminal 1: Start the API server
cd api
npm start

# Terminal 2: Start the frontend
cd client
npm run dev
```

#### Option B: Frontend Only (Uses Production API)

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
PersonaGPT/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ChatInterface.jsx
│   │   │   └── HeroSection.jsx
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── vercel.json         # Vercel deployment config
│   └── package.json
├── api/                    # Backend API server
│   ├── index.js            # Express server with OpenAI integration
│   ├── .env                # Environment variables
│   └── package.json
└── README.md
```

## 🎯 Available Personas

### Hitesh Choudhary
- **Channel**: Chai Aur Code
- **Style**: Hindi-English mix, beginner-friendly explanations
- **Expertise**: Web development, programming tutorials, career guidance
- **Personality**: Energetic, relatable, uses analogies

### Piyush Garg
- **Channel**: Teachyst
- **Style**: Practical, project-focused approach
- **Expertise**: Full-stack development, freelancing, startup building
- **Personality**: Direct, action-oriented, shares real experiences

## 💬 Usage Examples

### Example Conversations

**With Hitesh Choudhary:**
```
User: "API kaise kaam karti hai?"
Hitesh: "Bhai, solid sawal! Socho tum restaurant mein ho (API = waiter).
1. Tum kehte ho: 'Pizza chahiye!' (Request)
2. Waiter kitchen ko bataega (Server)
3. Pizza tum tak pahuncha dega (Response).
Simple na? Mera video dekhlo @1:30 – 1.5M log confuse the, ab confident hain! 😎"
```

**With Piyush Garg:**
```
User: "How to start freelancing?"
Piyush: "Dekho bro, freelancing mein sabse important hai portfolio. Maine bhi 2-3 projects banake start kiya tha. Pehle Upwork pe profile banao, phir 2-3 small projects free mein kar do reviews ke liye. Abhi jaake ek simple website bana do aur Upwork pe bid karo!"
```

## 🔧 API Endpoints

### Base URL
- **Development**: `http://localhost:3001`
- **Production**: `https://persona-gpt-delta.vercel.app`

### Endpoints

#### Chat with Hitesh
```http
POST /api/chat/hitesh
Content-Type: application/json

{
  "message": "Your question here",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    }
  ]
}
```

#### Chat with Piyush
```http
POST /api/chat/piyush
Content-Type: application/json

{
  "message": "Your question here",
  "conversationHistory": [
    {
      "role": "user", 
      "content": "Previous message"
    }
  ]
}
```

#### Health Check
```http
GET /api/health
```

#### Get Personas Info
```http
GET /api/personas
```

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set the build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Backend (Custom Server)

Deploy your API server to any cloud provider (Railway, Render, Heroku, etc.) and update the API URL in the frontend.

## 🎨 Customization

### Adding New Personas

1. **Update the API** (`api/index.js`):
   ```javascript
   const NEW_PERSONA_PROMPT = `Your persona prompt here...`;
   
   app.post('/api/chat/newpersona', async (req, res) => {
     // Implementation similar to existing personas
   });
   ```

2. **Update the Frontend** (`client/src/components/ChatInterface.jsx`):
   ```javascript
   const endpoint = persona.name === 'New Persona' 
     ? `${baseURL}/api/chat/newpersona`
     : // existing logic
   ```

### Styling

The application uses Tailwind CSS. Customize colors, gradients, and animations in:
- `client/src/index.css` - Global styles
- Component files - Component-specific styling

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the API server includes your frontend domain in CORS origins
2. **API Not Responding**: Check if the OpenAI API key is correctly set in `.env`
3. **Build Errors**: Ensure all dependencies are installed with `npm install`

### Environment Variables

Make sure these are set in your `api/.env` file:
```env
OPENAI_API_KEY=sk-...
PORT=3001
NODE_ENV=development
```

## 📝 Scripts

### Frontend (`client/`)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend (`api/`)
```bash
npm start            # Start the API server
npm run dev          # Start with nodemon (if configured)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hitesh Choudhary** - For inspiring millions through Chai Aur Code
- **Piyush Garg** - For practical development education through Teachyst
- **OpenAI** - For providing the GPT-4 API
- **Vercel** - For seamless deployment platform

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the API documentation

---

**Made with ❤️ by [Eklavya](https://github.com/eklavya-15)**
