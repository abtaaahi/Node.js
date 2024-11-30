const fs = require("fs");
const xlsx = require("xlsx");

// Function to update Excel file from JSON without duplicating existing entries
function updateExcelFromJson() {
  // Step 1: Read the JSON data
  const jsonData = JSON.parse(fs.readFileSync("orders.json", "utf8"));

  // Step 2: Define the Excel file name
  const excelFileName = "orders.xlsx";

  // Step 3: Load existing Excel file or create a new workbook
  let workbook;
  try {
    workbook = xlsx.readFile(excelFileName);
    console.log("Existing Excel file loaded.");
  } catch (error) {
    workbook = xlsx.utils.book_new();
    console.log("New Excel file created.");
  }

  // Step 4: Access or create the "Orders" worksheet
  let worksheet = workbook.Sheets["Orders"];
  if (!worksheet) {
    // Create a new worksheet with headers if it doesn’t exist
    worksheet = xlsx.utils.aoa_to_sheet([
      ["ID", "Customer Name", "Address", "Phone", "Email", "Product Details", "Total Amount", "Order Date"],
    ]);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Orders");
  }

  // Step 5: Convert the worksheet to JSON to get existing data
  const existingData = xlsx.utils.sheet_to_json(worksheet);
  const existingIds = new Set(existingData.map((row) => row.ID)); // Collect existing IDs for deduplication

  // Step 6: Filter out duplicate entries from JSON data
  const newRows = jsonData
    .filter((order) => !existingIds.has(order.id)) // Only add if ID doesn't exist in Excel
    .map((order) => [
      order.id,
      order.customerName,
      order.address,
      order.phone,
      order.email,
      order.productDetails,
      order.totalAmount,
      order.orderDate,
    ]);

  // Step 7: If there are no new rows to add, exit
  if (newRows.length === 0) {
    console.log("No new data to append. Excel file is up-to-date.");
    return;
  }

  // Step 8: Append new rows to existing data in the worksheet
  const updatedWorksheet = xlsx.utils.sheet_add_aoa(worksheet, newRows, { origin: -1 });
  workbook.Sheets["Orders"] = updatedWorksheet;

  // Step 9: Save the updated workbook
  xlsx.writeFile(workbook, excelFileName);
  console.log("New data has been appended to orders.xlsx without duplicates.");
}

// Run the update function
updateExcelFromJson();