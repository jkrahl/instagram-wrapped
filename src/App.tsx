import { useState } from 'react';
import './App.css';
import InstagramData from './lib/instagram-data';
import InstagramWrapped from './components/InstagramWrapped/InstagramWrapped';
import FileRequestPage from './components/FileRequestPage/FileRequestPage';

function App() {
    const [data, setData] = useState<InstagramData | undefined>(undefined);
    const loadFile = (file: File) => {
        if (file) {
            const instagramData = new InstagramData();
            instagramData.init(file).then(() => {
                setData(instagramData);
            });
        }
    };

    return (
        <div className="App">
            <h1>Instagram Wrapped</h1>
            {data ? (
                <InstagramWrapped data={data} />
            ) : (
                <FileRequestPage handleFileCallback={loadFile} />
            )}
        </div>
    );
}

export default App;
