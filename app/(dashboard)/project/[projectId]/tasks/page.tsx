import React from 'react'
import HeaderSection from './features/HeaderSection'
import BoardView from './features/BoardView'
import ListView from './features/ListView'
type Props = {
    params: Promise<{ projectId: string }>,
    searchParams: Promise<{ view?: string , page?: string}>
}
const TaskPage = async ({ params, searchParams }: Props) => {
    const { projectId } = await params;
    const { view,page } = await searchParams;
  return (
    <section>
          <HeaderSection projectId={projectId} view={view} />
      {view === "board" ? <BoardView projectId={projectId} /> : <ListView projectId={projectId} page={page} />}
    </section>
  )
}

export default TaskPage