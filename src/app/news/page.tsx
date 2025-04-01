'use client';

import { useState, useEffect } from 'react';
import newsData from '@/content/news.json';

const typeColors = {
  publication: 'bg-blue-100 text-blue-800',
  award: 'bg-yellow-100 text-yellow-800',
  presentation: 'bg-purple-100 text-purple-800',
  teaching: 'bg-green-100 text-green-800',
  service: 'bg-orange-100 text-orange-800',
  position: 'bg-indigo-100 text-indigo-800',
  project: 'bg-pink-100 text-pink-800',
  education: 'bg-teal-100 text-teal-800',
  event: 'bg-gray-100 text-gray-800'
};

const typeLabels = {
  publication: 'Publication',
  award: 'Award',
  position: 'Position',
  education: 'Education',
};

// Helper function to extract year from date
const getYear = (date: string) => {
  const year = date.split(' ').pop();
  return year || 'Other';
};

export default function News() {
  // Group news items by year
  const groupedNews = newsData.newsItems.reduce((acc, item) => {
    const year = getYear(item.date);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {} as Record<string, typeof newsData.newsItems>);

  // Get the most recent year from the data
  const years = Object.keys(groupedNews).sort((a, b) => parseInt(b) - parseInt(a));
  const mostRecentYear = years[0];
  const secondMostRecentYear = years[1];
  
  // Initialize state with the two most recent years expanded
  const [expandedYears, setExpandedYears] = useState<Set<string>>(
    new Set([mostRecentYear, secondMostRecentYear])
  );

  // Add state for type filter
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Filter news items by selected type
  const filteredGroupedNews = Object.entries(groupedNews).reduce((acc, [year, items]) => {
    const filteredItems = selectedType
      ? items.filter(item => item.type === selectedType)
      : items;
    
    if (filteredItems.length > 0) {
      acc[year] = filteredItems;
    }
    return acc;
  }, {} as Record<string, typeof newsData.newsItems>);

  // Update expanded years when filter changes
  useEffect(() => {
    const filteredYears = Object.entries(filteredGroupedNews)
      .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
      .map(([year]) => year);

    if (filteredYears.length > 0) {
      setExpandedYears(new Set([filteredYears[0]]));
    }
  }, [selectedType]);

  const toggleYear = (year: string) => {
    setExpandedYears(prev => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">News & Updates</h1>
      
      {/* Add type filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedType(null)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedType === null
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {Object.entries(typeLabels).map(([type, label]) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedType === type
                ? typeColors[type as keyof typeof typeColors]
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      
      <div className="space-y-8">
        {Object.entries(filteredGroupedNews)
          .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
          .map(([year, items]) => (
            <div key={year} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleYear(year)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left"
              >
                <h2 className="text-xl font-semibold text-gray-900">{year}</h2>
                <span className="text-gray-500">
                  {expandedYears.has(year) ? '▼' : '▶'}
                </span>
              </button>
              
              {expandedYears.has(year) && (
                <div className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <article key={index} className="p-6 bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">{item.date}</div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          {(item.conference || item.journal) && (
                            <div className="text-sm text-blue-600 mt-1">
                              {item.conference || item.journal}
                            </div>
                          )}
                        </div>
                        {item.type && (
                          <span className={`px-3 py-1 text-sm rounded-full ${typeColors[item.type as keyof typeof typeColors]}`}>
                            {typeLabels[item.type as keyof typeof typeLabels]}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      
                      {item.links && item.links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                            >
                              {link.text}
                            </a>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
} 