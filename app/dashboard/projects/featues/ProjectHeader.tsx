import Button from '@/components/ui/Button'
import Link from 'next/link'
import React from 'react'

const ProjectHeader = () => {
  return (
      
          <div className="w-full flex justify-end">
                <Link href="/dashboard/projects/add-project">
                  <Button className="w-53.5">
                    + Create New Project
                  </Button>
                </Link>
              </div>    
    
  )
}

export default ProjectHeader