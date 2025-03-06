import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Calendar,
  Type,
  MessageSquare,
  Image,
  Eye,
} from "lucide-react";

export function ManualPostSection({ pages, onAddPost }) {
  const [formData, setFormData] = useState({
    pageId: "",
    date: "",
    title: "",
    comment: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.pageId) {
      newErrors.pageId = "Please select a page";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date and time";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Comment is required";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onAddPost(formData);
      setFormData({
        pageId: "",
        date: "",
        title: "",
        comment: "",
        imageUrl: "",
      });
      setIsPreviewOpen(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const selectedPage = pages.find((page) => page.id === formData.pageId);

  return (
    <>
      <Card className="shadow-lg border-primary/10">
        <CardHeader className="bg-muted/50 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Add Post Manually
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Create and publish a new post to your Facebook page
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="pageId"
                  className={`flex items-center gap-1 ${
                    errors.pageId ? "text-destructive" : ""
                  }`}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Select Page
                </Label>
                <Select
                  value={formData.pageId}
                  onValueChange={(value) => handleSelectChange("pageId", value)}
                >
                  <SelectTrigger
                    id="pageId"
                    className={`bg-background ${
                      errors.pageId ? "border-destructive ring-destructive" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select a page" />
                  </SelectTrigger>
                  <SelectContent>
                    {pages.map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.pageId && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.pageId}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className={`flex items-center gap-1 ${
                    errors.date ? "text-destructive" : ""
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Date and Time
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={handleChange}
                  className={`bg-background ${
                    errors.date ? "border-destructive ring-destructive" : ""
                  }`}
                />
                {errors.date && (
                  <p className="text-xs text-destructive mt-1">{errors.date}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className={`flex items-center gap-1 ${
                  errors.title ? "text-destructive" : ""
                }`}
              >
                <Type className="h-3.5 w-3.5" />
                Title
              </Label>
              <Textarea
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                rows={2}
                className={`bg-background resize-none ${
                  errors.title ? "border-destructive ring-destructive" : ""
                }`}
              />
              {errors.title ? (
                <p className="text-xs text-destructive mt-1">{errors.title}</p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.title.length}/100 characters
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="comment"
                className={`flex items-center gap-1 ${
                  errors.comment ? "text-destructive" : ""
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Comment
              </Label>
              <Textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Enter post comment"
                rows={3}
                className={`bg-background resize-none ${
                  errors.comment ? "border-destructive ring-destructive" : ""
                }`}
              />
              {errors.comment && (
                <p className="text-xs text-destructive mt-1">
                  {errors.comment}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="imageUrl"
                className={`flex items-center gap-1 ${
                  errors.imageUrl ? "text-destructive" : ""
                }`}
              >
                <Image className="h-3.5 w-3.5" />
                Image URL
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                className={`bg-background ${
                  errors.imageUrl ? "border-destructive ring-destructive" : ""
                }`}
              />
              {errors.imageUrl && (
                <p className="text-xs text-destructive mt-1">
                  {errors.imageUrl}
                </p>
              )}
              {formData.imageUrl && !errors.imageUrl && (
                <div className="mt-2 rounded-md overflow-hidden h-20 w-full">
                  <img
                    src={
                      formData.imageUrl ||
                      "/placeholder.svg?height=80&width=300"
                    }
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=80&width=300";
                      setErrors((prev) => ({
                        ...prev,
                        imageUrl: "Image could not be loaded",
                      }));
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="gap-2 flex-1"
                onClick={() => {
                  if (validateForm()) {
                    setIsPreviewOpen(true);
                  }
                }}
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button type="submit" className="gap-2 flex-1">
                <PlusCircle className="h-4 w-4" />
                Add Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Post Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{formData.title || "Post Preview"}</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(formData.date)}
              </Badge>
              <Badge>{selectedPage?.name || "Unknown Page"}</Badge>
            </div>
            <div className="aspect-video overflow-hidden rounded-md bg-muted">
              <img
                src={
                  formData.imageUrl || "/placeholder.svg?height=300&width=600"
                }
                alt={formData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=300&width=600";
                }}
              />
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-foreground">
                {formData.comment || "No comment provided"}
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close Preview
              </Button>
              <Button type="button" onClick={handleSubmit}>
                Add Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
