interface Application {
  id: string;
  position: string;
  dateapplied: string;
  status: "Pending" | "Interview Scheduled" | "Deffered" | "Accepted";
}

export default Application;
