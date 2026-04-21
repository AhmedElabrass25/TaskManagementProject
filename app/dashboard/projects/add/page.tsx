import Header from "./features/Header";
import ProjectForm from "./features/ProjectForm";

const AddProject = () => {
  return (
    <section className="mt-10 ">
      <Header />
      <div className="container w-full lg:w-xl bg-white p-12 rounded-sm">
        <ProjectForm />
      </div>
    </section>
  );
};

export default AddProject;
