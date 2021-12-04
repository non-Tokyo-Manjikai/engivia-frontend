import { violet } from "@radix-ui/colors";
import Image from "next/image";
import { styled } from "src/utils";
import { useState } from "react";

export const UserInfo = () => {
  const [editing, setEditing] = useState(true);
  const [text, setText] = useState("");
  const [name, setName] = useState("ジョントラぼるた");

  const handleEditing = (e: any) => {
    e.preventDefault();
    setText(e.target.value.trim());
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    addName(text);
  };

  const addName = (text: string) => {
    setName(text);
  };

  return (
    <OutLine>
      <Person>
        <Image className="rounded-full" src="/superhero.svg" width={80} height={80} alt="superhero" />
      </Person>
      <form onSubmit={submitForm}>
        <NameArea>
          <Label htmlFor="width">NAME</Label>
          {editing ? <Nombre>{name}</Nombre> : <Input type="text" value={text} onChange={handleEditing} />}
        </NameArea>
        <EditArea>
          <Edit
            onClick={() => {
              setEditing((editing) => {
                if (editing) {
                  return false;
                }
                return true;
              });
            }}
          >
            {editing ? "Edit" : "Save"}
          </Edit>
        </EditArea>
      </form>
    </OutLine>
  );
};

const OutLine = styled("div", {
  width: "100%",
  height: "70%",
  padding: "20px",
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

const NameArea = styled("div", {
  all: "unset",
  display: "flex",
  gap: 30,
  margin: "20px ",
  alignItems: "center",
});

const Label = styled("label", {
  fontSize: 16,
  color: violet.violet11,
  width: 45,
  fontWeight: "bold",
  textAlign: "left",
  borderBottomWidth: "2px",
  // twBorderOpacity: "1",
  borderColor: "rgba(245, 158, 11)",
});

const Nombre = styled("p", {
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "left",
  textAlign: "left",
  flex: "1",
  fontSize: 18,
  fontWeight: 600,
  color: violet.violet11,
});

const Input = styled("input", {
  all: "unset",
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "left",
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

const EditArea = styled("div", {
  textAlign: "right",
});

const Edit = styled("button", {
  width: "40px",
  height: "30px",
  border: "black, 1px",
  backgroundColor: "#ebebeb",
  borderRadius: "20px",
  cursor: "pointer",
  borderBottom: "2px solid",
  "&:hover": {
    backgroundColor: "#e3e3e3",
  },
});
