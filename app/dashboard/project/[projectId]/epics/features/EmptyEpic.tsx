import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
const epicData = [
    {
        id: 1,
        image: "/icons/epicdata1.svg"
        , title: "High-Level Goals",
        desc:"Define the broad objectives that span across multiple cycles."
        
    },
    {
        id: 2,
        image: "/icons/epicdata2.svg",
        title: "Hierarchy Design",
        desc:"Link individual tasks to parent epics for a consolidated view."
    },
    {
        id: 3,
        image: "/icons/epicdata3.svg",
        title: "Track Velocity",
        desc:"Visualize percentage completion at a macro project level."
    }
]
const EmptyEpic = () => {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="w-2xl flex flex-col items-center justify-center">
        <div className="bg-white mb-5 w-56 h-56 rounded-lg flex gap-4 flex-wrap items-center justify-center p-4">
          <div className="w-16 h-16 bg-[#D7E2FF] flex items-center justify-center rounded-md">
            <Image
              src={"/icons/epicicon1.svg"}
              alt="Epic Icon"
              width={25}
              height={25}
            />
          </div>
          <div className="w-16 h-16 bg-[#D7E2FF] flex items-center justify-center rounded-md">
            <Image
              src={"/icons/epicicon2.svg"}
              alt="Epic Icon"
              width={25}
              height={25}
            />
          </div>
          <div className="w-16 h-16 bg-[#D7E2FF] flex items-center justify-center rounded-md">
            <Image
              src={"/icons/epicicon3.svg"}
              alt="Epic Icon"
              width={25}
              height={25}
            />
          </div>
          <div className="w-16 h-16 bg-[#D7E2FF] flex items-center justify-center rounded-md border-dashed border-2 border-gray-500">
            +
          </div>
        </div>
        <h1 className="mb-2">No epics in this project yet.</h1>
        <p className="text-[18px] w-md">
          Break down your large project into manageable epics to track progress
          better and maintain architectural clarity.
        </p>
        <Link href={"epics/new"} className="mt-3">
          <Button className="w-63.25 h-15 flex items-center justify-center gap-2 rounded-xs]">
            <Image
              src={"/icons/createepicbtn.svg"}
              alt="create epic"
              width={16}
              height={20}
            />
           <h4 className="text-xl">Create First Epic</h4>
          </Button>
        </Link>
        <div className="mt-10 w-full flex items-center justify-between">
          {epicData.map((data) => (
            <div key={data.id} className="w-52 min-h-45 flex flex-col items-start gap-4 bg-(--color-surface-low) rounded-lg p-6">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-xs">
                <Image
                  src={data.image}
                  alt="Epic Icon"
                  width={17}
                  height={22}
                />
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-[#041B3C]">{data.title}</h3>
                <p className="text-[16px]">{data.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmptyEpic;
