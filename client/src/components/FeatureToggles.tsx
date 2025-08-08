import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface FeatureTogglesProps {
  productId: string;
}

const FeatureToggles: React.FC<FeatureTogglesProps> = ({ productId }) => {
  const [productFeatures, setProductFeatures] = useState({
    supports_grading: false,
    supports_live_game: false,
    lms_integration_enabled: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductFeatures = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('supports_grading, supports_live_game, lms_integration_enabled')
          .eq('id', productId)
          .single();
        
        if (error) throw error;
        setProductFeatures(data);
      } catch (err: any) {
        console.error('Error fetching product features:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductFeatures();
  }, [productId]);

  const handleToggleChange = async (feature: keyof typeof productFeatures) => {
    setMessage(null);
    setError(null);
    const newValue = !productFeatures[feature];
    setProductFeatures(prev => ({ ...prev, [feature]: newValue }));

    try {
      const { error } = await supabase
        .from('products')
        .update({ [feature]: newValue })
        .eq('id', productId);

      if (error) throw error;
      setMessage(`${feature.replace(/_/g, ' ')} updated successfully!`);
    } catch (err: any) {
      console.error('Error updating feature:', err);
      setError(err.message);
      setProductFeatures(prev => ({ ...prev, [feature]: !newValue })); // Revert on error
    }
  };

  if (loading) return <div>Loading feature toggles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Product Features</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={productFeatures.supports_grading}
            onChange={() => handleToggleChange('supports_grading')}
          />
          Enable Grading
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={productFeatures.supports_live_game}
            onChange={() => handleToggleChange('supports_live_game')}
          />
          Enable Live Game Mode
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={productFeatures.lms_integration_enabled}
            onChange={() => handleToggleChange('lms_integration_enabled')}
          />
          Enable LMS Integration
        </label>
      </div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FeatureToggles;