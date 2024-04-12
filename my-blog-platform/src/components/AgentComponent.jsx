import React, { useState } from 'react';
import './AgentComponent.css';

function App() {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetRecommendation = async () => {
    setLoading(true); // Set loading state to true while fetching recommendation
    try {
      const response = await fetch("http://localhost:5000/api/recommendation");
      const data = await response.json();

      if (response.ok) {
        // Split the recommendation string by new line characters
        const recommendationArray = data.recommendation.split("\n\n");
        // Map through the array and add line breaks after each number
        const formattedRecommendation = recommendationArray.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ));
        setRecommendation(formattedRecommendation);
      } else {
        console.error("Error getting recommendation:", data.error);
        setRecommendation("Error getting recommendation. Please try again later.");
      }
    } catch (error) {
      console.error("Error getting recommendation:", error);
      setRecommendation("Error getting recommendation. Please try again later.");
    } finally {
      setLoading(false); // Set loading state back to false when request is complete
    }
  };

  return (
    <div className="App">
      <h1>Recommendation App</h1>
      <button onClick={handleGetRecommendation}>Get Recommendation</button>
      {loading && <p>Loading...</p>} {/* Show "Loading..." message when loading is true */}
      {!loading && recommendation && <div className="recommendation">{recommendation}</div>} {/* Show recommendation when not loading and recommendation is available */}
    </div>
  );
}

export default App;
