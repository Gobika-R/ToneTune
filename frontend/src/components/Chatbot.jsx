import React, { useState } from 'react';
import { rephraseSentence } from '../api';

const TONES = [
  'Formal',
  'Informal / Casual', 
  'Friendly / Warm',
  'Polite / Courteous',
  'Assertive',
  'Persuasive',
  'Apologetic',
  'Humorous / Playful',
  'Serious',
  'Empathetic / Compassionate',
  'Encouraging / Motivational',
  'Sarcastic / Ironic'
];

export default function Chatbot() {
  const [sentence, setSentence] = useState('');
  const [tone, setTone] = useState(TONES[0]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const rephrased = await rephraseSentence(sentence, tone);
      setHistory([
        { sentence, tone, rephrased, time: new Date().toLocaleTimeString() },
        ...history
      ]);
      setSentence('');
    } catch (err) {
      setError('Failed to rephrase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#fff', 
          fontWeight: 700, 
          fontSize: '2.5rem', 
          margin: 0,
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <img 
            src="/logo.png" 
            alt="ToneTune Logo" 
            style={{ 
              width: '60px', 
              height: '60px',
              objectFit: 'contain'
            }}
          />
          ToneTune
        </h1>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.95)', 
          margin: '8px 0 0 0',
          fontSize: '1.1rem'
        }}>
          Transform your message with AI-powered tone adjustment
        </p>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        
        {/* Left Column - Input Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(255, 154, 158, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h2 style={{
            color: '#e91e63',
            fontSize: '1.8rem',
            marginBottom: '30px',
            textAlign: 'center',
            fontWeight: 600
          }}>
            Rephrase Your Message
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block',
                fontWeight: 600, 
                color: '#ad1457',
                marginBottom: '8px',
                fontSize: '1rem'
              }}>
                Your Message
              </label>
              <textarea
                value={sentence}
                onChange={e => setSentence(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  border: '2px solid #f8bbd9',
                  padding: '16px',
                  fontSize: '1rem',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease',
                  fontFamily: 'inherit'
                }}
                placeholder="Enter your message here..."
                required
                disabled={loading}
                onFocus={(e) => e.target.style.borderColor = '#e91e63'}
                onBlur={(e) => e.target.style.borderColor = '#f8bbd9'}
              />
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block',
                fontWeight: 600, 
                color: '#ad1457',
                marginBottom: '8px',
                fontSize: '1rem'
              }}>
                Choose Tone
              </label>
              <select
                value={tone}
                onChange={e => setTone(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  border: '2px solid #f8bbd9',
                  padding: '16px',
                  fontSize: '1rem',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s ease',
                  fontFamily: 'inherit'
                }}
                disabled={loading}
                onFocus={(e) => e.target.style.borderColor = '#e91e63'}
                onBlur={(e) => e.target.style.borderColor = '#f8bbd9'}
              >
                {TONES.map(t => (
                  <option key={t} value={t} style={{ padding: '8px' }}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading || !sentence.trim()}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                color: '#fff',
                fontWeight: 600,
                border: 'none',
                borderRadius: '12px',
                padding: '18px 0',
                fontSize: '1.1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 154, 158, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Processing...
                </span>
              ) : (
                'Rephrase Message'
              )}
            </button>
            
            {error && (
              <div style={{
                color: '#e74c3c',
                marginTop: '16px',
                textAlign: 'center',
                padding: '12px',
                background: 'rgba(231, 76, 60, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(231, 76, 60, 0.2)'
              }}>
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Right Column - Chat History */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(255, 154, 158, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          height: 'fit-content',
          maxHeight: '600px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            color: '#e91e63',
            fontSize: '1.8rem',
            marginBottom: '30px',
            textAlign: 'center',
            fontWeight: 600
          }}>
            Conversation History
          </h2>
          
          <div style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: '10px'
          }}>
            {history.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: '#c2185b',
                padding: '40px 20px',
                fontSize: '1.1rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💬</div>
                No messages yet. Start by rephrasing your first message!
              </div>
            ) : (
              history.map((item, idx) => (
                <div key={idx} style={{
                  marginBottom: '24px',
                  padding: '20px',
                  background: 'rgba(255, 154, 158, 0.08)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 154, 158, 0.15)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      color: '#e91e63',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {item.tone} Tone
                    </span>
                    <span style={{
                      color: '#c2185b',
                      fontSize: '0.8rem'
                    }}>
                      {item.time}
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      color: '#ad1457',
                      fontWeight: 500,
                      marginBottom: '4px',
                      fontSize: '0.9rem'
                    }}>
                      Original:
                    </div>
                    <div style={{
                      background: 'rgba(255, 154, 158, 0.1)',
                      borderRadius: '8px',
                      padding: '12px',
                      color: '#333',
                      fontSize: '0.95rem',
                      lineHeight: '1.4'
                    }}>
                      "{item.sentence}"
                    </div>
                  </div>
                  
                  <div>
                    <div style={{
                      color: '#ad1457',
                      fontWeight: 500,
                      marginBottom: '4px',
                      fontSize: '0.9rem'
                    }}>
                      Rephrased:
                    </div>
                    <div style={{
                      background: '#fff',
                      borderRadius: '8px',
                      padding: '12px',
                      color: '#333',
                      fontSize: '0.95rem',
                      lineHeight: '1.4',
                      border: '1px solid #f8bbd9',
                      boxShadow: '0 2px 4px rgba(255, 154, 158, 0.1)'
                    }}>
                      {item.rephrased}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.9rem',
        padding: '30px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div style={{ marginBottom: '8px' }}>
          Powered by Gemini API & RAG Technology
        </div>
        <div>
          Built with React & Node.js | 
          <a 
            href="https://github.com" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.95)', 
              textDecoration: 'none',
              marginLeft: '8px'
            }}
          >
            View Source
          </a>
        </div>
      </footer>

      {/* Spinner Animation */}
      <style>{`
        @keyframes spin { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
      `}</style>
    </div>
  );
}