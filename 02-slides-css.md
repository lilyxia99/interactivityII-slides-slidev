---
theme: ./leilei-custom1
title: Introduction to CSS
info: |
  ## Introduction to CSS
  Learn the fundamentals of CSS and web development.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Introduction to CSS

---

# Last Class
We go through the basics of HTML, explored different tags, thematic tags and how to read the documentation of HTML

```html
<p>This is a paragraph</p>
<header>this is a thematic tag</header>
```
Today we will talk about CSS -- how to style these tags

---
layout: two-cols
---

# Inline Style
The most basic way to write CSS is directly inside the HTML tag. We can use the style attributes to add any css styling directly in HTML. 

```html {1}
<h1 style="color: blue; font-size: 20px;">
  Hello World
</h1>
```
the inline style here change the font color of "Hello World" to blue, and their font size to 20px.

We generally avoid this in professional development because it's easy to get mixed up, but for now let's practice with this. 

::right::

<div class="code-preview">
<h1 style="color: blue; font-size: 20px;">
  Hello World
</h1>
</div>

---
layout: two-cols
---

# position: absolute
Let's try to position our object, first open up your helloWorld (the index.html) in your repository

pick any of your block elements--it could be a p element, a h1 element, a div element...and add `position:absolute` to your style attributes
```html {1}
<p style="position:absolute;top:0px;left:0px">
  This is a paragraph
</p>
```
This breaks the "Normal Flow." When you set position: absolute, the element stops "stacking" like a block. It floats above everything else, ignoring the other elements.
::right::
This is without position absolute
<div class="code-preview" style="height:200px" >
 <h1 style="position:relative;">
  Hello World
 </h1><br>
<p>
This is just a paragraph
</p>
</div>
This is with position absolute
<div class="code-preview" style="height:200px" >
 <h1 style="position:relative;">
  Hello World
 </h1><br>
<p style="position:absolute;top:0;left:0">
This is a position absolute paragraph
</p>
</div>


---

# Unit: Pixel

Pixels are Absolute Units. They are fixed in size. 100px is always 100px, regardless of screen size.

Good for: Borders, fixed-size icons.

Bad for: Responsive layouts that need to scale.

---
layout: two-cols
---

# Class, Id

We are about to make a digital collage with all the tags you have. Before I jump in, We need to put position absolute to most of your elements. 

adding the same styling to each of your tags is tiring, so we use something called "class"

remove the style attributes, add class attributes to your tag
```html
<p class="collage">
  This is a paragraph with class
</p>
```
::right::

in your repository, create a new file, name it as "style.css"
![create style.css](./images/css/style.png)

In your index.html, in the head section, insert

```html {2-7|6}
<html lang="en">   
<head>   
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body> 
    <!--other codes you have...-->
```
---
layout: two-cols
---

In your style.css, type in:

```css
.collage{
    position: absolute;
}
```

## The Anatomy of CSS



---

# Exercise 1: move things around
Create a digital collage with the tags you have.


---

# Position: relative

---

# Unit: % , vw, vh, rem and em

---

# Exercise 2: position pictures within div and responsive design

make the first exercise responsive to the window size



# Priorities of Styling

---

# Display: Flex

---

# Exercise: two columns

---

# Display: Grid

---

# Exercise: image gallery

---

# Background color, font color

---

# Font-family, Google Font

---

# transform

---

# Exercise: change colors, transform your div

---

# CSS Animation

---

# Exercise: create your own CSS animation



