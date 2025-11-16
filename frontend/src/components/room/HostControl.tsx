import { Button } from "../Button";
import { CardForm } from "../Form";


export function HostControl() {
  return (
    <CardForm title="Host Controls">
      <Button type="submit">
        Finish &amp; Draw Winner
      </Button>
      <span>
        Lock the room and automatically draw a random winner.
        You must finish the room before you can leave.
      </span>
    </CardForm>
  );
}