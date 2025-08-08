import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface LMSIntegrationUIProps {
  userId: string;
  productId: string;
}

const LMSIntegrationUI: React.FC<LMSIntegrationUIProps> = ({ userId, productId }) => {
  const [lmsConnections, setLmsConnections] = useState<any[]>([]);
  const [selectedLMS, setSelectedLMS] = useState<string>('');
  const [assignmentData, setAssignmentData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLMSConnections = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('lms_integrations')
          .select('*')
          .eq('user_id', userId);
        
        if (error) throw error;
        setLmsConnections(data);
      } catch (err: any) {
        console.error('Error fetching LMS connections:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLMSConnections();
  }, [userId]);

  const handleLMSChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLMS(e.target.value);
    setAssignmentData({}); // Clear previous assignment data
  };

  const handleAssignmentDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignmentData({
      ...assignmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssign = async () => {
    setMessage(null);
    setError(null);
    try {
      if (!selectedLMS) {
        throw new Error('Please select an LMS connection.');
      }

      const selectedConnection = lmsConnections.find(conn => conn.id === selectedLMS);
      if (!selectedConnection) {
        throw new Error('Selected LMS connection not found.');
      }

      const response = await fetch(`/api/products/${productId}/assign-lms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          integrationId: selectedConnection.id,
          assignmentData: {
            ...assignmentData,
            productId: productId, // Ensure product ID is passed
          },
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to assign to LMS');
      }

      const result = await response.json();
      setMessage(`Successfully assigned to LMS! URL: ${result.url}`);
    } catch (err: any) {
      console.error('Error assigning to LMS:', err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading LMS integrations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>LMS Integration</h2>
      {lmsConnections.length === 0 ? (
        <p>No LMS connections found. Please connect an LMS account.</p>
      ) : (
        <div>
          <label>Select LMS Connection:</label>
          <select value={selectedLMS} onChange={handleLMSChange}>
            <option value="">-- Select --</option>
            {lmsConnections.map((conn) => (
              <option key={conn.id} value={conn.id}>
                {conn.provider} ({conn.external_id})
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLMS && (
        <div>
          <h3>Assignment Details</h3>
          {/* Example: Google Classroom specific fields */}
          {lmsConnections.find(conn => conn.id === selectedLMS)?.provider === 'google_classroom' && (
            <div>
              <label>Course ID:</label>
              <input
                type="text"
                name="courseId"
                value={assignmentData.courseId || ''}
                onChange={handleAssignmentDataChange}
                placeholder="Google Classroom Course ID"
              />
              <label>Assignment Title:</label>
              <input
                type="text"
                name="title"
                value={assignmentData.title || ''}
                onChange={handleAssignmentDataChange}
                placeholder="Assignment Title"
              />
            </div>
          )}
          <button onClick={handleAssign}>Assign to LMS</button>
        </div>
      )}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LMSIntegrationUI;