import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useState, useEffect, useRef } from 'react'
import { utilService } from '../services/util.service.js'

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const [filterByLabels, setFilterByLabels] = useState([])
  const onSetFilterByDebounce = useRef(utilService.debounce(onSetFilterBy, 400)).current
  const [bugLabels, setBugLabels] = useState([])
  const { txt, minSpeed } = filterByToEdit
  const filterBugLabels = []

  useEffect(() => {
    loadBugs()
    getNewLabels()
  }, [bugs.length, filterBy])

  useEffect(() => {
    onSetFilterByDebounce(filterByToEdit)
  }, [filterByToEdit])

  async function getNewLabels() {
    const newBugLabels = await bugService.getBugLabels()
    setBugLabels(newBugLabels)
  }

  async function loadBugs() {
    const bugs = await bugService.query(filterBy)
    setBugs(bugs)
  }

  function handleChange({ target }) {
    const { name, type, value, checked } = target
  
    if (type === "checkbox") {
      if (value === "pagination") {
        // will add pagination soon
        return
      }
  
      setFilterBy(prev => {
        const prevLabels = prev.labels || []
        let newLabels
  
        if (checked) {
          newLabels = prevLabels.includes(value)
            ? prevLabels
            : [...prevLabels, value]
        } else {
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

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilter => {
      let pageIdx = undefined
      if (prevFilter.pageIdx !== undefined) pageIdx = 0
      return { ...prevFilter, ...filterBy, pageIdx }
    })
  }


  function increaseSeverityFilter() {
    const severity = filterBy.severity + 1
    setFilterBy(prevFilter => ({ ...prevFilter, severity }))

  }

  function decreaseSeverityFilter() {
    const severity = filterBy.severity - 1
    if (filterBy.severity > 0) setFilterBy(prevFilter => ({ ...prevFilter, severity }))
  }

  async function onRemoveBug(bugId) {
    try {
      console.log('bugindex: removing ', bugId)
      await bugService.remove(bugId)
      console.log(bugId, ' Deleted Succesfully!')
      setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
      showSuccessMsg('Bug removed')
    } catch (err) {
      console.log('Error from onRemoveBug ->', err)
      showErrorMsg('Cannot remove bug')
    }
  }

  async function onAddBug() {
    var idx = 0 // idx starts with 0
    const bugToSave = {
      title: prompt('Bug title?'),
      severity: +prompt('Bug severity?'),
      desc: prompt('Bug description'),
      labels: [prompt('Bug Label?')],
    }
    if (bugToSave.labels.length > 0) idx = idx + 1
    while (bugToSave.labels.length >= idx) {
      var anotherLabel = prompt('Another Label?')
      idx = idx + 1
      if (anotherLabel !== '') {
        bugToSave.labels.push(anotherLabel)
      }
    }
    try {
      const savedBug = await bugService.add(bugToSave)
      console.log('Added Bug', savedBug)
      setBugs(prevBugs => [...prevBugs, savedBug])
      showSuccessMsg('Bug added')
    } catch (err) {
      console.log('Error from onAddBug ->', err)
      showErrorMsg('Cannot add bug')
    }
  }

  async function onEditBug(bug) {
    const title = prompt('New title? (keep blank if not needed)')
    const severity = +prompt('New severity?')
    const desc = prompt('Desc (keep blank if not needed)')
    const bugToSave = { ...bug, title, severity, desc }
    try {

      const savedBug = await bugService.edit(bugToSave)
      console.log('Updated Bug:', savedBug)
      setBugs(prevBugs => prevBugs.map((currBug) =>
        currBug._id === savedBug._id ? savedBug : currBug
      ))
      showSuccessMsg('Bug updated')
    } catch (err) {
      console.log('Error from onEditBug ->', err)
      showErrorMsg('Cannot update bug')
    }
  }

  return (
    <main className="main-layout">
      <h3>Bugs App</h3>
      <main>
        <button onClick={onAddBug}>Add Bug ⛐</button>
        <div className='severity-filter'>
          <button onClick={increaseSeverityFilter}>+1</button>
          <p>Showing only severities higher than: {filterBy.severity}</p>
          <button onClick={decreaseSeverityFilter}>-1</button>
        </div>
        <div className='text-filter'>
          <input type='text' placeholder='Filter by text' value={filterBy.txt} name='txt' onChange={handleChange}></input>
        </div>
        <div className='label-filter'>
          {bugLabels.map(label => (
            <section>
            <input type="checkbox" value={label} onChange={handleChange} name='labels'></input>
            <p>{label}</p>
            </section>
          ))}
        </div>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </main>
  )
}
