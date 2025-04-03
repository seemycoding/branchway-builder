
import { useState, useEffect } from "react";
import { StageIndicator, StageStatus } from "./StageIndicator";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Stage {
  name: string;
  status: StageStatus;
}

interface DeploymentPipelineProps {
  branch: string;
}

export function DeploymentPipeline({ branch }: DeploymentPipelineProps) {
  const [stages, setStages] = useState<Stage[]>([
    { name: "Build", status: "pending" },
    { name: "Copy", status: "pending" },
    { name: "Deploy", status: "pending" },
    { name: "Restart", status: "pending" },
  ]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentFailed, setDeploymentFailed] = useState(false);

  const resetDeployment = () => {
    setStages(stages.map(stage => ({ ...stage, status: "pending" })));
    setDeploymentFailed(false);
  };

  const startDeployment = () => {
    resetDeployment();
    setIsDeploying(true);
    toast.info(`Starting deployment from branch: ${branch}`);
    
    // Simulate build stage
    setStages(currentStages => 
      currentStages.map((stage, i) => 
        i === 0 ? { ...stage, status: "running" } : stage
      )
    );
  };

  const cancelDeployment = () => {
    setIsDeploying(false);
    setDeploymentFailed(true);
    setStages(currentStages => 
      currentStages.map((stage, i) => {
        if (stage.status === "running") {
          return { ...stage, status: "failed" };
        }
        return stage;
      })
    );
    toast.error("Deployment cancelled");
  };

  // Simulate deployment process
  useEffect(() => {
    if (!isDeploying) return;

    const currentRunningStage = stages.findIndex(stage => stage.status === "running");
    
    if (currentRunningStage >= 0) {
      const timer = setTimeout(() => {
        const random = Math.random();
        
        // Simulate a 90% success rate
        if (random > 0.1) {
          // Success: Move to next stage
          setStages(currentStages => {
            const newStages = [...currentStages];
            // Mark current as success
            newStages[currentRunningStage].status = "success";
            
            // Start next stage if available
            if (currentRunningStage < newStages.length - 1) {
              newStages[currentRunningStage + 1].status = "running";
            } else {
              // Deployment completed
              setIsDeploying(false);
              toast.success("Deployment completed successfully!");
            }
            
            return newStages;
          });
        } else {
          // Failure
          setStages(currentStages => {
            const newStages = [...currentStages];
            newStages[currentRunningStage].status = "failed";
            return newStages;
          });
          
          setIsDeploying(false);
          setDeploymentFailed(true);
          toast.error(`Stage ${stages[currentRunningStage].name} failed!`);
        }
      }, 2000); // Each stage takes 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, [stages, isDeploying]);

  return (
    <div className="w-full rounded-md border p-6 shadow-sm">
      <div className="mb-6 flex justify-center space-x-2">
        {stages.map((stage, i) => (
          <StageIndicator 
            key={stage.name}
            stage={stage.name}
            status={stage.status}
            isLast={i === stages.length - 1}
          />
        ))}
      </div>
      
      <div className="flex justify-center space-x-4 mt-8">
        {!isDeploying && !deploymentFailed && (
          <Button 
            className="bg-gitlab-blue hover:bg-gitlab-light-blue"
            onClick={startDeployment}
          >
            <Play className="mr-2 h-4 w-4" /> Start Deployment
          </Button>
        )}
        
        {isDeploying && (
          <Button 
            variant="destructive"
            onClick={cancelDeployment}
          >
            <XCircle className="mr-2 h-4 w-4" /> Cancel
          </Button>
        )}
        
        {deploymentFailed && (
          <Button 
            onClick={resetDeployment}
            variant="outline"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Retry
          </Button>
        )}
      </div>
    </div>
  );
}
