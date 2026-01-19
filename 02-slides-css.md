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

# [position: absolute](https://www.w3schools.com/css/css_positioning.asp)
Let's try to position our object, first open up your helloWorld (the index.html) in your repository

pick any of your block elements--it could be a p element, a h1 element, a div element...and add `position:absolute` to your style attributes. (**You only add attributes to opening tags**)
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

# Class
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
This looks quite different from html, because css has it own anatomy.
<br><br>

## The Anatomy of CSS

<div class="bigCode">
the whole thing below ⬇️ = DECLARATION

```css
.collage  -> selector
 {
    position: -> property
       absolute; ->  value
 }

```
</div>

::right::

In CSS code, you need to first:
1. find the element you want to style 
>this step is done with finding the corresponding class name or id name, or just tag type...
2. declare what property you want to style 
>is it the font color? font size? or how the tag is positioned in the page? ...
3. declare what is the actual value of this property
>is the color green? is the position absolute? What is the distance from the left and right? ...

---

# Priorities of Styling

![inline>ID>Class>element selector](https://media.geeksforgeeks.org/wp-content/uploads/20220609164816/specificity1-660x359.PNG)

---

# Exercise 1: move things around
Create a digital collage with the tags you have.

1. add `class="collage"` to the opening tags of the elements you want to reposition
2. add `style="top:__px;left:__px;"`to the collage tags, change the value of the `__` to the pixel you want.
3. Move things around, see how crazy you can get. 


---
layout: two-cols
---

# Fluid Units: % , vw, vh
While px is absolute units, these are fluid unites, which change size based on context.

**%**: 	Percentage	-- `50%` = "Be 50% as wide as my container."

**vw**	Viewport Width -- `50vw` = "Be 50% of the screen's width."

**vh**	Viewport Height -- `50vh` "Be 50% of the screen's height."

::right::

## Try it

change some of the `top` and `left` properties' values to fluid units like %, vw or vh, see what happens

---

# Exercise: Read documentation -- Width and Height

1. Add an img element to your html, or just use the img element that you already have.
2. Read [Wdith](https://www.w3schools.com/cssref/pr_dim_width.php) and  [Height](https://www.w3schools.com/cssref/pr_dim_height.php) and the [img height and width](https://www.w3schools.com/tags/att_img_height.asp) documentation, try to resize the img element (to specific px or fluid unit of your choise)


---
layout: two-cols
---

# [`transform`](https://www.w3schools.com/cssref/css3_pr_transform.php) 
This property allows you to rotate, scale, move, skew, etc., elements.

go to the documentation [`transform`](https://www.w3schools.com/cssref/css3_pr_transform.php) and read about how to use transform property. The principles goes the same: normal text are options you could directly use, *italic* text are a type of things or variable that you would need to specify further

transform: none|*transform-functions*|initial|inherit; 

the *transform-functions* represent a variety of things that you could replace into. See details in Property Values. For example

::right::

[rotate(*angle*)](https://www.w3schools.com/cssref/func_rotate.php)	Defines a 2D rotation, the angle is specified in the parameter

Means that you will put `rotate()` behind `transform:`, but in terms of what goes in the `()` is a specific anble number + deg. Read [the documentation](https://www.w3schools.com/cssref/func_rotate.php) for more

e.g.
```html
<p class="collage" style="transform:rotate(40deg)">This paragraph rotates</p>
```

<div class="code-preview" style="height:150px">
<div style="position:relative;">
<p class="collage" style="transform:rotate(-20deg)">This paragraph rotates</p>
</div>
</div>

---

# Exercise: Wild Wild Collage

Try using all kinds of transform in your tags, see how wild you can get with their transformation. 


---
layout: two-cols
---

# Position: relative
[`position: relative`](https://www.w3schools.com/css/css_positioning.asp) keeps the element in the Normal Flow

but it lets you nudge it around from where it would normally sit, acting as a **"container"** for an absolute element.

If you put a `position: absolute` tag inside a position: relative tag, the absolute tag will position itself relative to that parent, not the whole page!

If you add `top: 10px` to a relative element, it moves down 10px from its **original spot**, but it doesn't mess up the elements around it.

## Let's try it: Crop Image!

::right::


1. Add the following attribute to one of your element's opening tag, see how it changes
```html
style="position:relative;left:100px"
```
2. In your style.css, add
```css
.cropContainer{
     position:absolute;
     overflow: hidden;
}
```
3. create a div element, add this to it
```html
 class="cropContainer" 
 style=width:200px;height:200px;"
```
 add an img element and add the following to that img element's opening tag

```html
 style="position:absolute;top:-100px;left:-100px"
``` 
3. Adjust the `top` and `left` property of the image tag, or change the `width` and `height` of the cropContainer






---

# Exercise 2: crop pictures within div & responsive design

make the first exercise responsive to the window size


---

# Display: Flex

---

# Margin and Padding

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
