import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface QuestionType {
  id: string;
  name: string;
  schema: any;
}

interface QuestionEditorProps {
  productId: string;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ productId }) => {
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [questionData, setQuestionData] = useState<any>({});

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      const { data, error } = await supabase
        .from('question_types')
        .select('*');

      if (error) {
        console.error('Error fetching question types:', error);
      } else {
        setQuestionTypes(data as QuestionType[]);
      }
    };

    fetchQuestionTypes();
  }, []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/products/${productId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type_id: selectedType,
          data: questionData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add question');
      }

      // Handle success (e.g., clear form, show message)
      console.log('Question added successfully!');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Question Editor</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Question Type:</label>
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">-- Select --</option>
          {questionTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Feature Toggles */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Enable Features:</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Enable Grading</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Enable Live Game</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Enable Class Roster</span>
          </label>
        </div>
      </div>

      {selectedType && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Question Data:</label>
          <input
            type="text"
            name="questionText"
            placeholder="Question Text"
            onChange={handleDataChange}
            className="w-full border px-4 py-2 rounded mb-2"
          />
          <input
            type="text"
            name="answer"
            placeholder="Answer"
            onChange={handleDataChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
      )}

      <div className="text-right">
        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default QuestionEditor;