import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Globe, Code, Network, User, Image } from "lucide-react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function PageForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    cover_path: initialData?.cover_path || "", // Ensuring correct field name
    cookies: initialData?.cookies || "",
    user_agent: initialData?.user_agent || "",
    proxy_ip: initialData?.proxy_ip || "", // Match Laravel field
    facebook_page_id: initialData?.facebook_page_id || "",
    local_storage: initialData?.local_storage || "",
  });

  const token = localStorage.getItem("token");

  const [errors, setErrors] = useState({});
  const [previewLogo, setPreviewLogo] = useState(formData.cover_path);

  const validateForm = () => {
    const newErrors = {};

    // Facebook Page ID validation
    if (!formData.facebook_page_id.trim()) {
      newErrors.facebook_page_id = "Facebook Page ID is required";
    }

    // Page Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Page Name is required";
    }

    // Logo URL validation (optional)
    if (formData.cover_path && !isValidUrl(formData.cover_path)) {
      newErrors.cover_path = "Please enter a valid URL";
    } else if (!formData.cover_path) {
      newErrors.cover_path = "Page Logo URL is required";
    }

    // Moderator Cookies validation
    if (!formData.cookies.trim()) {
      newErrors.cookies = "Moderator Cookies are required";
    } else {
      try {
        JSON.parse(formData.cookies);
      } catch (e) {
        newErrors.cookies = "Please enter valid JSON";
      }
    }

    // User Agent validation
    if (!formData.user_agent.trim()) {
      newErrors.user_agent = "User Agent is required";
    }

    // Proxy validation
    if (!formData.proxy_ip) {
      newErrors.proxy_ip = "Proxy is required";
    } else {
      const proxyRegex = /^(?:[a-zA-Z0-9]+:[a-zA-Z0-9]+@)?[a-zA-Z0-9.-]+:\d+$/;
      if (!proxyRegex.test(formData.proxy_ip)) {
        newErrors.proxy_ip = "Invalid proxy format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Update logo preview when URL changes
    if (name === "cover_path") {
      setPreviewLogo(value);
    }
  };

  // Add these debug logs to your handleSubmit function in PageForm.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Form data being submitted:",
      JSON.stringify(formData, null, 2)
    );

    if (validateForm()) {
      try {
        console.log("Sending request to:", `${backendUrl}pages`);
        console.log("With headers:", {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });

        const response = await axios.post(`${backendUrl}pages`, formData, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response received:", response);
        onSubmit(response.data);
      } catch (error) {
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }
    }
  };

  const getInputClassName = (fieldName) => {
    return `${
      errors[fieldName] ? "border-red-500 focus:ring-red-500" : ""
    } font-mono text-sm`;
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
              <Label
                htmlFor="facebook_page_id"
                className="flex items-center gap-1.5"
              >
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                Facebook Page ID
              </Label>
              <Input
                id="facebook_page_id"
                name="facebook_page_id"
                value={formData.facebook_page_id}
                onChange={handleChange}
                placeholder="Enter Facebook Page ID"
                className={getInputClassName("facebook_page_id")}
              />
              {errors.facebook_page_id && (
                <p className="text-xs text-red-500">
                  {errors.facebook_page_id}
                </p>
              )}
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
                className={getInputClassName("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_path" className="flex items-center gap-1.5">
                <Image className="h-3.5 w-3.5 text-muted-foreground" />
                Page Logo URL
              </Label>
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <Input
                    id="cover_path"
                    name="cover_path"
                    value={formData.cover_path}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    className={getInputClassName("cover_path")}
                  />
                  {errors.cover_path ? (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.cover_path}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">
                      URL to the page logo image (optional)
                    </p>
                  )}
                </div>
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-muted bg-muted/30 flex items-center justify-center">
                  {previewLogo ? (
                    <img
                      src={previewLogo || "/placeholder.svg"}
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cookies" className="flex items-center gap-1.5">
                <Code className="h-3.5 w-3.5 text-muted-foreground" />
                Moderator Cookies (JSON)
              </Label>
              <Textarea
                id="cookies"
                name="cookies"
                value={formData.cookies}
                onChange={handleChange}
                placeholder='{"cookie1":"value1","cookie2":"value2"}'
                className={`${getInputClassName(
                  "cookies"
                )} font-mono text-xs resize-none`}
                rows={3}
              />
              {errors.cookies ? (
                <p className="text-xs text-red-500">{errors.cookies}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Authentication cookies in JSON format
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="user_agent" className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                User Agent
              </Label>
              <Textarea
                id="user_agent"
                name="user_agent"
                value={formData.user_agent}
                onChange={handleChange}
                placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
                className={`${getInputClassName(
                  "user_agent"
                )} font-mono text-xs resize-none`}
                rows={2}
              />
              {errors.user_agent && (
                <p className="text-xs text-red-500">{errors.user_agent}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="proxy_ip" className="flex items-center gap-1.5">
                <Network className="h-3.5 w-3.5 text-muted-foreground" />
                Proxy
              </Label>
              <Input
                id="proxy_ip"
                name="proxy_ip"
                value={formData.proxy_ip}
                onChange={handleChange}
                placeholder="ip:port or username:password@ip:port"
                className={`${getInputClassName("proxy_ip")} font-mono text-sm`}
              />
              {errors.proxy_ip ? (
                <p className="text-xs text-red-500">{errors.proxy_ip}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Format: ip:port or username:password@ip:port
                </p>
              )}
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
          {initialData?.facebook_page_id ? "Update Page" : "Add Page"}
        </Button>
      </div>
    </form>
  );
}

export default function App() {
  return (
    <div className="container mx-auto p-6">
      <PageForm
        onSubmit={(data) => console.log("Form submitted:", data)}
        onCancel={() => console.log("Form cancelled")}
      />
    </div>
  );
}
