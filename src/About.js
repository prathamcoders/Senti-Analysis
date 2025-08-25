import React from 'react';
import { Check } from 'lucide-react';
import './AboutUs.css'; // Make sure to create this CSS file
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const features = [
    'Real-time sentiment analysis',
    'Multi-platform integration',
    'Customizable dashboards',
    'Trend forecasting',
    'Competitor benchmarking',
    'Automated reporting'
  ];
  const navigate = useNavigate();
    const handleClick = () => {
        navigate('/visualize');
    }
  const reasons = [
    { title: 'Accuracy', description: 'Our advanced AI consistently outperforms industry benchmarks.' },
    { title: 'Real-time Insights', description: 'Get up-to-the-minute sentiment analysis across all your digital platforms.' },
    { title: 'Customization', description: 'Our dashboards are tailored to meet your specific industry needs.' },
    { title: 'User-Friendly Interface', description: 'Our intuitive platform makes sentiment analysis accessible to both experts and newcomers.' },
    { title: 'Comprehensive Analysis', description: 'From social media to support tickets, we cover all your bases.' },
    { title: 'Continuous Innovation', description: "We're always improving our technology to stay ahead of the curve." }
  ];

  return (
    <div className="about-us">
      <main className="about-us-main">
        <h1 className="about-us-title">About Us - Senti-Analyzer</h1>

        <section className="about-us-section">
          <h2 className="about-us-section-title">Our Mission</h2>
          <p className="about-us-text">
            At Senti-Analyzer, we're passionate about helping you understand your audience. Our mission is to empower businesses with real-time insights into how their audience feels about their brand, products, or services across digital platforms.
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-section-title">What We Do</h2>
          <p className="about-us-text">
            We specialize in advanced sentiment analysis, utilizing cutting-edge AI to analyze sentiment across various digital platforms, including:
          </p>
          <div className="about-us-grid">
            {['Social Media', 'Customer Reviews', 'Support Tickets'].map((source) => (
              <div key={source} className="about-us-card">
                <h3 className="about-us-card-title">{source}</h3>
                <p>Analyze sentiment from {source.toLowerCase()} to improve customer satisfaction.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-section-title">Key Features</h2>
          <ul className="about-us-features">
            {features.map((feature) => (
              <li key={feature} className="about-us-feature">
                <Check className="about-us-check-icon" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-section-title">Powerful Visualization</h2>
          <p className="about-us-text">
            We believe in the power of data visualization. Our intuitive charts and graphs help you quickly understand sentiment trends over time, allowing you to make data-driven decisions with confidence.
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-section-title">Our Technology</h2>
          <p className="about-us-text">
            Our diverse team of data scientists, linguists, and software engineers brings together expertise from various fields to deliver the most accurate and reliable sentiment analysis tools available. We use state-of-the-art natural language processing and machine learning techniques to ensure the highest level of accuracy in our analyses.
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-section-title">Why Choose Senti-Analyzer?</h2>
          <div className="about-us-grid">
            {reasons.map((reason, index) => (
              <div key={index} className="about-us-card">
                <h3 className="about-us-card-title">{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-section-title">Get Started Today</h2>
          <p className="about-us-text">
            Ready to transform your customer insights with Senti-Analyzer? Sign up for a free trial and see the difference our powerful sentiment analysis can make for your business.
          </p>
          <button className="about-us-button" onClick={handleClick}>
            Start Free Trial
          </button>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;