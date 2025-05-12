<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { io } from 'socket.io-client';

// Connect to WebSocket server
const socket = io('http://137.184.2.107:8000/', {
    transports: ['websocket'], // Force WebSocket
    autoConnect: true // Do not connect immediately
});

// Reactive variables
const isConnected = ref(false); // Tracks connection status
const kpis = ref([]); // List of KPIs
const jsonResponse = ref(''); // JSON response from the server
const sentValue = ref(''); // Input value for 'sent'
const receivedValue = ref(''); // Input value for 'received'

// Lifecycle: On Component Mount
onMounted(() => {
    // Receive initial KPIs from server

    // Connection success event
    socket.on('connect', () => {
        console.log('Socket connected successfully');

        isConnected.value = true;

        socket.on('active-kpis', (kpisData) => {
            console.log('Received KPIs data:', kpisData);
            kpis.value = Object.entries(kpisData).map(([name, data]) => ({ name, data }));
            jsonResponse.value = JSON.stringify(kpisData, null, 2);
        });
    });

    // Connection error event
    socket.on('connect_error', (err) => {
        console.error('Error connecting to WebSocket server:', err);
        isConnected.value = false;
    });

    // Listen for updates to specific KPIs
    for (let i of ['01', '02', '03', '04', '05', '06']) {
        socket.on(`update-kpi${i}`, (data) => updateKPICard(`kpi${i}`, data));
    }
});

// Lifecycle: On Component Unmount
onBeforeUnmount(() => {
    socket.disconnect(); // Clean up WebSocket connection
    console.log('Socket disconnected');
});

// Function to update a specific KPI
const updateKPI = (kpiName) => {
    const sent = Math.abs(parseInt(sentValue.value || '0', 10));
    const received = Math.abs(parseInt(receivedValue.value || '0', 10));

    const clientInfo = { kpi: kpiName, sent, received };
    socket.emit('update-kpi', clientInfo);

    sentValue.value = '';
    receivedValue.value = '';
};

// Function to reset all KPIs
const resetKPIs = () => {
    socket.emit('reset-kpi');
    console.log('Reset KPIs triggered');
};

// Function to update a KPI card with new data
const updateKPICard = (kpiName, data) => {
    const kpiToUpdate = kpis.value.find((kpi) => kpi.name === kpiName);
    if (kpiToUpdate) {
        kpiToUpdate.data = data;
        jsonResponse.value = JSON.stringify({ [kpiName]: data }, null, 2);
        console.log(`KPI ${kpiName} updated:`, data);
    }
};
</script>

<template>
    <div>
        <div>
            <h2>
                Conexión WebSocket:

                <span v-if="isConnected">Conectada ✅</span>
                <span v-else>Desactivada ❌</span>
            </h2>

            <!-- <div id="indicatorCards">
        <div v-for="(kpi, index) in kpis" :key="index" class="card">
          <h3>{{ kpi.name }}</h3>
          <p>Sent: {{ kpi.data.sent }}</p>
          <p>Received: {{ kpi.data.received }}</p>
          <p>Pending: {{ kpi.data.pending }}</p>
        </div>
      </div> -->

            <!-- <div id="indicatorButtons">
        <button v-for="(kpi, index) in kpis" :key="index" @click="updateKPI(kpi.name)">
          Update {{ kpi.name }}
        </button>
      </div> -->
            <!-- <pre>{{ kpis }}</pre> -->
            <div id="jsonResponse">
                <!-- <h3>JSON Response:</h3> -->
                <!-- <pre>{{ jsonResponse }}</pre> -->
            </div>

            <!-- <input v-model="sentValue" type="number" placeholder="Sent Value" />
      <input v-model="receivedValue" type="number" placeholder="Received Value" />
  
      <button @click="resetKPIs">Reset KPIs</button> -->
        </div>
        <div class="grid">
            <!-- Dynamic Columns -->
            <div v-for="(kpi, index) in kpis" :key="index" class="col-12 lg:col-6 xl:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <!-- Display KPI Name -->
                            <span class="block text-500 font-medium mb-3">{{ kpi.name }}</span>
                            <!-- Display Sent -->
                            <div class="text-900 font-medium text-xl">{{ kpi.data.sent }} Sent</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-chart-bar text-green-500 text-xl"></i>
                        </div>
                    </div>
                    <!-- Display Received -->
                    <div>
                        <span class="text-blue-500 font-medium">{{ kpi.data.received }}</span>
                        <span class="text-500">Received</span>
                    </div>
                    <!-- Display Pending -->
                    <div>
                        <span
                            :class="{
                                'text-red-500': kpi.data.pending < 0,
                                'text-green-500': kpi.data.pending >= 0
                            }"
                            class="font-medium"
                        >
                            {{ kpi.data.pending }}
                        </span>
                        <span class="text-500">Pending</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
}
</style>
