<template>
    <div class="grid">
      <!-- General Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">General Information</span>
              <div class="text-900 font-medium text-xl">Transaction Date: {{ listRowSelect[0].transaction_date }}</div>
              <div class="text-900 font-medium text-xl">Voyage Number: {{ listRowSelect[0].voyage_num }}</div>
              <div class="text-900 font-medium text-xl">Sent Quantity: {{ listRowSelect[0].sent_qty }}</div>
              <div class="text-900 font-medium text-xl">Received Quantity: {{ listRowSelect[0].received_qty }}</div>
              <div class="text-900 font-medium text-xl">Dispatch Number Lot: {{ listRowSelect[0].dispatch_number_lot }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-calendar text-green-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Task Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Task Information</span>
              <div class="text-900 font-medium text-xl">Task Code: {{ listRowSelect[0].tasks_of_type.code }}</div>
              <div class="text-900 font-medium text-xl">Task Name: {{ listRowSelect[0].tasks_of_type.name }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-tasks text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Crop Lot Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Crop Lot Information</span>
              <div class="text-900 font-medium text-xl" v-for="(lot, index) in listRowSelect[0].planner_tasks.crop_lots" :key="index">
                Lot Code: {{ lot.code }}
              </div>
            </div>
            <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-map-marker text-orange-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Product Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Product Information</span>
              <div class="text-900 font-medium text-xl">Product Name: {{ listRowSelect[0].product.name }}</div>
              <div class="text-900 font-medium text-xl">Product Type: {{ listRowSelect[0].product_type.name }}</div>
              <div class="text-900 font-medium text-xl">Variety: {{ listRowSelect[0].varieties.name }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-yellow-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-tag text-yellow-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Packing Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Packing Information</span>
              <div class="text-900 font-medium text-xl">Packing Type: {{ listRowSelect[0].packing_type.name }}</div>
              <div class="text-900 font-medium text-xl">Dispatch Code: {{ listRowSelect[0].packing_type.code_dispatch }}</div>
              <div class="text-900 font-medium text-xl">Weight Tare: {{ listRowSelect[0].packing_type.weight_tare }}kg</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-box text-purple-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Employee Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Employee Information</span>
              <div class="text-900 font-medium text-xl">Supervisor: {{ listRowSelect[0].supervisory.first_name }} {{ listRowSelect[0].supervisory.lasts_names }}</div>
              <div class="text-900 font-medium text-xl">Worker: {{ listRowSelect[0].employee.first_name }} {{ listRowSelect[0].employee.lasts_names }}</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-user text-green-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Vehicle Information Card -->
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Vehicle Information</span>
              <div class="text-900 font-medium text-xl">Vehicle Code: {{ listRowSelect[0].vehicle.code }}</div>
              <div class="text-900 font-medium text-xl">Weight Packing Type: {{ listRowSelect[0].vehicle.weight_packing_type }}kg</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-teal-100 border-round" style="width: 2.5rem; height: 2.5rem">
              <i class="pi pi-car text-teal-500 text-xl"></i>
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
              <div class="text-900 font-medium text-xl">Shipping Status: {{ listRowSelect[0].receivingStatuses.name }}</div>
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
  