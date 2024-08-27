<script setup>
import { ref, onMounted } from 'vue';
import CountryService from '@/service/CountryService';
import NodeService from '@/service/NodeService';

const floatValue = ref(null);
const autoValue = ref(null);
const selectedAutoValue = ref(null);
const autoFilteredValue = ref([]);
const calendarValue = ref(null);
const inputNumberValue = ref(null);
const chipsValue = ref(null);
const sliderValue = ref(50);
const ratingValue = ref(null);
const colorValue = ref('#1976D2');
const radioValue = ref(null);
const checkboxValue = ref([]);
const switchValue = ref(false);
const listboxValues = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const listboxValue = ref(null);
const dropdownValues = ref([
    { name: 'Trabajador 1', code: 'T1' },
    { name: 'Trabajador 2', code: 'T2' },
    { name: 'Trabajador 3', code: 'T3' },
    { name: 'Trabajador 4', code: 'T4' },
    { name: 'Trabajador 5', code: 'T5' }
]);
const dropdownValue = ref(null);
const dropdownValuesOwner = ref([
    { name: 'Coordinador 1', code: 'C1' },
    { name: 'Coordinador 2', code: 'C2' }

]);
const dropdownValueOwner = ref(null);
const dropdownValuesProduct = ref([
    { name: 'Producto 1', code: 'P1' },
    { name: 'Producto 2', code: 'P2' }

]);
const dropdownValueProduct = ref(null);
const multiselectValues = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);

const multiselectValue = ref(null);
const toggleValue = ref(false);
const selectButtonValue1 = ref(null);
const selectButtonValues1 = ref([{ name: 'Guardar' }/*, { name: 'Actualizar' }, { name: 'Eliminar' }*/]);
const selectButtonValue2 = ref(null);
const selectButtonValues2 = ref([{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]);
const knobValue = ref(50);
const inputGroupValue = ref(false);
const treeSelectNodes = ref(null);
const selectedNode = ref(null);
const countryService = new CountryService();
const nodeService = new NodeService();

onMounted(() => {
    countryService.getCountries().then((data) => (autoValue.value = data));
    nodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
});

const searchCountry = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            autoFilteredValue.value = [...autoValue.value];
        } else {
            autoFilteredValue.value = autoValue.value.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
};


const calendarDate = ref(new Date().toISOString().slice(0, 10))
console.log(calendarDate)
const stateDate = ref(null)
stateDate.value = true;

const onClickDateYes = () => {
    console.log('yes')
    //stateDate = true;
    return stateDate
}
const onClickDateNo = () => {
    console.log('no')
    //stateDate = false;
    return stateDate;
}


</script>
<template>
    <div class="grid p-fluid">
        <div class="col-12 md:col-6">
            <div class="card">
                <h5>Lote</h5>
                <div class="grid formgrid">
                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                        <InputText type="number" placeholder="No Lote"></InputText>
                    </div>

                </div>

                <h5>Fecha</h5>
                <div class="col-12 md:col-12">
                    <div class="card">
                        <span class="p-float-label">
                            <div v-if="stateDate">
                                <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarDate"
                                    dateFormat="yy-mm-dd">
                                </Calendar>
                            </div>

                        </span>
                    </div>

                </div>



                <h5>Trabajador</h5>
                <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                <h5>Peso </h5>
                <div class="grid formgrid">
                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                        <span class="p-input-icon-left">
                            <i class="pi pi-bars" />
                            <InputText type="text" placeholder="Bolsa gr" />
                        </span>
                    </div>


                </div>

                <h5>Cantidades</h5>
                <div class="grid formgrid">
                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                        <span class="p-input-icon-left">
                            <i class="pi pi-briefcase" />
                            <InputText type="text" placeholder="Empaque" />
                        </span>
                    </div>


                </div>





                <!--
                <h5>AutoComplete</h5>
                <AutoComplete placeholder="Search" id="dd" :dropdown="true" :multiple="true" v-model="selectedAutoValue" :suggestions="autoFilteredValue" @complete="searchCountry($event)" field="name" />


                <h5>Spinner</h5>
                <InputNumber v-model="inputNumberValue" showButtons mode="decimal"></InputNumber>

                <h5>Chips</h5>
                <Chips v-model="chipsValue" />
                --->
            </div>
            <!--
            <div class="card">
                <div class="grid">
                    <div class="col-12">
                        <h5>Slider</h5>
                        <InputText v-model.number="sliderValue" />
                        <Slider v-model="sliderValue" />
                    </div>
                    <div class="col-12 md:col-6">
                        <h5>Rating</h5>
                        <Rating v-model="ratingValue" />
                    </div>
                    <div class="col-12 md:col-6">
                        <h5>ColorPicker</h5>
                        <ColorPicker style="width: 2rem" v-model="colorValue" />
                    </div>
                    <div class="col-12">
                        <h5>Knob</h5>
                        <Knob v-model="knobValue" :step="10" :min="-50" :max="50" valueTemplate="{value}%" />
                    </div>
                </div>
            </div>
            -->
        </div>

        <div class="col-12 md:col-6">
            <div class="card">
                <h5>Tipo de empaque</h5>
                <div class="grid">
                    <div class="col-12 md:col-4">
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="option1" name="option" value="Icopor" v-model="radioValue" />
                            <label for="option1">Icopor</label>
                        </div>
                    </div>

                    <div class="col-12 md:col-4">
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="option2" name="option" value="Canastilla" v-model="radioValue" />
                            <label for="option2">Canastilla</label>
                        </div>
                    </div>


                    <div class="col-12 md:col-4">
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="option3" name="option" value="Otro" v-model="radioValue" />
                            <label for="option3">Otro</label>
                        </div>
                    </div>

                </div>
                <h5>Nombre del producto</h5>

                <Dropdown v-model="dropdownValueProduct" :options="dropdownValuesProduct" optionLabel="name"
                    placeholder="Select" />
                <!--
                <h5>Checkbox</h5>
                
                <div class="grid">
                    <div class="col-12 md:col-4">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
                            <label for="checkOption1">Chicago</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                            <label for="checkOption2">Los Angeles</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption3" name="option" value="New York" v-model="checkboxValue" />
                            <label for="checkOption3">New York</label>
                        </div>
                    </div>
                </div>
            

                <h5>Input Switch</h5>
                <InputSwitch v-model="switchValue" />
                -->
            </div>

            <div class="card">
                <h5>Encargado</h5>

                <Dropdown v-model="dropdownValueOwner" :options="dropdownValuesOwner" optionLabel="name"
                    placeholder="Select">

                </Dropdown>

                <h5></h5>
                <Button label="Enviar"></Button>
        <!--************************************************-->        
        <!--A partir de aquiiiiii-->

                
    <SelectButton v-model="selectButtonValue1" :options="selectButtonValues1" optionLabel="name" />
                <h5>ListBox</h5>
                <Listbox v-model="listboxValue" :options="listboxValues" optionLabel="name" :filter="true" />

                <h5>MultiSelect</h5>
                
                <MultiSelect v-model="multiselectValue" :options="multiselectValues" optionLabel="name" placeholder="Select Countries" :filter="true">
                    <template #value="slotProps">
                        <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.code">
                            <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px" />
                            <div>{{ option.name }}</div>
                        </div>
                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                            <div class="p-1">Select Countries</div>
                        </template>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width: 18px; height: 12px" />
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </MultiSelect>

                <h5>TreeSelect</h5>
                <TreeSelect v-model="selectedNode" :options="treeSelectNodes" placeholder="Select Item"></TreeSelect>
            </div>

            <div class="card">
                <h5>ToggleButton</h5>
                <ToggleButton v-model="toggleValue" onLabel="Yes" offLabel="No" :style="{ width: '10em' }" />

                

                <h5>SelectButton - Multiple</h5>
                <SelectButton v-model="selectButtonValue2" :options="selectButtonValues2" optionLabel="name" :multiple="true" />
                
             
<!--Hasta aquí-->


            </div>

        </div>

        <div class="col-12">
            <!--
            <div class="card">
                <h5>Input Groups</h5>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-6">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Username" />
                        </div>
                    </div>

                    <div class="col-12 md:col-6">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"><i class="pi pi-shopping-cart"></i></span>
                            <span class="p-inputgroup-addon"><i class="pi pi-globe"></i></span>
                            <InputText placeholder="Price" />
                            <span class="p-inputgroup-addon">$</span>
                            <span class="p-inputgroup-addon">.00</span>
                        </div>
                    </div>

                    <div class="col-12 md:col-6">
                        <div class="p-inputgroup">
                            <Button label="Search" />
                            <InputText placeholder="Keyword" />
                        </div>
                    </div>

                    <div class="col-12 md:col-6">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                <Checkbox v-model="inputGroupValue" :binary="true" />
                            </span>
                            <InputText placeholder="Confirm" />
                        </div>
                        
                    </div>
                </div>
                
            </div>
            -->
        </div>
    </div>
</template>
