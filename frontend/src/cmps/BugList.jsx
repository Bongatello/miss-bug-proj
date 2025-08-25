
import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'
import { bugService } from '../services/bug.service'
import { useEffect, useState } from 'react'

export function BugList({ bugs, onRemoveBug, onEditBug }) {

  const [isUserLimited, setIsUserLimited] = useState(false)

  useEffect(() => {
    getUserLimitStatus()
  }, [])

  async function getUserLimitStatus(){
    const limitStatus = await bugService.checkIfLimited()
    console.log(limitStatus) 
    setIsUserLimited(limitStatus)
  }

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <div>
            <button
              onClick={() => {
                onRemoveBug(bug._id)
              }}
            >
              x
            </button>
            <button
              onClick={() => {
                onEditBug(bug)
              }}
            >
              Edit
            </button>
          </div>
          
          <Link to={isUserLimited ? "/limited" : `/bug/${bug._id}`}>Details</Link>
        </li>
      ))}
    </ul>
  )
}
