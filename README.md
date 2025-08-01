# 🎵 ToneTune - AI-Powered Tone Rephraser

A sophisticated RAG (Retrieval-Augmented Generation) chatbot that helps you rephrase messages in different tones using Google Gemini API and a custom dataset.

![ToneTune](https://img.shields.io/badge/ToneTune-AI%20Tone%20Rephraser-pink?style=for-the-badge&logo=react)

## ✨ Features

- **🎭 12 Different Tones**: From Formal to Humorous, choose the perfect tone for your message
- **🤖 AI-Powered**: Uses Google Gemini API for intelligent rephrasing
- **📚 RAG Technology**: Leverages custom dataset for context-aware responses
- **💬 Chat History**: Keep track of all your rephrasing requests
- **🎨 Beautiful UI**: Modern, responsive design with soft pink theme
- **⚡ Real-time Processing**: Instant rephrasing with loading states

## 🎯 Available Tones

1. **Formal** - Polished, professional, and respectful
2. **Informal / Casual** - Relaxed and conversational
3. **Friendly / Warm** - Approachable, kind, and inviting
4. **Polite / Courteous** - Respectful and tactful
5. **Assertive** - Direct and confident, but not aggressive
6. **Persuasive** - Convincing and motivating
7. **Apologetic** - Expresses regret or seeks forgiveness
8. **Humorous / Playful** - Light-hearted and entertaining
9. **Serious** - No-nonsense, straightforward, and focused
10. **Empathetic / Compassionate** - Shows understanding and care
11. **Encouraging / Motivational** - Uplifting and supportive
12. **Sarcastic / Ironic** - Opposite of literal meaning, often for humor

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd RAG
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd ../backend
   # Create .env file
   echo GEMINI_API_KEY=your_api_key_here > .env
   ```

5. **Add your logo (optional)**
   - Place your logo image as `logo.png` in `frontend/public/` folder

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   node index.js
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to use ToneTune

## 🛠️ Usage

1. **Enter your message** in the text area
2. **Select a tone** from the dropdown menu
3. **Click "Rephrase Message"** to get AI-generated results
4. **View your conversation history** in the right panel

## 📁 Project Structure

```
RAG/
├── backend/
│   ├── index.js          # Express server with RAG logic
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Chatbot.jsx    # Main UI component
│   │   ├── api.js             # API utilities
│   │   └── App.jsx            # App entry point
│   ├── public/
│   │   └── logo.png           # Logo image
│   └── package.json           # Frontend dependencies
├── mightymerge.io__km2b3us0/  # Dataset folder
│   └── *.csv                  # Tone adjustment datasets
└── README.md                  # This file
```

## 🔧 Technical Details

### Backend (Node.js + Express)
- **Framework**: Express.js
- **AI Integration**: Google Gemini API
- **RAG Implementation**: Custom dataset retrieval
- **CORS**: Enabled for frontend communication
- **Data Processing**: CSV parsing for dataset loading

### Frontend (React)
- **Framework**: React 18
- **Styling**: Inline styles with modern CSS
- **State Management**: React hooks
- **API Communication**: Fetch API
- **Responsive Design**: Mobile-friendly layout

### Dataset
- **Format**: CSV files with tone examples
- **Structure**: Original text → Polite/Professional/Casual rephrasing
- **Size**: Multiple files with 100+ examples each

## 🔑 API Configuration

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to `backend/.env`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## 🎨 Customization

### Changing the Theme
The app uses a soft pink theme. To customize:
- Edit colors in `frontend/src/components/Chatbot.jsx`
- Modify the gradient background and accent colors

### Adding New Tones
1. Update the `TONES` array in `Chatbot.jsx`
2. Ensure your dataset contains examples for the new tone
3. The RAG system will automatically use relevant examples

### Logo Customization
- Replace `frontend/public/logo.png` with your own logo
- Recommended size: 60x60px or larger
- PNG format with transparent background works best

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
- Check if all dependencies are installed: `npm install`
- Verify your `.env` file exists with the API key
- Ensure port 5000 is not in use

**Frontend shows "Failed to rephrase"**
- Make sure the backend is running on port 5000
- Check if your Gemini API key is valid
- Verify the dataset files are in the correct location

**Logo not showing**
- Ensure `logo.png` is in `frontend/public/` folder
- Check the file name and format
- Clear browser cache if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- React team for the amazing framework
- The open-source community for inspiration

---

**Made with ❤️ and ☕ by [Your Name]**

*Transform your communication with AI-powered tone adjustment!*
