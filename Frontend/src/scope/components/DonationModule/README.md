# Donation

Donation is a single page 3 step form. It offers both single and recurring payments and uses stripe or paypal for payment processing.

## Parts

```
MoneySummary - Accordion content
StepTracker
NeedHelpFooter - Donation specific (so far) footer
iMask.js - Input masking third party library
```
## About StepTracker

TODO

## About iMask

[iMask.js](https://unmanner.github.io/imaskjs/) is an input masking library used to provide better user experience through formating on some of the form fields such as credit card numbers.

The masks are initialized using a base64 encoded stringified Javascript object that is passed in the `data-imask` attribute of the relevant input field. It is couple with `pattern` attribute to provide correct front-end validation.

### Example

```html
data-imask="eyJtYXNrIjpbeyJtYXNrIjoiMDAwMCAwMDAwIDAwMDAgMDAwMCIsInN0YXJ0c1dpdGgiOlsiNCIsIjUiLCIyIl19LHsibWFzayI6IjAwMDAgMDAwMDAwIDAwMDAwIiwic3RhcnRzV2l0aCI6WyIzIl19XSwiZGlzcGF0Y2giOiJkaXNwYXRjaCJ9"

pattern="^(?:4[0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4}|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720) [0-9]{4} [0-9]{4} [0-9]{4}|3[47][0-9]{2} [0-9]{6} [0-9]{5})$"
```

This corresponds to: 

```
{
	"mask": [
		{
			"mask": "0000 0000 0000 0000",
			"startsWith": ["4","5","2"]
		},
		{
			"mask":"0000 000000 00000",
			"startsWith":["3"]
		}
	],
	"dispatch":"dispatch"
}
```

The mask provides formating and input restriction whereas the `pattern` attribute provides validation for card number.

Read the [iMask.js documentation](https://unmanner.github.io/imaskjs/guide.html) for more details.

## Accessibity
