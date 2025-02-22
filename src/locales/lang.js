import JournalTransactions from "../views/pages/PayrollSettlement/JournalTransactions/JournalTransactions.vue";

export const messages = {
    en: {
        status: {
            ON_VACATION: 'On Vacation',
            INACTIVE: 'Inactive',
            RETIRED: 'Retired',
            DISCREPANCY_PENDING: 'Discrepancy Pending',
            DISCREPANCY_CORRECTION: 'Discrepancy Corrected',
            PAID: 'Paid',
            ACCOUNTED: 'Accounted',
            SHIPPED_TO: 'Shipped To',
            SHIPPED: 'Shipped',
            RECEIVED: 'Received',
            DISCREPANCY_DETECTED: 'Discrepancy Detected',
            VALIDATED_WITH_CORRECTION: 'Validated with Correction',
            COMPLETED: 'Completed',
            RECEIVED_PENDING: 'Received Pending',
            RECEIVED_DISCREPANCY_DETECTED: 'Received Discrepancy Detected',
            ARCHIVED: 'Archived',
            DELETED: 'Deleted',
            CREATED: 'Created',
            APPROVED: 'Approved',
            PENDING: 'Pending',
            TRANSFERS: 'Transfers',
            ON_HOLD: 'On Hold',
            ACTIVE: 'Active',
            UNDER_REVIEW: 'Under Review',
            ESCALATED: 'Escalated',
            RESOLVED: 'Resolved',
            IN_PROGRESS: 'In Progress',
            CLOSED_DAILY: 'Closed Daily',
            VALIDATED: 'Validated',
            LIQUIDATED: 'Liquidated'
        },
        message: {
            titleApp: 'AgroOnline Platform'
        },
        toolbarCrud: {
            titleCrud: 'Products to Information',
            titleCreate: 'New',
            titleEdit: 'Edit',
            titleClone: 'Clone',
            titleDelete: 'Delete',
            titleExport: 'Export'
        },
        record: {
            createDate: 'Creation date',
            modifyDate: 'Modification date',
            status: 'Status'
        },
        product: {
            mnuMain: 'Product',
            mnuProducts: 'Products',
            products: 'not products|one products|{count} products',
            titleCrud: 'Products to Information',

            appTable: {
                name: 'name',
                shortname: 'Short Name',
                slug: 'Code',
                cultivated: 'Cultited'
            }
        },
        vehicle: {
            mnuMain: 'Vehicle',
            mnuVehicles: 'Vehicles',
            vehicles: 'not vehicles|one vehicle|{count} vehicles',
            titleCrud: 'Vehicles to Information',

            appTable: {
                name: 'name',
                shortname: 'Short Name',
                slug: 'Code',
                cultivated: 'Cultited'
            }
        },

        company: {
            name: 'Company Name'
        },
        farm: {
            name: 'Farm Name'
        },
        menu: {

            dashboards: 'Dashboards',
            controlCenter: 'Control Center',
            monitorOnline: 'Online Monitor',
            top10Performance: 'Top 10 Performance',
            product: 'Product',
            varieties: 'Varieties',
            products: 'Products',
            productTypes: 'Product Types',
            unitTypes: 'Unit Types',
            packingTypes: 'Packing Types',
            //commercial: 'Commercial',
            commercial: {
                name: 'Commercial',
                productOffers: 'Product Offers',
                clientRequests: 'Client Requests',
                clients: 'Clients',
                deliveries: 'Deliveries',
            },
            productOffers: 'Product Offers',
            clientRequests: 'Client Requests',
            clients: 'Clients',
            deliveries: 'Deliveries',
            production: 
            {
                name:'Production',
                cropLots: 'Crop Lots',
                vehicles: 'Vehicles',
                lotScheduling: 'Lot Scheduling',
            },
            
            cultivationLots: 'Cultivation Lots',
            vehicles: 'Vehicles',
            lotScheduling: 'Lot Scheduling',
            temperatureControl: 'Temperature Control',
            meteoStation: 'Meteorological Station',
            paymentSettings: 'Payment Settings',
            paymentTypes: 'Payment Types',
            taskTypes: 'Task Types',
            taskRates: 'Task Rates',
            workTypes: 'Work Types',
            laborRates: 'Labor Rates',
            payPeriods: 'Pay Periods',
            calendars: 'Calendars',
            workCenters: 'Work Centers',
            jobTypes: 'Job Types',
            employees: 'Employees',
            payrollSettlement: 
            
            {title:'Payroll Settlement',
            subTitle: 'Payroll Settlement',
            JournalTransactions: {
                title: 'Journal Transactions',
                subTitle: 'Journal Transactions',
                }
            },
            dailyPlanning: 'Daily Planning',
            dailyTransactions: 'Daily Transactions',
            dailyTransactionsContractor: 'Daily Transactions Contractor',
            shipping: {
                shippingProcess: 'Shipping Process',
                tabs:{
                    shipping: 'Shipping',
                    received: 'Received',
                    discrepancies: 'Discrepancies',
                }},
            transferToPrefrio: 'Transfer to Prefrio',
            dailySettlement: 'Daily Settlement',
            employeeSummary: 'Employee Summary',
            periodSummary: 'Period Summary',
            payrollDiscounts: 'Payroll Discounts',
            admin: 'Administration',
            company: 'Company',
            farms: 'Farms',
            system: 'System',
            JournalTransactions: 'Journal Transactions',
            users: 'Users',
            roles: 'Roles',
            permissions: 'Permissions',
            recordStatus: 'Record Status',
            mobileApp: 'Mobile App',
            dataCapture: 'Data Capture',
            cortaCapture: 'Corta Capture',
            preFrioCapture: 'Prefrio Capture',
            selectionCapture: 'Selection Capture',
            contractorCapture: 'Contractor Capture',
            agronomyCapture: 'Agronomy Capture'
        },
            


        appmovil: {
            information: 'Planning information',
            vehicle: 'Vehicle',
            quantityRequested: 'Quantity Requested',
            centroTrabajo: 'Work Centers',
            titulo: 'Daily work of ',
            
            users: 'Users',
            detalles: ' Details',
            resumen: 'Summary',
            envios: 'Shipping',
            received: 'Received',
            tipoActividad: 'Type of Activity',
            lote: 'Batch',
            labor: 'Work',
            cantidad: 'Quantity',
            pesoAproximado: 'Approximate weight',
            precioUnitario: 'Unit price',
            notas: 'Grades',
            total: 'Total',
            save: 'Save',
            trabajos: 'Jobs',
            supervisor: 'Supervisor',
            loteDespacho: 'Dispatch lot',
            variedad: 'Variety',
            producto: 'Product',
            empaque: 'Packaging',
            fechaPlaneada: 'Planned date',
            dialaboral: 'Working day',
            empleado: 'Employee',
            voyage_number: 'Voyage Number',
            vehicle_employee: 'Vehicle - Driver',
            precio: 'Price',
            diaNormal: 'Normal day',
            diaFestivo: 'Holiday',
            usersAvailable: 'Users not available',
            noemployeeAssigned: 'No employee assigned',
            noemployeesAvailable: 'No employees available',
            infonoemployeeAssigned: 'There is no employee assigned to the user',
            nodataplanner: 'No data in daily planner',
            infonodataplanner: 'There is no data for the planner, please check the configuration of the work center, the company and the farm',
            nolotes: 'No batches',
            infonolotes: 'There are no batches scheduled for today despite the data planned',
            shipping: {
                shippingProcess: 'Shipping Process',
                deliveryProcess: 'Delivery Process',
            },
            
        }
    },
    es: {
        status: {
            ON_VACATION: 'En Vacaciones',
            INACTIVE: 'Inactivo',
            RETIRED: 'Retirado',
            DISCREPANCY_PENDING: 'Diferencia Pendiente',
            DISCREPANCY_CORRECTION: 'Diferencia Corregida',
            PAID: 'Pagado',
            ACCOUNTED: 'Contabilizado',
            SHIPPED_TO: 'Traslado a',
            SHIPPED: 'Enviado',
            RECEIVED: 'Recibido',
            DISCREPANCY_DETECTED: 'Discrepancia Detectada',
            VALIDATED_WITH_CORRECTION: 'Validado con Corrección',
            COMPLETED: 'Completado',
            RECEIVED_PENDING: 'Recibido Pendiente',
            RECEIVED_DISCREPANCY_DETECTED: 'Recibido con Discrepancia Detectada',
            ARCHIVED: 'Archivado',
            DELETED: 'Eliminado',
            CREATED: 'Creado',
            APPROVED: 'Aprobado',
            PENDING: 'Pendiente',
            TRANSFERS: 'Transferencias',
            ON_HOLD: 'En Espera',
            ACTIVE: 'Activo',
            UNDER_REVIEW: 'En Revisión',
            ESCALATED: 'Escalado',
            RESOLVED: 'Resuelto',
            IN_PROGRESS: 'En Progreso',
            CLOSED_DAILY: 'Cerrado Diario',
            VALIDATED: 'Validado',
            LIQUIDATED: 'Liquidado'
        },
        message: {
            titleApp: 'Plataforma AgroOnline'
        },
        toolbarCrud: {
            titleCrud: 'Información de productos',
            titleCreate: 'Nuevo',
            titleEdit: 'Editar',
            titleClone: 'Duplicar',
            titleDelete: 'Eliminar',
            titleExport: 'Exportar'
        },
        record: {
            createDate: 'Fecha Creaciòn',
            modifyDate: 'Fecha Modificacion',
            status: 'Status'
        },
        product: {
            mnuMain: 'Producto',
            mnuProducts: 'Productos',
            mnuTypeProducts: 'Tipos de productos',
            mnuVariants: 'Variedades',
            mnuTypeUnits: 'Tipos de Unidades',
            mnuTypeProducts: 'Products of Type',
            mnuVariants: 'Varieties',
            mnuTypeUnits: 'Units of Type',
            products: 'no productos|un producto|{count} productos',

            appTable: {
                name: 'Nombre',
                shortname: 'Nombre Corto',
                slug: 'Código',
                cultivated: 'Cultivable',
                farm_name: 'Finca',
                company_name: 'Empresa'
            }
        },

        vehicle: {
            mnuMain: 'Vehículo',
            mnuVehicles: 'Vehicles',
            vehicles: 'not vehicles|one vehicle|{count} vehicles',
            titleCrud: 'Información de Vehículos',

            appTable: {
                name: 'name',
                shortname: 'Short Name',
                slug: 'Code',
                cultivated: 'Cultited'
            }
        },
        company: {
            name: 'Empresa'
        },
        farm: {
            name: 'Finca'
        },

        menu: {

            dashboards: 'Tableros',
            controlCenter: 'Centro de Control',
            monitorOnline: 'Monitor en Línea',
            top10Performance: 'Top 10 Rendimiento',
            product: 'Producto',
            varieties: 'Variedades',
            products: 'Productos',
            productTypes: 'Tipos de Producto',
            unitTypes: 'Tipos de Unidad',
            packingTypes: 'Tipos de Empaque',
            //commercial: 'Comercial',
            commercial: {
                name: 'Comercial',
                productOffers: 'Ofertas de Producto',
                clientRequests: 'Solicitudes de Clientes',
                clients: 'Clientes',
                deliveries: 'Despachos',
            },
            productOffers: 'Ofertas de Producto',
            clientRequests: 'Solicitudes de Clientes',
            clients: 'Clientes',
            deliveries: 'Despachos',
            production: 
            {
                name:'Producción',
                cropLots: 'Lotes para corte',
                vehicles: 'Vehiculos',
                lotScheduling: 'Planeación de lotes',
            },
            cultivationLots: 'Lotes para Cultivo',
            vehicles: 'Vehículos',
            lotScheduling: 'Programación de Lotes',
            temperatureControl: 'Control de Temperatura',
            meteoStation: 'Estación Meteorológica',
            paymentSettings: 'Configuración de Pagos',
            paymentTypes: 'Tipos de Pago',
            taskTypes: 'Tipos de Tareas',
            taskRates: 'Tarifas por Tareas',
            workTypes: 'Tipos de Labores',
            laborRates: 'Tarifas por Labores',
            payPeriods: 'Periodos de Pago',
            calendars: 'Calendarios',
            workCenters: 'Centros de Trabajo',
            jobTypes: 'Cargos',
            employees: 'Empleados',
            payrollSettlement: 
            {title:'Liquidación de Nómina',
            subTitle: 'Liquidación de Nómina',
            JournalTransactions: {
                title: 'Diario de transacciones',
                subTitle: 'Diario de transacciones',
                
                }
            },
            dailyPlanning: 'Planeación Diaria',
            dailyTransactions: 'Transacciones del Día',
            dailyTransactionsContractor: 'Transacciones del Día Contratista',
            shipping: {
                shippingProcess: 'Proceso de Envío',
                tabs:{
                    shipping: 'Envío',
                    received: 'Recibidos',
                    discrepancies: 'Discrepancias',
                }
            },
            transferToPrefrio: 'Traslado a Prefrio',
            dailySettlement: 'Liquidación Diaria',
            employeeSummary: 'Resumen de Empleados',
            periodSummary: 'Resumen de Periodo',
            payrollDiscounts: 'Descuentos de Nómina',
            admin: 'Administración',
            company: 'Empresa',
            farms: 'Fincas',
            system: 'Sistema',
            JournalTransactions: 'Transacciones Diarias',
            users: 'Usuarios',
            roles: 'Roles',
            permissions: 'Permisos',
            recordStatus: 'Estado de Registros',
            mobileApp: 'App Móvil',
            dataCapture: 'Captura de Datos',
            cortaCapture: 'Captura de Corta',
            preFrioCapture: 'Captura de Prefío',
            selectionCapture: 'Captura de Selección',
            contractorCapture: 'Captura de Contratista',
            agronomyCapture: 'Captura de Agronomía'
        },
        appmovil: {
            information: 'Información de planeación',
            vehicle: 'Vehículo',
            quantityRequested: 'Cantidad Solicitada',
            centroTrabajo: 'Centro de Trabajo',
            titulo: 'Trabajo diario de ',
            users: 'Usuarios',
            detalles: 'Detalles',
            resumen: 'Resumen',
            envios: 'Envios',
            received: 'Recibidos',
            tipoActividad: 'Tipo Actividad',
            lote: 'Lote',
            labor: 'Labor',
            cantidad: 'Cantidad',
            pesoAproximado: 'Peso Aproximado',
            precioUnitario: 'Precio Unitario',
            notas: 'Notas',
            total: 'Total',
            save: 'Guardar',
            trabajos: 'Trabajos',
            supervisor: 'Supervisor',
            loteDespacho: 'Lote despacho',
            variedad: 'Variedad',
            producto: 'Producto',
            empaque: 'Empaque',
            fechaPlaneada: 'Fecha Planeada',
            dialaboral: 'Dia laboral',
            empleado: 'Empleado',
            vehicle_employee: 'Cochero',
            voyage_number: 'Número de viaje',
            precio: 'Precio',
            diaNormal: 'Normal',
            diaFestivo: 'Festivo',
            usersAvailable: 'Usuarios no disponibles',
            noemployeeAssigned: 'No hay empleado asignado',
            noemployeesAvailable: 'No hay empleados disponibles',
            infonoemployeeAssigned: 'No hay empleado asignado al usuario',
            nodataplanner: 'No hay planeación diaria' ,
            infonodataplanner: 'No hay datos planeados, por favor verifique la configuración del centro de trabajo, la compañía y la finca.',
            nolotes: 'No hay lotes',
            infonolotes: 'No hay lotes programados para hoy a pesar de los datos planeados',
            shipping: {
                shippingProcess: 'Proceso de Envío',
                deliveryProcess: 'Proceso de Entrega',
            },
            
            
            
        }
    }
};
