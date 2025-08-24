import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useState, useEffect, useRef } from 'react'
import { BugSort } from '../cmps/BugSort.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  const [sortByValue, setSortByValue] = useState('date')
  const [bugLabels, setBugLabels] = useState([])

  useEffect(() => {
    loadBugs()
    getNewLabels()
  }, [bugs.length, filterBy, sortByValue])

  //Update Label List (Checkboxes)
  async function getNewLabels() {
    const newBugLabels = await bugService.getBugLabels()
    setBugLabels(newBugLabels)
  }

  //CRUDL (List)
  //Load Bugs After Updates (on useEffect, according to the side-effects)
  async function loadBugs() {
    const bugs = await bugService.query(filterBy, sortByValue)
    setBugs(bugs)
  }

  //CRUDL (Delete)
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

  //CRUDL (Create)
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

  ////CRUDL (Update)
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
        <BugFilter filterBy={filterBy} setFilterBy={setFilterBy} bugLabels={bugLabels}/>
        <BugSort setSortByValue={setSortByValue} />
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </main>
  )
}
