interface Application {
  id: string;
  position: string;
  dateApplied: string;
  status: "Pending" | "Interview Scheduled" | "Deffered" | "Accepted";
}

export default Application;
