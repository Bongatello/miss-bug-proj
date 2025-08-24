export function BugSort({setSortByValue}) {

    async function sortBugs(sortBy) {
        setSortByValue(sortBy)
    }

    return (
        <div className='sortby-list'>
            Sort Bugs By:
            <button onClick={() => sortBugs('text')}>text</button>
            <button onClick={() => sortBugs('severity')}>severity</button>
            <button onClick={() => sortBugs('date')}>date</button>
        </div>
    )
}