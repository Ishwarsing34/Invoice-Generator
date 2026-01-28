// InvoicePDF.jsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// PDF styles (similar to your Tailwind UI)
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  status: {
    fontSize: 12,
    fontWeight: "bold",
  },

  section: {
    marginBottom: 16,
  },

  label: {
    color: "#6b7280",
    marginBottom: 4,
  },

  value: {
    fontWeight: "bold",
  },

  grid3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  column: {
    width: "30%",
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 6,
    marginBottom: 6,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
  },

  colName: { width: "40%" },
  colQty: { width: "20%", textAlign: "center" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },

  amountBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f3f4f6",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  amountText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

const InvoicePDF = ({ Invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Invoice #{Invoice.id}</Text>
        <Text style={styles.status}>Status: {Invoice.status}</Text>
      </View>

      {/* Project Description */}
      <View style={styles.section}>
        <Text style={styles.label}>Project</Text>
        <Text>{Invoice.projectDescription}</Text>
      </View>

      {/* Bill From */}
      <View style={styles.section}>
        <Text style={styles.label}>Bill From</Text>
        <Text>{Invoice.billFrom.streetAddress}</Text>
        <Text>{Invoice.billFrom.city}</Text>
        <Text>{Invoice.billFrom.postCode}</Text>
        <Text>{Invoice.billFrom.country}</Text>
      </View>

      {/* Dates + Client */}
      <View style={styles.grid3}>
        <View style={styles.column}>
          <Text style={styles.label}>Invoice Date</Text>
          <Text style={styles.value}>{Invoice.invoiceDate}</Text>

          <Text style={styles.label}>Payment Due</Text>
          <Text style={styles.value}>{Invoice.dueDate}</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Bill To</Text>
          <Text style={styles.value}>{Invoice.billTo.clientName}</Text>
          <Text>{Invoice.billTo.streetAddress}</Text>
          <Text>{Invoice.billTo.city}</Text>
          <Text>{Invoice.billTo.postCode}</Text>
          <Text>{Invoice.billTo.country}</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Sent To</Text>
          <Text style={styles.value}>{Invoice.billTo.clientEmail}</Text>
        </View>
      </View>

      {/* Items Table */}
      <View>
        <View style={styles.tableHeader}>
          <Text style={styles.colName}>Item</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colPrice}>Price</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>

        {Invoice.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.colName}>{item.name}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colPrice}>₹{item.price}</Text>
            <Text style={styles.colTotal}>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Amount Due */}
      <View style={styles.amountBox}>
        <Text style={styles.amountText}>Amount Due</Text>
        <Text style={styles.amountText}>
          ₹{Invoice.amount.toFixed(2)}
        </Text>
      </View>

    </Page>
  </Document>
);

export default InvoicePDF;
