import { SearchNormal1 } from "iconsax-react";
interface NavProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}
export default function Nav({ setSearchQuery, searchQuery }: NavProps) {
  return (
    <div className="w-full py-8 border-b border-border-1 flex justify-center items-center">
      <div className="w-[95%] mx-auto lg:w-[40%] flex relative justify-start items-center gap-2 border border-[#8A8886] rounded-lg">
        <SearchNormal1 size={20} className="absolute left-2 top-3" />{" "}
        <input
          className="py-3 w-full  bg-transparent px-8 rounded-lg focus:outline-none placeholder::ml-5"
          placeholder="Search some todo..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          name=""
          id=""
        />
      </div>
    </div>
  );
}
