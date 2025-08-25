// src/Dashboard.js
import axios from 'axios';
import { BarChart as BarChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Button from './Button';
import { Card, CardContent, CardHeader } from './Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/results');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const sentimentCounts = results.reduce((acc, result) => {
    acc[result.sentiment] = (acc[result.sentiment] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(sentimentCounts).map(([sentiment, count]) => ({
    sentiment,
    count
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gujarati Sentiment Analysis Dashboard</h1>

      {results.length > 0 && (
        <>
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">Sentiment Distribution</h2>
              <div className="flex">
                <Button 
                  variant={chartType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                  className="mr-2"
                >
                  <BarChartIcon className="mr-1" size={16} />
                  Bar
                </Button>
                <Button 
                  variant={chartType === 'pie' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('pie')}
                  className="mr-2"
                >
                  <PieChartIcon className="mr-1" size={16} />
                  Pie
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {chartType === 'bar' ? (
                  <BarChart data={chartData}>
                    <XAxis dataKey="sentiment" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill={({ index }) => COLORS[index % COLORS.length]}>
                      {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ sentiment, percent }) => `${sentiment} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                    formatter={(value) => {
                      const sentimentLabels = {
                        0: 'Positive',
                        1: 'Neutral',
                        2: 'Negative'
                      };
                      return sentimentLabels[value] || value; // Convert 0, 1, 2 to labels
                    }}
                    />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Analysis Results</h2>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead className="w-[150px]">Sentiment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {results.map((result, index) => (
                  <TableRow key={result.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{result.text}</TableCell>
                    <TableCell>{result.sentiment}</TableCell>
                  </TableRow>
                  ))}

                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;
