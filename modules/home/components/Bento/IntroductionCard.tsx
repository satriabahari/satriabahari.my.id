interface IntroductionDataProps {
  position: string;
  name: string;
  description: string;
}

const IntroductionDatas: IntroductionDataProps = {
  position: "Software Engineer",
  name: "Satria Bahari",
  description:
    "I specialize in developing scalable web platforms and mobile applications using a modern tech stack, primarily Next.js, TypeScript, and Native Android (Kotlin).",
};

import React from 'react'

const IntroductionCard = () => {
  return (
    <div className='flex flex-col gap-2 dark:bg-neutral-800 p-4 rounded-lg'>
      <h5 className='text-sm dark:text-neutral-600'>{IntroductionDatas.position}</h5>
      <h1 className='text-3xl font-bold dark:text-neutral-100'>{IntroductionDatas.name}</h1>
      <p className='text-sm dark:text-neutral-300'>{IntroductionDatas.description}</p>
    </div>
  )
}

export default IntroductionCard
