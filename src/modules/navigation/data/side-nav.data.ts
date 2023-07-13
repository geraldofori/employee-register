import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'OPTIONS',
        items: ['charts', 'tables'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Attendance',
        link: '/dashboard',
    },

    charts: {
        icon: 'chart-area',
        text: 'Add Employee',
        link: '/charts',
    },
    tables: {
        icon: 'table',
        text: 'Employees',
        link: '/tables',
    },
};
