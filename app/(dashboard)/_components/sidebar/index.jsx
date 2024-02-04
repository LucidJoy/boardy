import React from "react";
import NewButton from "./NewButton";
import List from "./List";

const Sidebar = () => {
  return (
    <aside className='fixed z-[1] left-0 bg-gray-400 h-full w-[60px] flex p-3 flex-col gap-y-4'>
      <List />

      <NewButton />
    </aside>
  );
};

export default Sidebar;
