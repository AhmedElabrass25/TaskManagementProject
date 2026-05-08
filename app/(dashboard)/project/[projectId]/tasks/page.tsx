import WrapperPage from './features/WrapperPage'
type Props = {
    params: Promise<{ projectId: string }>,
    searchParams: Promise<{ view?: string , page?: string}>
}
const TaskPage = async ({ params, searchParams }: Props) => {
    const { projectId } = await params;
    const { view,page } = await searchParams;
  return (
    <section>
       <WrapperPage projectId={projectId} view={view} page={page} />
    </section>
  )
}

export default TaskPage