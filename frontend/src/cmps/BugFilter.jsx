import { useState, useEffect, useRef } from 'react'
import { utilService } from '../services/util.service'

export function BugFilter ({filterBy, setFilterBy, bugLabels}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const onSetFilterByDebounce = useRef(utilService.debounce(onSetFilterBy, 400)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    //Update filterBy State
    function handleChange({ target }) {
        const { name, type, value, checked } = target
      
        if (type === "checkbox") {
            setFilterBy(prev => {
                const prevLabels = prev.labels || []
                let newLabels
      
                if (checked) {
                    newLabels = prevLabels.includes(value)
                    ? prevLabels
                    : [...prevLabels, value]
                } 
                else {
                    newLabels = prevLabels.filter(label => label !== value)
                }
      
                return { ...prev, labels: newLabels }
            })
        } 
        else if (type === "text") {
            setFilterBy(prev => ({ ...prev, [name]: value }))
        } 
        else {
            console.warn("Unhandled input type:", type)
        }
    }
    
    //pagination update
    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => {
            let pageIdx = undefined
            if (prevFilter.pageIdx !== undefined) pageIdx = 0
            return { ...prevFilter, ...filterBy, pageIdx }
        })
    }

    //Update Severity Filter Value
    function changeSeverityFilter(change) {
        const severity = filterBy.severity + change
        if (filterBy.severity>0) setFilterBy(prevFilter => ({ ...prevFilter, severity }))
        else if (filterBy.severity===0 && change === 1) setFilterBy(prevFilter => ({ ...prevFilter, severity }))
    }

    return (
        <div className="bug-filter">
            <div className='severity-filter'>
                <button onClick={() => changeSeverityFilter(1)}>+1</button>
                <p>Showing only severities higher than: {filterBy.severity}</p>
                <button onClick={() => changeSeverityFilter(-1)}>-1</button>
            </div>
            <div className='text-filter'>
                <input type='text' placeholder='Filter by text' value={filterBy.txt} name='txt' onChange={handleChange}></input>
            </div>
            <div className='label-filter'>
                {bugLabels.map(label => (
                    <section key={label}>
                        <input type="checkbox" value={label} onChange={handleChange} name='labels'></input>
                        <p>{label}</p>
                    </section>
                ))}
            </div>
        </div>
    )
}