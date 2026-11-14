# @fringeworks/react-icon-material-symbols

`@fringeworks/react-icon-material-symbols` is a library some will find handy, for using Google's [Material Symbols](https://fonts.google.com/icons) as React components with typed icon names and variable font axes.

**[日本語のREADMEはこちら](./README.ja.md)**

It is an adapter for [`@fringeworks/react-icon`](https://www.npmjs.com/package/@fringeworks/react-icon). Like the react-icon components, you render it as `<Icon value="home" />`, and you can combine it with react-icon's `createPrefixedIcon` and so on. react-icon is installed along with this package, so you do not need to install it separately.

## Installation

```bash
npm install @fringeworks/react-icon-material-symbols
```

Supports React 18 and 19.

## Usage

1. Load this package's CSS once in your app. It includes the icon box CSS (from react-icon).
2. Load the font for the style you use. The easiest way is this package's `font-<style>.css` (for other ways, see "Loading the font" below).
3. Pass an icon name to the component's `value`.

```tsx
import { MaterialSymbolOutlined } from '@fringeworks/react-icon-material-symbols';
import '@fringeworks/react-icon-material-symbols/styles.css';
import '@fringeworks/react-icon-material-symbols/font-outlined.css';

<MaterialSymbolOutlined value="home" />;
```

The type of `value` is the Material Symbols icon names (`MaterialSymbolValue`), so you get completion, and typos are type errors.

### Three styles

There is one component per Material Symbols style. Apps usually stick to one style, so give it a short name with an import alias.

| Component                | Font family                 |
| ------------------------ | --------------------------- |
| `MaterialSymbolOutlined` | `Material Symbols Outlined` |
| `MaterialSymbolRounded`  | `Material Symbols Rounded`  |
| `MaterialSymbolSharp`    | `Material Symbols Sharp`    |

```tsx
import { MaterialSymbolRounded as Icon } from '@fringeworks/react-icon-material-symbols';
```

### Loading the font

Loading the font is a separate entry point from the icon styles (`styles.css`). Load the font for the styles you use in one of the following ways. All of them use only the `@font-face`; the classes that come with the font (`.material-symbols-outlined` and so on) are not used.

**From this package's entry point**

```ts
import '@fringeworks/react-icon-material-symbols/font-outlined.css';
```

| Entry point         | Font loaded                 |
| ------------------- | --------------------------- |
| `font-outlined.css` | `Material Symbols Outlined` |
| `font-rounded.css`  | `Material Symbols Rounded`  |
| `font-sharp.css`    | `Material Symbols Sharp`    |

It is an `@import` of the CSS from the npm [`material-symbols`](https://www.npmjs.com/package/material-symbols) package, which is installed along with this package. Your app's bundler (Vite, webpack, Next.js, and so on) picks up the font files from `material-symbols`. The fonts include every icon, 3.5–5.4 MB per style.

**From Google Fonts**

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200&display=block"
/>
```

To use the variable font axes, put the axis ranges in the URL (`opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200`). Adding `&icon_names=home,search` gives you a font with only the icons you use, which makes the file smaller.

**Serving it yourself**

When you serve your own font, such as a subset with only the icons you use in a setup that must not access external servers, write the `@font-face` yourself. Use the font family names in the table above.

If you do not load this package's entry points, the `material-symbols` fonts do not end up in your app (they are still installed).

Use `font-display: block` when you serve it yourself too. Icons are not drawn until the font arrives (up to about 3 seconds), so the icon names are not shown as text (this package's entry points and the Google Fonts URL above use `block`). To show a skeleton meanwhile, see "Showing a skeleton while the font loads" below.

### Size and color

Icons are drawn in a `1em` square box and inherit the parent's `font-size` and `color`. In text and buttons they match the size and color of the surrounding text. Unlike the classes that come with Material Symbols, the size is not fixed at 24px; set `font-size` when you want 24px.

```tsx
<MaterialSymbolOutlined
  value="home"
  style={{ fontSize: 24, color: 'tomato' }}
/>
```

### Variable font axes

You can change the four Material Symbols axes with props.

```tsx
<MaterialSymbolOutlined value="favorite" filled />
<MaterialSymbolOutlined value="settings" fontWeight={300} grade={-25} />
<MaterialSymbolOutlined value="search" opticalSize={20} />
```

| Prop           | Axis   | Description                                                                                                        |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `fontWeight?`  | `wght` | Weight (100–700). Drawn with the CSS `font-weight`                                                                 |
| `filled?`      | `FILL` | `true` for the filled shape, `false` (default) for the outlined one. A number from 0 to 1 gives a shape in between |
| `grade?`       | `GRAD` | Grade (-25–200). Changes the stroke thickness without changing the weight (the icon's size)                        |
| `opticalSize?` | `opsz` | Optical size (20–48). If omitted, the browser picks it to match the text size (`font-optical-sizing: auto`)        |

The axis props apply in every state, including hover (the same as a single value in `design`). The axis values are built from CSS variables (`--frg-materialsymbol-filled` and so on; see the "Design values" table below), so you can also change each axis with CSS.

### Changing on hover

With `design`, you can set the value for each axis when the pointer is over the icon (`:hover`).

```tsx
<MaterialSymbolOutlined
  value="favorite"
  design={{ filled: { hover: 1 }, fontWeight: { hover: 600 } }}
/>
```

To change it when the pointer is over a parent element such as a button, set the variable with CSS. Set the variable for hovering the icon itself (`-hover`) too. Otherwise, when the pointer moves onto the icon, the icon's `:hover` falls back to the default value.

```css
.favorite-button:hover {
  --frg-materialsymbol-filled: 1;
  --frg-materialsymbol-filled-hover: 1;
}
```

Props such as `filled` write the variable on the element, so they win over values inherited from the parent. Do not set that prop on icons that the parent's CSS changes.

To set a design shared across your app, use `withDesign` from [`@fringeworks/react-contract`](https://www.npmjs.com/package/@fringeworks/react-contract). The components have their design definition in the static property `designDefinition`.

```tsx
import { withDesign } from '@fringeworks/react-contract';

const Icon = withDesign(MaterialSymbolOutlined, { filled: { hover: 1 } });
```

### How props, `design`, and `withDesign` combine

When the same axis is set in more than one way, the `design` where it is used > the axis prop > the `withDesign` values (`fallbackDesign`). States a stronger one does not set take the weaker one's value.

| Set                                                                     | Stateless | On hover                      |
| ----------------------------------------------------------------------- | --------- | ----------------------------- |
| `fontWeight={300}`                                                      | 300       | 300                           |
| `fontWeight={300}` and `design={{ fontWeight: { hover: 700 } }}`        | 300       | 700                           |
| `design={{ fontWeight: { base: 700 } }}`                                | 700       | 400 (the component's default) |
| `design={{ fontWeight: 700 }}`                                          | 700       | 700                           |
| `{ fontWeight: { hover: 700 } }` in `withDesign` and `fontWeight={300}` | 300       | 300                           |

- States omitted in an object per state in `design` do not take over the `base` value (`{ base: 700 }` sets only the stateless value). To use the same value in every state, write a single value (`fontWeight: 700`).
- The `withDesign` values are weaker than the props where the component is used. You can change an axis set app-wide by writing the prop where it is used.

### Accessibility

If you pass `aria-label` or `aria-labelledby`, the icon is announced as an image (`role="img"`). Otherwise it is marked as decoration with `aria-hidden`.

```tsx
<button type="button">
  <MaterialSymbolOutlined value="search" /> Search {/* decoration */}
</button>
<button type="button">
  <MaterialSymbolOutlined value="search" aria-label="Search" /> {/* icon-only button */}
</button>
```

### Showing a skeleton while the font loads

The components have the web fonts they need in `webFonts`. You can pass it as is to `useDeferUntilWebFontReady` from [`@fringeworks/react-defer-rendering`](https://www.npmjs.com/package/@fringeworks/react-defer-rendering).

```tsx
import { useDeferUntilWebFontReady } from '@fringeworks/react-defer-rendering';

function Toolbar() {
  const { node } = useDeferUntilWebFontReady(
    <MaterialSymbolOutlined value="home" />,
    MaterialSymbolOutlined.webFonts,
    { pending: <Skeleton /> },
  );
  return node;
}
```

### Using names missing from the type

`MaterialSymbolValue` is the type of the npm `material-symbols` package installed with this package, so the names match the installed fonts. To use names missing from the type, such as newly added icons, create a component with a wider name type with react-icon's `createFontIcon` (it does not have the variable font axis props or `design`).

```tsx
import { createFontIcon } from '@fringeworks/react-icon';
import type { MaterialSymbolValue } from '@fringeworks/react-icon-material-symbols';

const Icon = createFontIcon<MaterialSymbolValue | 'new_icon'>({
  fontFamily: 'Material Symbols Outlined',
});
```

## API

| Component                | Description                      |
| ------------------------ | -------------------------------- |
| `MaterialSymbolOutlined` | A Material Symbols Outlined icon |
| `MaterialSymbolRounded`  | A Material Symbols Rounded icon  |
| `MaterialSymbolSharp`    | A Material Symbols Sharp icon    |

### `MaterialSymbolOutlined`, `MaterialSymbolRounded`, `MaterialSymbolSharp`

```ts
MaterialSymbolOutlined(props: MaterialSymbolProps): ReactElement
MaterialSymbolRounded(props: MaterialSymbolProps): ReactElement
MaterialSymbolSharp(props: MaterialSymbolProps): ReactElement
```

Draws the `value` icon as ligature text in a `<span>`. Other props are passed to the `<span>` (`ref` also points to the `<span>`); `className` and `style` are merged, and for the same property the received value wins.

| Property          | Type                   | Description                                                                                                     |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| `value`           | `MaterialSymbolValue`  | The icon name                                                                                                   |
| `fontWeight?`     | `number`               | Weight (`wght`, 100–700)                                                                                        |
| `filled?`         | `boolean \| number`    | Fill (`FILL`). `true` is 1, `false` (default) is 0. Also takes a number from 0 to 1                             |
| `grade?`          | `number`               | Grade (`GRAD`, -25–200)                                                                                         |
| `opticalSize?`    | `number`               | Optical size (`opsz`, 20–48). If omitted, it follows the text size                                              |
| `design?`         | `MaterialSymbolDesign` | Design values (table below). Stronger than the prop for the same axis                                           |
| `fallbackDesign?` | `MaterialSymbolDesign` | The app-wide design values (passed by `withDesign`). Fill the axes and states the props and `design` do not set |

Static properties of the components:

| Property           | Type                                    | Description                                                                          |
| ------------------ | --------------------------------------- | ------------------------------------------------------------------------------------ |
| `webFonts`         | `readonly FontIconWebFont[]`            | The web fonts needed to draw (`[{ family: 'Material Symbols Outlined' }]` and so on) |
| `designDefinition` | `typeof materialSymbolDesignDefinition` | The design definition (read by react-contract's `withDesign`)                        |
| `displayName`      | `string`                                | `MaterialSymbolOutlined` and so on                                                   |

#### Design values

The design values you can pass with `design` (the CSS variable is `--frg-materialsymbol-` followed by the key joined with `-`, e.g. `filled.hover` → `--frg-materialsymbol-filled-hover`). If you do not set the `hover` value, the component's default applies on hover (the stateless value is not taken over). A single value also applies to `hover`.

| Key                | Default | Description                                                    |
| ------------------ | ------- | -------------------------------------------------------------- |
| `fontWeight`       | `400`   | Weight (`wght`)                                                |
| `fontWeight.hover` | `400`   | Weight on hover                                                |
| `filled`           | `0`     | Fill (`FILL`, 0–1; values in between are mid-animation shapes) |
| `filled.hover`     | `0`     | Fill on hover                                                  |
| `grade`            | `0`     | Grade (`GRAD`)                                                 |
| `grade.hover`      | `0`     | Grade on hover                                                 |
| `opticalSize`      | —       | Optical size (`opsz`). Fixed only when set                     |

`design` values follow the rules of `createDesignStyle` from [`@fringeworks/react-contract`](https://www.npmjs.com/package/@fringeworks/react-contract). `filled`, `grade`, and `opticalSize` are names for variable font axes that have no CSS property.

When you set `opticalSize` with a CSS variable, also add the `frg-materialsymbol-opticalSize` class to the element. Writing `opsz` in `font-variation-settings` disables the automatic optical size that follows the text size, so `opsz` is written only when this class is present (the component adds it when you set `opticalSize` or `design.opticalSize`).

### CSS entry points

| Entry point                                               | Description                                                                                                                                                     |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styles.css`                                              | The icon styles (including react-icon's box CSS). Does not include the fonts                                                                                    |
| `font-outlined.css`, `font-rounded.css`, `font-sharp.css` | Loads the font for each style (the `@font-face` from the npm `material-symbols` package). Do not load them when you use Google Fonts or serve the font yourself |

### CSS classes

| Class                                                                                | Description                                                                                                  |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `frg-icon`, `frg-fonticon`                                                           | react-icon classes (the `1em` square box and the icon font settings)                                         |
| `frg-materialsymbol`                                                                 | Every Material Symbols icon. Builds the variable font axes from CSS variables                                |
| `frg-materialsymboloutlined`, `frg-materialsymbolrounded`, `frg-materialsymbolsharp` | One per style, for selecting a style. They have no CSS rules (the component sets the font family in `style`) |
| `frg-materialsymbol-opticalSize`                                                     | Added when the optical size is fixed                                                                         |

The class rules have zero specificity (`:where()`), so your own CSS overrides them as is.

### Constants

| Constant                         | Description                                            |
| -------------------------------- | ------------------------------------------------------ |
| `materialSymbolDesignDefinition` | The components' design definition (`designDefinition`) |

### Types

| Type                      | Description                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `MaterialSymbolValue`     | The Material Symbols icon names (the type of the npm `material-symbols` package)                                           |
| `MaterialSymbolProps`     | The components' props                                                                                                      |
| `MaterialSymbolDesign`    | The components' `design` value                                                                                             |
| `MaterialSymbolComponent` | The component type (including static properties)                                                                           |
| `FontIconWebFont`         | An element of `webFonts` (a type from `@fringeworks/react-icon`)                                                           |
| `DesignDefinition`        | A component's design definition (the type of `materialSymbolDesignDefinition`) (a type from `@fringeworks/react-contract`) |
| `DesignPartDefinition`    | The properties a root or part accepts and the states they apply in (a type from `@fringeworks/react-contract`)             |
| `DesignPropertyValues`    | Design property names and their value types (a type from `@fringeworks/react-contract`)                                    |
| `DesignState`             | The states design values are split by (a type from `@fringeworks/react-contract`)                                          |
| `DesignValue<T, S>`       | A single value, or an object per state (a type from `@fringeworks/react-contract`)                                         |

## License

MIT

The icon name type (`MaterialSymbolValue`) and the fonts come from the npm [`material-symbols`](https://github.com/marella/material-symbols) package. Material Symbols is by Google; both are distributed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).
