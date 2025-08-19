import { useEffect } from 'react';
import Syllabus from '@/components/studentcorner/Syllabus';
import QuestionPapers from "@/components/QuestionPapers";
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

const StudentCorner = () => {
  const { tab } = useParams();
  console.log(tab)
  const questionPapersRef = useRef<HTMLDivElement>(null);
  const labManualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tab === 'lab-manual') {
      labManualRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (tab === 'question-papers') {
      questionPapersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }else if (tab === 'syllabus') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [tab]);

  return (
    <div className="max-w-[95vw] 2xl:max-w-[1400px] mx-auto py-6 md:py-10 sm:px-6 lg:px-8 mt-8 md:mt-12 lg:mt-16 xl:mt-20">
      <Syllabus />
      <div className="mt-4 md:mt-8 lg:mt-10" ref={questionPapersRef}>
        <QuestionPapers />
      </div>
      {/* <div className="mt-4 md:mt-8 lg:mt-10" ref={labManualRef}>
        <ViewLab />
      </div> */}
    </div>
  );
};

export default StudentCorner;