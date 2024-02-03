import React, { useEffect, useState } from "react";
import './popup.css'

function mergeArraysToMap(keys: string[], values: string[]): { [key: string]: string } {
    if (keys.length !== values.length) {
      throw new Error("The number of keys and values must be the same.");
    }
  
    // Use reduce to create the key/value map
    const mergedMap: { [key: string]: string } = keys.reduce((map, key, index) => {
      map[key] = values[index];
      return map;
    }, {});
  
    return mergedMap;
  }

const Popup = () => {
    const [recordedTexts, setRecordedTexts] = useState<string[]>([]);
    const [recordedURLs, setRecordedURLs] = useState<string[]>([]);

    useEffect(() => {
        // Listen for messages from background script
        chrome.runtime.onMessage.addListener((message) => {
            if (message.action === 'updateUI') {
                updateUI();
            }
        });

        // Update UI with recorded texts
        updateUI();
    }, []);

    const updateUI = () => {
        chrome.storage.local.get({ recordedTexts: [], recordedURLs:[] }, (result) => {
            const texts = result.recordedTexts;
            const URLs = result.recordedURLs;
            setRecordedTexts(texts);
            setRecordedURLs(URLs);
            console.log(texts);
            console.log(URLs);
        });
    };

    const clearUI = () => {
        chrome.storage.local.set({ recordedTexts: [], recordedURLs: [] }).then(() => {
        })
        updateUI();
    }
    const logResults = () => {
        console.log(recordedTexts);
        console.log(recordedURLs);
    }

    return (
        <div className="bg-green-400">
            {/* <h1 className="text-4xl text-blue-400">Hello World</h1> */}
            <div className="flex gap-2">
                <button className="bg-orange-400" onClick={clearUI}>Clear</button>
                <button className="bg-orange-400" onClick={logResults}>Log Texts</button>
            </div>
            <div className="w-full h-[400px] overflow-y-scroll bg-red-300">
                <h2>Recorded Texts</h2>
                
                <ul>
                    <li>
                        <div className="w-[100%] max-h-8 mb-1 flex flex-auto gap-1 text-center font-bold">
                            <span className="bg-blue-400 w-[10%]">S.No</span>
                            <span className="bg-blue-500 w-[40%]">URL</span>
                            <span className="bg-blue-600 w-[50%]">Text</span>
                        </div>
                    </li>
                    {recordedTexts.map((text, index) => (
                        <li key={index+1}>
                            <div className="w-[100%] max-h-8 mb-1 flex flex-auto gap-1">
                                <span className="bg-blue-400 w-[10%] overflow-auto text-wrap:wrap">{index+1}</span>
                                <span className="bg-blue-500 w-[40%] overflow-y-scroll overflow-x-hidden text-wrap:wrap">{recordedURLs[index]}</span>
                                <span className="bg-blue-600 w-[50%] overflow-y-scroll text-wrap:wrap">{text}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default Popup;