```
import useSWR from "swr";
import type { KeyedMutator } from "swr/dist/types";

export const useSharedState = <T extends any>(key: string, fallbackData?: T) => {
  const { data, mutate } = useSWR(key, { fallbackData });
  return [data, mutate] as [typeof fallbackData, KeyedMutator<typeof fallbackData>];
};
```

```
import useSWR from "swr";

const useSharedState = (key: string, fallbackData: any) => {
  const { data, mutate } = useSWR(key, { fallbackData });
  return [data, mutate];
};

const useCounter = () => {
  const [count, setCount] = useSharedState("counter", 0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  return { count, handleIncrement };
};

const useText = () => {
  const [text, setText] = useSharedState("text", "");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return { text, handleChange };
};

const Test = () => {
  return (
    <>
      <ChildrenA />
      <ChildrenB />
    </>
  );
};

const ChildrenA = () => {
  const { text } = useText();
  return <div>{text}</div>;
  // const { count } = useCounter();
  // return <div className="bg-red-800">{count}</div>;
};

const ChildrenB = () => {
  const { text, handleChange } = useText();
  return (
    <div>
      <div>{text}</div>
      <input type="text" value={text} onChange={handleChange} />
    </div>
  );

  // const { count, handleIncrement } = useCounter();
  // return (
  //   <div className="bg-blue-800">
  //     <div>{count}</div>
  //     <button onClick={handleIncrement}>Increment</button>
  //   </div>
  // );
};

export default Test;
```

```
import { useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type {
  Renderable,
  ValueOrFunction,
} from "react-hot-toast/dist/core/types";
​
const fakeApi = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });
};
​
const usePromiseToast = () => {
  const [isLoading, setIsLoading] = useState(false);
​
  const promiseToast = useCallback(
    async <T extends unknown>(
      promise: Promise<T>,
      msgs?: {
        loading?: Renderable;
        success?: ValueOrFunction<Renderable, T>;
        error?: ValueOrFunction<Renderable, any>;
      }
    ) => {
      setIsLoading(true);
      try {
        await toast.promise<T>(promise, {
          loading: "ローディング中",
          success: "成功",
          error: "失敗",
          ...(msgs ? msgs : {}),
        });
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    },
    []
  );
​
  return { promiseToast, isLoading };
};
​
const Test = () => {
  const { promiseToast, isLoading } = usePromiseToast();
​
  const handleClick = async () => {
    await promiseToast(fakeApi());
  };
​
  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "ローディング中" : "非同期処理を行う"}
      </button>
      <Toaster />
    </div>
  );
};
​
export default Test;
```
