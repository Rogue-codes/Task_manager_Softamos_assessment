interface TabProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}
export default function Tab({ setActiveTab, activeTab }: TabProps) {
  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
  };

  const tabArr = ["All", "Active", "Completed"];
  return (
    <div className="flex justify-start items-center gap-4 lg:gap-12">
      {tabArr.map((tab, index) => (
        <p
          key={index}
          className={`${
            activeTab === tab ? "border-b-4 border-[#0078D4]" : ""
          } pt-11 pb-2 cursor-pointer text-sm lg:text-md`}
          onClick={() => handleTabSelect(tab)}
        >
          {tab}
        </p>
      ))}
    </div>
  );
}
