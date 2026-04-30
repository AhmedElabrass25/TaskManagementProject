import React from 'react'
import HeaderSection from './features/HeaderSection'
import BoardView from './features/BoardView'
import ListView from './features/ListView'
type Props = {
    params: Promise<{ projectId: string }>,
    searchParams: Promise<{ view?: string }>
}
const page = async ({ params, searchParams }: Props) => {
    const { projectId } = await params;
    const { view } = await searchParams;
  return (
    <section>
          <HeaderSection projectId={projectId} view={view} />
          {view === "board" ? <BoardView projectId={projectId}/> : <ListView projectId={projectId} />}
    </section>
  )
}

export default page