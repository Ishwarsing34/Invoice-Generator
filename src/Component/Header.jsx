import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem
} from "@headlessui/react";
import { Filter, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/InvoiceSlice";



const Header = ({ onNewInvoice }) => {

    const dispatch = useDispatch();

    const { invoices,  filter } = useSelector((state) => state.invoices);

    return (
        <header className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
                <p className="text-slate-400">{invoices.length === 0 ? 'No Invoices' : `There are ${invoices.length} Total Invoices`}</p>
            </div>

            <div className="flex items-center space-x-4">
                <Menu as="div" className="relative">
                    <MenuButton className="flex items-center space-x-2 text-white">
                        <Filter size={20} />
                        <span>Filter by status</span>
                    </MenuButton>

                    <MenuItems className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg p-2 text-black">
                        {["All", "Draft", "Pending", "Paid"].map((status) => (
                            <MenuItem key={status}>
                                {({ active }) => (
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded-md
                                            ${active ? "bg-slate-100" : ""}
                                            ${filter === status ? "text-violet-500" : "text-black"}
                                        `}
                                        onClick={()=>dispatch(setFilter(status))}
                                    >
                                        {status}
                                    </button>
                                )}
                            </MenuItem>
                        ))}
                    </MenuItems>

                </Menu>

                <button
                    onClick={onNewInvoice}
                    type="button"
                    className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-full flex items-center space-x-3"
                >
                    <span className="bg-white rounded-full p-2">
                        <Plus size={16} className="text-violet-500" />
                    </span>
                    <span>New Invoice</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
