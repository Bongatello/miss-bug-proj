

export function UserPreview({ user }) {

    return <article >
        <h4>{user.fullname}</h4>
        <h1>🐛</h1>
        <p>Score: <span>{user.score}</span></p>
    </article>
}