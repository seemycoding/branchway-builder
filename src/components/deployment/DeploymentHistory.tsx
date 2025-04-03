
import { Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface DeploymentHistoryEntry {
  id: string;
  branch: string;
  commit: string;
  status: "success" | "failed" | "running";
  user: string;
  timestamp: string;
}

const deploymentHistory: DeploymentHistoryEntry[] = [
  {
    id: "deploy-123",
    branch: "main",
    commit: "a12b3cd",
    status: "success",
    user: "John Doe",
    timestamp: "2023-09-01 14:22:35",
  },
  {
    id: "deploy-122",
    branch: "develop",
    commit: "e45f6gh",
    status: "success",
    user: "Jane Smith",
    timestamp: "2023-08-30 11:15:20",
  },
  {
    id: "deploy-121",
    branch: "feature/auth",
    commit: "i78j9kl",
    status: "failed",
    user: "Alex Johnson",
    timestamp: "2023-08-29 09:45:10",
  },
  {
    id: "deploy-120",
    branch: "main",
    commit: "m12n3op",
    status: "success",
    user: "John Doe",
    timestamp: "2023-08-27 16:34:45",
  },
];

export function DeploymentHistory() {
  const getStatusBadge = (status: DeploymentHistoryEntry["status"]) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-gitlab-success hover:bg-gitlab-success">Success</Badge>
        );
      case "failed":
        return (
          <Badge className="bg-gitlab-danger hover:bg-gitlab-danger">Failed</Badge>
        );
      case "running":
        return (
          <Badge className="bg-gitlab-blue hover:bg-gitlab-light-blue">Running</Badge>
        );
    }
  };

  return (
    <div className="rounded-md border shadow-sm">
      <div className="flex items-center border-b p-4">
        <Calendar className="mr-2 h-5 w-5 text-gitlab-gray" />
        <h3 className="text-lg font-medium">Deployment History</h3>
      </div>
      <div className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Commit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deploymentHistory.map((deployment) => (
              <TableRow key={deployment.id}>
                <TableCell className="font-mono">{deployment.id}</TableCell>
                <TableCell>{deployment.branch}</TableCell>
                <TableCell className="font-mono">{deployment.commit}</TableCell>
                <TableCell>{getStatusBadge(deployment.status)}</TableCell>
                <TableCell>{deployment.user}</TableCell>
                <TableCell>{deployment.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
