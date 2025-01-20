import plugin from 'tailwindcss/plugin';

export default plugin(function ({addBase, theme}) {
    if (process.env.NODE_ENV === 'production') return;
    addBase({
        'body::after': {
            content: `"xs"`,
            position: 'fixed',
            right: '.5rem',
            bottom: '.5rem',
            padding: '.5rem',
            background: '#eee',
            border: '1px solid',
            borderColor: '#ddd',
            color: '#e50478',
            fontSize: '1rem',
            fontWeight: '600',
            zIndex: '99999',
        },
    });

    addBase(
        Object.entries(theme('screens'))
            .filter((value) => typeof value[1] == 'string')
            .sort((a, b) => a[1].replace(/\D/g, '') - b[1].replace(/\D/g, ''))
            .map((value) => {
                let pxValue = '';

                if (value[1].includes('rem')) {
                    pxValue = parseInt(value[1].replace('rem', '')) * 16;
                }

                if (value[1].includes('px')) {
                    pxValue = parseInt(value[1].replace('px', ''));
                }

                return {
                    [`@media (min-width: ${value[1]})`]: {
                        'body::after': {
                            content: `"${value[0]} (${pxValue}px)"`,
                        },
                    },
                };
            }),
    );
});
