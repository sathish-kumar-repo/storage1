import React, { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import ProgressTracker from '../components/ProgressTracker';

const HtmlTutorial: React.FC = () => {
  const steps = [
    "Introduction to HTML",
    "Basic Document Structure",
    "Text Elements",
    "Links and Images",
    "Lists and Tables",
    "Forms and Input Elements",
    "Semantic HTML"
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const tutorialContent = [
    // Introduction to HTML
    <>
      <h2>Introduction to HTML</h2>
      <p>
        HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using a series of elements that tell the browser how to display the content.
      </p>
      <p>
        HTML elements are represented by tags, written using angle brackets. Tags usually come in pairs like <code>&lt;p&gt;</code> and <code>&lt;/p&gt;</code>, with the first tag being the start tag and the second tag being the end tag.
      </p>
      <div className="glass p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">Key Points</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>HTML stands for HyperText Markup Language</li>
          <li>HTML describes the structure of a web page</li>
          <li>HTML elements are represented by tags</li>
          <li>Browsers do not display the HTML tags, but use them to render the content</li>
        </ul>
      </div>
      <p>
        Let's look at a simple HTML example:
      </p>
      <CodeBlock
        language="html"
        code={`<!DOCTYPE html>
<html>
  <head>
    <title>My First HTML Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first web page.</p>
  </body>
</html>`}
      />
    </>,
    
    // Basic Document Structure
    <>
      <h2>Basic Document Structure</h2>
      <p>
        Every HTML document has a required structure that includes the following declarations and elements:
      </p>
      
      <div className="glass p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">Document Structure</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><code>&lt;!DOCTYPE html&gt;</code> - Declares the document type and HTML version</li>
          <li><code>&lt;html&gt;</code> - The root element that contains all other HTML elements</li>
          <li><code>&lt;head&gt;</code> - Contains meta-information about the document</li>
          <li><code>&lt;title&gt;</code> - Specifies the title of the document (shown in browser tab)</li>
          <li><code>&lt;body&gt;</code> - Contains the visible content of the document</li>
        </ul>
      </div>
      
      <p>
        Here's a more detailed example of an HTML document structure:
      </p>
      
      <CodeBlock
        language="html"
        code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Description of your page">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>
      <h1>Website Header</h1>
      <nav>
        <!-- Navigation links go here -->
      </nav>
    </header>
    
    <main>
      <!-- Main content goes here -->
    </main>
    
    <footer>
      <!-- Footer content goes here -->
    </footer>
    
    <script src="script.js"></script>
  </body>
</html>`}
      />
      
      <p>
        The <code>&lt;head&gt;</code> section contains meta information, CSS links, and the page title. It's not visible on the page itself. The <code>&lt;body&gt;</code> section contains all the content that is visible on your web page.
      </p>
    </>,
    
    // Text Elements
    <>
      <h2>Text Elements</h2>
      <p>
        HTML provides several elements for displaying text with different semantic meanings and visual styles.
      </p>
      
      <div className="glass p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">Common Text Elements</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> - Headings (h1 is most important, h6 is least important)</li>
          <li><code>&lt;p&gt;</code> - Paragraph</li>
          <li><code>&lt;strong&gt;</code> - Bold text with importance</li>
          <li><code>&lt;em&gt;</code> - Emphasized text (typically italic)</li>
          <li><code>&lt;mark&gt;</code> - Highlighted text</li>
          <li><code>&lt;small&gt;</code> - Smaller text</li>
          <li><code>&lt;del&gt;</code> - Deleted text (strikethrough)</li>
          <li><code>&lt;ins&gt;</code> - Inserted text (underlined)</li>
          <li><code>&lt;sub&gt;</code> - Subscript text</li>
          <li><code>&lt;sup&gt;</code> - Superscript text</li>
          <li><code>&lt;blockquote&gt;</code> - A section quoted from another source</li>
          <li><code>&lt;q&gt;</code> - A short inline quotation</li>
          <li><code>&lt;abbr&gt;</code> - An abbreviation or acronym</li>
        </ul>
      </div>
      
      <p>
        Here's an example showing various text elements:
      </p>
      
      <CodeBlock
        language="html"
        code={`<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Section Heading</h3>

<p>This is a paragraph of text. It can contain <strong>bold text</strong> and <em>emphasized text</em>.</p>

<p>You can mark <mark>important information</mark> or show <del>deleted text</del> and <ins>inserted text</ins>.</p>

<p>Scientific notation: H<sub>2</sub>O and E=mc<sup>2</sup></p>

<blockquote>
  This is a block quotation. It's often used to quote a large chunk of text from another source.
</blockquote>

<p>As Einstein said, <q>Imagination is more important than knowledge.</q></p>

<p>The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.</p>`}
      />
      
      <p>
        Using the right text elements not only helps with the visual presentation but also improves accessibility and SEO by providing semantic structure to your content.
      </p>
    </>,
    
    // Links and Images
    <>
      <h2>Links and Images</h2>
      <p>
        Links and images are fundamental elements that make the web interactive and visually engaging.
      </p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Hyperlinks</h3>
      <p>
        Hyperlinks allow users to navigate between web pages. They are created using the <code>&lt;a&gt;</code> (anchor) element.
      </p>
      
      <CodeBlock
        language="html"
        code={`<!-- Basic link -->
<a href="https://www.example.com">Visit Example</a>

<!-- Link that opens in a new tab -->
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Open in new tab</a>

<!-- Link to a section on the same page -->
<a href="#section-id">Jump to section</a>

<!-- Email link -->
<a href="mailto:contact@example.com">Send email</a>

<!-- Phone link (useful for mobile) -->
<a href="tel:+1234567890">Call us</a>`}
      />
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">Link Attributes</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><code>href</code> - Specifies the URL or path to link to</li>
          <li><code>target</code> - Specifies where to open the linked document</li>
          <li><code>rel</code> - Defines the relationship between current and linked document</li>
          <li><code>title</code> - Provides additional information (shown as tooltip)</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Images</h3>
      <p>
        Images are added using the <code>&lt;img&gt;</code> element, which is a self-closing tag.
      </p>
      
      <CodeBlock
        language="html"
        code={`<!-- Basic image -->
<img src="image.jpg" alt="Description of the image">

<!-- Image with width and height -->
<img src="image.jpg" alt="Description" width="500" height="300">

<!-- Responsive image -->
<img src="image.jpg" alt="Description" style="max-width:100%; height:auto;">

<!-- Image with a caption -->
<figure>
  <img src="image.jpg" alt="Description">
  <figcaption>Caption for the image</figcaption>
</figure>`}
      />
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">Image Attributes</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><code>src</code> - Specifies the path to the image</li>
          <li><code>alt</code> - Provides alternative text (for accessibility and SEO)</li>
          <li><code>width</code> - Specifies the width of the image</li>
          <li><code>height</code> - Specifies the height of the image</li>
          <li><code>loading</code> - Can be set to "lazy" for lazy loading</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Combining Links and Images</h3>
      <p>
        A common pattern is to make an image clickable by wrapping it in an anchor tag:
      </p>
      
      <CodeBlock
        language="html"
        code={`<a href="https://www.example.com">
  <img src="button.jpg" alt="Click here to visit example.com">
</a>`}
      />
      
      <p>
        Always remember to include descriptive alt text for images to improve accessibility for users with visual impairments and for SEO purposes.
      </p>
    </>,
    
    // Lists and Tables
    <>
      <h2>Lists and Tables</h2>
      <p>
        Lists and tables are essential HTML elements for organizing and structuring content in a readable format.
      </p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">HTML Lists</h3>
      <p>
        HTML provides three types of lists:
      </p>
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">List Types</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Unordered lists <code>&lt;ul&gt;</code> - List items marked with bullets</li>
          <li>Ordered lists <code>&lt;ol&gt;</code> - List items marked with numbers or letters</li>
          <li>Description lists <code>&lt;dl&gt;</code> - List of terms and their descriptions</li>
        </ul>
      </div>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Unordered List</h4>
      <CodeBlock
        language="html"
        code={`<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Ordered List</h4>
      <CodeBlock
        language="html"
        code={`<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>

<!-- Ordered list with different numbering -->
<ol type="A">
  <li>Item A</li>
  <li>Item B</li>
  <li>Item C</li>
</ol>`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Description List</h4>
      <CodeBlock
        language="html"
        code={`<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language for creating web pages</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets for styling web pages</dd>
  
  <dt>JavaScript</dt>
  <dd>Programming language for adding interactivity to websites</dd>
</dl>`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Nested Lists</h4>
      <CodeBlock
        language="html"
        code={`<ul>
  <li>Main item 1</li>
  <li>
    Main item 2
    <ul>
      <li>Sub item 2.1</li>
      <li>Sub item 2.2</li>
    </ul>
  </li>
  <li>Main item 3</li>
</ul>`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">HTML Tables</h3>
      <p>
        Tables are used to display data in rows and columns. They should only be used for tabular data, not for layout purposes.
      </p>
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">Table Elements</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><code>&lt;table&gt;</code> - Defines a table</li>
          <li><code>&lt;tr&gt;</code> - Defines a table row</li>
          <li><code>&lt;th&gt;</code> - Defines a table header cell</li>
          <li><code>&lt;td&gt;</code> - Defines a table data cell</li>
          <li><code>&lt;caption&gt;</code> - Defines a table caption</li>
          <li><code>&lt;thead&gt;</code> - Groups header content</li>
          <li><code>&lt;tbody&gt;</code> - Groups body content</li>
          <li><code>&lt;tfoot&gt;</code> - Groups footer content</li>
        </ul>
      </div>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Basic Table</h4>
      <CodeBlock
        language="html"
        code={`<table>
  <caption>Monthly Savings</caption>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
  <tr>
    <td>February</td>
    <td>$80</td>
  </tr>
</table>`}
      />
      
      <h4 className="text-xl font-semibold mt-6 mb-2">Table with thead, tbody, and tfoot</h4>
      <CodeBlock
        language="html"
        code={`<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Product A</td>
      <td>$10</td>
      <td>2</td>
      <td>$20</td>
    </tr>
    <tr>
      <td>Product B</td>
      <td>$15</td>
      <td>1</td>
      <td>$15</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Total</td>
      <td>$35</td>
    </tr>
  </tfoot>
</table>`}
      />
      
      <p>
        Tables can also include attributes like <code>colspan</code> and <code>rowspan</code> to make cells span multiple columns or rows, respectively.
      </p>
    </>,
    
    // Forms and Input Elements
    <>
      <h2>Forms and Input Elements</h2>
      <p>
        HTML forms are used to collect user input. They can contain various input elements like text fields, checkboxes, radio buttons, submit buttons, and more.
      </p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Basic Form Structure</h3>
      <CodeBlock
        language="html"
        code={`<form action="/submit-form" method="post">
  <!-- Form elements go here -->
  <input type="text" name="username">
  <input type="submit" value="Submit">
</form>`}
      />
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">Form Attributes</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><code>action</code> - Specifies where to send the form data when submitted</li>
          <li><code>method</code> - Specifies the HTTP method to use (get or post)</li>
          <li><code>enctype</code> - Specifies how form data should be encoded (for file uploads)</li>
          <li><code>autocomplete</code> - Specifies whether the form should have autocomplete on or off</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Common Input Types</h3>
      <p>
        The <code>&lt;input&gt;</code> element is the most important form element. It can be displayed in several ways, depending on the <code>type</code> attribute.
      </p>
      
      <CodeBlock
        language="html"
        code={`<!-- Text input -->
<input type="text" name="name" placeholder="Enter your name">

<!-- Password input -->
<input type="password" name="password" placeholder="Enter your password">

<!-- Email input -->
<input type="email" name="email" placeholder="Enter your email">

<!-- Number input -->
<input type="number" name="age" min="1" max="120">

<!-- Date input -->
<input type="date" name="birthdate">

<!-- Checkbox -->
<input type="checkbox" name="subscribe" id="subscribe">
<label for="subscribe">Subscribe to newsletter</label>

<!-- Radio buttons -->
<input type="radio" name="gender" id="male" value="male">
<label for="male">Male</label>
<input type="radio" name="gender" id="female" value="female">
<label for="female">Female</label>

<!-- File upload -->
<input type="file" name="profile_picture">

<!-- Submit button -->
<input type="submit" value="Submit">

<!-- Reset button -->
<input type="reset" value="Reset">`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Text Areas</h3>
      <p>
        The <code>&lt;textarea&gt;</code> element defines a multi-line input field:
      </p>
      
      <CodeBlock
        language="html"
        code={`<textarea name="message" rows="4" cols="50" placeholder="Enter your message here..."></textarea>`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Select Dropdowns</h3>
      <p>
        The <code>&lt;select&gt;</code> element defines a dropdown list:
      </p>
      
      <CodeBlock
        language="html"
        code={`<select name="country">
  <option value="usa">United States</option>
  <option value="canada">Canada</option>
  <option value="uk">United Kingdom</option>
  <option value="australia">Australia</option>
</select>

<!-- Multiple selection -->
<select name="skills" multiple>
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
  <option value="php">PHP</option>
</select>`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Form Example</h3>
      <p>
        Here's a complete example of a form:
      </p>
      
      <CodeBlock
        language="html"
        code={`<form action="/submit-registration" method="post">
  <div>
    <label for="fullname">Full Name:</label>
    <input type="text" id="fullname" name="fullname" required>
  </div>
  
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
  </div>
  
  <div>
    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob">
  </div>
  
  <div>
    <p>Gender:</p>
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">Male</label>
    
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">Female</label>
    
    <input type="radio" id="other" name="gender" value="other">
    <label for="other">Other</label>
  </div>
  
  <div>
    <label for="country">Country:</label>
    <select id="country" name="country">
      <option value="">--Please select--</option>
      <option value="usa">United States</option>
      <option value="canada">Canada</option>
      <option value="uk">United Kingdom</option>
      <option value="australia">Australia</option>
    </select>
  </div>
  
  <div>
    <input type="checkbox" id="terms" name="terms" required>
    <label for="terms">I agree to the terms and conditions</label>
  </div>
  
  <div>
    <label for="message">Additional Comments:</label>
    <textarea id="message" name="message" rows="4"></textarea>
  </div>
  
  <div>
    <input type="submit" value="Register">
    <input type="reset" value="Clear Form">
  </div>
</form>`}
      />
      
      <p>
        When styling forms, it's important to consider usability and accessibility. Make sure form controls are large enough to interact with, provide clear labels, and include visual feedback for interactions.
      </p>
    </>,
    
    // Semantic HTML
    <>
      <h2>Semantic HTML</h2>
      <p>
        Semantic HTML uses tags that convey meaning about the content they contain, rather than just how they should look. This improves accessibility, SEO, and code readability.
      </p>
      
      <div className="glass p-6 my-6">
        <h4 className="text-lg font-semibold mb-2">Benefits of Semantic HTML</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Improves accessibility for screen readers and assistive technologies</li>
          <li>Helps search engines understand your content better (SEO)</li>
          <li>Makes your code more maintainable and easier to understand</li>
          <li>Provides consistent structure across different websites</li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Common Semantic Elements</h3>
      <p>
        HTML5 introduced several semantic elements that clearly define different parts of a web page:
      </p>
      
      <CodeBlock
        language="html"
        code={`<!-- Non-semantic elements -->
<div>
<span>

<!-- Semantic elements -->
<header>
<nav>
<main>
<section>
<article>
<aside>
<figure>
<figcaption>
<details>
<summary>
<time>
<mark>
<footer>`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">Semantic Page Structure</h3>
      <p>
        Here's an example of a webpage structured with semantic HTML:
      </p>
      
      <CodeBlock
        language="html"
        code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic HTML Example</title>
</head>
<body>
  <!-- Site header with logo and main navigation -->
  <header>
    <h1>My Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main content area -->
  <main>
    <!-- Section with articles -->
    <section id="blog-posts">
      <h2>Recent Blog Posts</h2>
      
      <article>
        <header>
          <h3>Article Title</h3>
          <p>Published: <time datetime="2023-09-15">September 15, 2023</time></p>
        </header>
        <p>Article introduction and content goes here...</p>
        <figure>
          <img src="image.jpg" alt="Descriptive text">
          <figcaption>Image caption explaining the figure</figcaption>
        </figure>
        <p>More article content...</p>
        <footer>
          <p>Written by: Author Name</p>
        </footer>
      </article>
      
      <!-- More articles can be added here -->
    </section>
    
    <!-- Sidebar with related content -->
    <aside>
      <h2>Related Links</h2>
      <ul>
        <li><a href="#">Related Topic 1</a></li>
        <li><a href="#">Related Topic 2</a></li>
      </ul>
      
      <details>
        <summary>Click to show more information</summary>
        <p>This is additional information that is hidden by default.</p>
      </details>
    </aside>
  </main>

  <!-- Site footer with copyright and additional links -->
  <footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
    <nav>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </nav>
  </footer>
</body>
</html>`}
      />
      
      <h3 className="text-2xl font-semibold mt-8 mb-4">When to Use Semantic Elements</h3>
      <div className="glass p-6 my-6">
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>&lt;header&gt;</strong> - For introductory content, navigation, logo, search form at the top of a page or section</li>
          <li><strong>&lt;nav&gt;</strong> - For navigation menus</li>
          <li><strong>&lt;main&gt;</strong> - For the main content of the page (only use once per page)</li>
          <li><strong>&lt;section&gt;</strong> - For thematic grouping of content</li>
          <li><strong>&lt;article&gt;</strong> - For self-contained content that could be distributed independently</li>
          <li><strong>&lt;aside&gt;</strong> - For content tangentially related to the content around it</li>
          <li><strong>&lt;figure&gt; and &lt;figcaption&gt;</strong> - For content like images, diagrams, photos, code, etc., with an optional caption</li>
          <li><strong>&lt;footer&gt;</strong> - For footer information of a page or section</li>
        </ul>
      </div>
      
      <p>
        Using semantic HTML properly means choosing the right elements based on their meaning, not their appearance. The appearance can be customized with CSS, but the underlying semantic structure remains consistent and meaningful.
      </p>
    </>
  ];

  return (
    <div className="py-8">
      <h1 className="text-center mb-8">HTML Tutorial</h1>
      
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

export default HtmlTutorial;