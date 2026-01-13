import clsx from "clsx";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FiSend as SendIcon } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { IoCloseCircle as CloseIcon } from "react-icons/io5";
import { useSession } from "next-auth/react";

import ChatUserInfo from "./ChatUserInfo";

import { ChatInputProps } from "@/common/types/chat";

interface ChatInputPropsNew extends ChatInputProps {
  replyName?: string;
  replyEmail?: string;
  isWidget?: boolean;
  onCancelReply: () => void;
}

const ChatInput = ({
  replyName,
  replyEmail,
  isWidget,
  onSendMessage,
  onCancelReply,
}: ChatInputPropsNew) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { data: session } = useSession();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const t = useTranslations("ChatRoomPage");

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);

    try {
      await onSendMessage(message);
      if (session?.user) {
        if (replyEmail && replyEmail !== session.user.email) {
          await fetch("/api/chat/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "REPLY_NOTIFICATION",
              targetEmail: replyEmail,
              senderName: session.user.name,
              message: message,
            }),
          });
        } else if (!replyEmail) {
          await fetch("/api/chat/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "NEW_CHAT",
              name: session.user.name,
              email: session.user.email,
              message: message,
            }),
          });
        }
      }
      setMessage("");
      onCancelReply();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <form className="flex flex-col gap-2 border-t border-neutral-300 px-4 py-4 dark:border-neutral-700">
        {replyName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-fit items-center gap-2 rounded-md bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800"
          >
            <span>Replying to {replyName}</span>
            <CloseIcon
              size={14}
              onClick={() => onCancelReply()}
              className="cursor-pointer"
            />
          </motion.div>
        )}
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder={t("placeholder")}
            disabled={isSending}
            ref={inputRef}
            autoFocus
            className="flex-grow rounded-md border p-2 focus:outline-none dark:border-neutral-600"
          />
          <button
            type="submit"
            onClick={handleSendMessage}
            className={clsx(
              "ml-2 rounded-md bg-primary p-3 text-dark transition duration-100 hover:bg-primary-500 active:scale-90",
              !message.trim() &&
                "cursor-not-allowed !bg-neutral-700 active:scale-100",
            )}
            disabled={isSending || !message.trim()}
            data-umami-event="click_send_message"
          >
            <SendIcon size={18} />
          </button>
        </div>
      </form>
      <ChatUserInfo isWidget={isWidget} />
    </>
  );
};

export default ChatInput;
