import { useState, useEffect } from "react";
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
  Filter,
  Search,
  SortAsc,
  SortDesc,
  RefreshCw,
  Calendar,
} from "lucide-react";
import { PostCard } from "./PostCard";

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
              className="bg-background "
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
