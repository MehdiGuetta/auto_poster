import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileSpreadsheet,
  Calendar,
  Upload,
  Check,
  Table,
  Eye,
} from "lucide-react";

// Mock data for preview
const mockXlsxData = [
  {
    title: "New Product Announcement",
    comment:
      "We're excited to announce our latest product line! Check it out now.",
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Customer Spotlight",
    comment:
      "Meet our customer of the month and learn how they achieved success with our solutions.",
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Industry Insights",
    comment:
      "Our latest research reveals interesting trends in the market. Read the full report.",
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
];

export function XlsxPostSection({ pages, onAddPosts }) {
  const [pageId, setPageId] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith(".xlsx")) {
        setFile(selectedFile);
        setMessage(null);
        if (errors.file) {
          setErrors((prev) => ({ ...prev, file: "" }));
        }
      } else {
        setFile(null);
        setMessage({ type: "error", text: "Please select a valid XLSX file" });
        setErrors((prev) => ({
          ...prev,
          file: "Please select a valid XLSX file",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!pageId) {
      newErrors.pageId = "Please select a page";
    }

    if (!date) {
      newErrors.date = "Please select a date";
    }

    if (!file) {
      newErrors.file = "Please upload an XLSX file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      // In a real application, you would parse the XLSX file here
      onAddPosts(pageId, date, mockXlsxData);

      setMessage({
        type: "success",
        text: `${mockXlsxData.length} posts added successfully!`,
      });
      setIsProcessing(false);

      // Reset form
      setFile(null);
      if (e.target instanceof HTMLFormElement) {
        e.target.reset();
      }
    }, 1500);
  };

  const selectedPage = pages.find((page) => page.id === pageId);

  return (
    <>
      <Card className="shadow-lg border-primary/10">
        <CardHeader className="bg-muted/50 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Add Posts from XLSX
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Bulk import posts from an Excel spreadsheet
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="xlsx-page"
                  className={`flex items-center gap-1 ${
                    errors.pageId ? "text-destructive" : ""
                  }`}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  Select Page
                </Label>
                <Select value={pageId} onValueChange={setPageId}>
                  <SelectTrigger
                    id="xlsx-page"
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
                  htmlFor="xlsx-date"
                  className={`flex items-center gap-1 ${
                    errors.date ? "text-destructive" : ""
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Select Date
                </Label>
                <Input
                  id="xlsx-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
                htmlFor="xlsx-file"
                className={`flex items-center gap-1 ${
                  errors.file ? "text-destructive" : ""
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                Upload XLSX File
              </Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:border-primary/50 cursor-pointer ${
                  errors.file
                    ? "border-destructive/50"
                    : "border-muted-foreground/25"
                }`}
              >
                <Input
                  id="xlsx-file"
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label
                  htmlFor="xlsx-file"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  {file ? (
                    <>
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Click to change file
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-muted-foreground">
                        XLSX files only
                      </span>
                    </>
                  )}
                </Label>
              </div>
              {errors.file && (
                <p className="text-xs text-destructive mt-1">{errors.file}</p>
              )}
            </div>

            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Table className="h-4 w-4" />
                Expected XLSX Format
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Your Excel file should have the following columns:
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                <div className="bg-primary/10 p-2 rounded">Title</div>
                <div className="bg-primary/10 p-2 rounded">Comment</div>
                <div className="bg-primary/10 p-2 rounded">ImageUrl</div>
              </div>
            </div>

            {message && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
                className={
                  message.type === "success"
                    ? "border-green-500 text-green-600 dark:text-green-400"
                    : ""
                }
              >
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="gap-2 flex-1"
                disabled={!pageId || !date || !file || isProcessing}
                onClick={() => {
                  if (validateForm()) {
                    setIsPreviewOpen(true);
                  }
                }}
              >
                <Eye className="h-4 w-4" />
                Preview Data
              </Button>
              <Button
                type="submit"
                className="gap-2 flex-1"
                disabled={!pageId || !date || !file || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <FileSpreadsheet className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="h-4 w-4" />
                    Import Posts
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* XLSX Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              XLSX Data Preview
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {date
                  ? new Date(date).toLocaleDateString()
                  : "No date selected"}
              </Badge>
              <Badge>{selectedPage?.name || "Unknown Page"}</Badge>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-3 gap-0 bg-muted p-2 text-sm font-medium">
                <div>Title</div>
                <div>Comment</div>
                <div>Image</div>
              </div>
              <div className="divide-y">
                {mockXlsxData.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-0 p-2 text-sm"
                  >
                    <div className="truncate pr-2">{item.title}</div>
                    <div className="truncate pr-2">{item.comment}</div>
                    <div className="flex items-center">
                      <img
                        src={
                          item.imageUrl || "/placeholder.svg?height=32&width=32"
                        }
                        alt={item.title}
                        className="h-8 w-8 rounded object-cover mr-2"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=32&width=32";
                        }}
                      />
                      <span className="truncate text-xs text-muted-foreground">
                        {item.imageUrl}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close Preview
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsPreviewOpen(false);
                  onAddPosts(pageId, date, mockXlsxData);
                  setMessage({
                    type: "success",
                    text: `${mockXlsxData.length} posts added successfully!`,
                  });
                  setFile(null);
                }}
                disabled={isProcessing}
              >
                Import {mockXlsxData.length} Posts
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
