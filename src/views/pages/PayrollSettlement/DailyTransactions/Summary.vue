<template>
  <div class="grid">
    <!-- General Information Card -->
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">General Information</span>
            <div class="text-900 font-medium text-xl">Planner Task ID: {{ listRowSelect[0].planner_task_id }}</div>
            <div class="text-900 font-medium text-xl">Transaction Date: {{ listRowSelect[0].transaction_date }}</div>
            <div class="text-900 font-medium text-xl">Week of Year: {{ listRowSelect[0].week_Of_Year }}</div>
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
            <div class="text-900 font-medium text-xl">Task Quantity: {{ listRowSelect[0].task_qty }}</div>
            <div class="text-900 font-medium text-xl">Price per Task: {{ listRowSelect[0].price_tarif_task }}</div>
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
            <div class="text-900 font-medium text-xl">Lot Code: {{ listRowSelect[0].crop_lots.code }}</div>
            <div class="text-900 font-medium text-xl">Area (m2): {{ listRowSelect[0].crop_lots.area_m2 }}</div>
            <div class="text-900 font-medium text-xl">Zone: {{ listRowSelect[0].crop_lots.zone }}</div>
            <div class="text-900 font-medium text-xl">Channel Average: {{ listRowSelect[0].crop_lots.channel_average }}</div>
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
            <div class="text-900 font-medium text-xl">Product Code: {{ listRowSelect[0].product.short_name }}</div>
            <div class="text-900 font-medium text-xl">Variant: {{ listRowSelect[0].variant.name }}</div>
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
            <div class="text-900 font-medium text-xl">Supervisor: {{ listRowSelect[0].supervisory_employee.first_name }} {{ listRowSelect[0].supervisory_employee.last_name }}</div>
            <div class="text-900 font-medium text-xl">Worker: {{ listRowSelect[0].worker_employee.first_name }} {{ listRowSelect[0].worker_employee.last_name }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-user text-green-500 text-xl"></i>
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
            <div class="text-900 font-medium text-xl">Website: <a :href="listRowSelect[0].company.url_path" target="_blank">{{ listRowSelect[0].company.url_path }}</a></div>
          </div>
          <div class="flex align-items-center justify-content-center bg-teal-100 border-round" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-building text-teal-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Request Card -->
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Customer Request</span>
            <div class="text-900 font-medium text-xl">Customer: {{ listRowSelect[0].customer_request_id.customer_name }}</div>
            <div class="text-900 font-medium text-xl">Order Number: {{ listRowSelect[0].customer_request_id.order_number_customer }}</div>
            <div class="text-900 font-medium text-xl">Invoice Number: {{ listRowSelect[0].customer_request_id.invoice_number_customer }}</div>
            <div class="text-900 font-medium text-xl">Request Quantity: {{ listRowSelect[0].customer_request_id.request_qty }}g</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-pink-100 border-round" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-dollar text-pink-500 text-xl"></i>
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
            <div class="text-900 font-medium text-xl">Description: {{ listRowSelect[0].status.description }}</div>
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
