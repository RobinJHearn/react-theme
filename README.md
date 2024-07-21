# Theming with Material UI, Tailwind and CSS

Base code taken from the example 'dashboard' from https://github.com/mui/material-ui/tree/v5.16.4/docs/data/material/getting-started/templates/dashboard

The display is themed using different techniques

- MUI Theme palette
- MUI Theme components style override
- Styled MUI components
- MUI sx props
- TailwindCSS className

## Details

### src/index.css

This file contains the colour defintions as a group of CSS variables. Each variable is a series of 4 numbers, comma separated, that define the Red, Green, Blue, Alpha values as used as input to the rgba() funtions.

`e.g.   --main-background: 224, 224, 224, 1;`

It then contains groupings of these variables used depending on the current data-theme selected.

`e.g. :root[data-theme="dark"] {`

### tailwind.config.js

This file contains the TailwindCSS configuration, in particular the extension of colors to use the CSS variables defined in the index.css file.

```
e.g.
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--main-background))",
```

### src/components/Dashboard.tsx

This file contains the main components as well as the MUI theme.

The MUI theme sets the default primary colour and contrasting text colours from the CSS variables. The theme creation doesn't like accessing a CSS variable directly but is happy to access one inside the rgba function. This is why the colour values are stored in the css file as a sequence of values, it does mean everything needs to be wrapped in the rgba() function but being able to use the same colour definitions in both Tailwind CSS and MUI makes it worth while.

The theme also overrides the default colours for the MUI Drawer component. The colours used for the AppBar are overridden in the styled variant that is used.

The two buttons displayed use

1. The default colours from the theme
1. Overrideden colours using TailwindCSS classNames

The background box in the main display area has its colour set via the components sx property string.

One of the panels contains a drop down selection to pick the theme to use. Console logging is used to display what theme is selected and also when the createTheme method is called. This demonstrates that the theme is only created once and uses the CSS variables to set the colours, causing them to change as the theme changes.
