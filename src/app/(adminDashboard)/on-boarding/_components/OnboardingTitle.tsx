"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Check } from "lucide-react"

export default function OnboardingTitle() {
  // Initialize with a default title or an empty string
  const [title, setTitle] = useState("Default Blog Page Title")

  const handleSubmit = () => {
    if (title.trim()) {
   
      // In a real application, you would send this 'title' to a backend
      console.log("Submitting title:", title)
    } else {
      alert("Please enter a title.")
    }
  }

  const handleDelete = () => {
    setTitle("") // Clear the title
   
  }

  return (
    <div className="w-full ">
      <Card>
        <CardContent className="p-0">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 border-b">
            <div className="text-green-700 font-medium col-span-2">On Boarding Page Title</div>
            <div className="text-green-700 font-medium">Action</div>
          </div>

          {/* Single Title Input */}
          <div className="grid grid-cols-3 gap-4 p-4 items-center">
            {/* Text Input */}
            <div className="col-span-2">
              <Textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write your text"
                className="min-h-[80px] max-w-xl border-green-300 focus:border-green-500 focus:ring-green-500"
                aria-label="Edit blog page title"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSubmit}
                size="sm"
                variant="outline"
                className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
              >
                <Check className="w-4 h-4 mr-1" />
                Submit
              </Button>
              <Button
                onClick={handleDelete}
                size="sm"
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
