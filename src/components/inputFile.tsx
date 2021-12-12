import { styled } from "@stitches/react";
import { useEffect } from "react";
import { DefaultValue } from "recoil";

type Props = {
  name: string;
  defaultValue?: any;
  value: any;
  setValue: any;
};

export const InputFile = (props: Props) => {
  useEffect(() => {
    if (DefaultValue) {
      props.setValue(props.defaultValue);
    }
  }, [props, props.defaultValue]);

  const handleChangeInputFile = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        props.setValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" name={props.name} id="" src={props.value} onChange={handleChangeInputFile} />
      <div>
        <Image src={props.value} alt="プロフィール画像" />
      </div>
    </div>
  );
};

const Image = styled("img", {
  height: "300px",
  width: "300px",
  borderRadius: "9999px",
});
