import React, { useState } from 'react';
import './Sentiment.css';

const Sentiment = () => {
    const [inputText, setInputText] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // State to store validation error

    // Regex to match only valid Gujarati characters, Gujarati digits, spaces, and punctuation.
    const gujaratiRegex = /[\u0A80-\u0AFF\u0966-\u096F\s.,!?-]/g;

    const analyzeSentiment = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/sentiment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: inputText })
            });

            const data = await response.json();
            setSentiment(data.sentiment);
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            setSentiment('Error');
        }

        setLoading(false);
    };

    const handleKeyboardInput = (character) => {
        const updatedText = inputText + character;
        if (gujaratiRegex.test(updatedText)) {
            setInputText(updatedText);
            setError(''); // Clear error if valid
        } else {
            setError('Only Gujarati text is allowed.'); // Set error if invalid
        }
    };

    const handleInputChange = (e) => {
        const newText = e.target.value;
        const cleanedText = newText.match(gujaratiRegex)?.join('') || ''; // Keep only valid Gujarati characters
        setInputText(cleanedText);
        if (newText !== cleanedText) {
            setError('Only Gujarati text is allowed.'); // Show error if invalid characters were removed
        } else {
            setError(''); // Clear error if valid
        }
    };

    const handlePaste = (e) => {
        // Get the pasted text
        const pastedText = e.clipboardData.getData('Text');
        
        // Clean up the pasted text to only include valid Gujarati characters
        const cleanedText = pastedText.match(gujaratiRegex)?.join('') || '';
        
        // Update the input with the cleaned text
        setInputText((prevText) => prevText + cleanedText);
        
        if (cleanedText !== pastedText) {
            setError('Only Gujarati text is allowed.'); // Set error if invalid characters were removed
        } else {
            setError(''); // Clear error if valid
        }

        e.preventDefault(); // Prevent default paste behavior to control it ourselves
    };

    const gujaratiKeyboard = [
        'અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'એ', 'ઐ', 'ઓ', 'ઔ',
        'ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ',
        'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન',
        'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'વ', 'શ',
        'ષ', 'સ', 'હ', "૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯",' '
    ];

    return (
        <div className="sentiment-card">
            <div className="sentiment-header">
                <h2>Gujarati Sentiment Analysis</h2>
            </div>
            <div className="sentiment-content">
                <input
                    className="sentiment-input"
                    placeholder="Enter Gujarati text"
                    value={inputText}
                    onChange={handleInputChange}
                    onPaste={handlePaste} // Handle paste event
                />
                {error && <div className="error-message">{error}</div>} {/* Error message */}
                <div className="sentiment-keyboard">
                    {gujaratiKeyboard.map((char) => (
                        <button
                            key={char}
                            className="sentiment-button"
                            onClick={() => handleKeyboardInput(char)}
                        >
                            {char}
                        </button>
                    ))}
                </div>
                <button
                    className={`analyze ${loading ? 'disabled' : ''}`}
                    onClick={analyzeSentiment}
                    disabled={loading || error !== ''} // Disable if there's an error
                >
                    Analyze Sentiment
                </button>
                {loading ? (
                    <div className="sentiment-result">Analyzing...</div>
                ) : (
                    sentiment && (
                        <div className="sentiment-result">Sentiment: {sentiment}</div>
                    )
                )}
            </div>
        </div>
    );
};

export default Sentiment;
