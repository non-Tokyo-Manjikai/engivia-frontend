import { useRouter } from "next/router";
import { memo } from "react";
import { styled } from "src/utils";

export const HistoryBackButton: React.FC = memo(() => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <Root onClick={handleBack}>
      <BackIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </BackIcon>
    </Root>
  );
});

const BackIcon = styled("svg", {
  height: "3rem",
  width: "3rem",
  marginX: "0.75rem",
  padding: "0.75rem",
  color: "$primary9",
  backgroundColor: "$slate1",
  borderRadius: 9999,
  border: "1px solid $primary3",
});

const Root = styled("div", {
  position: "fixed",
  left: "1.25rem",
  top: "6rem",
});
