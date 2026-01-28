import { useDispatch } from "react-redux";
import { markAsPaid, toggleForm } from "../store/InvoiceSlice";
import { deleteInvoice, setSelectedInvoice } from "../store/InvoiceSlice"
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";


function InvoiceDetails({ Invoice }) {


  const dispatch = useDispatch();

  const handleMarkAsPaid = (Invoice) => {

    dispatch(markAsPaid(Invoice.id))

  }

  const handleEdit = () => {

    dispatch(toggleForm())
  }

  const handleDlt = () => {

    dispatch(deleteInvoice(Invoice.id))
    dispatch(setSelectedInvoice(null))
  }
  return (
    <div className="bg-slate-800 rounded-lg p-8 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-slate-400">Status</span>

          <span
            className={`px-4 py-1 rounded-lg ${Invoice.status === "Paid"
              ? "bg-green-900/20 text-green-400"
              : Invoice.status === "Pending"
                ? "bg-orange-900/20 text-orange-400"
                : "bg-slate-700/50 text-slate-400"
              }`}
          >
            {Invoice.status}
          </span>
        </div>

        <div className="flex space-x-4">
          <button className="px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600"
            onClick={() => handleEdit()}>
            Edit
          </button>
          <button onClick={() => handleDlt()}
            className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => handleMarkAsPaid(Invoice)}
            className="px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-600"
          >
            Mark as Paid
          </button>

          <PDFDownloadLink
            document={<InvoicePDF Invoice={Invoice} />}
            fileName={`Invoice-${Invoice.id}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button className="px-6 py-3 rounded-full bg-slate-600">
                  Generating PDF...
                </button>
              ) : (
                <button className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700">
                  Download PDF
                </button>
              )
            }
          </PDFDownloadLink>

        </div>
      </div>

      {/* Invoice Body */}
      <div className="bg-slate-900 rounded-lg p-8 space-y-8">

        {/* Invoice Info */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">#{Invoice.id}</h2>
            <p className="text-slate-400">{Invoice.projectDescription}</p>
          </div>

          <div className="text-right text-slate-400">
            <p>{Invoice.billFrom.streetAddress}</p>
            <p>{Invoice.billFrom.city}</p>
            <p>{Invoice.billFrom.postCode}</p>
            <p>{Invoice.billFrom.country}</p>
          </div>
        </div>

        {/* Dates & Client Info */}
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-slate-400 mb-2">Invoice Date</p>
            <p className="font-bold mb-4">{Invoice.invoiceDate}</p>

            <p className="text-slate-400 mb-2">Payment Due</p>
            <p className="font-bold">{Invoice.dueDate}</p>
          </div>

          <div>
            <p className="text-slate-400 mb-2">Bill To</p>
            <p className="font-bold mb-2">{Invoice.billTo.clientName}</p>
            <p className="text-slate-400">{Invoice.billTo.streetAddress}</p>
            <p className="text-slate-400">{Invoice.billTo.city}</p>
            <p className="text-slate-400">{Invoice.billTo.postCode}</p>
            <p className="text-slate-400">{Invoice.billTo.country}</p>
          </div>

          <div>
            <p className="text-slate-400 mb-2">Sent To</p>
            <p className="font-bold">{Invoice.billTo.clientEmail}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700/40">
              <tr className="text-slate-400">
                <th className="text-left p-4">Item Name</th>
                <th className="text-center p-4">QTY</th>
                <th className="text-right p-4">Price</th>
                <th className="text-right p-4">Total</th>
              </tr>
            </thead>

            <tbody>
              {Invoice.items.map((item, index) => (
                <tr key={index} className="text-slate-300">
                  <td className="p-4 text-left">{item.name}</td>
                  <td className="p-4 text-center">{item.quantity}</td>
                  <td className="p-4 text-right">₹{item.price}</td>
                  <td className="p-4 text-right">
                    ₹{item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Amount Due */}
          <div className="bg-slate-900 p-8 flex justify-between items-center">
            <span className="text-slate-400">Amount Due</span>
            <span className="text-3xl font-bold">
              ₹{Invoice.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
