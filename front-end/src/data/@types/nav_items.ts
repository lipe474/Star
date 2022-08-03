
export interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Destaques',
        href: '/highlights',
        // children: [
        //     {
        //         label: 'Ciência Imunologia',
        //         subLabel: 'Anticorpos neutralizantes de alta afinidade para SARS-CoV-2',
        //         href: '/',
        //     },
        //     {
        //         label: 'Coronavirus',
        //         subLabel: 'Memória imunológica da infecção por SARS-CoV-2',
        //         href: '/',
        //     },
        // ],
    },
    {
        label: 'Categorias',
        children: [
            {
                label: 'Motores a Vapor',
                subLabel: 'Luz para oscilação auto-adaptativa e natação biomimética',
                href: '/',
            },
            {
                label: 'Locomoção perceptiva robusta para robôs',
                subLabel: 'Robôs quadrúpedes na natureza',
                href: '/',
            },
        ],
    },
    {
        label: 'Newsletters',
        href: '/',
    },
    // {
    //     label: 'Avanços da Ciência',
    //     href: '/',
    // },
];

export default NAV_ITEMS;
