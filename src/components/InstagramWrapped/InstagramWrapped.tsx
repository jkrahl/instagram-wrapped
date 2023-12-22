import InstagramData from '../../../packages/instagram-data';

function InstagramWrapped(props: { data: InstagramData }) {
    const { data } = props;
    
    return (
        <div className="InstagramWrapped">
            {data.followers.length != 0 ? (
                <div>
                    <h1>Instagram Wrapped</h1>
                    <h2>Followers</h2>
                    <ul>
                        {data.followers.map((follower) => {
                            return (
                                <li key={follower.username}>
                                    {follower.username} since{' '}
                                    {follower.timestamp.toUTCString()}
                                </li>
                            );
                        })}
                    </ul>
                    <h2>Users that do not follow you back</h2>
                    <ul>
                        {data.getFollowingThatDontFollowBack().map((user) => {
                            return <li key={user.username}>{user.username}</li>;
                        })}
                    </ul>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default InstagramWrapped;
