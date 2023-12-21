import JSZip, { JSZipObject } from 'jszip';

interface Relationship {
    username: string;
    timestamp: Date;
}

class InstagramData {
    followers: Relationship[] = [];
    following: Relationship[] = [];

    public async init(file: File) {
        let zip = await JSZip.loadAsync(file);
        await this.iterateFiles(
            zip,
            /\/followers_\d*.json$/,
            this.getFollowers
        );
        await this.iterateFiles(zip, /\/following\.json$/, this.getFollowing);
    }

    private iterateFiles = async (
        zip: JSZip,
        regex: RegExp,
        fn: (file: JSZipObject) => Promise<void>
    ) => {
        const files = zip.file(regex);
        if (!files) {
            throw new Error('No files found with regex: ' + regex);
        }

        // For each file, call the function
        for (const file of files) {
            await fn(file);
        }
    };

    private getFollowers = async (file: JSZipObject) => {
        const text = await file.async('text');
        const json: any[] = JSON.parse(text);

        json.forEach((userObj: any) => {
            const username = userObj['string_list_data'][0]['value'];
            const timestampSeconds = userObj['string_list_data'][0]['timestamp'];
            this.followers.push({
                username: username,
                timestamp: new Date(parseInt(timestampSeconds, 10) * 1000),
            });
        }, this);
    };

    private getFollowing = async (file: JSZipObject) => {
        const text = await file.async('text');
        const json: any = JSON.parse(text);

        json['relationships_following'].forEach((userObj: any) => {
            const username = userObj['string_list_data'][0]['value'];
            const timestampSeconds = userObj['string_list_data'][0]['timestamp'];
            this.following.push({
                username: username,
                timestamp: new Date(parseInt(timestampSeconds, 10) * 1000),
            });
        }, this);
    };

    public getFollowingThatDontFollowBack = () => {
        return this.following.filter((user) => {
            return !this.followers.find((follower) => {
                return follower.username === user.username;
            });
        });
    };
}

export default InstagramData;
