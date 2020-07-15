# Breadcrumb

There are two versions of the breadcrumb; one rendered and managed by the back-end and one managed by Javascript. The javascript version is handled via the pubsub pattern and handles 2 events.

## About the Breadcrumb (CC version)

Events:
- `initBreadcrumb`
- `urlchange`

Both events the an array of path objects. The `urlchange` event compare its argument to the module state to determine if something needs to be removed, added or replaced.

### Path object

```
{
	"title": "[insert label here]",
	"url": "[insert absolute uri here]",
}
```
