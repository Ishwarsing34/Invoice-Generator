import { Trash2, X, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addInvoice, toggleForm, updateInvoice } from "../store/InvoiceSlice";
import { useState } from "react";
import { addDays, format } from "date-fns";

const InvoiceForm = ({ Invoice }) => {
  const dispatch = useDispatch();

  const getEmptyInvoice = () => ({
    id: `INV${Date.now()}`,
    status: "Pending",
    billFrom: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    billTo: {
      clientName: "",
      clientEmail: "",
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [],
    paymentTerms: "Net 30 Days",
    projectDescription: "",
    invoiceDate: format(new Date(), "yyyy-MM-dd"),
    dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    amount: 0,
  });


  const [formData, setFormData] = useState(() =>
    Invoice ? Invoice : getEmptyInvoice()
  );




  // if (Invoice) {
  //   return { ...Invoice }
  // }


  //  useEffect(() => {

  //   if(!Invoice) return;

  //   if (Invoice) {
  //     setFormData(Invoice)
  //   }
  // }, [Invoice])
  /* ---------------- HANDLERS ---------------- */

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const computedDueDate = format(
    addDays(
      new Date(formData.invoiceDate),
      Number(formData.paymentTerms.split(" ")[1])
    ),
    "yyyy-MM-dd"
  );

  const handleSubmit = (e) => {

    e.preventDefault()

    if(Invoice){
      dispatch(updateInvoice(formData))
    }else{
      dispatch(addInvoice(formData))
    }


  }




  const addItems = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: "", quantity: 1, price: 0, total: 0 },
      ],
    }));
  };

  const removeItem = (indexToRemove) => {

    const filteredData = formData.items.filter(
      (_, index) => index !== indexToRemove
    )


    setFormData(
      {
        ...formData,
        items: filteredData
      }
    )
  }
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    updatedItems[index].total =
      updatedItems[index].quantity * updatedItems[index].price;

    setFormData({ ...formData, items: updatedItems });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center overflow-y-auto z-50">
      <div className="bg-slate-800 rounded-2xl w-full max-w-2xl mt-10 mb-10 p-8 text-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">New Invoice</h2>
          <button
            type="button"
            onClick={() => dispatch(toggleForm())}
            className="text-slate-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Bill From */}
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill From</h3>
            <input
              placeholder="Street Address"
              value={formData.billFrom.streetAddress}
              onChange={(e) =>
                handleNestedChange(
                  "billFrom",
                  "streetAddress",
                  e.target.value
                )
              }
              className="w-full bg-slate-900 rounded-lg p-3"
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                placeholder="City"
                value={formData.billFrom.city}
                onChange={(e) =>
                  handleNestedChange("billFrom", "city", e.target.value)
                }
                className="bg-slate-900 rounded-lg p-3"
              />
              <input
                placeholder="Post Code"
                value={formData.billFrom.postCode}
                onChange={(e) =>
                  handleNestedChange("billFrom", "postCode", e.target.value)
                }
                className="bg-slate-900 rounded-lg p-3"
              />
              <input
                placeholder="Country"
                value={formData.billFrom.country}
                onChange={(e) =>
                  handleNestedChange("billFrom", "country", e.target.value)
                }
                className="bg-slate-900 rounded-lg p-3"
              />
            </div>
          </div>

          {/* Bill To */}
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill To</h3>
            <input
              placeholder="Client's Name"
              value={formData.billTo.clientName}
              onChange={(e) =>
                handleNestedChange("billTo", "clientName", e.target.value)
              }
              className="w-full bg-slate-900 rounded-lg p-3"
            />
            <input
              type="email"
              placeholder="Client's Email"
              value={formData.billTo.clientEmail}
              onChange={(e) =>
                handleNestedChange("billTo", "clientEmail", e.target.value)
              }
              className="w-full bg-slate-900 rounded-lg p-3"
            />
            <input
              placeholder="Street Address"
              value={formData.billTo.streetAddress}
              onChange={(e) =>
                handleNestedChange(
                  "billTo",
                  "streetAddress",
                  e.target.value
                )
              }
              className="w-full bg-slate-900 rounded-lg p-3"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.invoiceDate}
              onChange={(e) =>
                handleChange("invoiceDate", e.target.value)
              }
              className="bg-slate-900 rounded-lg p-3"
            />
            <select
              value={formData.paymentTerms}
              onChange={(e) =>
                handleChange("paymentTerms", e.target.value)
              }
              className="bg-slate-900 rounded-lg p-3"
            >
              <option>Net 30 Days</option>
              <option>Net 60 Days</option>
              <option>Net 90 Days</option>
            </select>
          </div>

          <p className="text-slate-300">
            Due Date: <span className="font-semibold">{computedDueDate}</span>
          </p>

          {/* Project Description */}
          <input
            placeholder="Project Description"
            value={formData.projectDescription}
            onChange={(e) =>
              handleChange("projectDescription", e.target.value)
            }
            className="w-full bg-slate-900 rounded-lg p-3"
          />

          {/* Item List */}
          <div className="space-y-4">
            <h3 className="font-bold">Item List</h3>

            {formData.items.length > 0 && (
              <div className="grid grid-cols-12 gap-4 text-slate-400 text-sm">
                <div className="col-span-4">Item Name</div>
                <div className="col-span-2">Qty</div>
                <div className="col-span-3">Price</div>
                <div className="col-span-2 text-right">Total</div>
                <div className="col-span-1"></div>
              </div>
            )}

            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center">
                <input
                  className="bg-slate-900 rounded-lg p-3 col-span-4"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  min="1"
                  className="bg-slate-900 rounded-lg p-3 col-span-2"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                />
                <input
                  type="number"
                  min="0"
                  step="1"
                  className="bg-slate-900 rounded-lg p-3 col-span-3"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "price",
                      Number(e.target.value)
                    )
                  }
                />
                <div className="col-span-2 text-right text-slate-300">
                  ₹{item.total.toFixed(2)}
                </div>
                <button
                  onClick={() => removeItem(index)}
                  type="button"
                  className="col-span-1 text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addItems}
              className="w-full flex items-center justify-center space-x-2 bg-slate-700 py-3 rounded-lg curosr-pointer"
            >
              <Plus size={18} className="cursor-pointer" />
              <span className="cursor-pointer">Add New Item</span>
            </button>

            <div className="text-right font-semibold text-lg">
              Total Amount: ₹
              {formData.items
                .reduce((sum, i) => sum + i.total, 0)
                .toFixed(2)}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button type="button" className="px-6 py-2 rounded-full bg-slate-700">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-full bg-violet-500">
              {
                Invoice ? 'Save Changes' : 'Create Invoice'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
