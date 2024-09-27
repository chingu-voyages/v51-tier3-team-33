import SearchInput from './searchInput';
//import DropDownMenu from './dropDownMenu';

import { DialogPopup } from './dialogPopup';
import MobileSideBar from './mobileSideBar';


export default function Header(){
    return (
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
        <MobileSideBar />
        <SearchInput />
        {/* <DropDownMenu /> */}
        <DialogPopup />
      </header>
    );
};


