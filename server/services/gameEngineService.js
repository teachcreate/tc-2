import { supabase } from '../supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';

class GameEngineService {
  static async createGameSession(productId, creatorId, settings = {}) {
    const joinCode = this.generateJoinCode();
    
    const { data, error } = await supabase
      .from('game_sessions')
      .insert({
        product_id: productId,
        creator_id: creatorId,
        join_code: joinCode,
        status: 'waiting',
        settings: settings
      })
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }

  static async getGameSession(joinCode) {
    const { data, error } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('join_code', joinCode)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async startGameSession(sessionId) {
    const { data, error } = await supabase
      .from('game_sessions')
      .update({
        status: 'active',
        started_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }

  static async endGameSession(sessionId) {
    const { data, error } = await supabase
      .from('game_sessions')
      .update({
        status: 'completed',
        ended_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }

  static generateJoinCode() {
    return uuidv4().substring(0, 6).toUpperCase();
  }
}

export default GameEngineService;