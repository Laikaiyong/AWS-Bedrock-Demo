import React from 'react';
import { Image } from "@nextui-org/react";
import RecommendedJobCard from '../Chatbot/RecommendedJobCard';

const ChatCard = (
  { avatar, avatarName, message }
) => {
  const job_titles = [
    'System Engineer', 'Data Analyst', 'Java Developer', 'Software Engineer', 'Web Developer', 'Data Engineer', 'UX/UI Designer', 'Business Analyst',
    'Product Manager', 'Project Manager', 'Product Designer', 'Data Scientist', 'Sales Manager', 'Financial Analyst', 'Marketing Executives', 'Marketing Manager', 'Nurse Practitioner', 
    'Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Chemical Engineer', 'Biomedical Engineer', 'Environmental Engineer', 'Industrial Engineer', 'Aerospace Engineer',
  ];
  const contain_jobtitles = job_titles.filter((job_title, index) => {
    return message.includes(job_title);
  })

  return (
    <div className="flex flex-row gap-4 p-4 bg-white rounded-[10px]">
      <Image
        className="flex-none"
        alt="avatar"
        height={65}
        width={65}
        radius="full"
        src={avatar}
      />
      <div className="flex-1 flex flex-col gap-[3px]">
        <h1 className="text-custom-dark text-xl font-semibold">{avatarName}</h1>
        <p className="text-custom-gray-300 font-normal">{message}</p>
        {
          avatarName === "Hikki" && contain_jobtitles.length > 0 &&
          <div>
            <div className="mt-4 flex flex-col gap-4">
              <h1 className="text-[#52525B] text-lg font-semibold">Recommended Job Postings to Request</h1>
              <div className="flex flex-wrap gap-4">
                {
                  contain_jobtitles.map((job_title, index) => {
                    return (
                      <RecommendedJobCard key={index} job_title={job_title} />
                    );
                  })
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ChatCard