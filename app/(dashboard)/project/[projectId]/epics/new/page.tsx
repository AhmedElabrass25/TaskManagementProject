import React from 'react'
import Header from './features/Header'
import EpicForm from './features/EpicForm'
import { getMembers } from '../../members/action';
import { IMember } from '@/types/types';
type Props = {
    params: Promise<{ projectId: string }>;
}
const NewEpic = async ({ params }: Props) => {
    const {projectId}=await params;
    const membersData: IMember[] = await getMembers(projectId);
    console.log(params);
  return (
      <section className="mt-10 ">
     <Header />
      <div className="w-full rounded-sm">
       <EpicForm membersData={membersData} projectId={projectId}/>
      </div>
    </section>
  )
}

export default NewEpic