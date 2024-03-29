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
            title: 'Alla kunder',
            url: '/customers',
            cName: 'nav-links'
        },
        {
            title: 'Elsparkcyklar',
            url: '/elscooters',
            cName: 'nav-links'
        }]
        : [])
];
