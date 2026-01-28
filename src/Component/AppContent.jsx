import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList"
import { toggleForm } from "../store/InvoiceSlice";
import InvoiceDetails from "./InvoiceDetails";
const AppContent = () => {
    const dispatch = useDispatch();

    const isFormOpen = useSelector(
        (state) => state.invoices.isFormOpen
    );

    const { selectedInvoice } = useSelector((state) => state.invoices)

    const handleNewInvoice = () => {
        dispatch(toggleForm());
    };

    return (
        <div className="bg-slate-900 text-white min-h-screen">
            <div className="max-w-5xl mx-auto py-12 px-4">
                <Header onNewInvoice={handleNewInvoice} />

                {
                    selectedInvoice ? <InvoiceDetails Invoice={selectedInvoice} /> : <InvoiceList />
                }

                {isFormOpen && <InvoiceForm Invoice={selectedInvoice} />}

            </div>
        </div>
    );
};

export default AppContent;
