import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface LiveGameInterfaceProps {
  productId: string;
  sessionId?: string;
}

const LiveGameInterface: React.FC<LiveGameInterfaceProps> = ({ productId, sessionId }) => {
  const [gameSession, setGameSession] = useState<any>(null);
  const [joinCode, setJoinCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeGame = async () => {
      setLoading(true);
      setError(null);
      try {
        if (sessionId) {
          // Join existing session
          const { data, error } = await supabase
            .from('game_sessions')
            .select('*')
            .eq('id', sessionId)
            .single();
          if (error) throw error;
          setGameSession(data);
          setJoinCode(data.join_code);
        } else {
          // Create new session
          const response = await fetch(`/api/products/${productId}/start-game`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ settings: {} }), // Default settings
          });
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Failed to create game session');
          }
          const data = await response.json();
          setGameSession(data);
          setJoinCode(data.joinCode);
        }
      } catch (err: any) {
        console.error('Error initializing game:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeGame();
  }, [productId, sessionId]);

  if (loading) return <div>Loading game...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameSession) return <div>No game session found.</div>;

  return (
    <div>
      <h2>Live Game: {gameSession.product_id}</h2>
      <p>Join Code: <strong>{joinCode}</strong></p>
      <p>Status: {gameSession.status}</p>
      {gameSession.status === 'waiting' && (
        <button onClick={() => { /* Logic to start game */ }}>Start Game</button>
      )}
      {/* Render game content based on gameSession state */}
      {/* This is a placeholder for actual game logic and display */}
      <p>Game content goes here...</p>
    </div>
  );
};

export default LiveGameInterface;