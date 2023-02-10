const localStorageValue = localStorage.getItem("loggedIn");

export const Menu = [
    {
        title: 'Home',
        url: '/',
        cName: 'nav-links'
    },
    ...(localStorageValue === 'true'
    ? [{
        title: 'Hyr en cykel',
        url: '/rent',
        cName: 'nav-links'
    }]
    : [])
];
