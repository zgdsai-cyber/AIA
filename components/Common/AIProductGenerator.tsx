'use client';

import React from 'react';
import { generateProductDescription, isAIAvailable } from '@/lib/gemini';

interface AIProductGeneratorProps {
  productName: string;
  category?: string;
  price?: number;
  onDescriptionGenerated?: (description: string) => void;
}

export const AIProductGenerator: React.FC<AIProductGeneratorProps> = ({
  productName,
  category,
  price,
  onDescriptionGenerated,
}) => {
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const aiAvailable = isAIAvailable();

  const handleGenerateDescription = async () => {
    if (!aiAvailable) {
      setError('Google AI not configured. Add NEXT_PUBLIC_GOOGLE_AI_KEY to .env');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const generated = await generateProductDescription(productName, {
        category,
        price,
      });

      if (generated) {
        setDescription(generated);
        onDescriptionGenerated?.(generated);
      } else {
        setError('Failed to generate description');
      }
    } catch (err) {
      setError('Error generating description');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!aiAvailable) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          🔧 AI features not configured. Add NEXT_PUBLIC_GOOGLE_AI_KEY to .env.local
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        <h3 className="font-semibold">AI Product Description Generator</h3>
      </div>

      {description && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={handleGenerateDescription}
        disabled={isLoading}
        className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
          isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isLoading ? '⏳ Generating...' : '✨ Generate Description'}
      </button>
    </div>
  );
};
