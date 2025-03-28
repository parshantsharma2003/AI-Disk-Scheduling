// src/components/DiskScheduling.js

import React, { useState } from 'react';
import './DiskScheduling.css';  // For custom CSS

const DiskScheduling = () => {
    const [requests, setRequests] = useState('');
    const [headPosition, setHeadPosition] = useState('');
    const [results, setResults] = useState(null);

    // Disk Scheduling Algorithms
    const fcfsScheduling = (reqArray, head) => {
        let totalSeekTime = 0;
        const seekSequence = [];

        reqArray.forEach((request) => {
            seekSequence.push(request);
            totalSeekTime += Math.abs(head - request);
            head = request;
        });

        return { seekSequence, totalSeekTime };
    };

    const sstfScheduling = (reqArray, head) => {
        let totalSeekTime = 0;
        const seekSequence = [];
        let remainingRequests = [...reqArray];

        while (remainingRequests.length > 0) {
            const closestRequest = remainingRequests.reduce((prev, curr) => (
                Math.abs(curr - head) < Math.abs(prev - head) ? curr : prev
            ));
            seekSequence.push(closestRequest);
            totalSeekTime += Math.abs(head - closestRequest);
            head = closestRequest;
            remainingRequests = remainingRequests.filter(r => r !== closestRequest);
        }

        return { seekSequence, totalSeekTime };
    };

    const scanScheduling = (reqArray, head, diskSize = 200) => {
        let totalSeekTime = 0;
        const seekSequence = [];
        const sortedRequests = reqArray.sort((a, b) => a - b);

        const left = sortedRequests.filter(r => r <= head);
        const right = sortedRequests.filter(r => r > head);

        // Go right first, then left
        right.forEach((r) => {
            seekSequence.push(r);
            totalSeekTime += Math.abs(head - r);
            head = r;
        });

        totalSeekTime += Math.abs(head - diskSize); // Reach the end
        head = diskSize;

        left.reverse().forEach((r) => {
            seekSequence.push(r);
            totalSeekTime += Math.abs(head - r);
            head = r;
        });

        return { seekSequence, totalSeekTime };
    };

    // Function to handle calculation on button click
    const handleCalculation = () => {
        const reqArray = requests.split(' ').map(Number);
        const head = Number(headPosition);

        const fcfsResult = fcfsScheduling(reqArray, head);
        const sstfResult = sstfScheduling(reqArray, head);
        const scanResult = scanScheduling(reqArray, head);

        setResults({
            FCFS: fcfsResult,
            SSTF: sstfResult,
            SCAN: scanResult
        });
    };

    return (
        <div className="disk-scheduling-container">
            <h2>AI-Based Disk Scheduling</h2>

            <div className="input-section">
                <input 
                    type="text"
                    placeholder="Enter disk requests (e.g., 98 183 37 122)"
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter initial head position"
                    value={headPosition}
                    onChange={(e) => setHeadPosition(e.target.value)}
                />
                <button onClick={handleCalculation}>Calculate</button>
            </div>

            {results && (
                <div className="results-section">
                    <h3>Results:</h3>
                    <div>
                        <h4>FCFS:</h4>
                        <p>Seek Sequence: {results.FCFS.seekSequence.join(', ')}</p>
                        <p>Total Seek Time: {results.FCFS.totalSeekTime}</p>
                    </div>
                    <div>
                        <h4>SSTF:</h4>
                        <p>Seek Sequence: {results.SSTF.seekSequence.join(', ')}</p>
                        <p>Total Seek Time: {results.SSTF.totalSeekTime}</p>
                    </div>
                    <div>
                        <h4>SCAN:</h4>
                        <p>Seek Sequence: {results.SCAN.seekSequence.join(', ')}</p>
                        <p>Total Seek Time: {results.SCAN.totalSeekTime}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiskScheduling;
