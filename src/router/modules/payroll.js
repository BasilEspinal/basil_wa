export default [
    // Payroll Settings
    {
        path: '/payrollsettings/PaymentTypes',
        name: 'PaymentTypes',
        component: () => import('@/views/pages/PayrollSettings/PaymentType/PaymentType.vue')
    },
    {
        path: '/payrollsettings/taskstarif',
        name: 'taskstarif',
        component: () => import('@/views/pages/PayrollSettings/TasksTarif/TasksTarif.vue')
    },
    {
        path: '/payrollsettings/taskstypes',
        name: 'taskstypes',
        component: () => import('@/views/pages/PayrollSettings/TasksTypes/TasksTypes.vue')
    },
    {
        path: '/payrollsettings/payperiods',
        name: 'payperiods',
        component: () => import('@/views/pages/PayrollSettings/PaymentPeriods/PaymentPeriods.vue')
    },
    {
        path: '/payrollsettings/calendars',
        name: 'calendars',
        component: () => import('@/views/pages/PayrollSettings/Calendars/Calendars.vue')
    },
    {
        path: '/payrollsettings/jobtypes',
        name: 'jobtypes',
        component: () => import('@/views/pages/PayrollSettings/JobTypes/JobTypes.vue')
    },
    {
        path: '/payrollsettings/donetypes',
        name: 'donetypes',
        component: () => import('@/views/pages/PayrollSettings/DoneTypes/DoneTypes.vue')
    },
    {
        path: '/payrollsettings/workstarif',
        name: 'contractors',
        component: () => import('@/views/pages/PayrollSettings/WorksTarif/WorksTarif.vue')
    },
    {
        path: '/payrollsettings/Workcenters',
        name: 'workcenters',
        component: () => import('@/views/pages/PayrollSettings/WorkCenters/WorkCenters.vue')
    },
    {
        path: '/payrollsettings/Employees',
        name: 'employees',
        component: () => import('@/views/pages/PayrollSettings/Employees/Employees.vue')
    },

    // Payroll Settlement
    {
        path: '/PayrollSettlement/DailyPlanner',
        name: 'dailyplanner',
        component: () => import('@/views/pages/PayrollSettlement/DailyPlanner/DailyPlanner.vue')
    },
    {
        path: '/PayrollSettlement/DailyTransactions',
        name: 'dailytransactions',
        component: () => import('@/views/pages/PayrollSettlement/DailyTransactions/DailyTransactions.vue')
    },
    {
        path: '/PayrollSettlement/DailyTransactionsContractor',
        name: 'dailytransactionscontractor',
        component: () => import('@/views/pages/PayrollSettlement/DailyTransactionsContractor/DailyTransactionsContractor.vue')
    },
    {
        path: '/PayrollSettlement/ShippingProcess/ShippingProcess',
        name: 'shippingProcess',
        component: () => import('@/views/pages/PayrollSettlement/ShippingProcess/ShippingProcess.vue')
    },
    {
        path: '/PayrollSettlement/JournalTransactions',
        name: 'JournalTransactions',
        component: () => import('@/views/pages/PayrollSettlement/JournalTransactions/JournalTransactions.vue')
    },
    {
        path: '/PayrollSettlement/LedgerTransactions',
        name: 'LedgerTransactions',
        component: () => import('@/views/pages/PayrollSettlement/LedgerTransactions/LedgerTransactions.vue')
    },
    {
        path: '/PayrollSettlement/TransferTasks',
        name: 'TransferTasks',
        component: () => import('@/views/pages/PayrollSettlement/TransferTasks/TransfersTasks.vue')
    },
    {
        path: '/PayrollSettlement/DailySettlement',
        name: 'dailysettlement',
        component: () => import('@/views/pages/PayrollSettlement/DailySettlement/DailySettlement.vue')
    },
    {
        path: '/PayrollSettlement/EmployeesInformation',
        name: 'employees_information',
        component: () => import('@/views/pages/PayrollSettlement/EmployeesInformation/EmployeesInformation.vue')
    },
    {
        path: '/PayrollSettlement/DiscountRegistering',
        name: 'DiscountRegistering',
        component: () => import('@/views/pages/PayrollSettlement/DiscountRegistering/DiscountRegistering.vue')
    },
    {
        path: '/PayrollSettlement/PaymentPeriodsInformation',
        name: 'payment_periods_information',
        component: () => import('@/views/pages/PayrollSettlement/PaymentsPeriodsInformation/PaymentPeriodsInformation.vue')
    },
    {
        path: '/PayrollSettlement/WorkRegisterCorta',
        name: 'workregistercorta',
        component: () => import('@/views/pages/PayrollSettlement/WorkRegisterCorta/AreaMovementRegister.vue')
    },
    {
        path: '/PayrollSettlement/WorkRegisterSelection',
        name: 'WorkRegisterSelection',
        component: () => import('@/views/pages/PayrollSettlement/WorkRegisterSelection/DailyWorkRegistering.vue')
    },
    {
        path: '/PayrollSettlement/WorkRegisterDaily',
        name: 'WorkRegisterDaily',
        component: () => import('@/views/pages/PayrollSettlement/WorkRegisterDaily/EmployeeDailyWork.vue')
    }
];
