# The Header

## Parts

```
Navbar - Mobile hamburger menu bar
Overlay - Mobile navigation overlay
   |
   |- TopBar - Top part of the overlay with search and close button
   |- BrandBanner - CTA nad logo section
   |- MainNavigation - Main website navigation
   |- LoginButton - Deprecated login button
```

## About the MainNavigation

Specs:
- Mouse `hover` should show focus state
- Keyboard `focus` should show focus state
- Mouse `hover` and touch `tap` should open dropdowns
- Keyboard `<RETURN>` and `<SPACE>` should open dropdowns
- Mouse and touch `body-click`/`body-tap` should close all dropdowns
- Keyboard `<ESC>` inside dropdown or on dropdown handle should close the dropdown and move focus to handle
- Keyboard `[SHIFT]<TAB>` out of dropdown should close the dropdown
- Keyboard `focus` on dropdown handle should **not** open dropdowns
- Only one dropdown should be able to be open at a time
- Screen readers should speak `has popup` and its open or close state when focus is on dropdown trigger
- Screen readers should speak all links as `link` and their label


## About the TopBar

Specs:
- Tabbing to the search box should **not** focus and open the search
- Keyboard `<RETURN>` and `<SPACE>` on the search box should activate it and focus input field
- Keyboard `<ESC>` in the search field should close search box and focus container
- Logged in dropdown should behave the same as navigation's dropdowns

## Accessibity

#### `aria-haspopup`

Attribute set on the trigger to inform screen readers that the focused element has a popup

#### `aria-expanded`

Attribute set on the focused element to inform screen readers of the state of a popup or expanding region. This can be set in different ways:

- Set to `false` on the trigger and `true` on the popup/expanded region. The focus would need to be moved to the popup/expanded region in JS on trigger activation
- Set only on the trigger. The value would need to be toggled on trigger activation and the focus left on the trigger.

#### `aria-controls`

Attribute set on the trigger to create relationship between elements of a UI together with `aria-controlledby`. This allows screen readers users to jump the focus from the elements of that relationship.

#### `aria-controlledby`

Attribute set on the trigger to create relationship between elements of a UI together with `aria-controls`. This allows screen readers users to jump the focus from the elements of that relationship.
