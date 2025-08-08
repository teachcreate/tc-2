import { supabase } from '../supabaseClient.js';

export const signupUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error signing up user:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error signing up user:', error);
    return { error };
  }
};

export const signinUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error signing in user:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error signing in user:', error);
    return { error };
  }
};