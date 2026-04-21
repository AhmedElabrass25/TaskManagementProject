import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
      <>
       <div className="w-full flex items-center justify-between mb-10">
        <h1>Add New Project</h1>
        <Link href="#">
          <Button className="w-53.5 flex items-center justify-center gap-2">
            <Image
              src={"/icons/invitemember.svg"}
              alt="invite"
              width={20}
              height={20}
            />{" "}
            <span>Invite Member</span>
          </Button>
        </Link>
      </div>
      </>
  )
}

export default Header