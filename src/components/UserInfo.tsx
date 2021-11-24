import { violet } from "@radix-ui/colors";
import Image from "next/image";
import { styled } from "src/utils";

export const UserInfo = () => {
  return (
    <OutLine>
      <Person>
        <Image className="rounded-full" src="/superhero.svg" width={80} height={80} alt="superhero" />
      </Person>
      <Fieldset>
        <Label htmlFor="width">NAME</Label>
        <Input />
      </Fieldset>
      <Fieldset>
        <Label htmlFor="width">HOBBY</Label>
        <Input />
      </Fieldset>
      <Fieldset>
        <Label htmlFor="width">INTRO</Label>
        <Input />
      </Fieldset>
    </OutLine>
  );
};

const OutLine = styled("div", {
  width: "100%",
  height: "70%",
  padding: "40px",
  textAlign: "center",
  borderRadius: 4,
  backgroundColor: "'inherit'",
});

const Person = styled("div", {
  margin: " 20px auto",
  width: "100px",
  height: "100px",
  backgroundColor: "white",
  borderRadius: "50px",
});

const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  gap: 20,
  margin: "20px ",
  alignItems: "center",
});

const Label = styled("label", {
  fontSize: 16,
  color: violet.violet11,
  width: 75,
  fontWeight: "bold",
});

const Input = styled("input", {
  all: "unset",
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "1",
  borderRadius: 4,
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
  height: 25,
  backgroundColor: "white",

  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet8}` },
});
