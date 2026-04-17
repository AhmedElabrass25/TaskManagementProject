import Image from "next/image";
import React from "react";

const FormHeader = () => {
  return (
    <div className="pb-10 flex items-center gap-4">
      <div className="p-4 rounded-sm bg-(--color-surface-low) w-fit">
        <Image
          src={"/icons/addnewproject.svg"}
          alt="formheader"
          width={20}
          height={20}
        />
      </div>
          <div>
               <h1 className="text-(--font-heading-lg)">
        Initialize New Project
      </h1>
      <p className="text-(--font-body-md) text-slate-400">
        Define the scope and foundational details of your project.{" "}
      </p>
     </div>
    </div>
  );
};

export default FormHeader;
