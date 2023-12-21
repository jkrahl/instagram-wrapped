import { useState } from 'react';

function FileRequestPage(props: {
    handleFileCallback: ((file: File) => void)
}) {
    const [file, setFile] = useState<File | undefined>(undefined);

    return (
        <form action="" onSubmit={
            async (e) => {
                e.preventDefault();
                if (file) {
                    props.handleFileCallback(file);
                }
            }
        }>
                <input
                    type="file"
                    name="file"
                    id="file"
                    required
                    onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />
                {
                    file ? (
                        <div>
                            <p>File Selected: {file.name}</p>
                            <input type="submit" value="Submit" />
                        </div>
                    ) : (
                        <p>No file selected</p>
                    )
                }
            </form>
    )
}

export default FileRequestPage;