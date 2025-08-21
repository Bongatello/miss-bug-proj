

export function BugFilter(filterBy, increaseFilterBy, decreaseFilterBy) {

    return (
        <div>
            <button onClick={()=>{increaseFilterBy}}>+1</button>
            <p>Showing only severities higher than: {filterBy.severity}</p>
            <button onClick={()=>decreaseFilterBy}>-1</button>
        </div>
    )
}