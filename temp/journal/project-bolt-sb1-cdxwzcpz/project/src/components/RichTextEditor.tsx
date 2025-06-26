import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'list', 'bullet',
  'indent',
  'direction', 'align',
  'blockquote', 'code-block',
  'link', 'image', 'video'
];

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    // Custom styles for dark mode
    const style = document.createElement('style');
    style.textContent = `
      .dark .ql-toolbar {
        border-color: #374151 !important;
        background: #1f2937 !important;
      }
      
      .dark .ql-toolbar .ql-stroke {
        stroke: #d1d5db !important;
      }
      
      .dark .ql-toolbar .ql-fill {
        fill: #d1d5db !important;
      }
      
      .dark .ql-toolbar .ql-picker-label {
        color: #d1d5db !important;
      }
      
      .dark .ql-toolbar .ql-picker-options {
        background: #1f2937 !important;
        border-color: #374151 !important;
      }
      
      .dark .ql-toolbar .ql-picker-item {
        color: #d1d5db !important;
      }
      
      .dark .ql-toolbar .ql-picker-item:hover {
        background: #374151 !important;
      }
      
      .dark .ql-container {
        border-color: #374151 !important;
        background: #111827 !important;
      }
      
      .dark .ql-editor {
        color: #f9fafb !important;
      }
      
      .dark .ql-editor.ql-blank::before {
        color: #6b7280 !important;
      }
      
      .dark .ql-tooltip {
        background: #1f2937 !important;
        border-color: #374151 !important;
        color: #d1d5db !important;
      }
      
      .dark .ql-tooltip input {
        background: #111827 !important;
        border-color: #374151 !important;
        color: #f9fafb !important;
      }
      
      .ql-editor {
        min-height: 200px;
        font-size: 16px;
        line-height: 1.6;
      }
      
      .ql-toolbar {
        border-radius: 8px 8px 0 0;
      }
      
      .ql-container {
        border-radius: 0 0 8px 8px;
        font-family: inherit;
      }
      
      .ql-editor h1 {
        font-size: 2em;
        font-weight: bold;
        margin: 0.67em 0;
      }
      
      .ql-editor h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0.75em 0;
      }
      
      .ql-editor h3 {
        font-size: 1.17em;
        font-weight: bold;
        margin: 0.83em 0;
      }
      
      .ql-editor h4 {
        font-size: 1em;
        font-weight: bold;
        margin: 1.12em 0;
      }
      
      .ql-editor h5 {
        font-size: 0.83em;
        font-weight: bold;
        margin: 1.5em 0;
      }
      
      .ql-editor h6 {
        font-size: 0.75em;
        font-weight: bold;
        margin: 1.67em 0;
      }
      
      .ql-editor blockquote {
        border-left: 4px solid #6366f1;
        padding-left: 16px;
        margin: 16px 0;
        font-style: italic;
        background: rgba(99, 102, 241, 0.05);
        padding: 12px 16px;
        border-radius: 4px;
      }
      
      .dark .ql-editor blockquote {
        background: rgba(99, 102, 241, 0.1);
      }
      
      .ql-editor pre {
        background: #f3f4f6;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        padding: 12px;
        margin: 16px 0;
        overflow-x: auto;
      }
      
      .dark .ql-editor pre {
        background: #1f2937;
        border-color: #374151;
      }
      
      .ql-editor code {
        background: #f3f4f6;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      }
      
      .dark .ql-editor code {
        background: #374151;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={className}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{
          backgroundColor: 'transparent'
        }}
      />
    </div>
  );
}