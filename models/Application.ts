interface Application {
  id: string;
  position: string;
  dateapplied: string;
  status: "Pending" | "For Interview" | "Deffered" | "Accepted";
}

export default Application;
