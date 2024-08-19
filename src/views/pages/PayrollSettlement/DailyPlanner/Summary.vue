<template>
    <div>
      <Card>
        <template #title>
          <h2>Transaction Summary</h2>
        </template>
        <template #content>
          <p><strong>Transaction Date:</strong> {{ listRowSelect[0].transaction_date }}</p>
          <p><strong>Product:</strong> {{ listRowSelect[0].product.name }} ({{ listRowSelect[0].product.short_name }})</p>
          <p><strong>Type:</strong> {{ listRowSelect[0].product_type.name }}</p>
          <p><strong>Variant:</strong> {{ listRowSelect[0].variant.name }}</p>
          <p><strong>Farm:</strong> {{ listRowSelect[0].farm.name }}</p>
          <p><strong>Company:</strong> {{ listRowSelect[0].company.name }}</p>
          <p><strong>Status:</strong> {{ listRowSelect[0].status.name }}</p>
        </template>
      </Card>
  
      <Panel header="Customer Request">
        <p><strong>Customer Name:</strong> {{ listRowSelect[0].customer_request.customer_name }}</p>
        <p><strong>Order Number:</strong> {{ listRowSelect[0].customer_request.order_number_customer }}</p>
        <p><strong>Invoice Number:</strong> {{ listRowSelect[0].customer_request.invoice_number_customer }}</p>
        <p><strong>Request Date:</strong> {{ listRowSelect[0].customer_request.request_date }}</p>
        <p><strong>Delivery Date:</strong> {{ listRowSelect[0].customer_request.delivery_datetime }}</p>
        <p><strong>Dispatch Number Lot:</strong> {{ listRowSelect[0].customer_request.dispatch_number_lot }}</p>
        <p><strong>Packing Quantity:</strong> {{ listRowSelect[0].customer_request.packing_qty_dispatch }}</p>
        <p><strong>Packing Weight:</strong> {{ listRowSelect[0].customer_request.packing_dispatch_weight }}g</p>
        <p><strong>Outlet Temperature:</strong> {{ listRowSelect[0].customer_request.outlet_temperature }}°C</p>
        <p><strong>Place of Delivery:</strong> {{ listRowSelect[0].customer_request.place_of_delivery }}</p>
      </Panel>
  
      <Panel header="Vehicle Information">
        <p><strong>Vehicle Code:</strong> {{ listRowSelect[0].vehicle.code }}</p>
        <p><strong>Vehicle Type:</strong> {{ listRowSelect[0].vehicle.vehicle_type }}</p>
        <p><strong>Quantity Available:</strong> {{ listRowSelect[0].vehicle.quantity_available }}</p>
        <p><strong>Packing Weight:</strong> {{ listRowSelect[0].vehicle.weight_packing_type }}kg</p>
      </Panel>
  
      <DataTable :value="listRowSelect[0].crop_lots">
        <Column field="code" header="Crop Lot Code"></Column>
      </DataTable>
  
      <Panel header="Packing Information">
        <p><strong>Packing Type:</strong> {{ listRowSelect[0].packing_type.name }} ({{ listRowSelect[0].packing_type.code }})</p>
        <p><strong>Packing Weight:</strong> {{ listRowSelect[0].packing_type.weight_tare }}kg</p>
      </Panel>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      listRowSelect: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here if needed */
  </style>
  