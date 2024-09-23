
// import React, { useState, useEffect } from 'react';
// import './Chat.css';
// import { api } from '../../api/api'; // Adjust the import path as necessary

// function Chat() {
//   const [textPrompt, setTextPrompt] = useState('');
//   const [textResult, setTextResult] = useState('');
//   const [taskId, setTaskId] = useState(null);
//   const [textModels, setTextModels] = useState([]);
//   const [selectedTextModel, setSelectedTextModel] = useState('');
  
//   // Image generation states
//   const [imagePrompt, setImagePrompt] = useState('');
//   const [imageNegativePrompt, setImageNegativePrompt] = useState('');
//   const [imageWidth, setImageWidth] = useState(512); // default value
//   const [imageHeight, setImageHeight] = useState(512); // default value
//   const [imageResult, setImageResult] = useState('');

//   // Status state
//   const [apiStatus, setApiStatus] = useState('');
  
//   // Task status result
//   const [taskStatusResult, setTaskStatusResult] = useState('');

//   useEffect(() => {
//     const fetchTextModels = async () => {
//       try {
//         const response = await api.post('api/text-models'); // Use GET for fetching models
//         setTextModels(response.data);
//       } catch (error) {
//         console.error('Error fetching text models:', error);
//       }
//     };

//     fetchTextModels();
//   }, []);

//   useEffect(() => {
//     if (taskId) {
//       const checkTaskStatus = async () => {
//         try {
//           const response = await api.post(`api/task-status`, {taskId});
//           console.log('Task Status Response:', response.data);

//           if (response.data.done) {
//             if (response.data.generations.length > 0) {
//               setTaskStatusResult(response.data.generations[0].text);
//               setTextResult(response.data.generations[0].text);
//             } else {
//               setTaskStatusResult('No result found.');
//               setTextResult('No result found.');
//             }
//           } else if (response.data.faulted) {
//             setTaskStatusResult('Error generating text');
//             setTextResult('Error generating text');
//           } else {
//             setTaskStatusResult('Processing...');
//             setTimeout(checkTaskStatus, 3000); // Poll every 3 seconds
//           }
//         } catch (error) {
//           console.error('Error checking task status:', error);
//           setTaskStatusResult('Error checking task status');
//           setTextResult('Error checking task status');
//         }
//       };
//       checkTaskStatus();
//     }
//   }, [taskId]);

//   const handleTextSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('api/generate-text', { 
//         prompt: textPrompt,
//         model: selectedTextModel
//       });
//       console.log('API Response:', response.data);
//       if (response.data.id) {
//         setTaskId(response.data.id);
//       } else {
//         setTextResult('Error generating text');
//       }
//     } catch (error) {
//       console.error('Error generating text:', error);
//       setTextResult('Error generating text');
//     }
//   };

//   const handleImageSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('api/generate-image', {
//         prompt: imagePrompt,
//         negative_prompt: imageNegativePrompt,
//         width: parseInt(imageWidth, 10),
//         height: parseInt(imageHeight, 10)
//       });
//       if (response.data.error) {
//         setImageResult('Error generating image');
//       } else {
//         const imgSrc = `data:image/png;base64,${response.data}`;
//         setImageResult(<img src={imgSrc} alt="Generated" />);
//       }
//     } catch (error) {
//       console.error('Error generating image:', error);
//       setImageResult('Error generating image');
//     }
//   };

//   const checkStatus = async () => {
//     try {
//       const response = await api.get('api/status'); // Use GET for checking status
//       setApiStatus(response.data.ok ? 'OK' : 'Not OK');
//     } catch (error) {
//       console.error('Error checking status:', error);
//       setApiStatus('Error checking status');
//     }
//   };

//   return (
//     <div className="Chat">
//       <h1>AI Horde API Interface</h1>

//       {/* Text Models */}
//       <h2>Text Models</h2>
//       <select
//         value={selectedTextModel}
//         onChange={(e) => setSelectedTextModel(e.target.value)}
//       >
//         <option value="">Select a model</option>
//         {textModels.map((model) => (
//           <option key={model.id} value={model.id}>
//             {model.name} (Workers: {model.workers})
//           </option>
//         ))}
//       </select>

//       {/* Text Generation Form */}
//       <h2>Generate Text</h2>
//       <form onSubmit={handleTextSubmit}>
//         <textarea
//           value={textPrompt}
//           onChange={(e) => setTextPrompt(e.target.value)}
//           rows="4"
//           placeholder="Enter your text prompt"
//         />
//         <button type="submit">Generate Text</button>
//       </form>
//       <div className="result">
//         <textarea
//           value={taskStatusResult}
//           readOnly
//           rows="10"
//           placeholder="Task status result will appear here..."
//         />
//       </div>

//       {/* Image Generation Form */}
//       <h2>Generate Image</h2>
//       <form onSubmit={handleImageSubmit}>
//         <textarea
//           value={imagePrompt}
//           onChange={(e) => setImagePrompt(e.target.value)}
//           rows="4"
//           placeholder="Enter your image prompt"
//         />
//         <input
//           type="text"
//           value={imageNegativePrompt}
//           onChange={(e) => setImageNegativePrompt(e.target.value)}
//           placeholder="Enter negative prompt"
//         />
//         <input
//           type="number"
//           value={imageWidth}
//           onChange={(e) => setImageWidth(e.target.value)}
//           placeholder="Width"
//           min="1"
//         />
//         <input
//           type="number"
//           value={imageHeight}
//           onChange={(e) => setImageHeight(e.target.value)}
//           placeholder="Height"
//           min="1"
//         />
//         <button type="submit">Generate Image</button>
//       </form>
//       <div className="result">
//         {imageResult}
//       </div>

//       {/* Status Check */}
//       <h2>Status Check</h2>
//       <button onClick={checkStatus}>Check Status</button>
//       <div className="result">
//         <p>Status: {apiStatus}</p>
//       </div>
//     </div>
//   );
// }

// export default Chat;
// src/ChatComponent.js
import React, { useState, useEffect } from 'react';
import { fetchTextWorkers, fetchTextModels, generateText, generateImage, checkTaskStatus } from '../../api/apiService';

const Chat = () => {
    const [textWorkers, setTextWorkers] = useState([]);
    const [textModels, setTextModels] = useState([]);
    const [inputText, setInputText] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [imagePrompt, setImagePrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
    const [taskId, setTaskId] = useState(null);
    const [polling, setPolling] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const workersResponse = await fetchTextWorkers();
                setTextWorkers(workersResponse.data);

                const modelsResponse = await fetchTextModels();
                setTextModels(modelsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        loadData();
    }, []);

    const handleGenerateText = async () => {
        try {
            const response = await generateText({ prompt: inputText });
            setTaskId(response.data.id);
            setPolling(true);
        } catch (error) {
            console.error('Error generating text:', error);
        }
    };

    useEffect(() => {
        let interval;

        if (polling && taskId) {
            interval = setInterval(async () => {
                try {
                    const response = await checkTaskStatus(taskId);
                    if (response.data.status === 'completed') {
                        setGeneratedText(response.data.text);
                        setPolling(false);
                        clearInterval(interval);
                    } else if (response.data.status === 'failed') {
                        console.error('Text generation failed');
                        setPolling(false);
                        clearInterval(interval);
                    }
                } catch (error) {
                    console.error('Error checking task status:', error);
                }
            }, 3000);  // Check every 3 seconds
        }

        return () => clearInterval(interval);  // Cleanup interval on component unmount
    }, [polling, taskId]);

    const handleGenerateImage = async () => {
        try {
            const response = await generateImage({ prompt: imagePrompt });
            setGeneratedImage(response.data.imageUrl);
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };

    return (
        <div>
            <h1>Chat with AI</h1>
            <div>
                <h2>Text Generation</h2>
                <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} />
                <button onClick={handleGenerateText}>Generate Text</button>
                <p>Generated Text: {generatedText}</p>
            </div>
            <div>
                <h2>Image Generation</h2>
                <textarea value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} />
                <button onClick={handleGenerateImage}>Generate Image</button>
                {generatedImage && <img src={generatedImage} alt="Generated" />}
            </div>
        </div>
    );
};

export default Chat;
