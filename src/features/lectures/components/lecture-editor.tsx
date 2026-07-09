'use client'

import { EditorContent, type JSONContent, useEditor } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'

type LectureEditorProps = {
  content: JSONContent
  editable?: boolean
}

const AnchorHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('id'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {}
          }

          return {
            id: attributes.id,
          }
        },
      },
    }
  },
})

export function LectureEditor({ content, editable = false }: LectureEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      AnchorHeading.configure({
        levels: [2, 3],
      }),
    ],
    content,
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'lecture-editor-surface',
      },
    },
  })

  if (!editor) {
    return <div className="lecture-editor-loading">Loading lecture...</div>
  }

  return (
    <div className="lecture-editor">
      {editable ? (
        <div className="editor-toolbar" aria-label="Editor toolbar">
          <button
            className={editor.isActive('bold') ? 'is-active' : ''}
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            B
          </button>

          <button
            className={editor.isActive('italic') ? 'is-active' : ''}
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            I
          </button>

          <button
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </button>

          <button
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            List
          </button>

          <button
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            Quote
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            Undo
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            Redo
          </button>
        </div>
      ) : null}

      <EditorContent editor={editor} />
    </div>
  )
}
