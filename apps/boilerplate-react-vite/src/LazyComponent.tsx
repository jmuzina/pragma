import React, { useState, useEffect } from 'react';

const LazyComponent = () => {
  const [data, setData] = useState<{ title: string; body: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Simulating async operation with a Promise
  const simulateAsyncOperation = (): Promise<{ title: string; body: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = {
            title: 'Async Data Loaded',
            body: 'This is some example content loaded after a delay.',
          };
          resolve(result);  // Resolve the Promise with data
        } catch (err) {
          reject(new Error('Failed to load data'));  // Reject the Promise if something goes wrong
        }
      }, 3000);  // Simulate a 3-second delay
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await simulateAsyncOperation();
        setData(result);  // Set the data when the Promise resolves
      } catch (err) {
        setError(err as Error);  // Set the error if the Promise rejects
      } finally {
        setLoading(false);  // Always stop loading when the operation is finished
      }
    };

    fetchData();  // Call the async function inside useEffect
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <span>
        <b>{data?.title}</b>
        {data?.body}
      </span>
    </div>
  );
};

export default LazyComponent;
