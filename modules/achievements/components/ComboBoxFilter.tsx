import { ChangeEvent, useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LuChevronsUpDown as ArrowIcon } from "react-icons/lu";
import { TiTick as ActiveIcon } from "react-icons/ti";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

import cn from "@/common/libs/clsxm";
import Button from "@/common/components/elements/Button";

interface comboBoxFilterProps {
  data: string[];
  paramKey: string;
  placeholder?: string;
}

const ComboBoxFilter = ({
  data,
  paramKey,
  placeholder,
}: comboBoxFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValueSearch, setInputValueSearch] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentParams = searchParams.get(paramKey);

  const router = useRouter();
  const comboBoxRef = useRef<HTMLDivElement>(null);

  const filteredData = data?.filter((item) =>
    item.toLowerCase().includes(inputValueSearch.toLowerCase()),
  );

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (newValue: string) => {
    const finalValue = selectValue === newValue ? "" : newValue;

    const params = new URLSearchParams(searchParams.toString());

    if (finalValue) {
      params.set(paramKey, finalValue);
    } else {
      params.delete(paramKey);
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueSearch(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      comboBoxRef.current &&
      !comboBoxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setSelectValue(currentParams || "");
  }, [currentParams]);

  useEffect(() => {
    if (currentParams) {
      setSelectValue(currentParams);
    } else {
      setSelectValue("");
    }
  }, [currentParams]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={comboBoxRef} className="relative w-full md:w-[230px]">
      <Button
        className="flex w-full items-center justify-between gap-4 bg-neutral-100 p-2 text-neutral-900 outline outline-neutral-300 hover:bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-400 dark:outline-neutral-700 dark:hover:bg-neutral-800"
        onClick={handleClickOpen}
        data-umami-event="click_filter_achievements"
      >
        <span className="text-sm ">
          {selectValue
            ? data?.find((item) => item === selectValue)
            : placeholder}
        </span>
        <ArrowIcon
          className={cn("transition duration-200", isOpen && "scale-125")}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 0 }}
            className="absolute left-0 top-12 z-10 w-full"
          >
            <div className="w-full rounded-md  bg-neutral-100 outline outline-neutral-300 dark:bg-neutral-900 dark:outline-neutral-600">
              <div className="grid w-full grid-cols-[1.5rem_1fr] items-center border-b border-neutral-700 px-3 py-2">
                <SearchIcon className="dark:text-neutral-500" />
                <input
                  type="search"
                  className="flex justify-start bg-neutral-100 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 dark:bg-neutral-900 dark:text-neutral-50"
                  placeholder={`Search ${paramKey}`}
                  onChange={handleChangeInput}
                  value={inputValueSearch}
                />
              </div>

              <div className="p-1">
                {filteredData?.length === 0 && (
                  <div className="px-4 py-2 text-center text-sm text-neutral-900 dark:text-neutral-50">
                    no category found.
                  </div>
                )}

                {filteredData?.map((item, index) => (
                  <button
                    key={index}
                    className="grid w-full grid-cols-[1.5rem_1fr] items-center rounded-[4px] p-2 text-neutral-900 hover:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-800"
                    onClick={() => handleSelect(item)}
                  >
                    {item === selectValue && <ActiveIcon />}
                    <span className="col-start-2 flex justify-start text-sm capitalize">
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComboBoxFilter;
