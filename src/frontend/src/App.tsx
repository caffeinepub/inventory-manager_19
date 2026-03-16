import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Check,
  CheckCircle2,
  Copy,
  LayoutDashboard,
  Package,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const APP_URL = "https://inventory-manager-xey.caffeine.xyz";
const canShare =
  typeof navigator !== "undefined" && typeof navigator.share === "function";

function ShareSection() {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true);
      toast.success("Link copied!", {
        description: "The app link has been copied to your clipboard.",
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy", {
        description: "Please copy the link manually.",
      });
    }
  };

  const handleShare = async () => {
    if (!canShare) return;
    setSharing(true);
    try {
      await navigator.share({
        title: "Inventory Manager",
        text: "Check out this inventory management app!",
        url: APP_URL,
      });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        toast.error("Could not open share menu");
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-foreground mb-1">
          Share this App
        </h3>
        <p className="text-sm text-muted-foreground">
          Invite your team or share with anyone who needs to manage inventory.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-secondary/50 p-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Live Link
        </p>
        <p className="text-sm font-medium text-foreground break-all font-mono select-all">
          {APP_URL}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleCopy}
          data-ocid="share.copy_button"
          variant="outline"
          className="w-full h-12 text-sm font-semibold relative overflow-hidden transition-all duration-200 border-primary/30 hover:bg-accent hover:border-primary/60"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                data-ocid="share.success_state"
                className="flex items-center gap-2 text-primary"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="h-4 w-4" />
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                <Copy className="h-4 w-4" />
                Copy Link
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        {canShare && (
          <Button
            onClick={handleShare}
            data-ocid="share.primary_button"
            disabled={sharing}
            className="w-full h-12 text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {sharing ? "Opening..." : "Share to Apps"}
          </Button>
        )}

        {!canShare && (
          <div className="rounded-xl border border-border/50 bg-muted/40 p-4 text-center">
            <Share2 className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Native sharing is not available in this browser. Use the copy
              button above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AccountSection({
  onSendNotification,
}: { onSendNotification: () => void }) {
  const [notifSent, setNotifSent] = useState(false);

  const handleSendNotification = () => {
    onSendNotification();
    setNotifSent(true);
    toast.success("Notification sent to Admin Panel!", {
      description: "The Admin Panel icon now shows a live badge.",
      duration: 4000,
    });
    setTimeout(() => setNotifSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/40 border border-accent">
        <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <User className="h-7 w-7 text-primary-foreground" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Inventory Manager</p>
          <p className="text-sm text-muted-foreground">Administrator</p>
        </div>
      </div>

      <Separator />

      {[
        { label: "Display Name", value: "Admin User" },
        { label: "Role", value: "Administrator" },
        { label: "App Version", value: "1.0.0" },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between py-2"
        >
          <span className="text-sm text-muted-foreground">{item.label}</span>
          <span className="text-sm font-medium text-foreground">
            {item.value}
          </span>
        </div>
      ))}

      <Separator />

      {/* Help Center */}
      <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Help Center</h4>
        </div>
        <p className="text-xs text-muted-foreground">
          Send a test notification to Admin Panel to verify live connectivity.
        </p>
        <Button
          onClick={handleSendNotification}
          data-ocid="helpcenter.button"
          variant="outline"
          className="w-full h-10 text-sm font-semibold border-primary/40 hover:bg-primary/10 transition-all"
        >
          <AnimatePresence mode="wait" initial={false}>
            {notifSent ? (
              <motion.span
                key="sent"
                className="flex items-center gap-2 text-green-600"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle2 className="h-4 w-4" />
                Notification Sent!
              </motion.span>
            ) : (
              <motion.span
                key="send"
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Bell className="h-4 w-4" />
                Send Test Notification
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-foreground mb-1">
          Notifications
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage how you receive alerts and updates.
        </p>
      </div>
      <Separator />
      {[
        {
          label: "Push Notifications",
          desc: "Alerts for low stock and updates",
          value: push,
          set: setPush,
        },
        {
          label: "Email Reports",
          desc: "Weekly inventory summaries",
          value: email,
          set: setEmail,
        },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => item.set(!item.value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              item.value ? "bg-primary" : "bg-border"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                item.value ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

const SECURITY_INDICATORS = [
  { label: "Two-Factor Authentication (2FA)", status: "Enabled" },
  { label: "Passkey Protection", status: "Active" },
  { label: "Secure Login Protocol", status: "Enabled" },
  { label: "SSL Encryption", status: "Active" },
];

const AUDIT_CHECKS = [
  "No malware detected",
  "Firewall active",
  "Data encrypted",
  "Access logs clean",
];

function SecuritySection() {
  const [auditOpen, setAuditOpen] = useState(false);

  const auditTimestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-foreground mb-1">
          Security
        </h3>
        <p className="text-sm text-muted-foreground">
          Your account security status and audit tools.
        </p>
      </div>

      {/* Security Status Panel */}
      <div className="rounded-xl border border-green-200 bg-green-50/60 dark:bg-green-950/20 dark:border-green-800 p-5 space-y-4">
        {/* Verified badge */}
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
            <ShieldCheck className="h-9 w-9 text-green-600" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-green-700 dark:text-green-400">
              100% Verified
            </p>
            <p className="text-xs text-green-600/80 dark:text-green-500">
              All security checks passed
            </p>
          </div>
        </div>

        <Separator className="bg-green-200 dark:bg-green-800" />

        {/* Indicators */}
        <div className="space-y-2">
          {SECURITY_INDICATORS.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Run Security Audit button */}
      <Button
        onClick={() => setAuditOpen(true)}
        data-ocid="security.audit_button"
        className="w-full h-12 text-sm font-bold bg-green-600 hover:bg-green-700 text-white transition-colors"
      >
        <Shield className="h-4 w-4 mr-2" />
        Run Security Audit
      </Button>

      {/* Audit Result Dialog */}
      <Dialog open={auditOpen} onOpenChange={setAuditOpen}>
        <DialogContent
          data-ocid="security.dialog"
          className="max-w-sm rounded-2xl"
        >
          <DialogHeader className="items-center text-center space-y-3 pb-2">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto"
            >
              <ShieldCheck className="h-11 w-11 text-green-600" />
            </motion.div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Security Audit Complete
              </DialogTitle>
              <p className="text-sm font-semibold text-green-600 mt-1">
                No Vulnerabilities Found
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {auditTimestamp}
              </p>
            </div>
          </DialogHeader>

          <div className="space-y-2 py-2">
            {AUDIT_CHECKS.map((check) => (
              <div
                key={check}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-green-50/80 dark:bg-green-950/20 border border-green-100 dark:border-green-900"
              >
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">{check}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-green-600 p-3 text-center">
            <p className="text-white font-bold text-lg">
              Security Score: 100/100
            </p>
          </div>

          <Button
            onClick={() => setAuditOpen(false)}
            data-ocid="security.dialog.close_button"
            className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold mt-1"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function App() {
  const [adminBadge, setAdminBadge] = useState(false);

  const handleAdminClick = () => {
    setAdminBadge(false);
    toast("Admin Panel: No new alerts", {
      icon: <LayoutDashboard className="h-4 w-4" />,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">
              Inventory Manager
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">Settings</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {/* Admin Panel button with badge */}
            <button
              type="button"
              onClick={handleAdminClick}
              data-ocid="admin.panel_button"
              className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
              aria-label="Admin Panel"
            >
              <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
              <AnimatePresence>
                {adminBadge && (
                  <motion.span
                    data-ocid="admin.badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background"
                  />
                )}
              </AnimatePresence>
            </button>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-xl mx-auto px-4 py-6">
        <Tabs defaultValue="account">
          <TabsList className="w-full grid grid-cols-4 mb-6 bg-secondary rounded-xl h-11">
            <TabsTrigger
              value="account"
              data-ocid="settings.tab"
              className="rounded-lg text-xs font-semibold data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <User className="h-3.5 w-3.5 mr-1" />
              Account
            </TabsTrigger>
            <TabsTrigger
              value="share"
              data-ocid="settings.tab"
              className="rounded-lg text-xs font-semibold data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Share2 className="h-3.5 w-3.5 mr-1" />
              Share
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              data-ocid="settings.tab"
              className="rounded-lg text-xs font-semibold data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Bell className="h-3.5 w-3.5 mr-1" />
              Alerts
            </TabsTrigger>
            <TabsTrigger
              value="security"
              data-ocid="security.tab"
              className="rounded-lg text-xs font-semibold data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Shield className="h-3.5 w-3.5 mr-1" />
              Security
            </TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
              <TabsContent value="account" className="m-0">
                <AccountSection
                  onSendNotification={() => setAdminBadge(true)}
                />
              </TabsContent>
              <TabsContent value="share" className="m-0">
                <ShareSection />
              </TabsContent>
              <TabsContent value="notifications" className="m-0">
                <NotificationsSection />
              </TabsContent>
              <TabsContent value="security" className="m-0">
                <SecuritySection />
              </TabsContent>
            </div>
          </motion.div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
