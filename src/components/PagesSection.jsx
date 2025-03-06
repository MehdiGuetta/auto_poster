import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Facebook,
  MoreHorizontal,
  ExternalLink,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { PageForm } from "./PageForm";

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
    <Card className="shadow-lg border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
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
          <DialogContent className="sm:max-w-[650px]">
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
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={
                            page.logoUrl ||
                            "/placeholder.svg?height=56&width=56"
                          }
                          alt={`${page.name} logo`}
                          className="h-14 w-14 rounded-full object-cover border-2 border-background shadow-sm"
                          onError={(e) => {
                            e.target.src =
                              "/placeholder.svg?height=56&width=56";
                          }}
                        />
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
                            <MoreHorizontal className="h-4 w-4" />
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
                          {page.proxy || "None"}
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
              className="bg-red-600 text-destructive-foreground dark:hover:bg-red-700 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
