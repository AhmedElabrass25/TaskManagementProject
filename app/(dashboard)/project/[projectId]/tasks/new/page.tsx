import React from 'react'
import TaskForm from './features/TaskForm'
import Header from './features/Header'
import { IEpicData, IMember } from '@/types/types';
import { getMembers } from '../../members/action';
import { getAllEpics } from '../../epics/action';
type Props = {
    params: Promise<{ projectId: string }>;
}
const page = async({params}:Props) => {
      const {projectId}=await params;
  const membersData: IMember[] = await getMembers(projectId);
  const allEpics:IEpicData[]=await getAllEpics(projectId);
    console.log(params);
  return (
      <section className="mt-10 ">
        <Header />
      <div className="w-full rounded-sm">
        <TaskForm membersData={membersData} projectId={projectId} allEpics={allEpics} />
      </div>
    </section>
  )
}

export default page