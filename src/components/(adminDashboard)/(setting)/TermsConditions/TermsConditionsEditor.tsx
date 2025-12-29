"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  ListOrdered,
  List,
  Heading1,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Loader2,
} from "lucide-react";
import { useGetTermsQuery, useUpdatedTermsMutation } from "@/redux/api/patApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

const TermsConditionsEditor = () => {
  const [updateTerms, { isLoading }] = useUpdatedTermsMutation();
  const { data } = useGetTermsQuery(undefined);
  const terms = data?.data;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      Image,
      Heading,
    ],
    content: "<p>Start writing your privacy policy...</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] rounded-md border bg-ns-primary-bg text-ns-title border border-ns-stroke px-4 py-3 focus:outline-none prose",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && terms?.description) {
      editor.commands.setContent(terms?.description);
    }
  }, [editor, terms]);

  const saveTerms = async () => {
    const termsCondition = editor?.getHTML();

    try {
      const dataInfo = {
        description: termsCondition,
      };

      const response = await updateTerms(dataInfo).unwrap();
      if (response.success) {
        toast.success(
          response.message || "Successfully updated terms and conditions"
        );
      }
    } catch (error) {
      console.log("error_____", error);
      toast.error(
        getErrorMessage(error) || "Failed to update terms and conditions"
      );
    }
  };

  return (
    <div className="space-y-4 border border-ns-stroke p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-ns-title">
        Terms & Condition Editor
      </h2>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-transparent border-ns-stroke">
        <Button
          className=" bg-ns-primary-bg text-ns-title border border-ns-stroke"
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </Button>
        <Button
          className=" bg-ns-primary-bg text-ns-title border border-ns-stroke"
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </Button>
        <Button
          className=" bg-ns-primary-bg text-ns-title border border-ns-stroke"
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </Button>
        <Button
          className=" bg-ns-primary-bg text-ns-title border border-ns-stroke"
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </Button>
        <Button
          className=" bg-ns-primary-bg text-ns-title border border-ns-stroke"
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </Button>
        <Button
          className=" bg-ns-primary-bg text-ns-title border border-ns-stroke"
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          className=" bg-ns-primary-bg text-ns-title border border-ns-stroke"
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          className=" bg-ns-primary-bg text-ns-title border border-ns-stroke"
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={16} />
        </Button>
        <Button
          className=" bg-ns-primary-bg text-ns-title border border-ns-stroke"
          variant="outline"
          size="icon"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 size={16} />
        </Button>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />

      {/* Save Button */}
      <Button
        className="mt-4 py-3 flex items-center gap-2"
        type="submit"
        onClick={saveTerms}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </div>
  );
};

export default TermsConditionsEditor;
