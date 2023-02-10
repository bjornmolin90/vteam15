const localStorageValue = localStorage.getItem("loggedIn");

export const Menu = [
    {
        title: 'Home',
        url: '/',
        cName: 'nav-links'
    },
    {
        title: 'Logga in',
        url: '/inlogg',
        cName: 'nav-links'
    },
    {
        title: 'Registrera',
        url: '/registera',
        cName: 'nav-links'
    },
    ...(localStorageValue === 'true'
    ? [{
        title: 'Dina resor',
        url: '/rides',
        cName: 'nav-links'
    },
    {
        title: 'Konto',
        url: '/account',
        cName: 'nav-links'
    }]
    : [])
];
