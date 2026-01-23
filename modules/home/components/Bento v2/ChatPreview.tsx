const ChatPreview = () => {
  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      <div className="max-w-[80%] self-start rounded-2xl rounded-tl-none bg-neutral-200 px-4 py-3 dark:bg-neutral-800 dark:text-neutral-50">
        <p className="text-sm">Hi, is this your website?</p>
      </div>

      <div className="max-w-[80%] self-end rounded-2xl rounded-tr-none bg-blue-500 px-4 py-3 text-white">
        <p className="text-sm">Yes, I built it myself!</p>
      </div>
    </div>
  );
};

export default ChatPreview;
