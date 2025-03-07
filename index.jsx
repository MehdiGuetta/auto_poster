import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FileSpreadsheet,
  Pencil,
  Trash2,
  Plus,
  MoreHorizontal,
  ExternalLink,
  Calendar,
  Type,
  MessageSquare,
  Image,
  Eye,
  Facebook,
  Globe,
  Code,
  Network,
  User,
  Clock,
  MessageCircle,
  Share2,
  Upload,
  Check,
  Table,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Pages = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <h1 className="text-3xl font-bold pl-10">Facebook Page Manager</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 ">
        <FacebookPageManager />
      </main>
    </div>
  );
};

export default Pages;

export function FacebookPageManager() {
  const [activeTab, setActiveTab] = useState("pages");

  const [pages, setPages] = useState([
    {
      id: "123456789",
      name: "Tech News",
      logoUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&auto=format&fit=crop",
      moderatorCookies: '{"cookie1":"value1","cookie2":"value2"}',
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      proxy: "192.168.1.1:8080",
    },
    {
      id: "987654321",
      name: "Daily Updates",
      logoUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&auto=format&fit=crop",
      moderatorCookies: '{"cookie1":"value1","cookie2":"value2"}',
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      proxy: "192.168.1.2:8080",
    },
    {
      id: "987654321",
      name: "Daily Updates",
      logoUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&auto=format&fit=crop",
      moderatorCookies: '{"cookie1":"value1","cookie2":"value2"}',
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      proxy: "192.168.1.2:8080",
    },
    {
      id: "987654321",
      name: "Daily Updates",
      logoUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&auto=format&fit=crop",
      moderatorCookies: '{"cookie1":"value1","cookie2":"value2"}',
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      proxy: "192.168.1.2:8080",
    },
    {
      id: "987654321",
      name: "Daily Updates",
      logoUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&auto=format&fit=crop",
      moderatorCookies: '{"cookie1":"value1","cookie2":"value2"}',
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      proxy: "192.168.1.2:8080",
    },
    {
      id: "987654321",
      name: "Daily Updates",
      logoUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&auto=format&fit=crop",
      moderatorCookies: '{"cookie1":"value1","cookie2":"value2"}',
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      proxy: "192.168.1.2:8080",
    },
  ]);

  const [posts, setPosts] = useState([
    {
      id: "1",
      pageId: "123456789",
      date: "2023-05-15T10:30",
      title: "New Product Launch",
      comment: "We're excited to announce our new product line!",
      imageUrl:
        "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=600&h=400&auto=format&fit=crop",
    },
    {
      id: "2",
      pageId: "123456789",
      date: "2023-05-16T14:45",
      title: "Customer Testimonial",
      comment: "Hear what our customers are saying about us!",
      imageUrl:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&auto=format&fit=crop",
    },
    {
      id: "3",
      pageId: "987654321",
      date: "2023-05-17T09:15",
      title: "Industry News",
      comment: "Stay updated with the latest trends in the industry.",
      imageUrl:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&auto=format&fit=crop",
    },
  ]);

  const addPage = (page) => {
    const newPage = {
      ...page,
      id: Math.random().toString(36).substring(2, 11),
    };
    setPages([...pages, newPage]);
    toast.success(`${newPage.name} has been added successfully.`);
  };

  const updatePage = (updatedPage) => {
    setPages(
      pages.map((page) => (page.id === updatedPage.id ? updatedPage : page))
    );
    toast.success(`${updatedPage.name} has been updated successfully.`);
  };

  const deletePage = (id) => {
    const pageToDelete = pages.find((page) => page.id === id);
    setPages(pages.filter((page) => page.id !== id));
    toast(`${pageToDelete?.name || "Page"} has been deleted.`);
  };

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Math.random().toString(36).substring(2, 11),
    };
    setPosts([...posts, newPost]);
    toast.success("Your post has been added successfully.");
    setActiveTab("posts");
  };

  const addPostsFromXlsx = (pageId, date, postsData) => {
    const newPosts = postsData.map((post) => ({
      ...post,
      id: Math.random().toString(36).substring(2, 11),
      pageId,
      date,
    }));
    setPosts([...posts, ...newPosts]);
    toast.success(`${newPosts.length} posts have been imported successfully.`);
    setActiveTab("posts");
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
    toast("The post has been deleted successfully.");
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <TabsList className="w-full grid grid-cols-4 h-auto p-1 gap-3 rounded-xl mb-8 shadow-sm">
          <TabsTrigger value="pages">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="posts">
            <FileText className="h-4 w-4 mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="add-post">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Post
          </TabsTrigger>
          <TabsTrigger value="import">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Import
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="pages"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <PagesSection
            pages={pages}
            onAddPage={addPage}
            onUpdatePage={updatePage}
            onDeletePage={deletePage}
          />
        </TabsContent>

        <TabsContent
          value="posts"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <PostFilterSection
            pages={pages}
            posts={posts}
            onDeletePost={deletePost}
          />
        </TabsContent>

        <TabsContent
          value="add-post"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <ManualPostSection pages={pages} onAddPost={addPost} />
        </TabsContent>

        <TabsContent
          value="import"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <XlsxPostSection pages={pages} onAddPosts={addPostsFromXlsx} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

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
                    src={formData.imageUrl || "/placeholder.svg"}
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
                src={formData.imageUrl || "/placeholder.svg"}
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

export function PageForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    logoUrl: initialData?.logoUrl || "",
    moderatorCookies: initialData?.moderatorCookies || "",
    userAgent:
      initialData?.userAgent ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    proxy: initialData?.proxy || "",
  });

  const [previewLogo, setPreviewLogo] = useState(formData.logoUrl);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update logo preview when URL changes
    if (name === "logoUrl") {
      setPreviewLogo(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Basic info */}
        <div className="flex-1 space-y-5">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-2">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-1">
              <Facebook className="h-4 w-4" />
              Page Information
            </h3>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
              Enter the basic information about your Facebook page
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id" className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                Facebook Page ID
              </Label>
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Enter Facebook Page ID"
                className="font-mono text-sm"
                required
              />
              <p className="text-xs text-muted-foreground">
                The unique identifier for your Facebook page
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                Page Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Page Name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl" className="flex items-center gap-1.5">
                <Image className="h-3.5 w-3.5 text-muted-foreground" />
                Page Logo URL
              </Label>
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <Input
                    id="logoUrl"
                    name="logoUrl"
                    value={formData.logoUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL to the page logo image (optional)
                  </p>
                </div>
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-muted bg-muted/30 flex items-center justify-center">
                  {previewLogo ? (
                    <img
                      src={previewLogo}
                      alt="Logo preview"
                      className="h-full w-full object-cover"
                      onError={() => setPreviewLogo("")}
                    />
                  ) : (
                    <Facebook className="h-8 w-8 text-muted-foreground/40" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Technical settings */}
        <div className="flex-1 space-y-5">
          <div className="bg-slate-50 dark:bg-slate-950/30 p-4 rounded-lg mb-2">
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-300 flex items-center gap-2 mb-1">
              <Code className="h-4 w-4" />
              Technical Settings
            </h3>
            <p className="text-xs text-slate-600/70 dark:text-slate-400/70">
              Configure connection and browser settings
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="moderatorCookies"
                className="flex items-center gap-1.5"
              >
                <Code className="h-3.5 w-3.5 text-muted-foreground" />
                Moderator Cookies (JSON)
              </Label>
              <Textarea
                id="moderatorCookies"
                name="moderatorCookies"
                value={formData.moderatorCookies}
                onChange={handleChange}
                placeholder='{"cookie1":"value1","cookie2":"value2"}'
                className={cn(
                  "font-mono text-xs resize-none",
                  formData.moderatorCookies && "bg-muted/30"
                )}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Authentication cookies in JSON format
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userAgent" className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                User Agent
              </Label>
              <Textarea
                id="userAgent"
                name="userAgent"
                value={formData.userAgent}
                onChange={handleChange}
                placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
                className="font-mono text-xs resize-none"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proxy" className="flex items-center gap-1.5">
                <Network className="h-3.5 w-3.5 text-muted-foreground" />
                Proxy
              </Label>
              <Input
                id="proxy"
                name="proxy"
                value={formData.proxy}
                onChange={handleChange}
                placeholder="ip:port or username:password@ip:port"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Format: ip:port or username:password@ip:port
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="px-4"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-5 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          <Facebook className="h-4 w-4" />
          {initialData?.id ? "Update Page" : "Add Page"}
        </Button>
      </div>
    </form>
  );
}

export function PagesSection({ pages, onAddPage, onUpdatePage, onDeletePage }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [pageToDelete, setPageToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAddPage = (page) => {
    onAddPage(page);
    setIsAddModalOpen(false);
  };

  const handleUpdatePage = (page) => {
    onUpdatePage(page);
    setEditingPage(null);
  };

  const handleDeletePage = () => {
    if (pageToDelete) {
      onDeletePage(pageToDelete.id);
      setPageToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const confirmDelete = (page) => {
    setPageToDelete(page);
    setIsDeleteDialogOpen(true);
  };

  return (
    <Card className="shadow-lg border-primary/10 ">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 pb-4">
        <div>
          <div className="flex items-center gap-2 ">
            <Facebook className="h-5 w-5" />
            <CardTitle className="text-2xl font-bold">Facebook Pages</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your Facebook pages and their settings
          </p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1 text-white">
              <Plus className="h-4 w-4" />
              Add New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Facebook Page</DialogTitle>
            </DialogHeader>
            <PageForm
              onSubmit={handleAddPage}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="pt-6">
        {pages.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <h3 className="text-lg font-medium mb-2">No pages added yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first Facebook page to get started
            </p>
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(true)}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Page
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Card
                key={page.id}
                className="overflow-hidden group hover:shadow-md transition-all duration-200 border-primary/10 dark:bg-[#1c1c1d]"
              >
                <CardContent className="p-0 ">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={page.logoUrl || "/placeholder.svg"}
                          alt={`${page.name} logo`}
                          className="h-14 w-14 rounded-full object-cover border-2 border-background shadow-sm"
                        />
                        <Badge className="absolute -bottom-1 -right-1 text-xs">
                          FB
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg truncate">
                          {page.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          ID: {page.id}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-black bg-gray-200 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-500"
                          >
                            <MoreHorizontal className="h-4 w-4 " />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(
                                `https://facebook.com/${page.id}`,
                                "_blank"
                              )
                            }
                            className="cursor-pointer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View on Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setEditingPage(page)}
                            className="cursor-pointer"
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Page
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => confirmDelete(page)}
                            className="cursor-pointer text-destructive focus:text-destructive dark:text-red-500"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Page
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">User Agent:</p>
                        <p className="truncate font-mono text-xs">
                          {page.userAgent.substring(0, 20)}...
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Proxy:</p>
                        <p className="truncate font-mono text-xs">
                          {page.proxy}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      {/* Edit Page Dialog */}
      <Dialog
        open={!!editingPage}
        onOpenChange={(open) => !open && setEditingPage(null)}
      >
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Facebook Page</DialogTitle>
          </DialogHeader>
          {editingPage && (
            <PageForm
              initialData={editingPage}
              onSubmit={handleUpdatePage}
              onCancel={() => setEditingPage(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the page "{pageToDelete?.name}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePage}
              className="bg-red-600 text-destructive-foreground dark:hover:bg-red-700 hover:bg-red-700 "
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

export function PostCard({ post, pageName, onDelete }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <>
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-all duration-200 group border-primary/10">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">Preview</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() =>
                window.open(
                  `https://facebook.com/share?url=${encodeURIComponent(
                    post.imageUrl
                  )}`,
                  "_blank"
                )
              }
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8 rounded-full bg-destructive/80 backdrop-blur-sm"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
        <CardHeader className="pb-2 relative">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary" className="font-medium">
              {pageName}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(post.date).split(",")[0]}
            </div>
          </div>
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="flex items-start gap-2">
            <MessageCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-muted-foreground line-clamp-3 text-sm">
              {post.comment}
            </p>
          </div>
        </CardContent>
        <CardFooter className="pt-0 text-xs text-muted-foreground border-t mt-auto">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(post.date).split(",")[1].trim()}
          </div>
        </CardFooter>
      </Card>

      {/* Post Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{post.title}</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.date)}
              </Badge>
              <Badge>{pageName}</Badge>
            </div>
            <div className="aspect-video overflow-hidden rounded-md">
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-foreground">{post.comment}</p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete();
                  setIsPreviewOpen(false);
                }}
                className="gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Delete Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function PostFilterSection({ pages, posts, onDeletePost }) {
  const [selectedPageId, setSelectedPageId] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let filtered = [...posts];

    // Apply filters
    if (selectedPageId !== "all") {
      filtered = filtered.filter((post) => post.pageId === selectedPageId);
    }

    if (selectedDate) {
      const dateOnly = selectedDate.split("T")[0];
      filtered = filtered.filter((post) => post.date.startsWith(dateOnly));
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.comment.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    filtered = sortPosts(filtered, sortBy);

    setFilteredPosts(filtered);
  }, [selectedPageId, selectedDate, searchTerm, sortBy, posts]);

  const sortPosts = (postsToSort, sortOption) => {
    const sorted = [...postsToSort];

    switch (sortOption) {
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  const clearFilters = () => {
    setSelectedPageId("all");
    setSelectedDate("");
    setSearchTerm("");
    setSortBy("newest");
  };

  const confirmDeletePost = (post) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      onDeletePost(postToDelete.id);
      setPostToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const refreshPosts = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader className="bg-muted/50 pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Post Filtering
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Filter and search through all your Facebook posts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredPosts.length} posts found
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshPosts}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              <span className="sr-only">Refresh</span>
            </Button>
            {(selectedPageId !== "all" ||
              selectedDate ||
              searchTerm ||
              sortBy !== "newest") && (
              <Button
                className="bg-gray-200 dark:bg-black dark:hover:bg-black/20"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="page-filter" className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              Filter by Page
            </Label>
            <Select value={selectedPageId} onValueChange={setSelectedPageId}>
              <SelectTrigger id="page-filter" className="bg-background">
                <SelectValue placeholder="Select a page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pages</SelectItem>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={page.id}>
                    {page.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-filter" className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Filter by Date
            </Label>
            <Input
              id="date-filter"
              type="date"
              value={selectedDate ? selectedDate.split("T")[0] : ""}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="search-posts" className="flex items-center gap-1">
              <Search className="h-3.5 w-3.5" />
              Search Posts
            </Label>
            <Input
              id="search-posts"
              type="text"
              placeholder="Search by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort-posts" className="flex items-center gap-1">
              {sortBy.includes("asc") ? (
                <SortAsc className="h-3.5 w-3.5" />
              ) : (
                <SortDesc className="h-3.5 w-3.5" />
              )}
              Sort By
            </Label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger id="sort-posts" className="bg-background">
                <SelectValue placeholder="Sort posts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-medium mb-6 pb-2 border-b">Posts</h3>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <h3 className="text-lg font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or add some posts
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  pageName={
                    pages.find((p) => p.id === post.pageId)?.name ||
                    "Unknown Page"
                  }
                  onDelete={() => confirmDeletePost(post)}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

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
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.title}
                        className="h-8 w-8 rounded object-cover mr-2"
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
