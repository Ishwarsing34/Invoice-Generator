import { format, parseISO } from "date-fns";
import { ChevronRight } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedInvoice } from "../store/InvoiceSlice";


const InvoiceList = () => {

    const dispatch = useDispatch();

    const { invoices, filter } = useSelector((state) => state.invoices);

    const filterInvoices = invoices.filter((invoice) => {

        if (filter === 'all') return true;

        return invoice.status === filter;
    })

    if (filterInvoices.length === 0) {
        return <div className="text-center py-12">
            <p className="text-xl text-slate-400 ">No Invoice Found</p>
        </div>
    }

    const handleInvoiceClicks = (invoice) => {
        dispatch(setSelectedInvoice(invoice))
    }
    const formDate = (date) => {
        try {

            return format(parseISO(date), "dd-MM-yyy")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="space-y-4">

            {

                filterInvoices.map((invoice) => (
                    <div className="bg-slate-800 rounded-lg p-6 flex items-center justify-between hover:bg-slate-700
    transition-colors duration-200 cursor-pointer" key={invoice.id} onClick={() => handleInvoiceClicks(invoice)}>

                        <div className="flex items-center space-x-6 ">
                            <span className="text-slate-400">{invoice.id}</span>
                            <span className="text-slate-400"> Due {formDate(invoice.dueDate)}</span>
                            <span className="text-slate-300"> {invoice.name}</span>

                        </div>
                        {/* invoice body */}
                        <div className="flex item
                        s-center space-x-6">
                            <span className="text-2xl font-bold">
                                ${invoice.amount?.toFixed(2) || "0.00"}
                            </span>

                            <div
                                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${invoice.status === "Paid"
                                    ? "bg-green-900/20 text-green-50"
                                    : invoice.status === "Pending"
                                        ? "bg-orange-900/20 text-orange-500"
                                        : "bg-slate-700/50 text-slate-400"
                                    }`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full ${invoice.status === "Paid"
                                        ? "bg-green-500"
                                        : invoice.status === "Pending"
                                            ? "bg-orange-500"
                                            : "bg-slate-400"
                                        }`}
                                ></div>

                                <span className="capitalize">{invoice.status}</span>
                            </div>
                        </div>



                        <ChevronRight className="text-violet-500" />

                    </div>
                ))
            }

        </div>
    )
}

export default InvoiceList
