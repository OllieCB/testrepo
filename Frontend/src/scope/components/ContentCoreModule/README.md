# Content core

Content core is a Javascript managed, 3 column mega menu. It uses a handlebars template imported within the Javascript to render an ajaxed-in list of links.

## Parts

```
Column - Mobile hamburger menu bar
Breadcrumb - Front end managed version of the breadcrumb
```
## About Content core

Specs:
- Each column should correspond to a URI segment
- Each column should correspond to a breadcrumb entry

## About the Columns

The columns items should be viewed as dropdowns and links, much like the main navigation's ones.

Specs:
- Mouse `hover` should show focus state
- Keyboard `focus` should show focus state
- Mouse `hover` and touch `tap` should open dropdowns
- Keyboard `<RETURN>` and should open dropdowns
- Keyboard `<ESC>` inside dropdown or on dropdown handle should close the dropdown and move focus to handle
- Keyboard `<SHIFT><TAB>` out of dropdown should focus the handle
- Keyboard arrows should navigate the columns in an intuitive fashion
- Keyboard `focus` on dropdown handle should **not** open dropdowns
- Only one dropdown should be able to be open at a time
- Screen readers should speak `has popup` and its open or close state when focus is on dropdown trigger
- Screen readers should speak all links as `link` and their label

## About the Breadcrumb

See [Breadcrumb](../BreadcrumbModule)

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
