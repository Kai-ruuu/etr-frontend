import { useState } from "react";
import JobPostForm from "../../../components/JobPostForm";
import JobPostTable from "../../../components/JobPostTable";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export default function SysadJobPostPage() {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: "1",
      title: "Senior Developer",
      company: "Tech Corp",
      status: "published",
    },
    {
      id: "2",
      title: "Financial Analyst",
      company: "Finance Ltd",
      status: "published",
    },
  ]);
  const [editingId, setEditingId] = useState(null);

  const handleAddJob = (job) => {
    if (editingId) {
      setJobs(
        jobs.map((j) => (j.id === editingId ? { ...job, id: editingId } : j))
      );
      setEditingId(null);
    } else {
      setJobs([...jobs, { ...job, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Job Posts</h1>
        <Button
          onClick={() => {
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "Post Job"}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <JobPostForm
            onSubmit={handleAddJob}
            editingId={editingId}
            jobs={jobs}
          />
        </Card>
      )}

      <JobPostTable jobs={jobs} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
