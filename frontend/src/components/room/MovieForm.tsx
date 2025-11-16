import React from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { CardForm } from "../Form";
import { TextInput } from "../Input";

type FormState = "empty" | "filling"

export function MovieForm() {
  let state = React.useState();
  return (
    <>
      {state === "empty" && <ClearState />}
      {state === "filling" && <FormState />}
    </>
  );
}

function ClearState() {
  return <Card>
    <Button>+ Add Movie</Button>
  </Card>
}

function FormState() {
  return <CardForm title="Add a Movie">
    <TextInput id="movie-title" placeholder="e.g. John Wick">Movie Title*</TextInput>
    <NumberInput id="movie-year" placeholder="e.g. 2023">Year (Optional)</NumberInput>
    <Button type="submit">Add Movie</Button>
    <Button>Cancel</Button>
  </CardForm>
}