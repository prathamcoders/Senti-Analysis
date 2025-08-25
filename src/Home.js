import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Check } from 'lucide-react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Jan', positive: 4000, negative: 2400, neutral: 2400 },
  { name: 'Feb', positive: 3000, negative: 1398, neutral: 2210 },
  { name: 'Mar', positive: 2000, negative: 9800, neutral: 2290 },
  { name: 'Apr', positive: 2780, negative: 3908, neutral: 2000 },
  { name: 'May', positive: 1890, negative: 4800, neutral: 2181 },
  { name: 'Jun', positive: 2390, negative: 3800, neutral: 2500 },
];
const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/visualize');
    }
    const handleClick1 = () => {
        navigate('/FindSentiment');
    }
    
    return (
    <div className="bg-gray-100 min-h-screen">
      <main className="w-full p-6">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Understand Your Audience</h2>
          <p className="text-lg mb-6">
            Senti-Analyzer uses cutting-edge AI to analyze sentiment across your digital platforms.
            Get real-time insights into how your audience feels about your brand, products, or services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {['Social Media', 'Customer Reviews', 'Support Tickets'].map((source) => (
              <div key={source} className="Home-card">
                <h3 className="text-xl font-semibold mb-2">{source}</h3>
                <p>Analyze sentiment from {source.toLowerCase()} to improve customer satisfaction.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Powerful Visualization</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  height={40} 
                  tick={{fill: '#666'}} 
                  tickLine={{stroke: '#666'}} 
                  axisLine={{stroke: '#666'}}/>
                <YAxis  width={80} 
                  tick={{fill: '#666'}} 
                  tickLine={{stroke: '#666'}} 
                  axisLine={{stroke: '#666'}}
                  />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="positive" stroke="#8884d8" />
                <Line type="monotone" dataKey="negative" stroke="#82ca9d" />
                <Line type="monotone" dataKey="neutral" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Real-time sentiment analysis',
              'Multi-platform integration',
              'Customizable dashboards',
              'Trend forecasting',
              'Competitor benchmarking',
              'Automated reporting'
            ].map((feature) => (
              <li key={feature} className="flex items-center">
                <Check className="text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Get Started Today</h2>
          <p className="text-lg mb-6">
            Transform your customer insights with Senti-Analyzer. Sign up for a free trial and see the difference.
          </p>
          <button className="Csv" onClick={handleClick}>
            Start Free Trial(CSV File)
          </button>
          <br />
          <br />
          <button className="single" onClick={handleClick1}>
            Start Free Trial(Single Comment)
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;