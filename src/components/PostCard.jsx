import { useState } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, Share2, Trash2, Calendar, MessageCircle, Clock } from "lucide-react"

export function PostCard({ post, pageName, onDelete }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <>
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-all duration-200 group border-primary/10">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={post.imageUrl || "/placeholder.svg?height=192&width=384"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=192&width=384"
            }}
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
                window.open(`https://facebook.com/share?url=${encodeURIComponent(post.imageUrl)}`, "_blank")
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
            <p className="text-muted-foreground line-clamp-3 text-sm">{post.comment}</p>
          </div>
        </CardContent>
        <CardFooter className="pt-0 text-xs text-muted-foreground border-t mt-auto">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(post.date).split(",")[1]?.trim() || ""}
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
                src={post.imageUrl || "/placeholder.svg?height=300&width=600"}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=300&width=600"
                }}
              />
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-foreground">{post.comment}</p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete()
                  setIsPreviewOpen(false)
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
  )
}

