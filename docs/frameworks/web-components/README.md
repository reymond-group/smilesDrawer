# SmilesDrawer as a Web Component

There are two ways to implement  Web Components.  You can create an entirely new
type of element and manage its content with a shadow DOM:

- Code: <https://github.com/reymond-group/smilesDrawer/tree/master/docs/frameworks/web-components/autonomous.html>
- Live: <https://reymond-group.github.io/smilesDrawer/frameworks/web-components/autonomous.html>

Or you can customize an existing element type (in this example, `canvas`):

- Code: <https://github.com/reymond-group/smilesDrawer/tree/master/docs/frameworks/web-components/customized.html>
- Live: <https://reymond-group.github.io/smilesDrawer/frameworks/web-components/customized.html>

For more information on Web Components, see MDN:

- <https://developer.mozilla.org/en-US/docs/Web/API/Web_components>


## Quirks

Web Components  can be a little tricky  to work with,  as they're closer to HTML
than the pure JavaScript you work with in other frameworks.  The main difference
you'll see here is that we've opted not to accept  a full `options` object as an
element attribute, since attributes are always strings (you can work around this
with serialization if you absolutely need it).

The other  main difference  is the  `attributeChangedCallback()`.  This function
fires _every time_ an attribute is set on the element - including during element
construction, and even if the value of the attribute doesn't change. We've added
extra logic to prevent a whole lot of unnecessary redrawing:

- Don't draw during element construction; wait until it's attached to the DOM.
- Don't draw unless an attribute actually changes (`canvas` elements only clear
  if their widths or heights change, so there's no risk of blank canvases).
- And we've added a `delayDrawing()` function so that performance-conscious
  applications can change multiple attributes but only redraw once:
  ```js
  element.delayDrawing(() => {
    element.setAttribute('width',  '300');
    element.setAttribute('height', '200');
  });
  ```

In fact, since SmilesDrawer sets the `width` and `height` attributes of `canvas`
elements that it draws to,  these checks are necessary to prevent infinite loops
when customizing the canvas element.

Finally,  a few CSS tweaks are necessary to make the "autonomous" element behave
as expected.  Custom elements  are `display: inline` by default,  but users will
probably want their molecules to display as `block` or `inline-block`.  There is
also a quirk where "autonomous" elements are a few (~5) pixels taller than their
underlying content; reducing `line-height` to zero fixes this.
