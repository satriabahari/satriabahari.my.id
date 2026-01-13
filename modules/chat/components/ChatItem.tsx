import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { RiUserStarLine as AuthorIcon } from "react-icons/ri";
import { FiTrash2 as DeleteIcon } from "react-icons/fi";
import { BsFillReplyAllFill as ReplyIcon } from "react-icons/bs";

import ChatTime from "./ChatTime";

import Tooltip from "@/common/components/elements/Tooltip";
import { MessageProps } from "@/common/types/chat";

interface ChatItemProps extends MessageProps {
  isWidget?: boolean;
  onDelete: (id: string) => void;
  onReply: (name: string, email: string) => void;
}

const ChatItem = ({
  id,
  name,
  email,
  image,
  message,
  created_at,
  reply_to,
  is_reply,
  isWidget,
  onDelete,
  onReply,
}: ChatItemProps) => {
  const [isHover, setIsHover] = useState(false);
  const { data: session } = useSession();

  const authorEmail = process.env.NEXT_PUBLIC_AUTHOR_EMAIL;
  const isAuthor = email === authorEmail;

  const condition = isAuthor && !isWidget;

  return (
    <div
      className={clsx(
        "flex items-center gap-3 px-4 lg:px-8",
        condition && "flex-row-reverse",
      )}
    >
      {image && (
        <Image
          src={image}
          width={40}
          height={40}
          alt={name}
          className="mt-1 rounded-full border dark:border-neutral-800"
        />
      )}

      <div
        className={clsx("space-y-1", condition && "flex flex-col items-end")}
      >
        <div
          className={clsx(
            "flex items-center gap-x-2",
            condition && "flex-row-reverse",
          )}
        >
          <div className="text-sm dark:text-neutral-200">{name}</div>
          {condition && (
            <div className="flex items-center gap-[2px] rounded-full border border-primary bg-neutral-800 px-1.5 py-0.5 font-medium text-primary ">
              <AuthorIcon size={13} />
              <span className="text-[10px]">Author</span>
            </div>
          )}
          <div className="hidden md:flex">
            <ChatTime datetime={created_at} />
          </div>
        </div>
        <div
          className={clsx(
            "group relative flex w-fit items-center gap-3",
            condition && "flex-row-reverse",
          )}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={clsx(
              "rounded-xl rounded-tl-sm bg-neutral-200 px-4 py-3 group-hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-50 dark:group-hover:bg-neutral-600",
              condition &&
                "rounded-tl-xl rounded-tr-sm bg-primary text-dark group-hover:bg-primary-300 dark:bg-primary dark:!text-dark dark:group-hover:bg-primary-400",
            )}
          >
            {is_reply && (
              <>
                <span
                  className={clsx(
                    "font-medium text-primary",
                    condition && "!text-dark dark:text-dark",
                  )}
                >
                  @{reply_to}{" "}
                </span>
                <span>{message}</span>
              </>
            )}
            {!is_reply && <>{message}</>}
          </div>

          {isHover && (
            <motion.button
              initial={{ opacity: 0, scale: 0, transform: "rotate(45deg)" }}
              animate={{ opacity: 1, scale: 1, transform: "rotate(0deg)" }}
              transition={{ duration: 0.2 }}
              onClick={() => onReply(name, email)}
            >
              <Tooltip title="Reply">
                <ReplyIcon
                  size={15}
                  className={clsx(
                    "transition duration-300 active:scale-90",
                    condition && "scale-x-[-1] active:scale-x-[-1]",
                  )}
                />
              </Tooltip>
            </motion.button>
          )}

          {session?.user?.email === authorEmail && isHover ? (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
              onClick={() => onDelete(id)}
              className="rounded-md bg-red-600 p-2 text-red-50 transition duration-100 hover:bg-red-500"
            >
              <DeleteIcon size={17} />
            </motion.button>
          ) : null}
        </div>
        <div className="flex md:hidden">
          <ChatTime datetime={created_at} />
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
