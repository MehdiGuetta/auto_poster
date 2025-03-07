import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FileSpreadsheet,
} from "lucide-react";

import { PagesSection } from "./PagesSection";
import { PostFilterSection } from "./PostFilterSection";
import { ManualPostSection } from "./ManualPostSection";
import { XlsxPostSection } from "./XlsxPostSection";

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
      id: "456789123",
      name: "Marketing Tips",
      logoUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&auto=format&fit=crop",
      moderatorCookies: '{"cookie1":"value1","cookie2":"value2"}',
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      proxy: "192.168.1.2:8080",
    },
    {
      id: "789123456",
      name: "Product Showcase",
      logoUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&auto=format&fit=crop",
      moderatorCookies: '{"cookie1":"value1","cookie2":"value2"}',
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      proxy: "192.168.1.2:8080",
    },
    {
      id: "321654987",
      name: "Customer Stories",
      logoUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&auto=format&fit=crop",
      moderatorCookies: '{"cookie1":"value1","cookie2":"value2"}',
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      proxy: "192.168.1.2:8080",
    },
    {
      id: "654987321",
      name: "Industry News",
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-auto p-1 gap-3 rounded-xl mb-8 shadow-sm ">
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
