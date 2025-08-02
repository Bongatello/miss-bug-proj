import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useState, useEffect } from 'react'


export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(0)

  useEffect(() => {
    loadBugs()
  }, [bugs, filterBy])

  async function loadBugs() {
    const bugs = await bugService.query(filterBy)
    setBugs(bugs)
  }


  function increaseFilterBy() {

    setFilterBy(filterBy + 1)

  }

  function decreaseFilterBy() {
    if (filterBy>0)   setFilterBy(filterBy - 1)
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
    const bug = {
      title: prompt('Bug title?'),
      severity: +prompt('Bug severity?'),
      desc: prompt('Bug description'),
    }
    try {
      const savedBug = await bugService.save(bug)
      console.log('Added Bug', savedBug)
      setBugs(prevBugs => [...prevBugs, savedBug])
      showSuccessMsg('Bug added')
    } catch (err) {
      console.log('Error from onAddBug ->', err)
      showErrorMsg('Cannot add bug')
    }
  }

  async function onEditBug(bug) {
    const title = prompt('New title? (keep blank if not needed')
    const severity = +prompt('New severity?')
    const desc = prompt('Desc (keep blank if not needed')
    const bugToSave = { ...bug, title, severity, desc }
    try {

      const savedBug = await bugService.save(bugToSave)
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
        <div>
          <button onClick={increaseFilterBy}>+1</button>
          <p>Showing only severities higher than: {filterBy}</p>
          <button onClick={decreaseFilterBy}>-1</button>
        </div>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </main>
  )
}
