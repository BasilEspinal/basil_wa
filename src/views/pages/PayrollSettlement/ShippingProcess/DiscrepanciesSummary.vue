<template>
    <div class="grid">
      <!-- General Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">General Information</span>
              <div class="text-900 font-medium text-xl">Validated Date: {{ listRowSelect[0].validated_date }}</div>
              <div class="text-900 font-medium text-xl">Voyage Number: {{ listRowSelect[0].voyage_num }}</div>
              <div class="text-900 font-medium text-xl">Sent Quantity: {{ listRowSelect[0].sent_qty }}</div>
              <div class="text-900 font-medium text-xl">Received Quantity: {{ listRowSelect[0].received_qty }}</div>
              <div class="text-900 font-medium text-xl">Confirmed Quantity: {{ listRowSelect[0].confirmed_qty }}</div>
              <div class="text-900 font-medium text-xl">Notes: {{ listRowSelect[0].notes_small }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-calendar text-green-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Shipping Task Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Shipping Task Information</span>
              <div class="text-900 font-medium text-xl">Dispatch Number Lot: {{ listRowSelect[0].shipping_task.dispatch_number_lot }}</div>
              <div class="text-900 font-medium text-xl">Shipping Sent Qty: {{ listRowSelect[0].shipping_task.sent_qty }}</div>
              <div class="text-900 font-medium text-xl">Shipping Max Vehicle Qty: {{ listRowSelect[0].shipping_task.vehicle_qty_max }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-shipping-fast text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Receiving Task Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Receiving Task Information</span>
              <div class="text-900 font-medium text-xl">Receiving Sent Qty: {{ listRowSelect[0].receiving_task.sent_qty }}</div>
              <div class="text-900 font-medium text-xl">Receiving Max Vehicle Qty: {{ listRowSelect[0].receiving_task.vehicle_qty_max }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-download text-orange-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Validation Status Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Validation Status</span>
              <div class="text-900 font-medium text-xl">Status: {{ listRowSelect[0].validation_statuses.name }}</div>
              <div class="text-900 font-medium text-xl" :style="{ color: listRowSelect[0].validation_statuses.color }">Correction: {{ listRowSelect[0].validation_statuses.description }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-red-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-exclamation-triangle text-red-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Farm Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Farm Information</span>
              <div class="text-900 font-medium text-xl">Farm Name: {{ listRowSelect[0].farm.name }}</div>
              <div class="text-900 font-medium text-xl">Farm Code: {{ listRowSelect[0].farm.code }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-yellow-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-leaf text-yellow-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Company Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Company Information</span>
              <div class="text-900 font-medium text-xl">Company Name: {{ listRowSelect[0].company.name }}</div>
              <div class="text-900 font-medium text-xl">Company Code: {{ listRowSelect[0].company.code }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-teal-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-building text-teal-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Status Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Status</span>
              <div class="text-900 font-medium text-xl">Status: {{ listRowSelect[0].status.name }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-gray-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-info-circle text-gray-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
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
  /* Add custom styles if needed */
  </style>
  