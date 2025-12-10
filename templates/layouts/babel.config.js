module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                // Avoids transpiling ES modules to CommonJS, letting Webpack handle it.
                // This is better for tree-shaking.
                modules: false,
            },
        ],
        [
            '@babel/preset-react',
            {
                // Uses the new JSX transform introduced in React 17+.
                runtime: 'automatic',
            },
        ],
    ],
    plugins: [

    ],
};