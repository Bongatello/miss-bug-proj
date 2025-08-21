import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useState, useEffect, useRef } from 'react'
import { utilService } from '../services/util.service.js'
import { BugFilter } from '../cmps/BugFilter.jsx'

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())

  useEffect(() => {
    loadBugs()
  }, [bugs.length, filterBy])

  async function loadBugs() {
    const bugs = await bugService.query(filterBy)
    setBugs(bugs)
  }


  function increaseFilterBy() {
    const severity = filterBy.severity + 1
    setFilterBy(prevFilter => ({...prevFilter, severity}))

  }

  function decreaseFilterBy() {
    const severity = filterBy.severity - 1
    if (filterBy.severity>0)   setFilterBy(prevFilter => ({...prevFilter, severity}))
  }


  async function onSetFilterBy(newFilter) {
    console.log('newFilter')
  }

  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId)
      console.log('Deleted Succesfully!')
      setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
      showSuccessMsg('Bug removed')
    } catch (err) {
      console.log('Error from onRemoveBug ->', err)
      showErrorMsg('Cannot remove bug')
    }
  }

  async function onAddBug() {
    const bugToSave = {
      title: prompt('Bug title?'),
      severity: +prompt('Bug severity?'),
      desc: prompt('Bug description'),
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
        <BugFilter filterBy={filterBy} increaseFilterBy={increaseFilterBy} decreaseFilterBy={decreaseFilterBy}/>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </main>
  )
}
