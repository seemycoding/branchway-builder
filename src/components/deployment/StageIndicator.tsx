
import { CheckCircle, Clock, Loader, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type StageStatus = "pending" | "running" | "success" | "failed";

interface StageIndicatorProps {
  stage: string;
  status: StageStatus;
  isLast?: boolean;
}

export function StageIndicator({ stage, status, isLast = false }: StageIndicatorProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />;
      case "running":
        return <Loader className="h-5 w-5 text-gitlab-blue animate-spin" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-gitlab-success" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-gitlab-danger" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-gray-200";
      case "running":
        return "bg-gitlab-blue";
      case "success":
        return "bg-gitlab-success";
      case "failed":
        return "bg-gitlab-danger";
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white",
            {
              "bg-white": status === "pending",
              "bg-white": status === "running",
              "bg-gitlab-success bg-opacity-10": status === "success",
              "bg-gitlab-danger bg-opacity-10": status === "failed",
            }
          )}
        >
          {getStatusIcon()}
        </div>
        <span className="mt-2 text-xs font-medium">{stage}</span>
      </div>
      {!isLast && (
        <div
          className={cn("h-1 w-16 flex-shrink-0", getStatusColor(), {
            "opacity-30": status === "pending",
          })}
        />
      )}
    </div>
  );
}
