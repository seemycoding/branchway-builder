
import { useState } from "react";
import { BranchSelector } from "./BranchSelector";
import { DeploymentPipeline } from "./DeploymentPipeline";
import { DeploymentHistory } from "./DeploymentHistory";
import { GitBranch } from "lucide-react";

export function DeploymentScreen() {
  const [selectedBranch, setSelectedBranch] = useState("main");

  const handleBranchSelect = (branch: string) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Deployment Pipeline</h1>
        <p className="text-muted-foreground mt-2">
          Deploy your code to production in a controlled and reliable way.
        </p>
      </div>

      <div className="mb-8 rounded-md border p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <GitBranch className="mr-2 h-5 w-5 text-gitlab-gray" />
            <span className="mr-4 font-medium">Branch:</span>
            <BranchSelector onSelect={handleBranchSelect} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <DeploymentPipeline branch={selectedBranch} />
      </div>

      <div className="mb-8">
        <DeploymentHistory />
      </div>
    </div>
  );
}
