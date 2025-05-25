import React, { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import ProgressTracker from '../components/ProgressTracker';

const CssTutorial: React.FC = () => {
  const steps = [
    "Introduction to CSS",
    "Selectors and Specificity",
    "Box Model",
    "Colors and Typography",
    "Flexbox Layout",
    "CSS Grid",
    "Transitions and Animations"
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const tutorialContent = [
    // Introduction to CSS
    <>
      <h2>Introduction to CSS</h2>
      <p>
        CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.
      </p>
      
      <div className="glass p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">Key CSS Concepts</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>CSS is used to style and layout web pages</li>
          <li>It works by selecting HTML elements and applying styles to them</li>
          <li>CSS can control colors, fonts, spacing, layout, animations, and more</li>
          <li>CSS follows a "cascade" system to resolve style conflicts</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Ways to Add CSS to HTML</h3>
      <p>There are three ways to include CSS in your HTML:</p>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">1. Inline CSS</h4>
      <p>Using the <code>style</code> attribute directly on HTML elements:</p>
      <CodeBlock
        language="html"
        code={`<h1 style="color: blue; font-size: 24px;">This is a heading</h1>`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">2. Internal CSS</h4>
      <p>Using a <code>&lt;style&gt;</code> element in the <code>&lt;head&gt;</code> section:</p>
      <CodeBlock
        language="html"
        code={`<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: blue;
      font-size: 24px;
    }
    p {
      color: gray;
    }
  </style>
</head>
<body>
  <h1>This is a heading</h1>
  <p>This is a paragraph.</p>
</body>
</html>`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">3. External CSS</h4>
      <p>Creating a separate CSS file and linking to it from the HTML:</p>
      <CodeBlock
        language="html"
        code={`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>This is a heading</h1>
  <p>This is a paragraph.</p>
</body>
</html>`}
      />
      
      <p>And in the styles.css file:</p>
      <CodeBlock
        language="css"
        code={`h1 {
  color: blue;
  font-size: 24px;
}
p {
  color: gray;
}`}
      />
      
      <div className="glass p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>External CSS is preferred for most websites as it separates content from presentation</li>
          <li>Inline CSS should be used sparingly, only when specific styles need to be applied to a single element</li>
          <li>Use meaningful class names that describe the purpose rather than the appearance</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">CSS Syntax</h3>
      <p>
        CSS consists of selectors and declarations:
      </p>
      <CodeBlock
        language="css"
        code={`selector {
  property: value;
  another-property: another-value;
}`}
      />
      
      <p>For example:</p>
      <CodeBlock
        language="css"
        code={`h1 {
  color: blue;
  font-size: 24px;
  margin-bottom: 20px;
}`}
      />
      
      <p>
        This rule selects all <code>&lt;h1&gt;</code> elements and applies three styles: blue text color, 24-pixel font size, and a 20-pixel margin at the bottom.
      </p>
    </>,
    
    // Selectors and Specificity
    <>
      <h2>Selectors and Specificity</h2>
      <p>
        CSS selectors are patterns used to select HTML elements that you want to style. Understanding selectors and specificity is crucial for effective CSS development.
      </p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Basic Selectors</h3>
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">Common Selector Types</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Element Selector</strong> - Selects all elements of a specified type</li>
          <li><strong>Class Selector</strong> - Selects elements with a specific class attribute</li>
          <li><strong>ID Selector</strong> - Selects an element with a specific id attribute</li>
          <li><strong>Universal Selector</strong> - Selects all elements</li>
          <li><strong>Attribute Selector</strong> - Selects elements with a specific attribute or attribute value</li>
        </ul>
      </div>
      
      <CodeBlock
        language="css"
        code={`/* Element selector */
p {
  color: gray;
}

/* Class selector */
.highlight {
  background-color: yellow;
}

/* ID selector */
#header {
  background-color: black;
  color: white;
}

/* Universal selector */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Attribute selector */
input[type="text"] {
  border: 1px solid gray;
}

/* Attribute selector with partial matching */
a[href^="https"] {
  color: green;  /* All links that start with https */
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Combinators</h3>
      <p>
        Combinators allow you to select elements based on their relationship to other elements.
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Descendant selector (space) */
article p {
  /* Selects all <p> elements inside <article> elements */
  font-size: 16px;
}

/* Child selector (>) */
article > p {
  /* Selects all <p> elements that are direct children of <article> elements */
  font-weight: bold;
}

/* Adjacent sibling selector (+) */
h2 + p {
  /* Selects <p> elements that directly follow <h2> elements */
  margin-top: 10px;
}

/* General sibling selector (~) */
h2 ~ p {
  /* Selects all <p> elements that follow <h2> elements (not just immediately) */
  text-indent: 20px;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Pseudo-classes</h3>
      <p>
        Pseudo-classes select elements based on their state or position.
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Link states */
a:link {
  color: blue;
}
a:visited {
  color: purple;
}
a:hover {
  color: red;
}
a:active {
  color: orange;
}

/* Form states */
input:focus {
  border-color: blue;
}
input:disabled {
  background-color: #eee;
}

/* Structural pseudo-classes */
li:first-child {
  font-weight: bold;
}
li:last-child {
  border-bottom: none;
}
li:nth-child(odd) {
  background-color: #f9f9f9;
}
li:nth-child(even) {
  background-color: #e9e9e9;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Pseudo-elements</h3>
      <p>
        Pseudo-elements select a specific part of an element, rather than the element itself.
      </p>
      
      <CodeBlock
        language="css"
        code={`/* First line of a paragraph */
p::first-line {
  font-weight: bold;
}

/* First letter of a paragraph */
p::first-letter {
  font-size: 200%;
  color: red;
}

/* Before and after elements (used with content property) */
.quote::before {
  content: "\\201C"; /* Opening quotation mark */
}
.quote::after {
  content: "\\201D"; /* Closing quotation mark */
}

/* Selection styling */
::selection {
  background-color: yellow;
  color: black;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Specificity</h3>
      <p>
        When multiple CSS rules target the same element with conflicting styles, the browser uses specificity to determine which rule to apply.
      </p>
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">Specificity Hierarchy (from highest to lowest)</h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><code>!important</code> declaration (should be avoided when possible)</li>
          <li>Inline styles (using the style attribute)</li>
          <li>ID selectors (#id)</li>
          <li>Class selectors (.class), attribute selectors, and pseudo-classes</li>
          <li>Element selectors (like p, h1, div) and pseudo-elements</li>
        </ol>
      </div>
      
      <p>
        Here's an example showing specificity in action:
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Specificity: 0-0-1 */
p {
  color: gray;
}

/* Specificity: 0-1-0 */
.text {
  color: blue;
}

/* Specificity: 0-1-1 */
p.text {
  color: green;
}

/* Specificity: 1-0-0 */
#content {
  color: red;
}

/* Specificity: 1-0-1 */
#content p {
  color: purple;
}

/* Overrides all of the above due to !important */
p {
  color: orange !important;
}`}
      />
      
      <p>
        For a paragraph with both the class "text" and inside an element with ID "content", the styles would be applied in order of increasing specificity, with each new rule overriding the previous ones if they target the same property.
      </p>
      
      <div className="glass p-6 my-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20">
        <h4 className="text-lg font-semibold mb-2">Best Practices for Specificity</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Avoid using <code>!important</code> except as a last resort</li>
          <li>Use classes instead of IDs when possible for more flexible styling</li>
          <li>Keep selectors as simple as possible</li>
          <li>When necessary, increase specificity by adding more specific selectors instead of using <code>!important</code></li>
        </ul>
      </div>
    </>,
    
    // Box Model
    <>
      <h2>The CSS Box Model</h2>
      <p>
        The CSS Box Model is a fundamental concept in web design that describes how elements are rendered on the page. Every HTML element is treated as a box with content, padding, border, and margin areas.
      </p>
      
      <div className="glass p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">Box Model Components (from inside to outside)</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Content</strong> - The inner area where text and images appear</li>
          <li><strong>Padding</strong> - The space between the content and the border</li>
          <li><strong>Border</strong> - A line that surrounds the padding</li>
          <li><strong>Margin</strong> - The space outside the border, between this element and other elements</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Box Model Properties</h3>
      
      <CodeBlock
        language="css"
        code={`/* Content dimensions */
.box {
  width: 300px;
  height: 200px;
}

/* Padding (space inside the border) */
.box {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  
  /* Shorthand for all sides */
  padding: 10px;
  
  /* Shorthand for top/bottom and left/right */
  padding: 10px 20px;
  
  /* Shorthand for top, right, bottom, left */
  padding: 10px 20px 15px 25px;
}

/* Border */
.box {
  border-width: 2px;
  border-style: solid;
  border-color: black;
  
  /* Shorthand */
  border: 2px solid black;
  
  /* Individual sides */
  border-top: 1px dashed red;
  border-right: 2px dotted blue;
  border-bottom: 3px double green;
  border-left: 4px groove orange;
  
  /* Border radius for rounded corners */
  border-radius: 10px;
  
  /* Specific corners */
  border-top-left-radius: 5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 20px;
}

/* Margin (space outside the border) */
.box {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  
  /* Shorthand for all sides */
  margin: 10px;
  
  /* Shorthand for top/bottom and left/right */
  margin: 10px 20px;
  
  /* Shorthand for top, right, bottom, left */
  margin: 10px 20px 15px 25px;
  
  /* Auto margins for horizontal centering */
  margin: 0 auto;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Box Sizing</h3>
      <p>
        By default, the <code>width</code> and <code>height</code> properties set the size of the content area only. This means padding and border are added to the specified dimensions, which can make layout calculations difficult.
      </p>
      
      <p>
        The <code>box-sizing</code> property can change this behavior:
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Default box model (content-box) */
.box-content {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 10px solid black;
  /* Total width: 300px + 20px*2 + 10px*2 = 360px */
}

/* Alternative box model (border-box) */
.box-border {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 10px solid black;
  /* Total width: 300px (content area is reduced to fit padding and border) */
}`}
      />
      
      <p>
        Many developers prefer to use <code>border-box</code> for all elements to make sizing more intuitive:
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Apply border-box to all elements */
*, *::before, *::after {
  box-sizing: border-box;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Margin Collapse</h3>
      <p>
        When two vertical margins meet, they collapse into a single margin. The height of this margin is equal to the larger of the two collapsing margins.
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Example of margin collapse */
.top-element {
  margin-bottom: 30px;
}

.bottom-element {
  margin-top: 20px;
}

/* The space between these elements will be 30px, not 50px */`}
      />
      
      <div className="glass p-6 my-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20">
        <h4 className="text-lg font-semibold mb-2">Important Notes About Margin Collapse</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Only vertical margins collapse (top and bottom), not horizontal margins (left and right)</li>
          <li>Margins only collapse in normal flow (not with floated or absolutely positioned elements)</li>
          <li>If parent element has no padding or border, its top margin can collapse with the top margin of its first child</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Display Property</h3>
      <p>
        The <code>display</code> property determines how an element is treated in the layout flow. This affects the box model behavior.
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Block elements (take up full width, force line breaks) */
.block {
  display: block;
}

/* Inline elements (only take up as much width as needed, no line breaks) */
.inline {
  display: inline;
  /* Width and height have no effect on inline elements */
  /* Vertical margins and paddings are not fully respected */
}

/* Inline-block elements (like inline but can have width, height, margins) */
.inline-block {
  display: inline-block;
}

/* Hide an element completely */
.hidden {
  display: none;
}

/* Other display values */
.flex {
  display: flex; /* For flexbox layouts */
}

.grid {
  display: grid; /* For grid layouts */
}`}
      />
      
      <p>
        Understanding the box model is essential for creating precise layouts in CSS. It's the foundation upon which more advanced layout techniques like Flexbox and Grid are built.
      </p>
    </>,
    
    // Colors and Typography
    <>
      <h2>Colors and Typography</h2>
      <p>
        Effective use of colors and typography is essential for creating visually appealing and readable websites. CSS provides numerous properties to control these aspects of your design.
      </p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Colors in CSS</h3>
      <p>
        CSS offers several ways to specify colors:
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Color names */
.element {
  color: red;
  background-color: lightblue;
}

/* Hexadecimal values */
.element {
  color: #ff0000; /* Red */
  background-color: #f0f0f0; /* Light gray */
}

/* RGB values */
.element {
  color: rgb(255, 0, 0); /* Red */
  background-color: rgb(240, 240, 240); /* Light gray */
}

/* RGBA values (with alpha/transparency) */
.element {
  color: rgba(255, 0, 0, 0.7); /* Semi-transparent red */
  background-color: rgba(0, 0, 0, 0.1); /* Very transparent black */
}

/* HSL values (hue, saturation, lightness) */
.element {
  color: hsl(0, 100%, 50%); /* Red */
  background-color: hsl(0, 0%, 94%); /* Light gray */
}

/* HSLA values (with alpha/transparency) */
.element {
  color: hsla(0, 100%, 50%, 0.7); /* Semi-transparent red */
  background-color: hsla(0, 0%, 0%, 0.1); /* Very transparent black */
}`}
      />
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">Color Properties</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><code>color</code> - Sets the text color</li>
          <li><code>background-color</code> - Sets the background color</li>
          <li><code>border-color</code> - Sets the border color</li>
          <li><code>outline-color</code> - Sets the outline color</li>
          <li><code>box-shadow</code> - Can include color values for shadows</li>
          <li><code>text-shadow</code> - Can include color values for text shadows</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Gradients</h3>
      <p>
        CSS gradients allow you to display smooth transitions between two or more colors:
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Linear gradient */
.linear-gradient {
  background-image: linear-gradient(to right, red, yellow);
}

/* With multiple color stops */
.multi-stop {
  background-image: linear-gradient(to bottom, red, yellow, green, blue);
}

/* With angle */
.angled {
  background-image: linear-gradient(45deg, red, blue);
}

/* Radial gradient */
.radial {
  background-image: radial-gradient(circle, red, blue);
}

/* Repeating gradients */
.repeating {
  background-image: repeating-linear-gradient(45deg, red, red 10px, blue 10px, blue 20px);
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Typography</h3>
      <p>
        Typography involves selecting and styling fonts to make text readable and visually appealing.
      </p>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Font Properties</h4>
      
      <CodeBlock
        language="css"
        code={`/* Font family */
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* Web fonts with @font-face */
@font-face {
  font-family: 'MyCustomFont';
  src: url('myfont.woff2') format('woff2'),
       url('myfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

/* Font size */
.text {
  /* Absolute sizes */
  font-size: 16px;
  font-size: 1rem; /* Relative to root element (html) */
  
  /* Relative sizes */
  font-size: 1.2em; /* Relative to parent element */
  font-size: 120%; /* Relative to parent element */
  
  /* Viewport-based sizes */
  font-size: 2vw; /* 2% of viewport width */
}

/* Font weight */
.text {
  font-weight: normal;
  font-weight: bold;
  font-weight: 400; /* Normal in numeric scale */
  font-weight: 700; /* Bold in numeric scale */
}

/* Font style */
.text {
  font-style: normal;
  font-style: italic;
  font-style: oblique;
}

/* Font variant */
.text {
  font-variant: normal;
  font-variant: small-caps;
}

/* Line height */
.text {
  line-height: 1.5; /* Recommended for body text */
  line-height: 1.2; /* Often used for headings */
}

/* Font shorthand */
.text {
  /* font: [font-style] [font-variant] [font-weight] [font-size]/[line-height] [font-family]; */
  font: italic bold 16px/1.5 Arial, sans-serif;
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Text Properties</h4>
      
      <CodeBlock
        language="css"
        code={`/* Text alignment */
.text {
  text-align: left;
  text-align: right;
  text-align: center;
  text-align: justify;
}

/* Text decoration */
.text {
  text-decoration: none;
  text-decoration: underline;
  text-decoration: overline;
  text-decoration: line-through;
  
  /* With color and style */
  text-decoration: underline wavy red;
}

/* Text transform */
.text {
  text-transform: none;
  text-transform: uppercase;
  text-transform: lowercase;
  text-transform: capitalize;
}

/* Text indent */
.text {
  text-indent: 2em;
}

/* Letter spacing */
.text {
  letter-spacing: 0.5px;
  letter-spacing: 0.05em;
}

/* Word spacing */
.text {
  word-spacing: 2px;
}

/* White space handling */
.text {
  white-space: normal;
  white-space: nowrap;
  white-space: pre;
  white-space: pre-wrap;
}

/* Text overflow */
.text {
  overflow: hidden;
  text-overflow: ellipsis; /* Shows ... when text overflows */
  white-space: nowrap;
}

/* Text shadow */
.text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  /* Multiple shadows */
  text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue;
}`}
      />
      
      <div className="glass p-6 my-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20">
        <h4 className="text-lg font-semibold mb-2">Typography Best Practices</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Use a limited set of fonts (usually 2-3) for consistency</li>
          <li>Ensure sufficient contrast between text and background colors</li>
          <li>Use relative units (rem, em) for responsive typography</li>
          <li>Set appropriate line height (1.4-1.6 for body text) for readability</li>
          <li>Be mindful of font size (16px/1rem is a good base size for body text)</li>
          <li>Consider responsive typography that adjusts based on viewport size</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">CSS Custom Properties (Variables)</h3>
      <p>
        CSS variables allow you to define reusable values that can be referenced throughout your stylesheet:
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Define variables in the :root scope */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --text-color: #333;
  --font-heading: 'Georgia', serif;
  --font-body: 'Helvetica Neue', Arial, sans-serif;
  --spacing-unit: 8px;
}

/* Using variables */
h1 {
  color: var(--primary-color);
  font-family: var(--font-heading);
  margin-bottom: calc(var(--spacing-unit) * 3);
}

p {
  color: var(--text-color);
  font-family: var(--font-body);
  margin-bottom: var(--spacing-unit);
}

/* Variables can be scoped to specific elements */
.dark-mode {
  --text-color: #f0f0f0;
}

/* Variables can be changed with media queries */
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #f0f0f0;
    --primary-color: #60a5fa;
  }
}`}
      />
      
      <p>
        CSS variables are particularly useful for implementing themes, maintaining consistent spacing, and making global style changes easier to manage.
      </p>
    </>,
    
    // Flexbox Layout
    <>
      <h2>Flexbox Layout</h2>
      <p>
        Flexbox (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns. It provides a more efficient way to lay out, align, and distribute space among items in a container, even when their size is unknown or dynamic.
      </p>
      
      <div className="glass p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">Key Flexbox Concepts</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Flex Container</strong> - The parent element with <code>display: flex</code></li>
          <li><strong>Flex Items</strong> - The children of the flex container</li>
          <li><strong>Main Axis</strong> - The primary axis along which flex items are laid out</li>
          <li><strong>Cross Axis</strong> - The axis perpendicular to the main axis</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Creating a Flex Container</h3>
      <p>
        To create a flex container, set the <code>display</code> property to <code>flex</code> or <code>inline-flex</code>:
      </p>
      
      <CodeBlock
        language="css"
        code={`/* Block-level flex container */
.container {
  display: flex;
}

/* Inline-level flex container */
.inline-container {
  display: inline-flex;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Flex Container Properties</h3>
      <p>
        These properties are set on the container element:
      </p>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Controlling the Direction</h4>
      <CodeBlock
        language="css"
        code={`/* Direction of the main axis */
.container {
  flex-direction: row; /* Default: left to right */
  flex-direction: row-reverse; /* Right to left */
  flex-direction: column; /* Top to bottom */
  flex-direction: column-reverse; /* Bottom to top */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Wrapping</h4>
      <CodeBlock
        language="css"
        code={`/* Controls whether items wrap to a new line */
.container {
  flex-wrap: nowrap; /* Default: all items on one line */
  flex-wrap: wrap; /* Items wrap to additional lines */
  flex-wrap: wrap-reverse; /* Items wrap to additional lines in reverse */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Shorthand for Direction and Wrap</h4>
      <CodeBlock
        language="css"
        code={`.container {
  /* flex-flow: <flex-direction> <flex-wrap>; */
  flex-flow: row nowrap; /* Default */
  flex-flow: column wrap;
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Alignment Along the Main Axis</h4>
      <CodeBlock
        language="css"
        code={`.container {
  justify-content: flex-start; /* Default: items at the start */
  justify-content: flex-end; /* Items at the end */
  justify-content: center; /* Items at the center */
  justify-content: space-between; /* Items evenly distributed with first at start, last at end */
  justify-content: space-around; /* Items evenly distributed with equal space around them */
  justify-content: space-evenly; /* Items evenly distributed with equal space between them */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Alignment Along the Cross Axis</h4>
      <CodeBlock
        language="css"
        code={`.container {
  align-items: stretch; /* Default: items stretch to fill the container */
  align-items: flex-start; /* Items at the start of the cross axis */
  align-items: flex-end; /* Items at the end of the cross axis */
  align-items: center; /* Items at the center of the cross axis */
  align-items: baseline; /* Items aligned by their baselines */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Alignment of Multiple Lines</h4>
      <CodeBlock
        language="css"
        code={`.container {
  align-content: flex-start; /* Lines packed at the start */
  align-content: flex-end; /* Lines packed at the end */
  align-content: center; /* Lines packed at the center */
  align-content: space-between; /* Lines evenly distributed with first at start, last at end */
  align-content: space-around; /* Lines evenly distributed with equal space around them */
  align-content: stretch; /* Default: lines stretch to fill the container */
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Flex Item Properties</h3>
      <p>
        These properties are set on the individual flex items:
      </p>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Order</h4>
      <CodeBlock
        language="css"
        code={`.item {
  order: 0; /* Default: items are laid out in source order */
  order: 1; /* The item will appear after items with lower order values */
  order: -1; /* The item will appear before items with higher order values */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Flex Grow</h4>
      <CodeBlock
        language="css"
        code={`.item {
  flex-grow: 0; /* Default: item will not grow */
  flex-grow: 1; /* Item will grow to fill available space */
  flex-grow: 2; /* Item will grow twice as much as items with flex-grow: 1 */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Flex Shrink</h4>
      <CodeBlock
        language="css"
        code={`.item {
  flex-shrink: 1; /* Default: item will shrink if necessary */
  flex-shrink: 0; /* Item will not shrink */
  flex-shrink: 2; /* Item will shrink twice as much as items with flex-shrink: 1 */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Flex Basis</h4>
      <CodeBlock
        language="css"
        code={`.item {
  flex-basis: auto; /* Default: size based on content */
  flex-basis: 0; /* Size based solely on flex-grow/shrink */
  flex-basis: 200px; /* Initial size of 200px */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Flex Shorthand</h4>
      <CodeBlock
        language="css"
        code={`.item {
  /* flex: <flex-grow> <flex-shrink> <flex-basis>; */
  flex: 0 1 auto; /* Default */
  flex: 1; /* Same as flex: 1 1 0 */
  flex: auto; /* Same as flex: 1 1 auto */
  flex: none; /* Same as flex: 0 0 auto */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Align Self</h4>
      <CodeBlock
        language="css"
        code={`.item {
  /* Overrides the container's align-items for this specific item */
  align-self: auto; /* Default: follows the container's align-items */
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: baseline;
  align-self: stretch;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Common Flexbox Patterns</h3>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Centering an Element</h4>
      <CodeBlock
        language="css"
        code={`.container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh; /* Make container full height for vertical centering to work */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Navigation Bar</h4>
      <CodeBlock
        language="css"
        code={`.navbar {
  display: flex;
  justify-content: space-between; /* Space between logo and nav items */
  align-items: center;
  padding: 1rem;
}

.logo {
  /* Logo styles */
}

.nav-items {
  display: flex;
  gap: 1rem; /* Space between nav items */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Card Layout</h4>
      <CodeBlock
        language="css"
        code={`.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 0 300px; /* Grow, don't shrink, basis of 300px */
  /* Other card styles */
}`}
      />
      
      <div className="glass p-6 my-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20">
        <h4 className="text-lg font-semibold mb-2">Flexbox Tips</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Use <code>gap</code> property for spacing between flex items (newer browsers only)</li>
          <li>Flexbox is one-dimensional; for two-dimensional layouts, consider CSS Grid</li>
          <li>The <code>margin: auto</code> trick works very well with flexbox to push items to edges</li>
          <li>Remember that flexbox affects the direct children of the container, not all descendants</li>
        </ul>
      </div>
      
      <p>
        Flexbox is an incredibly powerful layout tool that simplifies many common layout patterns. It's well-supported across all modern browsers and should be one of the first layout techniques you learn to master.
      </p>
    </>,
    
    // CSS Grid
    <>
      <h2>CSS Grid</h2>
      <p>
        CSS Grid Layout is a two-dimensional layout system designed for laying out items in rows and columns. Unlike Flexbox, which is one-dimensional, Grid allows you to control both rows and columns simultaneously.
      </p>
      
      <div className="glass p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">Key Grid Concepts</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Grid Container</strong> - The element with <code>display: grid</code></li>
          <li><strong>Grid Items</strong> - The direct children of the grid container</li>
          <li><strong>Grid Lines</strong> - The horizontal and vertical lines that divide the grid</li>
          <li><strong>Grid Tracks</strong> - The space between adjacent grid lines (rows or columns)</li>
          <li><strong>Grid Cell</strong> - The intersection of a row and a column</li>
          <li><strong>Grid Area</strong> - The total space surrounded by four grid lines</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Creating a Grid Container</h3>
      
      <CodeBlock
        language="css"
        code={`.container {
  display: grid; /* Creates a block-level grid container */
}

.inline-container {
  display: inline-grid; /* Creates an inline-level grid container */
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Defining the Grid Structure</h3>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Grid Template Columns and Rows</h4>
      <CodeBlock
        language="css"
        code={`.container {
  /* 3 columns: 100px, 200px, 100px */
  grid-template-columns: 100px 200px 100px;
  
  /* 2 rows: 50px, 100px */
  grid-template-rows: 50px 100px;
  
  /* Using the fr unit for flexible track sizes */
  grid-template-columns: 1fr 2fr 1fr; /* Proportional widths */
  
  /* Mixing units */
  grid-template-columns: 100px 1fr 2fr;
  
  /* Using repeat() for repetitive patterns */
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-columns: repeat(2, 100px 1fr); /* Pattern repeats: 100px 1fr 100px 1fr */
  
  /* Auto-fill and auto-fit for responsive layouts */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  
  /* minmax() to set minimum and maximum sizes */
  grid-template-columns: minmax(100px, 300px) 1fr 1fr;
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Grid Template Areas</h4>
      <CodeBlock
        language="css"
        code={`.container {
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
  
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

.footer {
  grid-area: footer;
}

/* Using a period (.) for an empty cell */
.container-with-empty-cells {
  grid-template-areas:
    "header header header"
    "sidebar content ."
    "footer footer footer";
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Grid Gap</h4>
      <CodeBlock
        language="css"
        code={`.container {
  column-gap: 10px; /* Space between columns */
  row-gap: 15px; /* Space between rows */
  
  /* Shorthand for both */
  gap: 15px 10px; /* row-gap column-gap */
  gap: 10px; /* Same gap for rows and columns */
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Aligning Grid Content</h3>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Aligning the Entire Grid</h4>
      <CodeBlock
        language="css"
        code={`.container {
  /* Horizontally */
  justify-content: start; /* Default */
  justify-content: end;
  justify-content: center;
  justify-content: stretch;
  justify-content: space-around;
  justify-content: space-between;
  justify-content: space-evenly;
  
  /* Vertically */
  align-content: start; /* Default */
  align-content: end;
  align-content: center;
  align-content: stretch;
  align-content: space-around;
  align-content: space-between;
  align-content: space-evenly;
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Aligning Items Within Their Cells</h4>
      <CodeBlock
        language="css"
        code={`.container {
  /* Horizontally */
  justify-items: stretch; /* Default */
  justify-items: start;
  justify-items: end;
  justify-items: center;
  
  /* Vertically */
  align-items: stretch; /* Default */
  align-items: start;
  align-items: end;
  align-items: center;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Placing Grid Items</h3>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Using Line Numbers</h4>
      <CodeBlock
        language="css"
        code={`.item {
  /* Specifying an item's position and span using line numbers */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  
  /* Shorthand for columns */
  grid-column: 1 / 3;
  /* or */
  grid-column: 1 / span 2;
  
  /* Shorthand for rows */
  grid-row: 1 / 3;
  /* or */
  grid-row: 1 / span 2;
  
  /* Negative line numbers count from the end */
  grid-column: 1 / -1; /* Spans all columns */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Using Named Lines</h4>
      <CodeBlock
        language="css"
        code={`.container {
  grid-template-columns: [sidebar-start] 1fr [sidebar-end content-start] 3fr [content-end];
  grid-template-rows: [header-start] auto [header-end main-start] 1fr [main-end footer-start] auto [footer-end];
}

.header {
  grid-column: sidebar-start / content-end;
  grid-row: header-start / header-end;
}

.sidebar {
  grid-column: sidebar-start / sidebar-end;
  grid-row: main-start / main-end;
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Using grid-area</h4>
      <CodeBlock
        language="css"
        code={`.item {
  /* grid-area: row-start / column-start / row-end / column-end; */
  grid-area: 1 / 1 / 3 / 3;
  
  /* When used with grid-template-areas */
  grid-area: header; /* Places item in the "header" area */
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Auto Placement</h4>
      <CodeBlock
        language="css"
        code={`.container {
  grid-auto-flow: row; /* Default: fills rows first, then columns */
  grid-auto-flow: column; /* Fills columns first, then rows */
  grid-auto-flow: dense; /* Attempts to fill holes in the grid */
  
  /* Size of automatically created rows/columns */
  grid-auto-rows: 100px;
  grid-auto-columns: 1fr;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Common Grid Patterns</h3>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Holy Grail Layout</h4>
      <CodeBlock
        language="css"
        code={`.holy-grail {
  display: grid;
  grid-template: 
    "header header header" auto
    "nav main aside" 1fr
    "footer footer footer" auto
    / 200px 1fr 200px;
  min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive version */
@media (max-width: 768px) {
  .holy-grail {
    grid-template: 
      "header" auto
      "nav" auto
      "main" 1fr
      "aside" auto
      "footer" auto
      / 1fr;
  }
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Card Grid</h4>
      <CodeBlock
        language="css"
        code={`.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Each card can span multiple cells if needed */
.featured-card {
  grid-column: span 2;
  grid-row: span 2;
}`}
      />
      
      <div className="glass p-6 my-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20">
        <h4 className="text-lg font-semibold mb-2">Grid vs. Flexbox</h4>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Use Grid when:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
          <li>You need two-dimensional control (rows and columns)</li>
          <li>Your layout is more complex with multiple rows and columns</li>
          <li>You need to precisely control placement of items</li>
          <li>You're creating a full-page layout or complex components</li>
        </ul>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Use Flexbox when:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>You need one-dimensional control (either row OR column)</li>
          <li>Your layout is simpler, like navigation or card layouts</li>
          <li>You need to align items within a container</li>
          <li>Content size should dictate layout rather than the container</li>
        </ul>
      </div>
      
      <p>
        CSS Grid is incredibly powerful for creating complex layouts. It's particularly useful for magazine-style layouts, photo galleries, and any design that requires precise placement of elements in both directions.
      </p>
    </>,
    
    // Transitions and Animations
    <>
      <h2>Transitions and Animations</h2>
      <p>
        CSS transitions and animations allow you to create smooth, interactive effects without JavaScript. They help improve user experience by making interface changes feel more natural and engaging.
      </p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">CSS Transitions</h3>
      <p>
        Transitions provide a way to control how properties change from one value to another over a specified duration.
      </p>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Basic Transition</h4>
      <CodeBlock
        language="css"
        code={`.element {
  background-color: blue;
  transition: background-color 0.3s ease;
}

.element:hover {
  background-color: red;
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Transition Properties</h4>
      <CodeBlock
        language="css"
        code={`.element {
  /* Individual properties */
  transition-property: background-color, transform; /* Properties to transition */
  transition-duration: 0.3s; /* Duration of the transition */
  transition-timing-function: ease; /* How the transition progresses over time */
  transition-delay: 0.1s; /* Delay before the transition starts */
  
  /* Shorthand */
  /* transition: property duration timing-function delay; */
  transition: background-color 0.3s ease 0.1s;
  
  /* Multiple transitions */
  transition: 
    background-color 0.3s ease,
    transform 0.5s ease-out;
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Timing Functions</h4>
      <CodeBlock
        language="css"
        code={`.element {
  /* Predefined functions */
  transition-timing-function: ease; /* Default: slow start, fast middle, slow end */
  transition-timing-function: linear; /* Constant speed */
  transition-timing-function: ease-in; /* Slow start */
  transition-timing-function: ease-out; /* Slow end */
  transition-timing-function: ease-in-out; /* Slow start and end */
  
  /* Custom cubic-bezier curve */
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  
  /* Steps function for frame-by-frame transitions */
  transition-timing-function: steps(4, end);
}`}
      />
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">Properties That Can Be Transitioned</h4>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Most numeric properties can be transitioned, including:
        </p>
        <ul className="list-disc list-inside grid grid-cols-2 gap-x-4 text-gray-700 dark:text-gray-300">
          <li>width / height</li>
          <li>margin / padding</li>
          <li>top / right / bottom / left</li>
          <li>color / background-color</li>
          <li>opacity</li>
          <li>transform</li>
          <li>box-shadow</li>
          <li>border properties</li>
          <li>font-size</li>
          <li>letter-spacing</li>
        </ul>
      </div>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Common Transition Examples</h4>
      <CodeBlock
        language="css"
        code={`/* Button hover effect */
.button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.2s;
}

.button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

/* Card hover effect */
.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Image zoom effect */
.image-container {
  overflow: hidden;
}

.image {
  width: 100%;
  transition: transform 0.5s ease;
}

.image-container:hover .image {
  transform: scale(1.1);
}

/* Menu dropdown */
.dropdown-menu {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.5s ease, opacity 0.3s ease;
}

.dropdown:hover .dropdown-menu {
  max-height: 200px;
  opacity: 1;
}`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">CSS Animations</h3>
      <p>
        CSS animations allow you to create more complex sequences of transitions, and they can run automatically without user interaction.
      </p>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Keyframes</h4>
      <CodeBlock
        language="css"
        code={`/* Define the animation sequence */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* More complex animation with multiple steps */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Applying Animations</h4>
      <CodeBlock
        language="css"
        code={`.element {
  /* Individual properties */
  animation-name: fadeIn; /* Name of the @keyframes animation */
  animation-duration: 1s; /* Duration of one cycle */
  animation-timing-function: ease; /* How the animation progresses over time */
  animation-delay: 0.5s; /* Delay before starting */
  animation-iteration-count: 3; /* Number of times to repeat (infinite for endless) */
  animation-direction: alternate; /* Direction of animation */
  animation-fill-mode: forwards; /* What values to apply before/after the animation */
  animation-play-state: running; /* Whether the animation is playing or paused */
  
  /* Shorthand */
  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
  animation: fadeIn 1s ease 0.5s 3 alternate forwards;
  
  /* Multiple animations */
  animation: 
    fadeIn 1s ease,
    slideIn 1.5s ease-out;
}`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Animation Properties in Detail</h4>
      <CodeBlock
        language="css"
        code={`/* animation-iteration-count */
.element {
  animation-iteration-count: 1; /* Default: run once */
  animation-iteration-count: 3; /* Run three times */
  animation-iteration-count: infinite; /* Run forever */
}

/* animation-direction */
.element {
  animation-direction: normal; /* Default: forward each cycle */
  animation-direction: reverse; /* Reverse direction */
  animation-direction: alternate; /* Forward then backward */
  animation-direction: alternate-reverse; /* Backward then forward */
}

/* animation-fill-mode */
.element {
  animation-fill-mode: none; /* Default: no styles applied before or after */
  animation-fill-mode: forwards; /* Retain the styles from the last keyframe */
  animation-fill-mode: backwards; /* Apply the styles from the first keyframe during delay */
  animation-fill-mode: both; /* Apply both forwards and backwards */
}

/* animation-play-state */
.element {
  animation-play-state: running; /* Default: the animation is playing */
  animation-play-state: paused; /* Animation is paused */
}

/* Using JavaScript to control play state */
/* .element:hover { animation-play-state: paused; } */`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Common Animation Examples</h4>
      <CodeBlock
        language="css"
        code={`/* Fading in an element */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

/* Sliding in from the left */
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideInLeft 0.5s ease-out;
}

/* Pulse effect */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.pulse {
  animation: pulse 2s infinite;
}

/* Spinner/loader */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;
}

/* Attention seeker */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}

.bounce {
  animation: bounce 2s;
}`}
      />
      
      <div className="glass p-6 my-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20">
        <h4 className="text-lg font-semibold mb-2">Animation Performance Tips</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Use <code>transform</code> and <code>opacity</code> for the best performance</li>
          <li>Avoid animating properties that trigger layout changes (like width, height, margin)</li>
          <li>Add <code>will-change</code> for properties you plan to animate (use sparingly)</li>
          <li>For mobile, keep animations subtle and shorter in duration</li>
          <li>Test animations on low-powered devices to ensure they're not too resource-intensive</li>
          <li>Consider users who prefer reduced motion with <code>prefers-reduced-motion</code> media query</li>
        </ul>
      </div>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Accessibility Considerations</h4>
      <CodeBlock
        language="css"
        code={`/* Respect user preferences for reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
      />
      
      <p>
        CSS transitions and animations are powerful tools for enhancing user interfaces. When used appropriately, they can improve usability, draw attention to important elements, and make your website feel more polished and professional.
      </p>
    </>
  ];

  return (
    <div className="py-8">
      <h1 className="text-center mb-8">CSS Tutorial</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProgressTracker 
            steps={steps} 
            currentStep={currentStep} 
            onStepChange={setCurrentStep} 
          />
        </div>
        
        <div className="md:col-span-3">
          <div className="glass p-8">
            {tutorialContent[currentStep]}
            
            <div className="flex justify-between mt-12">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className={`btn ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className={`btn ${
                  currentStep === steps.length - 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
                disabled={currentStep === steps.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssTutorial;