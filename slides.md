---
theme: leilei-custom1
background: https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200
title: Introduction to HTML
info: |
  ## Introduction to HTML
  Learn the fundamentals of HTML and web development.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Introduction to HTML

The Foundation of the Web

<div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  Press Space for next page <carbon:arrow-right />
</div>

<!--
Welcome to this introduction to HTML. This presentation will cover the fundamentals of HTML and get you started with web development.
-->

---
transition: fade-out
---

# What is HTML?

HTML stands for **HyperText Markup Language**

 **Markup Language** - Uses tags to structure and format content
It describes the structure and content of a webpage using elements and tags.​ 
basically the skeleton of a website. All the text and images information come fro mit.

<br>

HTML was created by Tim Berners-Lee in 1991 and has evolved through many versions. The current version is HTML5.

<style>
h1 {
  background-color: #E34F26;
  background-image: linear-gradient(45deg, #E34F26 10%, #F06529 50%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---
transition: slide-up
---

# Basic HTML Structure

Every HTML document follows this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first web page.</p>
</body>
</html>
```

<div v-click>

- `<!DOCTYPE html>` - Declares this is an HTML5 document
- `<html>` - Root element of the page
- `<head>` - Contains metadata about the document
- `<body>` - Contains the visible page content

</div>

---
layout: two-cols
layoutClass: gap-16
---

# HTML Tags

HTML tags are keywords surrounded by angle brackets

<br>

**Opening and Closing Tags:**
```html
<p>This is a paragraph</p>
<h1>This is a heading</h1>
<div>This is a container</div>
```

<br>

**Self-Closing Tags:**
```html
<img src="photo.jpg" alt="Photo">
<br>
<hr>
<input type="text">
```

::right::

<div v-click>

## Tag Anatomy

```html
<tagname attribute="value">
  Content goes here
</tagname>
```

- **Tag Name** - Defines the element type
- **Attributes** - Provide additional information
- **Content** - What appears on the page
- **Closing Tag** - Marks the end

</div>

---
layout: default
---

# Common HTML Elements

## Text Elements

```html {all|1-3|5-7|9-11}
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>

<p>This is a paragraph of text.</p>
<span>This is inline text.</span>
<strong>This is bold text.</strong>

<a href="https://example.com">This is a link</a>
<em>This is italic text.</em>
<br>This creates a line break.
```

<div v-click>

## Lists

```html
<ul>
  <li>Unordered item 1</li>
  <li>Unordered item 2</li>
</ul>

<ol>
  <li>Ordered item 1</li>
  <li>Ordered item 2</li>
</ol>
```

</div>

---
---

# HTML Attributes

Attributes provide additional information about HTML elements

```html {all|1|2|3|4}
<img src="image.jpg" alt="Description" width="300">
<a href="https://example.com" target="_blank">Open in new tab</a>
<input type="text" placeholder="Enter your name" required>
<div id="header" class="container">Content</div>
```

## Common Attributes

<div grid="~ cols-2 gap-4">

<div v-click>

**Global Attributes**
- `id` - Unique identifier
- `class` - CSS class name
- `style` - Inline CSS styles
- `title` - Tooltip text

</div>

<div v-click>

**Specific Attributes**
- `href` - Link destination
- `src` - Image/script source
- `alt` - Alternative text
- `type` - Input type

</div>

</div>

---

# Semantic HTML

Semantic HTML uses tags that describe their meaning and purpose

<div grid="~ cols-2 gap-4">
<div>

## Semantic Tags

```html
<header>
  <nav>Navigation links</nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>

  <aside>Sidebar content</aside>
</main>

<footer>
  Footer content
</footer>
```

</div>
<div v-click>

## Why Use Semantic HTML?

- **Accessibility** - Screen readers can navigate better
- **SEO** - Search engines understand content better
- **Maintainability** - Code is easier to read and understand
- **Standards** - Following web standards and best practices

**Common Semantic Tags:**
`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`

</div>
</div>

---
class: px-20
---

# Images and Media

Adding images and multimedia to your web pages

## Images

```html
<img src="photo.jpg" alt="Description of image">
<img src="https://example.com/image.png" alt="Remote image" width="500">
```

<div v-click>

## Video and Audio

```html
<video controls width="400">
  <source src="video.mp4" type="video/mp4">
  Your browser doesn't support video.
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  Your browser doesn't support audio.
</audio>
```

</div>

<div v-click mt-4>

**Best Practices:**
- Always include `alt` text for accessibility
- Optimize image sizes for web performance
- Use appropriate file formats (JPEG for photos, PNG for graphics, SVG for icons)

</div>

---

# HTML Forms

Forms allow users to input data and interact with your website

```html {all|1|2-3|4-5|6-7|8|9}
<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <textarea name="message" rows="4" cols="50"></textarea>

  <button type="submit">Submit</button>
</form>
```

<div v-click>

## Input Types

`text`, `email`, `password`, `number`, `date`, `checkbox`, `radio`, `file`, `submit`, `button`

</div>

---

# Tables

Tables organize data into rows and columns

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>25</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>30</td>
      <td>London</td>
    </tr>
  </tbody>
</table>
```

<div v-click>

**Table Elements:**
- `<table>` - Container for the table
- `<thead>` - Table header section
- `<tbody>` - Table body section
- `<tr>` - Table row
- `<th>` - Table header cell
- `<td>` - Table data cell

</div>

---

# Divs and Spans

Container elements for grouping and styling content

<div grid="~ cols-2 gap-8">

<div>

## The `<div>` Element

Block-level container

```html
<div class="container">
  <h2>Section Title</h2>
  <p>Section content...</p>
</div>

<div id="sidebar">
  Sidebar content
</div>
```

**Use cases:**
- Layout sections
- Grouping elements
- Applying styles

</div>

<div v-click>

## The `<span>` Element

Inline container

```html
<p>
  This is <span class="highlight">
  highlighted text</span> in a paragraph.
</p>

<p>
  Price: <span id="price">$19.99</span>
</p>
```

**Use cases:**
- Styling parts of text
- Targeting specific words
- Adding classes to inline content

</div>

</div>

---

# HTML Comments

Comments are notes in your code that browsers ignore

```html
<!-- This is a comment -->

<!--
  This is a multi-line comment
  It can span several lines
  and won't appear on the page
-->

<h1>Visible Heading</h1>
<!-- <p>This paragraph is commented out and won't display</p> -->
<p>This paragraph will display</p>
```

<div v-click mt-8>

## Why Use Comments?

- **Documentation** - Explain complex code sections
- **Debugging** - Temporarily disable code without deleting it
- **Collaboration** - Leave notes for other developers
- **Organization** - Mark sections of your HTML

</div>

<div v-click mt-4>

**Note:** Comments are visible in the page source code, so never put sensitive information in comments!

</div>

---
---

# Links and Navigation

Creating hyperlinks to connect web pages

## Basic Links

```html
<a href="https://example.com">Visit Example</a>
<a href="about.html">About Page</a>
<a href="#section">Jump to Section</a>
```

<div v-click>

## Link Attributes

```html
<!-- Open in new tab -->
<a href="https://example.com" target="_blank">External Link</a>

<!-- Email link -->
<a href="mailto:email@example.com">Send Email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call Us</a>

<!-- Download link -->
<a href="document.pdf" download>Download PDF</a>
```

</div>

<div v-click mt-4>

**Best Practice:** Use descriptive link text instead of "click here" for better accessibility

</div>

---

# Block vs Inline Elements

Understanding element behavior

<div grid="~ cols-2 gap-8">

<div>

## Block Elements

Take up full width available

```html
<div>Block element</div>
<p>Paragraph</p>
<h1>Heading</h1>
<section>Section</section>
<ul>
  <li>List item</li>
</ul>
```

**Characteristics:**
- Start on new line
- Take full width
- Can contain other elements
- Height adjusts to content

</div>

<div v-click>

## Inline Elements

Only take up necessary width

```html
<span>Inline element</span>
<a href="#">Link</a>
<strong>Bold</strong>
<em>Italic</em>
<img src="image.jpg">
```

**Characteristics:**
- Stay on same line
- Only take needed width
- Cannot contain block elements
- Height based on content

</div>

</div>

---

# HTML Best Practices

Tips for writing clean, maintainable HTML

<div grid="~ cols-2 gap-6">

<div>

## Structure

- Use proper indentation
- Close all tags properly
- Use semantic HTML
- Keep nesting logical
- One element per line

```html
<article>
  <h1>Title</h1>
  <p>Content here</p>
</article>
```

</div>

<div v-click>

## Accessibility

- Use alt text for images
- Label form inputs
- Use semantic tags
- Proper heading hierarchy
- Descriptive link text

```html
<img src="logo.png" alt="Company Logo">

<label for="email">Email:</label>
<input type="email" id="email">
```

</div>

</div>

---
layout: center
class: text-center
---

# Next Steps

Continue your web development journey

<div mt-8>

## Resources to Learn More

[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML) · [W3Schools](https://www.w3schools.com/html/) · [HTML.com](https://html.com/)

</div>

<div mt-8 v-click>

## What's Next?

**CSS** - Style your HTML pages

**JavaScript** - Add interactivity and dynamic behavior

**Responsive Design** - Make your sites work on all devices

</div>

<div mt-8 v-click>

Start building and practicing - the best way to learn HTML is by doing!

</div>
