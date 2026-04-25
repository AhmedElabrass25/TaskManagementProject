import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full mb-10">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="w-fit mb-2">Project Epics</h1>
        <div className="w-fit flex items-center gap-3">
          <div className="w-75.75 h-12 relative">
            <Image
              src="/icons/searchIcon.svg"
              width={12}
              height={3}
              alt="search icon"
              className="absolute top-5 left-2.75"
            />
            <Input
              type="text"
              className="ps-8 w-full"
              placeholder="Search epics..."
            />
          </div>
          <Link href="epics/new" className="hidden md:block">
            <Button className="w-fit h-12 flex items-center justify-center gap-2 rounded-xs">
              +<span>New Epic</span>
            </Button>
          </Link>
        </div>
      </div>
      {/* btn as fixed in mobile */}
      <Link href="epics/new" className="md:hidden fixed right-5 bottom-5 z-40">
        <Button className="w-fit h-12 flex items-center justify-center gap-2 rounded-md cursor-pointer">
          +
        </Button>
      </Link>
    </div>
  );
};

export default Header;
