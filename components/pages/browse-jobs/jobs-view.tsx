import { ButtonGroup } from "../../ui/button-group";
import { Button } from "../../ui/button";
import { LayoutList, Grid2X2 } from "lucide-react";

export default function JobsView() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <Grid2X2 className="size-4" />
        Grid
      </Button>
      <Button variant="outline">
        <LayoutList className="size-4" />
        List
      </Button>
    </ButtonGroup>
  );
}
