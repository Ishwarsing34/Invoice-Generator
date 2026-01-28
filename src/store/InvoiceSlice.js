import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";


const loadState = () => {

    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return {
                invoices: [],
                filter: "All",
                isFormOpen: false,
                selectedInvoice: null
            }
        }


        return JSON.parse(serializedState)


    } catch (error) {
        console.log(error)
        return {
            invoices: [],
            filter: "All",
            isFormOpen: false,
            selectedInvoice: null
        }
    }
}

const initialState = loadState();

const saveState = (state) => {

    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);

    } catch (error) {
        console.log(error)
    }
}


const calculateAmount = (items) => {
    return items.reduce((acc, item) => {
        return acc + item.quantity * item.price;
    }, 0);
};

const invoiceSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        addInvoice: (state, action) => {
            const newInvoice = {
                ...action.payload,
                amount: calculateAmount(action.payload.items),
                // clientName: action.payload.clientName,
                status: action.payload.status || "Pending",
                dueDate:
                    action.payload.dueDate ||
                    format(addDays(new Date(), 30), "yyyy-MM-dd"),
            };

            state.invoices.push(newInvoice);
            saveState(state)
            state.isFormOpen = false;
        },

        setFilter: (state, action) => {


            state.filter = action.payload
        },

        toggleForm: (state) => {
            state.isFormOpen = !state.isFormOpen;
            if (!state.isFormOpen) {
                state.selectedInvoice = null;
            }
        },

        setSelectedInvoice: (state, action) => {
            state.selectedInvoice = action.payload
            state.isFormOpen = false;

        },

        markAsPaid: (state, action) => {
            const invoice = state.invoices.find(
                (inv) => inv.id === action.payload
            );

            if (invoice) {
                invoice.status = "Paid";
                state.selectedInvoice = null;
                state.isFormOpen = false;
                saveState(state);
            }
        },
        deleteInvoice: (state, action) => {
            state.invoices = state.invoices.filter((inv) => inv.id !== action.payload);

            state.selectedInvoice = null;
            saveState(state)

        },
        updateInvoice: (state, action) => {
            const index = state.invoices.findIndex(
                (inv) => inv.id === action.payload.id
            );

            if (index !== -1) {
                state.invoices[index] = {
                    ...state.invoices[index],   
                    ...action.payload,          
                    status: state.invoices[index].status,
                    amount: calculateAmount(action.payload.items),
                };
            }

            state.selectedInvoice = null;
            state.isFormOpen = false;
            saveState(state);
        }



    },
});



export const { toggleForm, addInvoice, setFilter, setSelectedInvoice, markAsPaid, deleteInvoice, updateInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
